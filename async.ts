// import { files, Dropbox, Error } from 'dropbox';
import { Observable, of, asyncScheduler, from, empty, merge, zip, concat, throwError, OperatorFunction } from 'rxjs';
// import { dbx_filesListFolder, GetMetadataResult, dumpToArray, TiddlyWikiInfo } from '../src/common';
import {
	map, mergeMap, reduce, ignoreElements, concatMap, catchError,
	zipAll, tap, count, mapTo, startWith
} from 'rxjs/operators';
import * as path from 'path';
import { Buffer } from "buffer";

import { obs_exists, obs_readdir, obs_readFile, obs_stat, Container } from './async-filesystem';

type Hashmap<T = any> = { [K: string]: T }

declare var window: Window & { $tw: $TW, env: any };

// export const obs_readFile =

export interface $TW extends Container {
	loadMetadataForFile: typeof loadMetadataForFile;
	loadTiddlersFromFile: typeof loadTiddlersFromFile;
	loadTiddlersFromPath: typeof loadTiddlersFromPath;
	loadTiddlersFromSpecification: typeof loadTiddlersFromSpecification;
	loadPluginFolder: typeof loadPluginFolder;
	findLibraryItem: typeof findLibraryItem;
	loadPlugin: typeof loadPlugin;
	getLibraryItemSearchPaths: typeof getLibraryItemSearchPaths;
	loadPlugins: typeof loadPlugins;
	loadWikiTiddlers: typeof loadWikiTiddlers;
	loadTiddlersNode: typeof loadTiddlersNode;
	[K: string]: any;
}

declare const $tw: $TW;
function obs_tw_each<T>(obj: { [K: string]: T }): Observable<[T, string]>;
function obs_tw_each<T>(obj: T[]): Observable<[T, number]>;
function obs_tw_each(obj: any) {
	return new Observable(subs => {
		$tw.utils.each(obj, (item: any, index: any) => { subs.next([item, index]); });
		subs.complete();
	});
}

const isArray = Array.isArray;
// =======================================================

interface TiddlerFileInfo {
	tiddlers: any[],
	filepath?: string,
	type?: string,
	hasMetaFile?: boolean
}
interface TiddlyWikiInfo {
	plugins: string[];
	themes: string[];
	languages: string[];
	includeWiki: string[];
	build: any[];
}
function loadTiddlersFromFile(this: $TW, filepath: string, fields: any) {
	//get the type info for this extension
	var ext = path.extname(filepath),
		extensionInfo = $tw.utils.getFileExtensionInfo(ext),
		type = extensionInfo ? extensionInfo.type : null,
		typeInfo = type ? $tw.config.contentTypeInfo[type] : null;
	//read the file without checking if it exists
	return obs_readFile(this)()(filepath, typeInfo ? typeInfo.encoding : "utf8").pipe(
		//parse the tiddlers in the file
		map(data => $tw.wiki.deserializeTiddlers(ext, data, fields)),
		mergeMap(tiddlers =>
			//if there is exactly one tiddler and it isn't a json file, load the metadata
			((ext !== ".json" && tiddlers.length === 1) ? $tw.loadMetadataForFile(filepath) : of(false)).pipe(map(metadata => {
				//if there is metadata, add it to the tiddlers array
				if (metadata) tiddlers = [$tw.utils.extend({}, tiddlers[0], metadata)];
				//return the TiddlerFileInfo
				return { filepath, type, tiddlers, hasMetaFile: !!metadata } as TiddlerFileInfo
			}))
		)
	);
}

/**
 * Load the metadata fields in the .meta file corresponding to a particular file. 
 * Emits the parsed meta fields or emits false if the meta file does not exist.
 * Uses obs_exists to check if the file exists before reading it.
 * @param this 
 * @param filepath Path to check for a .meta file for. 
 */
function loadMetadataForFile(this: $TW, filepath: string) {
	//check if there is actually a meta file for this filepath
	return obs_exists(this)()(filepath + ".meta").pipe(
		// read the file if it exists
		mergeMap(([exists, tag, metafilename]) =>
			exists ? obs_readFile(this)()(metafilename, "utf8") : of(false)),
		//parse the file if there is anything to parse
		map(data => data && $tw.utils.parseFields(data))
	)
}


