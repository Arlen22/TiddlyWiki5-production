$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/external-attachments","description":"External attachment support for TiddlyDesktop et al.","author":"Jeremy Ruston","core-version":">=5.0.0","list":"readme settings","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/config/ExternalAttachments/Enable":{"title":"$:/config/ExternalAttachments/Enable","text":"yes"},"$:/config/ExternalAttachments/UseAbsoluteForDescendents":{"title":"$:/config/ExternalAttachments/UseAbsoluteForDescendents","text":"no"},"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents":{"title":"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents","text":"no"},"$:/plugins/tiddlywiki/external-attachments/readme":{"title":"$:/plugins/tiddlywiki/external-attachments/readme","text":"! Introduction\n\nThis plugin provides support for importing tiddlers as external attachments. That means that instead of importing binary files as self-contained tiddlers, they are imported as \"skinny\" tiddlers that reference the original file via the ''_canonical_uri'' field. This reduces the size of the wiki and thus improves performance. However, it does mean that the wiki is no longer fully self-contained.\n\n! Compatibility\n\nThis plugin only works when using TiddlyWiki with platforms such as TiddlyDesktop that support the ''path'' attribute for imported/dragged files.\n\n"},"$:/plugins/tiddlywiki/external-attachments/settings":{"title":"$:/plugins/tiddlywiki/external-attachments/settings","text":"When used on platforms that provide the necessary support (such as ~TiddlyDesktop), you can optionally import binary files as external tiddlers that reference the original file via the ''_canonical_uri'' field.\n\nBy default, a relative path is used to reference the file. Optionally, you can specify that an absolute path is used instead. You can do this separately for \"descendent\" attachments -- files that are contained within the directory containing the wiki -- vs. \"non-descendent\" attachments.\n\n<$checkbox tiddler=\"$:/config/ExternalAttachments/Enable\" field=\"text\" checked=\"yes\" unchecked=\"no\" default=\"no\"> <$link to=\"$:/config/ExternalAttachments/Enable\">Enable importing binary files as external attachments</$link> </$checkbox>\n\n<$checkbox tiddler=\"$:/config/ExternalAttachments/UseAbsoluteForDescendents\" field=\"text\" checked=\"yes\" unchecked=\"no\" default=\"no\"> <$link to=\"$:/config/ExternalAttachments/UseAbsoluteForDescendents\">Use absolute paths for descendent attachments</$link> </$checkbox>\n\n<$checkbox tiddler=\"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\" field=\"text\" checked=\"yes\" unchecked=\"no\" default=\"no\"> <$link to=\"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\">Use absolute paths for non-descendent attachments</$link> </$checkbox>\n"},"$:/plugins/tiddlywiki/external-attachments/startup.js":{"title":"$:/plugins/tiddlywiki/external-attachments/startup.js","text":"/*\\\ntitle: $:/plugins/tiddlywiki/external-attachments/startup.js\ntype: application/javascript\nmodule-type: startup\n\nStartup initialisation\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\nvar ENABLE_EXTERNAL_ATTACHMENTS_TITLE = \"$:/config/ExternalAttachments/Enable\",\n\tUSE_ABSOLUTE_FOR_DESCENDENTS_TITLE = \"$:/config/ExternalAttachments/UseAbsoluteForDescendents\",\n\tUSE_ABSOLUTE_FOR_NON_DESCENDENTS_TITLE = \"$:/config/ExternalAttachments/UseAbsoluteForNonDescendents\";\n\n// Export name and synchronous status\nexports.name = \"external-attachments\";\nexports.platforms = [\"browser\"];\nexports.after = [\"startup\"];\nexports.synchronous = true;\n\nexports.startup = function() {\n\ttest_makePathRelative();\n\t$tw.hooks.addHook(\"th-importing-file\",function(info) {\n\t\tif(document.location.protocol === \"file:\" && info.isBinary && info.file.path && $tw.wiki.getTiddlerText(ENABLE_EXTERNAL_ATTACHMENTS_TITLE,\"\") === \"yes\") {\n\t\t\tvar locationPathParts = document.location.pathname.split(\"/\").slice(0,-1),\n\t\t\t\tfilePathParts = info.file.path.split(/[\\\\\\/]/mg).map(encodeURIComponent);\n\t\t\tinfo.callback([\n\t\t\t\t{\n\t\t\t\t\ttitle: info.file.name,\n\t\t\t\t\ttype: info.type,\n\t\t\t\t\t\"_canonical_uri\": makePathRelative(\n\t\t\t\t\t\tfilePathParts.join(\"/\"),\n\t\t\t\t\t\tlocationPathParts.join(\"/\"),\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tuseAbsoluteForNonDescendents: $tw.wiki.getTiddlerText(USE_ABSOLUTE_FOR_NON_DESCENDENTS_TITLE,\"\") === \"yes\",\n\t\t\t\t\t\t\tuseAbsoluteForDescendents: $tw.wiki.getTiddlerText(USE_ABSOLUTE_FOR_DESCENDENTS_TITLE,\"\") === \"yes\"\n\t\t\t\t\t\t}\n\t\t\t\t\t)\n\t\t\t\t}\n\t\t\t]);\n\t\t\treturn true;\n\t\t} else {\n\t\t\treturn false;\n\t\t}\n\t});\n};\n\n/*\nGiven a source absolute path and a root absolute path, returns the source path expressed as a relative path from the root path.\n*/\nfunction makePathRelative(sourcepath,rootpath,options) {\n\toptions = options || {};\n\tvar sourceParts = sourcepath.split(\"/\"),\n\t\trootParts = rootpath.split(\"/\"),\n\t\toutputParts = [];\n\t// Check that each path started with a slash\n\tif(sourceParts[0] || rootParts[0]) {\n\t\tthrow \"makePathRelative: both paths must be absolute\";\n\t}\n\t// Identify any common portion from the start\n\tvar c = 1,\n\t\tp;\n\twhile(c < sourceParts.length && c < rootParts.length && sourceParts[c] === rootParts[c]) {\n\t\tc += 1;\n\t}\n\t// Return \".\" if there's nothing left\n\tif(c === sourceParts.length && c === rootParts.length ) {\n\t\treturn \".\"\n\t}\n\t// Use an absolute path if required\n\tif((options.useAbsoluteForNonDescendents && c < rootParts.length) || (options.useAbsoluteForDescendents && c === rootParts.length)) {\n\t\treturn sourcepath;\n\t}\n\t// Move up a directory for each directory left in the root\n\tfor(p = c; p < rootParts.length; p++) {\n\t\toutputParts.push(\"..\");\n\t}\t\t\n\t// Add on the remaining parts of the source path\n\tfor(p = c; p < sourceParts.length; p++) {\n\t\toutputParts.push(sourceParts[p]);\n\t}\n\treturn outputParts.join(\"/\");\n}\n\nfunction test_makePathRelative() {\n\tvar msg = \"makePathRelative test failed\";\n\tif(makePathRelative(\"/Users/me/something\",\"/Users/you/something\") !== \"../../me/something\") {\n\t\tthrow msg;\n\t}\n\tif(makePathRelative(\"/Users/me/something\",\"/Users/you/something\",{useAbsoluteForNonDescendents: true}) !== \"/Users/me/something\") {\n\t\tthrow msg;\n\t}\n\tif(makePathRelative(\"/Users/me/something/else\",\"/Users/me/something\") !== \"else\") {\n\t\tthrow msg;\n\t}\n\tif(makePathRelative(\"/Users/me/something\",\"/Users/me/something/new\") !== \"..\") {\n\t\tthrow msg;\n\t}\n\tif(makePathRelative(\"/Users/me/something\",\"/Users/me/something/new\",{useAbsoluteForNonDescendents: true}) !== \"/Users/me/something\") {\n\t\tthrow msg;\n\t}\n\tif(makePathRelative(\"/Users/me/something\",\"/Users/me/something\") !== \".\") {\n\t\tthrow msg;\n\t}\n}\n\n})();\n","type":"application/javascript","module-type":"startup"}}});