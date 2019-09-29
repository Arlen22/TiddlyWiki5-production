# TiddlyWiki5-compiled

The way this works is really simple. It's powered by jsdelivr.net. Using GitHub tags we can distribute the file hashes for each file and guarentee with certainty that the file will never change. Use the tag identifier after the @ symbol to lock onto a specific file. Each time we publish a new bundle we also add a new tag for it. You can use any tag you want, so that if we ever update any bundles you will not be affected by the change unless you select the new tag. 

https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-compiled@bundle-1/5-1-21/core/plugin.info.js

Don't use the jsDelivr .min.js file because then you cannot use the HTML integrity check in your files because dynamically generated minified versions can potentially change in their formatting, depending on which minifier is used, which would change the integrity check. 

The files are always served using gzip encoding if the browser supports it and this decreases the file size much more than minification could anyway. So don't use minification, just depend on jsDelivr serving the files using gzip. 