function loadTiddlersFromPath(this: $TW, filepath: string, excludeRegExp: RegExp = $tw.boot.excludeRegExp): Observable<TiddlerFileInfo> {
	//stat the filepath
	return obs_stat(this)()(filepath).pipe(mergeMap(([err, stat, tag]) => stat.isDirectory()
		//if we have a directory, read the files
		? obs_readdir(this)()(filepath).pipe(
			//check for a tiddlywiki.files file in the folder
			mergeMap(([err, files]) => (files.indexOf("tiddlywiki.files") !== -1)
				//if there is one, loadTiddlersFromSpecification
				? $tw.loadTiddlersFromSpecification(filepath, excludeRegExp)
				//otherwise, load all the files that don't match excludeRegExp (except plugin.info)
				: from(files.filter(file => !excludeRegExp.test(file) && file !== "plugin.info"))
					.pipe(mergeMap(file => $tw.loadTiddlersFromPath(filepath + path.sep + file, excludeRegExp)))
			))
		//if we have a file, load it
		: ((stat.isFile()) ? $tw.loadTiddlersFromFile(filepath, { title: filepath }) : empty())
	))
}
type ProcessMatrix = [any[], { [K: string]: { source: string, prefix: string, suffix: string } }];
type ProcessFileInput = { filename: string, isTiddlerFile: boolean, fields: any };
/**
 * This very crazy function should actually be the correct translation of processfile
 */

function loadTiddlersFromSpecification(this: $TW, filepath: string, excludeRegExp: RegExp): Observable<TiddlerFileInfo> {
	function ProcessFile(self: $TW, filepath: string) {
		function getFieldValue(tiddler: Hashmap<any>, name: string, fieldInfo: { source: string }, filename: string, pathname: string) {
			var value = tiddler[name];
			switch (fieldInfo.source) {
				case "filename":
					return of(path.basename(filename));
				case "filename-uri-decoded":
					return of(decodeURIComponent(path.basename(filename)));
				case "basename":
					return of(path.basename(filename, path.extname(filename)));
				case "basename-uri-decoded":
					return of(decodeURIComponent(path.basename(filename, path.extname(filename))));
				case "extname":
					return of(path.extname(filename));
				case "created":
					return obs_stat(self)()(pathname).pipe(map(([err, stat]) => new Date(stat.birthtime)));
				case "modified":
					return obs_stat(self)()(pathname).pipe(map(([err, stat]) => new Date(stat.mtime)));
				default:
					return of(value);
			}
		}

		return (source: Observable<ProcessFileInput>) => source.pipe(mergeMap(({ filename, isTiddlerFile, fields }) => {
			var extInfo = $tw.config.fileExtensionInfo[path.extname(filename)],
				type = (extInfo || {}).type || fields.type || "text/plain",
				typeInfo = $tw.config.contentTypeInfo[type] || {},
				pathname = path.resolve(filepath, filename);
			return zip(
				obs_readFile(self)()(pathname, typeInfo.encoding || "utf8"),
				$tw.loadMetadataForFile(pathname)
			).pipe(
				//if there is an error reading the file, then throw it
				tap(([[err]]) => { throw err }),
				//deserialize and combine the result
				map(([[err, text], metadata]) => [
					((isTiddlerFile)
						? $tw.wiki.deserializeTiddlers(path.extname(pathname), text, metadata)
						: [$tw.utils.extend({ text }, metadata || {})]),
					$tw.utils.extend({}, fields, metadata || {})
				] as ProcessMatrix),
				//process the product of the two variables
				mergeMap(([fileTiddlers, combinedFields]) => obs_tw_each(fileTiddlers).pipe(
					mergeMap(([tiddler]) => obs_tw_each(combinedFields).pipe(
						mergeMap(([fieldInfo, name]) =>
							(typeof fieldInfo === "string" || $tw.utils.isArray(fieldInfo))
								//if it is simple field info, forward it
								? of([fieldInfo as any, name])
								//otherwise expect a field definition object and process it
								: getFieldValue(tiddler, name, fieldInfo, filename, pathname)
									.pipe(map(value => [(fieldInfo.prefix || "") + value + (fieldInfo.suffix || ""), name]))),
						// assign the resulting value to the tiddler
						tap(([value, name]) => { tiddler[name] = value; })
					)),
					//count will only emit once the fileTiddlers have been processed
					count(),
					//once we're done, 
					mapTo({ tiddlers: fileTiddlers })
				))
			)
		}))
	}

	type DirSpec = (string | { path: string, filesRegExp?: string, isTiddlerFile: boolean, fields: any });

	return obs_readFile(this)()(filepath + path.sep + "tiddlywiki.files", "utf8").pipe(map(([err, data]): any => {
		if (err || !data) throw "Error reading tiddlywiki.files";
		return JSON.parse(data);
	}), mergeMap((filesInfo) => concat(
		//first load the specified tiddlers
		obs_tw_each(filesInfo.tiddlers as any[]).pipe(tap(([tidInfo]) => {
			if (tidInfo.prefix && tidInfo.suffix) {
				tidInfo.fields.text = { prefix: tidInfo.prefix, suffix: tidInfo.suffix };
			} else if (tidInfo.prefix) {
				tidInfo.fields.text = { prefix: tidInfo.prefix };
			} else if (tidInfo.suffix) {
				tidInfo.fields.text = { suffix: tidInfo.suffix };
			}
		}), ProcessFile(this, filepath), catchError((err, obs) => { console.log(err); console.log(obs); return empty(); })),
		//then load the specified directories
		obs_tw_each(filesInfo.directories as DirSpec[]).pipe(mergeMap(([dirSpec]) => {
			if (typeof dirSpec === "string") {
				//if the dirSpec is a string, we load the path
				return obs_stat(this)(dirSpec)(path.resolve(filepath, dirSpec))
					.pipe(mergeMap(([err, stat, dirSpec, pathname]) =>
						(!err && stat.isDirectory()) ? $tw.loadTiddlersFromPath(pathname, excludeRegExp) : empty()
					), catchError((err, obs) => { console.log(err); console.log(obs); return empty(); }))
			} else {
				//if it is an object there is more to the story
				const fileRegExp = new RegExp(dirSpec.filesRegExp || "^.*$"), metaRegExp = /^.*\.meta$/;
				const dirPath = path.resolve(filepath, dirSpec.path);
				const { isTiddlerFile, fields } = dirSpec;
				return obs_readdir(this)()(dirPath).pipe(
					//filter the list of files to only load the valid ones
					mergeMap(([err, files, tag, dirPath]) => from(files.filter(filename =>
						filename !== "tiddlywiki.files" && !metaRegExp.test(filename) && fileRegExp.test(filename)
					))),
					//map each file to the processFile input arguments
					map(filename => { return { filename: dirPath + path.sep + filename, isTiddlerFile, fields } }),
					//process the file to get the tiddlers from it
					ProcessFile(this, filepath), 
					catchError((err, obs) => { console.log(err); console.log(obs); return empty(); })
				)
			}
		}))
	)))
}

