const Observable = require('rxjs').Observable;
const fs = require('fs');
const path = require('path');

function obs_stat(tag) {
    return Observable.bindCallback(fs.stat, (err, stat) => [err, stat, tag])
}

function obs_readdir(tag) {
    return Observable.bindCallback(fs.readdir, (err, files) => [err, files, tag]);
}

function obs_readFile(tag) {
    return Observable.bindCallback(fs.readFile, (err, data) => [err, data, tag]);
}
function obs_mkdir(tag) {
    return Observable.bindCallback(fs.mkdir, (err, data) => [err, data, tag]);
}



// const TWSource = 'TiddlyWiki5-54b1e284fa323968b6d8e49ad5c2344627d8ce3b';
const TWSource = './Source/TiddlyWiki5-5.1.17';
var $tw = require(TWSource).TiddlyWiki();
const oldFolder = path.join(__dirname, TWSource);
const newFolder = path.join(__dirname, TWSource + "-test");
if (fs.existsSync(newFolder))
    fs.rmdirSync(newFolder);
fs.mkdirSync(newFolder);
$tw.boot.argv = [TWSource + '/editions/empty'];

const execute = $tw.boot.executeNextStartupTask;
$tw.boot.executeNextStartupTask = function () {
    if (!execute()) complete();
    return true;
}
$tw.boot.boot();
function complete() {
    require('./boot-node-async').bootNode($tw);
    Observable.from(['plugins', 'themes']).concatMap(folder => {
        const fullpath = path.join(__dirname, TWSource, folder);
        return obs_readdir(fullpath)(fullpath);
    }).concatMap(([err, files, folder]) => {
        //read the author folders
        return Observable.from(files).map(author => path.join(folder, author))
    }).startWith(path.join(__dirname, TWSource, 'languages')).concatMap(fullpath => {
        return obs_readdir(fullpath)(fullpath);
    }).concatMap(([err, files, folder]) => {
        return Observable.from(files).map(plugin => path.join(folder, plugin))
    }).startWith(path.join(__dirname, TWSource, 'core')).concatMap(fullpath => {
        return $tw.loadPluginFolder(fullpath).map(a => [a, fullpath]);
    }).subscribe(([plugin, oldpath]) => {
        const relPath = path.normalize(path.relative(oldFolder, oldpath));
        console.log(relPath);
        const newPath = path.join(newFolder, relPath);
        console.log(newPath);
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
    }, x => console.error(x), () => {
        fs.mkdirSync(path.join(newFolder, 'boot'));
        fs.mkdirSync(path.join(newFolder, 'licenses'));

        const files = fs.readdirSync(path.join(oldFolder, 'boot')).map(e => 'boot/' + e)
            .concat(fs.readdirSync(path.join(oldFolder, 'licenses')).map(e => 'licenses/' + e))
            .concat(['tiddlywiki.js', 'package.json', 'license']);

        Observable.from(files).concatMap(e => {
            return new Observable(sub => {
                const oldFile = fs.createReadStream(path.join(oldFolder, e));
                const newFile = fs.createWriteStream(path.join(newFolder, e));
                oldFile.pipe(newFile);
                oldFile.on('close', () => {
                    sub.complete();
                });
            });
        }).subscribe();

        console.log("The 'bin' and 'editions' folders are not included because they are not required " +
            "for TiddlyWiki to work correctly as a module. However, both may be added and the bundle should " +
            "then work as expected.");
    })
}

