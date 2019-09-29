const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const cp = require("child_process");
//compiles plugins as JSON header plus plain text body

const version = process.argv[3]; 'http-server';
// const TWSource = 'Source/TiddlyWiki5-' + version.split('-').join('.');
const TWSource = process.argv[2]; //'Source/http-server';
if (!version || !TWSource) return;



const oldFolder = path.resolve(__dirname, TWSource);
const newFolder = path.resolve(__dirname, version);

const pkg = require(path.resolve(oldFolder, "package.json"));
if(pkg.version.replace(/\./gi, "-") !== version) {
	throw "Mismatch with package.json version";
}

fs.mkdirSync(newFolder);
var $tw = require(oldFolder).TiddlyWiki();
$tw.boot.argv = [TWSource + '/editions/empty'];
const execute = $tw.boot.executeNextStartupTask;
$tw.boot.executeNextStartupTask = function () {
	if (!execute()) complete();
	return true;
}
$tw.boot.boot();

function complete() {
	const hashes = {};
	['plugins', 'themes'].map(folder => path.join(oldFolder, folder))
		.reduce((n, folder) => n.concat(fs.readdirSync(folder).filter(sub => !sub.startsWith(".")).map(sub => path.join(folder, sub))), [])
		.concat([path.join(oldFolder, 'languages')])
		.reduce((n, folder) => n.concat(fs.readdirSync(folder).filter(sub => !sub.startsWith(".")).map(sub => path.join(folder, sub))), [])
		.concat([path.join(oldFolder, 'core')])
		.forEach(oldPath => {
			const plugin = $tw.loadPluginFolder(oldPath)
			const relPath = path.normalize(path.relative(oldFolder, oldPath));
			console.log(relPath);
			const newPath = path.join(newFolder, relPath);
			// console.log(newPath);
			const splitPath = relPath.split(path.sep);
			for (let i = 0; i < splitPath.length; i++) {
				const curPath = path.join(newFolder, splitPath.slice(0, i + 1).join(path.sep));
				if (!fs.existsSync(curPath)) fs.mkdirSync(curPath);
			}
			if (plugin) {
				// let js = JSON.stringify(plugin);
				let js = Buffer.from(`$tw.preloadTiddler(${JSON.stringify(plugin)});`, "utf8");
				let hash = crypto.createHash("sha384").update(js).digest("base64");
				// console.log(newPath, hash);
				fs.writeFileSync(path.join(newPath, "plugin.info.js"), js);
				hashes[relPath] = "sha384-" + hash;

				plugin.tiddlers = JSON.parse(plugin.text).tiddlers;
				delete plugin.text;
				fs.writeFileSync(path.join(newPath, "plugin.info"), JSON.stringify(plugin));
			} else console.log(oldPath);
		});
	console.log(hashes);
	fs.writeFileSync(path.join(newFolder, "hashes.json"), JSON.stringify(hashes, null, 2));

	fs.mkdirSync(path.join(newFolder, 'boot'));
	fs.mkdirSync(path.join(newFolder, 'licenses'));

	const files = fs.readdirSync(path.join(oldFolder, 'boot')).map(e => 'boot/' + e)
		.concat(fs.readdirSync(path.join(oldFolder, 'licenses')).map(e => 'licenses/' + e))
		.concat(['tiddlywiki.js', 'package.json', 'license']);

	function processOtherFiles() {
		if (!files.length) {
			console.log("The 'bin' and 'editions' folders are not included because they are not required " +
				"for TiddlyWiki to work correctly as a module. However, both may be added and the bundle should " +
				"then work as expected.");
			let rel = path.relative(path.relative(__dirname, process.argv[2]), newFolder);
			let cmd = `(cd ${process.argv[2]} && zip -r ${rel}/editions.zip editions)`;
			console.log("\nRunning %s", cmd);
			let res = cp.spawnSync(cmd, { shell: true });
			let output = Buffer.concat(res.output.filter(e => e)).toString("utf8");
			let outputArr = output.split("\n").map(e => e.trimLeft().startsWith("adding") ? true : e);
			let count = outputArr.filter(e => e === true).length;
			let other = outputArr.filter(e => e !== true).join('\n');
			
			console.log("Zip finished with status %s and signal %s", res.status, res.signal);
			console.log(res.stderr.toString("utf8"));
			console.log("Added %s files, and printed the following lines as well", count);
			console.log(other);

			return;
		}
		const e = files.pop();
		console.log(e);
		const oldFile = fs.createReadStream(path.join(oldFolder, e));
		const newFile = fs.createWriteStream(path.join(newFolder, e));
		oldFile.pipe(newFile);
		oldFile.on('close', () => {
			processOtherFiles();
		});
	}
	processOtherFiles();


}
