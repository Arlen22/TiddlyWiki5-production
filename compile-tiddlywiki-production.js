const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const cp = require("child_process");
//compiles plugins as JSON header plus plain text body


if (!process.argv[2] || !process.argv[3] || !process.argv[4])
	throw "Please specify source, destination, and version";

const oldFolder = path.resolve(process.argv[2]);
const newFolder = path.resolve(process.argv[3]);

const pkg = require(path.resolve(oldFolder, "package.json"));

if (pkg.version !== process.argv[4])
	throw "Mismatch with package.json version";


fs.mkdirSync(newFolder);
var $tw = require(oldFolder).TiddlyWiki();
$tw.boot.argv = [oldFolder + '/editions/empty'];
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
				//re-stringify to reformat and save space
				plugin.text = JSON.stringify(JSON.parse(plugin.text));
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
	// console.log(hashes);
	fs.writeFileSync(path.join(newFolder, "hashes.json"), JSON.stringify(hashes, null, 2));

	// fs.mkdirSync(path.join(newFolder, 'bin'));
	// fs.mkdirSync(path.join(newFolder, 'boot'));
	// fs.mkdirSync(path.join(newFolder, 'licenses'));

	// const files = fs.readdirSync(path.join(oldFolder, 'boot')).map(e => 'boot/' + e)
	// 	.concat(fs.readdirSync(path.join(oldFolder, 'licenses')).map(e => 'licenses/' + e))
	// 	.concat(['tiddlywiki.js', 'license']);

	// add package.json with a few changes
	/** @type {import("./TiddlyWiki5-Jermolene/package.json")} */
	let pkg = JSON.parse(fs.readFileSync(path.join(oldFolder, "package.json"), "utf8"));
	pkg.name += "-production";
	pkg.preferGlobal = false;
	fs.writeFileSync(path.join(newFolder, "package.json"), JSON.stringify(pkg, null, 2));

	// console.log("The 'bin' and 'editions' folders are not required " +
	// 	"for TiddlyWiki to work correctly as a module. They are both included in a zip file.");
	// let rel = path.relative(path.relative(__dirname, process.argv[2]), newFolder);
	// let cmd = `(cd ${process.argv[2]} && zip -r ${rel}/editions.zip editions bin)`;
	// console.log("\nRunning %s", cmd);
	// let res = cp.spawnSync(cmd, { shell: true });
	// let output = Buffer.concat(res.output.filter(e => e)).toString("utf8");
	// let outputArr = output.split("\n").map(e => e.trimLeft().startsWith("adding") ? true : e);
	// let count = outputArr.filter(e => e === true).length;
	// let other = outputArr.filter(e => e !== true).join('\n');
	// console.log("Zip finished with status %s and signal %s", res.status, res.signal);
	// console.log(res.stderr.toString("utf8"));
	// console.log("Added %s files, and printed the following lines as well", count);
	// console.log(other);

}
