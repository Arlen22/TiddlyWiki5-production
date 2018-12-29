import * as path from 'path';
import * as fs from 'fs';

import { Observable } from 'rxjs';

export type obs_stat_result<T> = [NodeJS.ErrnoException, fs.Stats, T, string]
export const obs_stat = (cont: Container) => <T = undefined>(tag: T = undefined as any) =>
	(filepath: string) => new Observable<obs_stat_result<T>>(subs => {
		fs.stat(filepath, (err, data) => {
			subs.next([err, data, tag, filepath]);
			subs.complete();
		})
	})

export type obs_exists_result<T> = [boolean, T, string]
export const obs_exists = (cont: Container) => <T = undefined>(tag: T = undefined as any) =>
	(filepath: string) => new Observable<obs_exists_result<T>>(subs => {
		fs.stat(filepath, (err, data) => {
			subs.next([!err, tag, filepath]);
			subs.complete();
		})
	})

export type obs_readdir_result<T> = [NodeJS.ErrnoException, string[], T, string]
export const obs_readdir = (cont: Container) => <T>(tag: T = undefined as any) =>
	(filepath: string) => new Observable<obs_readdir_result<T>>(subs => {
		fs.readdir(filepath, (err, data) => {
			subs.next([err, data, tag, filepath]);
			subs.complete();
		})
	})

// export type obs_readFile_result<T> = typeof obs_readFile_inner
export const obs_readFile = (cont: Container) => <T>(tag: T = undefined as any) => {
	function obs_readFile_inner(filepath: string): Observable<[NodeJS.ErrnoException, Buffer, T, string]>;
	function obs_readFile_inner(filepath: string, encoding: string): Observable<[NodeJS.ErrnoException, string, T, string]>;
	function obs_readFile_inner(filepath: string, encoding?: string) {
		return new Observable(subs => {
			const cb = (err, data) => {
				subs.next([err, data, tag, filepath]);
				subs.complete();
			}
			if (encoding)
				fs.readFile(filepath, encoding, cb);
			else
				fs.readFile(filepath, cb)
		});
	}
	return obs_readFile_inner;
}

export class Container {
	constructor(args: any[]) {

	}
}