$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/savetrail","description":"Auto-download modified tiddlers","author":"JeremyRuston","core-version":">=5.0.0","list":"readme settings","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/config/SaveTrailPlugin/enable-drafts":{"title":"$:/config/SaveTrailPlugin/enable-drafts","text":"no"},"$:/config/SaveTrailPlugin/enable":{"title":"$:/config/SaveTrailPlugin/enable","text":"yes"},"$:/config/SaveTrailPlugin/sync-drafts-filter":{"title":"$:/config/SaveTrailPlugin/sync-drafts-filter","text":"[is[tiddler]has[draft.of]]"},"$:/plugins/tiddlywiki/savetrail/readme":{"title":"$:/plugins/tiddlywiki/savetrail/readme","text":"This plugin causes TiddlyWiki to continuously download (as a JSON file) the contents of any tiddler that is manually changed by any of several means:\n\n* Confirming an edit\n* Deleting tiddlers\n* Imports\n* Renames/relinks\n* Optionally, typing in draft tiddlers can trigger a download\n\nWhere appropriate, separate 'before' and 'after' files are downloaded. Configured correctly, the browser will download the files silently in the background, and they can be used as a backup in case of accidental data loss.\n\n''CAUTION'': Using this plugin will generate a //lot// of files in your downloads folder! Some points to watch:\n\n* This plugin is pretty much unusable unless your browser is set up to download files automatically, without prompting for the location\n* Automatic file downloading doesn't work in all browsers - in particular, Safari and Internet Explorer do not currently support the [[necessary HTML5 feature|http://caniuse.com/download]]\n* Be aware of the privacy implications of leaving a plaintext trail of all of your edits. You should only enable this plugin on computers that your trust and with content that is not sensitive\n* The plugin uses the tiddler title plus a timestamp to generate a filename for the downloaded file, but some browsers ignore the specified title and generate their own title for each downloaded file\n\nOther points to note:\n\n* By default, after a draft tiddler has been modified the plugin waits until at least one second has elapsed since the last typing before it attempts to download the tiddler. This reduces the number of times that rapidly changing tiddlers are saved\n* This plugin can be used with both the single file HTML configuration and under Node.js because it is independent of the usual saving and syncing processes\n"},"$:/plugins/tiddlywiki/savetrail/savetrail.js":{"title":"$:/plugins/tiddlywiki/savetrail/savetrail.js","text":"/*\\\ntitle: $:/plugins/tiddlywiki/savetrail/savetrail.js\ntype: application/javascript\nmodule-type: startup\n\nA startup module to download every changed tiddler as a JSON file\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\n// Export name and synchronous status\nexports.name = \"savetrail\";\nexports.platforms = [\"browser\"];\nexports.after = [\"startup\"];\nexports.synchronous = true;\n\n// Favicon tiddler\nvar ENABLE_TIDDLER_TITLE = \"$:/config/SaveTrailPlugin/enable\",\n\tENABLE_DRAFTS_TIDDLER_TITLE = \"$:/config/SaveTrailPlugin/enable-drafts\",\n\tSYNC_DRAFTS_FILTER_TIDDLER_TITLE = \"$:/config/SaveTrailPlugin/sync-drafts-filter\";\n\nexports.startup = function() {\n\t$tw.savetrail = $tw.savetrail || {};\n\t// Create a syncer to handle autosaving\n\t$tw.savetrail.syncadaptor = new SaveTrailSyncAdaptor();\n\t$tw.savetrail.syncer = new $tw.Syncer({\n\t\twiki: $tw.wiki,\n\t\tsyncadaptor: $tw.savetrail.syncadaptor,\n\t\ttitleSyncFilter: SYNC_DRAFTS_FILTER_TIDDLER_TITLE,\n\t\tlogging: false,\n\t\tdisableUI: true\n\t});\n\t// Add hooks for trapping user actions\n\t$tw.hooks.addHook(\"th-saving-tiddler\",function(tiddler) {\n\t\tif($tw.wiki.checkTiddlerText(ENABLE_TIDDLER_TITLE,\"yes\")) {\n\t\t\tvar oldTiddler = $tw.wiki.getTiddler(tiddler.fields.title);\n\t\t\tif(oldTiddler) {\n\t\t\t\tsaveTiddlerFile(oldTiddler,{reason: \"overwritten\"});\t\t\t\n\t\t\t}\n\t\t\tsaveTiddlerFile(tiddler,{reason: \"saved\"});\n\t\t}\n\t\treturn tiddler;\n\t});\n\t$tw.hooks.addHook(\"th-renaming-tiddler\",function(newTiddler,oldTiddler) {\n\t\tif($tw.wiki.checkTiddlerText(ENABLE_TIDDLER_TITLE,\"yes\")) {\n\t\t\tif(oldTiddler) {\n\t\t\t\tsaveTiddlerFile(oldTiddler,{reason: \"deleted\"});\t\t\t\n\t\t\t}\n\t\t\tsaveTiddlerFile(newTiddler,{reason: \"renamed\"});\n\t\t}\n\t\treturn newTiddler;\n\t});\n\t$tw.hooks.addHook(\"th-relinking-tiddler\",function(newTiddler,oldTiddler) {\n\t\tif($tw.wiki.checkTiddlerText(ENABLE_TIDDLER_TITLE,\"yes\")) {\n\t\t\tif(oldTiddler) {\n\t\t\t\tsaveTiddlerFile(oldTiddler,{reason: \"overwritten\"});\t\t\t\n\t\t\t}\n\t\t\tsaveTiddlerFile(newTiddler,{reason: \"relinked\"});\n\t\t}\n\t\treturn newTiddler;\n\t});\n\t$tw.hooks.addHook(\"th-importing-tiddler\",function(tiddler) {\n\t\tif($tw.wiki.checkTiddlerText(ENABLE_TIDDLER_TITLE,\"yes\")) {\n\t\t\tvar oldTiddler = $tw.wiki.getTiddler(tiddler.fields.title);\n\t\t\tif(oldTiddler) {\n\t\t\t\tsaveTiddlerFile(oldTiddler,{reason: \"overwritten\"});\t\t\t\n\t\t\t}\n\t\t\tsaveTiddlerFile(tiddler,{reason: \"imported\"});\n\t\t}\n\t\treturn tiddler;\n\t});\n\t$tw.hooks.addHook(\"th-deleting-tiddler\",function(tiddler) {\n\t\tif($tw.wiki.checkTiddlerText(ENABLE_TIDDLER_TITLE,\"yes\")) {\n\t\t\tsaveTiddlerFile(tiddler,{reason: \"deleted\"});\n\t\t}\n\t\treturn tiddler;\n\t});\n};\n\nfunction SaveTrailSyncAdaptor(options) {\n\tthis.logger = new $tw.utils.Logger(\"SaveTrail\");\n}\n\nSaveTrailSyncAdaptor.prototype.name = \"savetrail\";\n\nSaveTrailSyncAdaptor.prototype.isReady = function() {\n\t// The savetrail adaptor is always ready\n\treturn true;\n};\n\nSaveTrailSyncAdaptor.prototype.getTiddlerInfo = function(tiddler) {\n\treturn {};\n};\n\n/*\nSave a tiddler and invoke the callback with (err,adaptorInfo,revision)\n*/\nSaveTrailSyncAdaptor.prototype.saveTiddler = function(tiddler,callback) {\n\tif($tw.wiki.checkTiddlerText(ENABLE_TIDDLER_TITLE,\"yes\")) {\n\t\tvar isDraft = $tw.utils.hop(tiddler.fields,\"draft.of\");\n\t\tif(!isDraft || $tw.wiki.checkTiddlerText(ENABLE_DRAFTS_TIDDLER_TITLE,\"yes\")) {\n\t\t\tsaveTiddlerFile(tiddler,{reason: \"modified\"});\n\t\t}\n\t}\n\tcallback(null);\n};\n\n/*\nLoad a tiddler and invoke the callback with (err,tiddlerFields)\n*/\nSaveTrailSyncAdaptor.prototype.loadTiddler = function(title,callback) {\n\tcallback(null,null);\n};\n\n/*\nDelete a tiddler and invoke the callback with (err)\n*/\nSaveTrailSyncAdaptor.prototype.deleteTiddler = function(title,callback,options) {\n\tcallback(null);\n};\n\nfunction saveTiddlerFile(tiddler,options) {\n\toptions = options || {};\n\tvar reason = options.reason || \"changed\",\n\t\tillegalFilenameCharacters = /<|>|\\:|\\\"|\\/|\\\\|\\||\\?|\\*|\\^|\\s/g,\n\t\tfixedTitle = $tw.utils.transliterate(tiddler.fields.title).replace(illegalFilenameCharacters,\"_\"),\n\t\tformattedDate = $tw.utils.stringifyDate(new Date()),\n\t\tfilename =  fixedTitle + \".\" + formattedDate + \".\" + reason + \".json\",\n\t\tfields = new Object();\n\tfor(var field in tiddler.fields) {\n\t\tfields[field] = tiddler.getFieldString(field);\n\t}\n\tvar text = JSON.stringify([fields],null,$tw.config.preferences.jsonSpaces),\n\t\tlink = document.createElement(\"a\");\n\tlink.setAttribute(\"target\",\"_blank\");\n\tlink.setAttribute(\"rel\",\"noopener noreferrer\");\n\tif(Blob !== undefined) {\n\t\tvar blob = new Blob([text], {type: \"text/plain\"});\n\t\tlink.setAttribute(\"href\", URL.createObjectURL(blob));\n\t} else {\n\t\tlink.setAttribute(\"href\",\"data:text/plain,\" + encodeURIComponent(text));\n\t}\n\tlink.setAttribute(\"download\",filename);\n\tdocument.body.appendChild(link);\n\tlink.click();\n\tdocument.body.removeChild(link);\n}\n\n})();\n","type":"application/javascript","module-type":"startup"},"$:/plugins/tiddlywiki/savetrail/settings":{"title":"$:/plugins/tiddlywiki/savetrail/settings","text":"\n<$checkbox tiddler=\"$:/config/SaveTrailPlugin/enable\" field=\"text\" checked=\"yes\" unchecked=\"no\"> Enable automatic saving of modified tiddlers</$checkbox>\n\n<$checkbox tiddler=\"$:/config/SaveTrailPlugin/enable-drafts\" field=\"text\" checked=\"yes\" unchecked=\"no\"> Include automatic saving of draft tiddlers (warning: generates a lot of download files)</$checkbox>\n"}}});