# TiddlyWiki5-production

The way this works is really simple. It's powered by jsdelivr.net. Using GitHub tags we can distribute the file hashes for each file and guarentee with certainty that the file will never change. Use the tag identifier after the @ symbol to lock onto a specific file. Each time we publish a new bundle we also add a new tag for it.

https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-compiled@tag1/5-1-21/core/plugin.info.js

Don't use the jsDelivr .min.js file because then you cannot use the HTML integrity check in your files because dynamically generated minified versions can potentially change in their formatting, depending on which minifier is used, which would change the integrity check. 

The files are always served using gzip encoding if the browser supports it and this decreases the file size much more than minification could anyway. So don't use minification, just depend on jsDelivr serving the files using gzip. 

The integrity check for the `plugin.info.js` files in each bundle can be found in the hashes.json file:

https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-compiled@tag1/5-1-21/hashes.json

To use the bundle scripts you insert the following HTML betweeen the `boot-prefix.js` script tag and the `boot.js` script tag at the end of the TiddlyWiki file. You should be able to find the correct place by searching for the string `<!--~~ Boot kernel ~~-->`.

```html
<script src="https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-compiled@tag1/5-1-21/core/plugin.info.js" 
        integrity="sha384-MdnVYpi2jlSv/mUd78TasT0daGWtBxxBKC3BIi21dC59nAoPHVK86ujlM6BhyOrt"
        crossorigin></script>
```

The src attribute is the full url of the file you want to load externally and the integrity attribute is the corrosponding hash from the corresponding hash file (in this case `/5-1-21/hashes.json` from tag "bundle-1"). The plugin.info.js file is literally just `$tw.preloadTiddler(/* plugin tiddler */);` The crossorigin tag is good to include as shown. It basically tells the browser that it's a CDN resource. 

The latest tag can be found at https://github.com/Arlen22/TiddlyWiki5-compiled/releases/latest

You can use the following wikitext to download a copy of your wiki minus the plugins you want to pull from the CDN (in this example, only `$:/core`). Be sure to include the minus sign in front of each tiddler you want to exclude. This assumes `$:/config/SaveWikiButton/Template` is set to `$:/core/save/all`. 

```plain
{{$:/config/SaveWikiButton/Template}}
<$set name="publishFilter" value="-[[$:/core]]">
{{$:/core/ui/Buttons/save-wiki}}
</$set>
```

In order to get the most performance from everyone using the same files, this list will specify which tag should be used for which version. Of course, any tag may contain any particular version, but try to stick with this list since once a bundle is put up here it should never change, so there would be no need to use a newer tag for the same version. 

- 5.1.14 - 5.1.21 (inclusive), use `tag1`
  - https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-production@tag1/5-1-21/hashes.json
  
