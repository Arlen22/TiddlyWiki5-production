const fs = require('fs');
const path = require('path');

const version = '5-1-17';
const TWSource = 'Source/TiddlyWiki5-' + version.split('-').join('.');

const oldFolder = path.join(__dirname, TWSource);
const newFolder = path.join(__dirname, version);
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
	var test = ['plugins', 'themes'].map(folder => path.join(oldFolder, folder))
		.reduce((n, folder) => n.concat(fs.readdirSync(folder).map(sub => path.join(folder, sub))), [])
		.concat([path.join(oldFolder, 'languages')])
		.reduce((n, folder) => n.concat(fs.readdirSync(folder).map(sub => path.join(folder, sub))), [])
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
				plugin.tiddlers = JSON.parse(plugin.text).tiddlers;
				delete plugin.text;
				fs.writeFileSync(path.join(newPath, "plugin.info"), JSON.stringify(plugin));
			}
			else console.log(oldpath);

		});
	fs.mkdirSync(path.join(newFolder, 'boot'));
	fs.mkdirSync(path.join(newFolder, 'licenses'));

	const files = fs.readdirSync(path.join(oldFolder, 'boot')).map(e => 'boot/' + e)
		.concat(fs.readdirSync(path.join(oldFolder, 'licenses')).map(e => 'licenses/' + e))
		.concat(['tiddlywiki.js', 'package.json', 'license']);

	function processOtherFiles() {
		if(!files.length){
			console.log("The 'bin' and 'editions' folders are not included because they are not required " +
			"for TiddlyWiki to work correctly as a module. However, both may be added and the bundle should " +
			"then work as expected.");
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