function loadPluginFolder(this: $TW, filepath_source: Observable<string>, excludeRegExp: RegExp = $tw.boot.excludeRegExp) {
	return filepath_source.pipe(
		//if no plugin is found, the source will emit an empty string
		mergeMap(filepath => !filepath ? empty() : zip(
			obs_stat(this)()(filepath),
			obs_stat(this)()(filepath + path.sep + "plugin.info"))
		),
		//check the stats and return empty if we aren't loading anything
		mergeMap(([[err1, stat1, tag1, filepath], [err2, stat2, tag2, infoPath]]) => {
			if (err1 || !stat1.isDirectory()) return empty();
			if (err2 || !stat2.isFile()) {
				console.log("Warning: missing plugin.info file in " + filepath);
				return empty();
			}
			return obs_readFile(this)(filepath)(infoPath, "utf8");
		}),
		//parse the plugin info and load the folder
		mergeMap(([err, plugindata, filepath]) => {
			//here we throw because this should not happen
			if (err || !plugindata) throw new Error("Error: missing plugin.info file in " + filepath)
			const pluginInfo = JSON.parse(plugindata);
			pluginInfo.tiddlers = pluginInfo.tiddlers || Object.create(null);
			return $tw.loadTiddlersFromPath(filepath, excludeRegExp).pipe(
				tap(pluginFile => {
					pluginFile.tiddlers.forEach(tiddler => {
						pluginInfo.tiddlers[tiddler.title] = tiddler;
					})
				}),
				//wait until all the tiddlers have been loaded
				count(),
				//finish processing the pluginInfo file
				map(() => {
					// Give the plugin the same version number as the core if it doesn't have one
					if (!("version" in pluginInfo)) {
						pluginInfo.version = $tw.packageInfo.version;
					}
					// Use "plugin" as the plugin-type if we don't have one
					if (!("plugin-type" in pluginInfo)) {
						pluginInfo["plugin-type"] = "plugin";
					}
					pluginInfo.dependents = pluginInfo.dependents || [];
					pluginInfo.type = "application/json";
					// Set plugin text
					pluginInfo.text = JSON.stringify({ tiddlers: pluginInfo.tiddlers }, null, 4);
					delete pluginInfo.tiddlers;
					// Deserialise array fields (currently required for the dependents field)
					for (var field in pluginInfo) {
						if ($tw.utils.isArray(pluginInfo[field])) {
							pluginInfo[field] = $tw.utils.stringifyList(pluginInfo[field]);
						}
					}
					return pluginInfo;
				})
			)
		})
	);
}

