# TiddlyWiki5-production

The way this works is really simple. It's powered by jsdelivr.net. Using GitHub tags we can distribute the file hashes for each file and guarentee with certainty that the file will never change. Use the tag identifier after the @ symbol to lock onto a specific file. Each time we publish a new bundle we also add a new tag for it.

https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-production@tag1/5-1-21/core/plugin.info.js

Don't use the jsDelivr .min.js file because then you cannot use the HTML integrity check in your files because dynamically generated minified versions can potentially change in their formatting, depending on which minifier is used, which would change the integrity check. 

The files are always served using gzip encoding if the browser supports it and this decreases the file size much more than minification could anyway. So don't use minification, just depend on jsDelivr serving the files using gzip. 

The integrity check for the `plugin.info.js` files in each bundle can be found in the hashes.json file:

https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-production@tag1/5-1-21/hashes.json

To use the bundle scripts you insert the following HTML betweeen the `boot-prefix.js` script tag and the `boot.js` script tag at the end of the TiddlyWiki file. You should be able to find the correct place by searching for the string `<!--~~ Boot kernel ~~-->`.

```html
<script src="https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-production@tag1/5-1-21/core/plugin.info.js" 
        integrity="sha384-MdnVYpi2jlSv/mUd78TasT0daGWtBxxBKC3BIi21dC59nAoPHVK86ujlM6BhyOrt"
        crossorigin></script>
```

The src attribute is the full url of the file you want to load externally and the integrity attribute is the corrosponding hash from the corresponding hash file (in this case `/5-1-21/hashes.json` from tag "bundle-1"). The plugin.info.js file is literally just `$tw.preloadTiddler(/* plugin tiddler */);` The crossorigin tag is good to include as shown. It basically tells the browser that it's a CDN resource. 

The latest tag can be found at https://github.com/Arlen22/TiddlyWiki5-production/releases/latest

You can use the following wikitext to download a copy of your wiki minus the plugins you want to pull from the CDN (in this example, only `$:/core`). Be sure to include the minus sign in front of each tiddler you want to exclude. This assumes `$:/config/SaveWikiButton/Template` is set to `$:/core/save/all`. 

```plain
{{$:/config/SaveWikiButton/Template}}
<$set name="publishFilter" value="-[[$:/core]]">
{{$:/core/ui/Buttons/save-wiki}}
</$set>
```

In order to get the most performance from everyone using the same files, this list will specify which tag should be used for which version. Everyone who uses a particular file will share the benefit of caching that file, so it's better to only use one tag for each version. Tags never mutate, and neither do TiddlyWiki versions, so there is never a need to use a newer tag for an older version. 

- 5.1.14 - 5.1.21 (inclusive), use `tag1`
  - https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-production@tag1/5-1-21/hashes.json
  
## Serving fallback resources

### This is rather technical

In the case of TiddlyServer or other solutions which run on your computer, it may be preferrable to have a fallback in case you are not connected to the internet. This is especially the case if you have a copy of your files stored on a webserver and another copy on your computer which are kept in sync using Dropbox or some other file sharing tool. 

The best way to do this is probably to add a plugin to the plugins directory in each TiddlyWiki installation (e.g. `TiddlyServer/tiddlywiki/plugins`) which would modify the required templates accordingly, but you could also include a data folder containing the templates outside of the synchronised folder structure, but at the same relative path containing the modified plugins. 

But if you don't want to use a plugin or a relative data folder, you could use this code which first tries to load the CDN, then loads a local copy (in this case from TiddlyServer's tiddlywiki installation, which requires TiddlyServer 2.1.5). Place this code inside a script tag at the same place as before, then call the load function as shown at the bottom of the script. 

```js
  //because this uses the server version number, it will always be identical to the fallback
  const VERSION = "`{{$:/core/templates/version}}`".replace(/\./gi, '-');
  $tw.boot.suppressBoot = true;
  let total = 0;
  let finished = 0;
  const versiontags = {
    "5-1-14": "tag1",
    "5-1-15": "tag1",
    "5-1-16": "tag1",
    "5-1-17": "tag1",
    "5-1-18": "tag1",
    "5-1-19": "tag1",
    "5-1-20": "tag1",
    "5-1-21": "tag1",
  }
  function load(version, path, integrity, fallback){
    total++;
    let cdn = "https://cdn.jsdelivr.net/gh/arlen22/tiddlywiki5-production@" + versiontags[version] || "method1" + "/" + version + "/" + path + "/plugin.info.js";
    let local = "/assets/tiddlywiki/"+path+"/plugin.info.js";
    let script = document.createElement("script");
    script.src = !fallback ? cdn : local;
    script.integrity = integrity;
    script.crossOrigin = "anonymous";
    script.defer = false;
    script.async = false;
    script.onerror = (err) => {
      total--;
      if(!fallback) load(version, path, integrity, true);
    };
    script.onload = () => { 
      finished++;
      if(finished === total) $tw.boot.boot();
    };
    document.body.appendChild(script);
  }
  load(VERSION, "core", "sha384-MdnVYpi2jlSv/mUd78TasT0daGWtBxxBKC3BIi21dC59nAoPHVK86ujlM6BhyOrt", false);
```
 
Honestly, now that I've written this out, I'm probably going to use a relative data folder to do this. I use Dropbox to sync some of my files, and since Dropbox keeps the same directory structure on every device, I can just put my installation specific data folder beside my Dropbox folder and use a relative link `"includeWikis": [{ "path": "../../somewhere/cdntemplate", "read-only": true }]`. If I still want to use a plugin I can just use a datafolder plugin in the cdntemplate folder.
