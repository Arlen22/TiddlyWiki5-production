The source project for this is https://tiddlywiki.com/. All the documentation is there. This repository is for the benefit of developers who may want to include this package as a dependancy in other packages. It should be installed locally and the exact version required SHOULD be specified in the dependancy list as the internal TiddlyWiki API is still brittle and may change at any time. 

The main point of this package is that all the plugins (and the core) are compiled into one file, which significantly shortens startup time. This is important for servers which include TiddlyWiki in order to host data folders. The package files may also be loaded via jsdelivr.com.

`https://cdn.jsdelivr.net/npm/tiddlywiki-compiled@version/file`