function findLibraryItem(this: $TW, name: string, paths: string[]) {
	return from(paths.map(e => path.resolve(e, "./" + name))).pipe(
		mergeMap(pluginPath => obs_stat(this)()(pluginPath)),
		reduce<any, string>((n, e) => {
			const [err, stat, tag, pluginPath] = e;
			if (!n && !err && stat.isDirectory())
				return pluginPath;
			else return "";
		})
	)
}

function loadPlugin(this: $TW, name: string, paths: string[], pluginType: string) {
	//first check if this is a core plugin
	return from(this.getNamedPlugin(name, pluginType)).pipe(
		//if so, use it, if not, find the plugin folder elsewhere and load it
		mergeMap(pluginInfo => pluginInfo ? of(pluginInfo) : $tw.loadPluginFolder($tw.findLibraryItem(name, paths))),
		//add the pluginInfo to the wiki
		tap(pluginInfo => $tw.wiki.addTiddler(pluginInfo)),
		//we ignoreElements since we added it to the wiki
		ignoreElements()
	);
}

function getLibraryItemSearchPaths(this: $TW, libraryPath: string, envVar: string) {
	var pluginPaths: string[] = [], env = window.env && window.env[envVar] as string;
	if (env) env.split(path.delimiter).map((item) => { if (item) pluginPaths.push(item); });
	return pluginPaths;
}

function loadPlugins(this: $TW, plugins: string[], libraryPath: string, envVar: string, type: string) {
	var pluginPaths = $tw.getLibraryItemSearchPaths(libraryPath, envVar);
	if (plugins) return from(plugins).pipe(mergeMap(plugin => $tw.loadPlugin(plugin, pluginPaths, type)));
	else return empty();
}

