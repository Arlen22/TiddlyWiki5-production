# TiddlyWiki-production

Note: You should use NPM instead of GitHub. This page has been updated accordingly.

I am using compile-plugins.sh as my compile script. As you can see by the last line, it does everything from start to finish. 

The way this works is really simple. It's powered by jsdelivr.net. Using NPM version numbers we can distribute the file hashes for each file and guarentee with certainty that the file will never change. 

https://cdn.jsdelivr.net/npm/tiddlywiki-production@5.1.22/core/plugin.info.js

Don't use the jsDelivr .min.js file because then you cannot use the HTML integrity check in your files because dynamically generated minified versions can potentially change in their formatting, depending on which minifier is used, which would change the integrity check. The files are always served using gzip encoding if the browser supports it and this decreases the file size much more than minification could anyway. So don't use minification, just depend on jsDelivr serving the files using gzip. 

The integrity check for the `plugin.info.js` files in each bundle can be found in the hashes.json file:

https://cdn.jsdelivr.net/npm/tiddlywiki-production@5.1.22/hashes.json

To use the bundle scripts you insert the following HTML betweeen the `boot-prefix.js` script tag and the `boot.js` script tag at the end of the TiddlyWiki file. You should be able to find the correct place by searching for the string `<!--~~ Boot kernel ~~-->`.

```html
<script src="https://cdn.jsdelivr.net/npm/tiddlywiki-production@5.1.22/core/plugin.info.js" 
        integrity="sha384-v2ATJoBoWYtacxqOP/48JGPSwGq4tlJPNOZ2EbtMN83UpOKIxF6E4nRTLQ2ckmcb"
        crossorigin></script>
```

The src attribute is the full url of the file you want to load externally and the integrity attribute is the corrosponding hash from the corresponding hash file (in this case `/tiddlywiki-production@5.1.22/hashes.json`). The plugin.info.js file is literally just `$tw.preloadTiddler(/* plugin tiddler */);` The crossorigin tag is good to include as shown. It basically tells the browser that it's a CDN resource. 


You can use the following wikitext to download a copy of your wiki minus the plugins you want to pull from the CDN (in this example, only `$:/core`). Be sure to include the minus sign in front of each tiddler you want to exclude. This assumes `$:/config/SaveWikiButton/Template` is set to `$:/core/save/all`. 

```plain
{{$:/config/SaveWikiButton/Template}}
<$set name="publishFilter" value="-[[$:/core]]">
{{$:/core/ui/Buttons/save-wiki}}
</$set>
```

## Serving fallback resources

### This is rather technical

In the case of TiddlyServer or other solutions which run on your computer, it may be preferrable to have a fallback in case you are not connected to the internet. This is especially the case if you have a copy of your files stored on a webserver and another copy on your computer which are kept in sync using Dropbox or some other file sharing tool. 

The best way to do this is probably to add a plugin to the plugins directory in each TiddlyWiki installation which would modify the required templates accordingly, but you could also include a data folder containing the templates outside of the synchronised folder structure, but at the same relative path containing the modified plugins. 

But if you don't want to use a plugin or a relative data folder, you could use this code which first tries to load the CDN, then loads a local copy (in this case from TiddlyServer's tiddlywiki installation, which requires TiddlyServer 2.1.5). Place this code inside a script tag at the same place as before, then call the load function as shown at the bottom of the script. 

This code would be inserted into one of several tiddlers in `$:/core/templates/`. 

```js
  //because this uses the server version number, it will always be identical to the fallback
  const VERSION = "`{{$:/core/templates/version}}`";
  $tw.boot.suppressBoot = true;
  let total = 0;
  let finished = 0;
  function load(version, path, integrity, fallback){
    total++;
    let cdn = "https://cdn.jsdelivr.net/npm/tiddlywiki-production@" + version + "/" + path + "/plugin.info.js";
    // this is the path tiddlyserver serves the target tiddlywiki from
    let local = "/assets/tiddlywiki/"+path+"/plugin.info.js";
    let script = document.createElement("script");
    script.src = !fallback ? cdn : local;
    script.integrity = integrity;
    script.crossOrigin = "anonymous";
    script.defer = false;
    script.async = false;
    script.onerror = (err) => {
      total--;
      // try again but use the fallback url this time
      if(!fallback) load(version, path, integrity, true);
    };
    script.onload = () => { 
      finished++;
      if(finished === total) $tw.boot.boot();
    };
    document.body.appendChild(script);
  }
  // you need to set the correct integrity hash for this version
  load(VERSION, "core", "sha384-v2ATJoBoWYtacxqOP/48JGPSwGq4tlJPNOZ2EbtMN83UpOKIxF6E4nRTLQ2ckmcb", false);
```
 
Honestly, now that I've written this out, I'm probably going to use a relative data folder to do this. I use Dropbox to sync some of my files, and since Dropbox keeps the same directory structure on every device, I can just put my installation specific data folder beside my Dropbox folder and use a relative link `"includeWikis": [{ "path": "../../besideDropbox/cdntemplate", "read-only": true }]`. If I still want to use a plugin I can put a plugin in the `cdntemplate/plugins` folder.
