# TiddlyWiki-production-(server|client)

TiddlyWiki5: https://github.com/Jermolene/TiddlyWiki5

This idea has three parts. 

  - https://github.com/Arlen22/TiddlyWiki5-production 
    - The repo with the build script. It uses the tiddlywiki5 repo to load the plugins into the system and then saves the plugin definition as a JSON file, using a very simple feature of the Tiddlywiki plugin loader mechanism. The core, as well as themes and languages, are also considered plugins in this regard. 
  - `tiddlywiki-production-server` - one file per plugin
    - This npm package replaces the `tiddlywiki` package as a dependancy, but cannot be used to properly run most `tiddlywiki` commands from the command line. The contents of each plugin, including core, is replaced by a plugin.info file containing all the files in that plugin. The only requirement is that the plugin does not attempt to access its plugin folder on the file system, since none of the files are there anymore except for the plugin.info file. Any plugin intended for the browser is compatible with this method. 
    - This cuts down on file count and increases startup speed drastically.
  - `tiddlywiki-production-client` - slim html wikis
    - This npm package contains `plugin.info.js` files which add the plugin JSON tiddler to the `$tw.preloadTiddlers` array in the browser. It can be used in single-file wikis or in the index template of node wikis. It must either be between bootprefix.js and boot.js or the `$tw.preloadTiddlers` array must be initialized first. The SHA hash can be used by the browser to verify the contents of the file.
    - Mostly useful for caching these specific files on public websites so visitors can share the cache between sites for improved load times. 

# jsdelivr CDN delivery (secure)

https://github.com/Arlen22/TiddlyWiki5-production

- `compile-tiddlywiki-production.sh` is my compile script. As you can see by the last line, it does everything from start to finish. 
- This project has been switched to using NPM. I also needed to separate the server and client files because the client `plugin.info.js` file was being imported as a shadow tiddler. 
  - `tiddlywiki-production-server` - Installed as a dependancy or globally and functions identical to `tiddlywiki`. 
  - `tiddlywiki-production-client` - Contains the `plugin.info.js` files explained below.

The way this works is really simple. It's powered by jsdelivr.net. Using NPM version numbers we can distribute the file hashes for each file and guarentee with certainty that the file will never change. 

https://cdn.jsdelivr.net/npm/tiddlywiki-production-client@5.2.1/core/plugin.info.js

> Don't use the jsDelivr minified files as it will change the integrity hash. The files are always served using gzip encoding if the browser supports it and this decreases the file size much more than minification could anyway. So don't use minification, just depend on jsDelivr serving the files using gzip. 

The integrity check for the `plugin.info.js` files in each bundle can be found in the hashes.json file:

https://cdn.jsdelivr.net/npm/tiddlywiki-production-client@5.2.1/hashes.json

To use the bundle scripts you insert the following HTML betweeen the `boot-prefix.js` script tag and the `boot.js` script tag at the end of the TiddlyWiki file. You should be able to find the correct place by searching for the string `<!--~~ Boot kernel ~~-->`.

```html
<script src="https://cdn.jsdelivr.net/npm/tiddlywiki-production-client@5.2.1/core/plugin.info.js" 
        integrity="sha384-tA04zmF/lP/6LQ6I1dSGuOt4CdFESQFtg5wCItMUAAswjp06fWqPpjXXJEog3vqG"
        crossorigin></script>
```

The src attribute is the full url of the file you want to load externally and the integrity attribute is the corrosponding hash from the corresponding hash file (in this case `/tiddlywiki-production-client@5.2.1/hashes.json`). The plugin.info.js file is literally just `$tw.preloadTiddler(/* plugin tiddler */);` The crossorigin tag is good to include as shown. It basically tells the browser that it's a CDN resource. 

You can use the following wikitext to download a copy of your wiki minus the plugins you want to pull from the CDN (in this example, only `$:/core`). Be sure to include the minus sign in front of each tiddler you want to exclude. This assumes `$:/config/SaveWikiButton/Template` is set to `$:/core/save/all`. 

```plain
{{$:/config/SaveWikiButton/Template}}
<$set name="publishFilter" value="-[[$:/core]]">
{{$:/core/ui/Buttons/save-wiki}}
</$set>
```

The plugin.info.js file adds the plugin tiddler to the `$tw.preloadTiddlers` array which is created by `bootprefix.js`. 

## Serving fallback resources

### This is rather technical

In the case of TiddlyServer or other solutions which run on your computer, it may be preferrable to have a fallback in case you are not connected to the internet. This is especially the case if you have a copy of your files stored on a webserver and another copy on your computer which are kept in sync using Dropbox or some other file sharing tool. 

The best way to do this is probably to add a plugin to the plugins directory in each TiddlyWiki installation which would modify the required templates accordingly, but you could also include a data folder containing the templates outside of the synchronised folder structure, but at the same relative path containing the modified plugins. 

But if you don't want to use a plugin or a relative data folder, you could use this code which first tries to load the CDN, then loads a local copy (in this case from TiddlyServer's tiddlywiki installation, which requires TiddlyServer). Place this code inside a script tag at the same place as before, then call the load function as shown at the bottom of the script. 

This code would be inserted into one of several tiddlers in `$:/core/templates/`. 

```js
  //because this uses the server version number, it will always be identical to the fallback
  const VERSION = "`{{$:/core/templates/version}}`";
  $tw.boot.suppressBoot = true;
  let total = 0;
  let finished = 0;
  function load(version, path, integrity, fallback){
    total++;
    let cdn = "https://cdn.jsdelivr.net/npm/tiddlywiki-production-client@" + version + "/" + path + "/plugin.info.js";
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