function loadWikiTiddlers(this: $TW, wikiPath: string, options: any = {}): Observable<TiddlyWikiInfo> {
	var parentPaths = options.parentPaths || [];

	return obs_readFile(this)()(path.resolve(wikiPath, $tw.config.wikiInfo), "utf8").pipe(
		map(([err, data, t, wikiInfoPath]) => {
			if (err || !data) throw "Error loading the " + $tw.config.wikiInfo + " file";
			else return JSON.parse(data);
		}),
		mergeMap(wikiInfo => {
			parentPaths = parentPaths.slice(0);
			parentPaths.push(wikiPath);
			const includeWikis = obs_tw_each(wikiInfo.includeWikis).pipe(
				// map(info => typeof info === "string" ? { path: info } : info),
				map(info => path.resolve(wikiPath, typeof info === "object" ? (info as any).path : info)),
				mergeMap((resolvedIncludedWikiPath) => {
					if (parentPaths.indexOf(resolvedIncludedWikiPath) === -1) {
						return $tw.loadWikiTiddlers(resolvedIncludedWikiPath, {
							parentPaths: parentPaths,
							readOnly: true
						}).pipe(tap((subWikiInfo: any) => {
							wikiInfo.build = $tw.utils.extend([], subWikiInfo.build, wikiInfo.build);
						}), ignoreElements())
					} else {
						$tw.utils.error("Cannot recursively include wiki " + resolvedIncludedWikiPath);
						return empty();
					}
				})
			)

			var resolvedWikiPath = path.resolve(wikiPath, $tw.config.wikiTiddlersSubDir);
			var loadWiki = $tw.loadTiddlersFromPath(resolvedWikiPath).pipe(tap((tiddlerFile) => {
				if (!options.readOnly && tiddlerFile.filepath) {
					$tw.utils.each(tiddlerFile.tiddlers, (tiddler: any) => {
						$tw.boot.files[tiddler.title] = {
							filepath: tiddlerFile.filepath,
							type: tiddlerFile.type,
							hasMetaFile: tiddlerFile.hasMetaFile
						};
					});
				}
				$tw.wiki.addTiddlers(tiddlerFile.tiddlers)
			}), count(), map(() => {
				// Save the original tiddler file locations if requested
				var config = wikiInfo.config || {};
				if (config["retain-original-tiddler-path"]) {
					var output: Hashmap = {}, relativePath;
					for (var title in $tw.boot.files) {
						relativePath = path.relative(resolvedWikiPath, $tw.boot.files[title].filepath);
						output[title] =
							path.sep === path.posix.sep ?
								relativePath :
								relativePath.split(path.sep).join(path.posix.sep);
					}
					$tw.wiki.addTiddler({ title: "$:/config/OriginalTiddlerPaths", type: "application/json", text: JSON.stringify(output) });
				}
				// Save the path to the tiddlers folder for the filesystemadaptor
				$tw.boot.wikiTiddlersPath = path.resolve($tw.boot.wikiPath, config["default-tiddler-location"] || $tw.config.wikiTiddlersSubDir);

			}), ignoreElements());

			// Load any plugins within the wiki folder
			var loadWikiPlugins = of(
				["plugins", path.resolve(wikiPath, $tw.config.wikiPluginsSubDir)],
				["themes", path.resolve(wikiPath, $tw.config.wikiThemesSubDir)],
				["languages", path.resolve(wikiPath, $tw.config.wikiLanguagesSubDir)]
			).pipe(
				mergeMap(([type, wpp]) => obs_exists(this)(type)(wpp)),
				mergeMap(([exists, type, wpp]) => exists ? obs_readdir(this)(type)(wpp) : empty()),
				mergeMap(([err, pluginFolders, pluginType, wikiPluginsPath]) => err ? empty() : from(pluginFolders).pipe(
					mergeMap(folder => $tw.loadPluginFolder(of(path.resolve(wikiPluginsPath, "./" + folder)))),
					tap(pluginFields => $tw.wiki.addTiddler(pluginFields)),
					ignoreElements()
				))
			);

			return concat(
				includeWikis,
				merge( // Load any plugins, themes and languages listed in the wiki info file
					$tw.loadPlugins(wikiInfo.plugins, $tw.config.pluginsPath, $tw.config.pluginsEnvVar, "plugin"),
					$tw.loadPlugins(wikiInfo.themes, $tw.config.themesPath, $tw.config.themesEnvVar, "theme"),
					$tw.loadPlugins(wikiInfo.languages, $tw.config.languagesPath, $tw.config.languagesEnvVar, "language")
				),
				loadWiki,
				loadWikiPlugins
			).pipe(count(), mapTo(wikiInfo));
		})
	)
}
function loadTiddlersNode(this: $TW) {
	// Load the boot tiddlers
	return merge(
		$tw.loadTiddlersFromPath($tw.boot.bootPath).pipe(tap(tiddlerFile =>
			$tw.wiki.addTiddlers(tiddlerFile.tiddlers)
		)),
		$tw.loadPluginFolder($tw.boot.corePath).pipe(tap(pluginInfo =>
			$tw.wiki.addTiddler(pluginInfo)
		)),
		$tw.loadWikiTiddlers($tw.boot.wikiPath).pipe(tap(wikiInfo =>
			$tw.boot.wikiInfo = wikiInfo
		))
	).pipe(ignoreElements())
}
// =======================================================

export function override($tw: $TW, ...args: any[]) {
	const container = new Container(args as any);
	$tw.findLibraryItem = findLibraryItem.bind(container);
	$tw.getLibraryItemSearchPaths = getLibraryItemSearchPaths.bind(container);
	$tw.loadMetadataForFile = loadMetadataForFile.bind(container);
	$tw.loadPlugin = loadPlugin.bind(container);
	$tw.loadPluginFolder = loadPluginFolder.bind(container);
	$tw.loadPlugins = loadPlugins.bind(container);
	$tw.loadTiddlersFromFile = loadTiddlersFromFile.bind(container);
	$tw.loadTiddlersFromPath = loadTiddlersFromPath.bind(container);
	$tw.loadTiddlersFromSpecification = loadTiddlersFromSpecification.bind(container);
	$tw.loadWikiTiddlers = loadWikiTiddlers.bind(container);
	$tw.loadTiddlersNode = loadTiddlersNode.bind(container);
	$tw.boot.excludeRegExp = $tw.boot.excludeRegExp || /^\.DS_Store$|^.*\.meta$|^\..*\.swp$|^\._.*$|^\.git$|^\.hg$|^\.lock-wscript$|^\.svn$|^\.wafpickle-.*$|^CVS$|^npm-debug\.log$/;
	return container;
}