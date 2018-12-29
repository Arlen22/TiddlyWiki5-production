import { files, Dropbox, Error } from 'dropbox';
import { Observable, of, from, empty, merge, zip, concat, throwError, OperatorFunction } from 'rxjs';
import { map, reduce, catchError, tap } from 'rxjs/operators';
import * as path from 'path';
import { Buffer } from "buffer";
import { exists } from 'fs';
export function dumpToArray<T>(): OperatorFunction<T, T[]> {
	return (source: Observable<T>) => source.pipe(reduce<T, T[]>((n, e) => n.concat(e), [] as T[]));
}
export type GetMetadataResult = (files.FileMetadataReference | files.FolderMetadataReference | files.DeletedMetadataReference);
export function dbx_filesListFolder(client: Dropbox, arg: files.ListFolderArg) {
	return new Observable<GetMetadataResult>((subs) => {
		function errHandler(err: Error<files.ListFolderError>) {
			subs.error(err);
		}
		function resHandler(res: files.ListFolderResult): any {
			res.entries.forEach(e => {
				subs.next(e);
			})
			if (res.has_more) {
				return client.filesListFolderContinue({
					cursor: res.cursor
				}).then(resHandler, errHandler);
			} else {
				subs.complete();
			}
		}
		client.filesListFolder(arg).then(resHandler, errHandler);
	})

}

export class Stats {
	constructor(private meta: GetMetadataResult) {

	}
	isFile() { return Stats.isFileMetadata(this.meta); };
	isDirectory() { return Stats.isFolderMetadata(this.meta) };
	isBlockDevice() { return false; }
	isCharacterDevice() { return false; }
	isSymbolicLink() { return false; }
	isFIFO() { return false; }
	isSocket() { return false; }
	get dev() { throw "not implemented" };
	get ino() { throw "not implemented" };
	get mode() { throw "not implemented" };
	get nlink() { throw "not implemented" };
	get uid() { throw "not implemented" };
	get gid() { throw "not implemented" };
	get rdev() { throw "not implemented" };
	get size() { return Stats.isFileMetadata(this.meta) ? this.meta.size : 0 };
	get blksize() { throw "not implemented" };
	get blocks() { throw "not implemented" };
	get atime() { return Stats.isFileMetadata(this.meta) ? new Date(this.meta.server_modified) : new Date(0) }
	get mtime() { return Stats.isFileMetadata(this.meta) ? new Date(this.meta.server_modified) : new Date(0) }
	get ctime() { return Stats.isFileMetadata(this.meta) ? new Date(this.meta.server_modified) : new Date(0) }
	get birthtime() { return Stats.isFileMetadata(this.meta) ? new Date(this.meta.server_modified) : new Date(0) }
	static isFileMetadata(a: GetMetadataResult): a is files.FileMetadataReference {
		return a[".tag"] === "file";
	}
	static isFolderMetadata(a: GetMetadataResult): a is files.FolderMetadataReference {
		return a[".tag"] === "folder";
	}
	static map(a: GetMetadataResult): Stats {
		return new Stats(a);
	}
}


// export type obs_stat_result<T> = [Error<files.GetMetadataError>, undefined, T, string] | [undefined, Stats, T, string]
export const obs_stat = (cont: Container, skipCache?: boolean) =>
	<T = undefined>(tag: T = undefined as any) =>
		(filepath: string) =>
			from(cont.cloud.filesGetMetadata({ path: filepath }, skipCache || false))
				.pipe(map(Stats.map))
				.pipe(
					map((stat) => [undefined, stat, tag, filepath]),
					catchError((err, obs) => {
						// console.error('stat error %s', filepath, err);
						return of([err, undefined, tag, filepath]);
					})
				);

export type obs_exists_result<T> = [boolean, T, string]
export const obs_exists = (cont: Container, skipCache?: boolean) =>
	<T = undefined>(tag: T = undefined as any) =>
		(filepath: string) =>
			obs_stat(cont, skipCache)(tag)(filepath).pipe(map((ret) =>
				[!ret[0] && !!ret[1], ret[2], ret[3]] as obs_exists_result<T>
			));

export type obs_readdir_result<T> = [Error<files.ListFolderError> | undefined, Array<string>, T, string];
export const obs_readdir = (cont: Container) =>
	<T>(tag: T = undefined as any) =>
		(filepath: string) =>
			cont.cloud.filesListFolder({ path: filepath })
				.pipe(
					map(files => [
						undefined,
						files.map(e => path.basename(e.path_lower as string)),
						tag, filepath
					] as obs_readdir_result<T>),
					catchError((err: Error<files.ListFolderError>, obs) => {
						// console.error('readdir error %s', filepath, err);
						return of([err, undefined, tag, filepath] as never);
					})
				);


export type obs_readFile_result_inner<T, U> = [Error<files.DownloadError>, undefined, T, string] | [undefined, U, T, string];

// declare function obs_readFile_inner<T>(filepath: string): Observable<obs_readFile_result_inner<T, Buffer>>;
// declare function obs_readFile_inner<T>(filepath: string, encoding: string): Observable<obs_readFile_result_inner<T, string>>;

export const obs_readFile = (cont: Container) => <T>(tag: T = undefined as any) => {
	function obs_readFile_inner(filepath: string): Observable<obs_readFile_result_inner<T, Buffer>>;
	function obs_readFile_inner(filepath: string, encoding: string): Observable<obs_readFile_result_inner<T, string>>;
	function obs_readFile_inner(filepath: string, encoding?: string) {
		return new Observable(subs => {
			const cb = (err: Error<files.DownloadError> | undefined, data?: Buffer | string) => {
				subs.next([err, data, tag, filepath]);
				subs.complete();
			};
			// if (encoding) throw "encoding not supported";
			type R = files.FileMetadata & { fileBlob: Blob };
			cont.cloud.filesDownload({ path: filepath }).then((data) => {
				return fetch(URL.createObjectURL((data as R).fileBlob))
			}).then(res =>
				res.arrayBuffer()
			).then(buff => {
				var newbuff = Buffer.from(buff);
				cb(undefined, encoding ? newbuff.toString(encoding) : newbuff);
			}).catch(err => {
				console.error('readFile error %s', filepath, err);
				cb(err);
			})
		})
	}
	return obs_readFile_inner;
};



export class CloudObject {
	constructor(public client: Dropbox) {

	}
	requestStartCount: number = 0;
	requestFinishCount: number = 0;
	resetCount() {
		this.requestStartCount = 0;
		this.requestFinishCount = 0;
	}
	cache: { [K: string]: GetMetadataResult } = {};
	listedFolders: { [K: string]: GetMetadataResult[] } = {};
	filesGetMetadata(arg: files.GetMetadataArg, skipCache: boolean) {
		if (!arg.path) throw new Error("empty path");
		this.requestStartCount++;
		let folder = path.dirname(arg.path);
		if (skipCache || (!this.listedFolders[folder] && !this.cache[arg.path])) {
			return this.client.filesGetMetadata(arg).then(res => {
				this.cache[arg.path] = res;
				this.requestFinishCount++;
				return res;
			}, (err) => {
				this.requestFinishCount++;
				throw err;
			})
		} else {
			this.requestStartCount--;
			if (this.listedFolders[folder]) {
				let index = this.listedFolders[folder].findIndex((e) =>
					path.join(folder, path.basename(e.path_lower as string)) === arg.path
				);
				if (index === -1) return Promise.reject("path_not_found");
				else return Promise.resolve(this.listedFolders[folder][index]);
			} else if (this.cache[arg.path]) {
				return Promise.resolve(this.cache[arg.path]);
			} else {
				return Promise.reject("path_not_found");
			}
		}
	}
	filesListFolder(arg: files.ListFolderArg) {
		if (!arg.path) throw new Error("empty path");
		this.requestStartCount++;
		return dbx_filesListFolder(this.client, arg).pipe(tap((item) => {
			this.cache[path.join(arg.path, path.basename(item.path_lower as string))] = item;
		}), dumpToArray(), tap((res) => {
			this.listedFolders[arg.path] = res;
			this.requestFinishCount++;
		}), catchError((err, obs) => {
			this.requestFinishCount++;
			return throwError(err);
		}));
	}
	filesDownload(arg: files.DownloadArg) {
		if (!arg.path) throw new Error("empty path");
		this.requestStartCount++;
		return this.client.filesDownload(arg).then(res => {
			this.requestFinishCount++;
			this.cache[res.path_lower as string] = res as any;
			return res;
		}, (err) => {
			this.requestFinishCount++;
			throw err;
		})
	}
	static readonly tiddlyWebPlugin = {
		"title": "$:/plugins/tiddlywiki/tiddlyweb",
		"description": "TiddlyWeb and TiddlySpace components",
		"author": "JeremyRuston",
		"core-version": ">=5.0.0",
		"list": "readme",
		"version": "5.1.18-prerelease",
		"plugin-type": "plugin",
		"dependents": "",
		"type": "application/json",
		"text": '{ "tiddlers": {} }'
	};
	getNamedPlugin(name: string, type: string): Promise<{} | false> {
		//if the tiddlyweb adapter is specified, return our own version of it
		if (type === "plugin" && name === "tiddlywiki/tiddlyweb")
			return Promise.resolve(CloudObject.tiddlyWebPlugin);
		//otherwise fetch it from where it is stored
		return fetch("twits-5-1-17/" + type + "/" + name + "/plugin.txt")
			.then(res => {
				if (res.status > 399) return false;
				else return res.text().then(data => {
					const split = data.indexOf('\n');
					const meta = JSON.parse(data.slice(0, split)),
						text = data.slice(split + 2);
					meta.text = text;
					return meta;
				})
			})
	}
}
export class Container {
	cloud: CloudObject
	constructor([client]: [Dropbox]) {
		this.cloud = new CloudObject(client);
	}
}
