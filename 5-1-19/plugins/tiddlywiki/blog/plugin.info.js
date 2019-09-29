$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/blog","description":"Tools for using TiddlyWiki to publish blogs","author":"JeremyRuston","core-version":">=5.0.0","list":"readme docs","version":"5.1.19","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/plugins/tiddlywiki/blog/docs":{"title":"$:/plugins/tiddlywiki/blog/docs","text":"Until there's more documentation, see an example of the use of this plugin here:\n\n* Blog: http://jermolene-blog.github.io/\n* Repository: https://github.com/Jermolene-blog/blog\n"},"$:/plugins/tiddlywiki/blog/readme":{"title":"$:/plugins/tiddlywiki/blog/readme","text":"This plugin contains tools to help publish blogs:\n\n* Templates and tools for building static HTML pages and posts\n"},"$:/plugins/tiddlywiki/blog/templates/html-page/page":{"title":"$:/plugins/tiddlywiki/blog/templates/html-page/page","text":"\\define tv-wikilink-template() posts/$uri_doubleencoded$.html\n\\define tv-config-toolbar-icons() no\n\\define tv-config-toolbar-text() no\n\\define tv-config-toolbar-class() tc-btn-invisible\n`<!doctype html>\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<meta name=\"generator\" content=\"TiddlyWiki\" />\n<meta name=\"tiddlywiki-version\" content=\"`{{$:/core/templates/version}}`\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />\n<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\" />\n<meta name=\"mobile-web-app-capable\" content=\"yes\"/>\n<meta name=\"format-detection\" content=\"telephone=no\">\n<link id=\"faviconLink\" rel=\"shortcut icon\" href=\"favicon.ico\">\n<link rel=\"stylesheet\" href=\"static.css\">\n<title>`<$transclude field=\"caption\"><$view field=\"title\"/></$transclude>: {{$:/core/wiki/title}}`</title>\n</head>\n<body class=\"tc-body\">\n`{{$:/StaticBanner||$:/core/templates/html-tiddler}}`\n<section class=\"tc-story-river\">\n`<$importvariables filter=\"[[$:/core/ui/PageMacros]] [all[shadows+tiddlers]tag[$:/tags/Macro]!has[draft.of]]\">\n<$view tiddler=\"$:/plugins/tiddlywiki/blog/templates/tiddler\" format=\"htmlwikified\"/>\n</$importvariables>`\n</section>\n</body>\n</html>\n`\n"},"$:/plugins/tiddlywiki/blog/templates/html-page/post":{"title":"$:/plugins/tiddlywiki/blog/templates/html-page/post","text":"\\define tv-wikilink-template() /$uri_doubleencoded$.html\n\\define tv-config-toolbar-icons() no\n\\define tv-config-toolbar-text() no\n\\define tv-config-toolbar-class() tc-btn-invisible\n`<!doctype html>\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<meta name=\"generator\" content=\"TiddlyWiki\" />\n<meta name=\"tiddlywiki-version\" content=\"`{{$:/core/templates/version}}`\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />\n<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\" />\n<meta name=\"mobile-web-app-capable\" content=\"yes\"/>\n<meta name=\"format-detection\" content=\"telephone=no\">\n<link id=\"faviconLink\" rel=\"shortcut icon\" href=\"../favicon.ico\">\n<link rel=\"stylesheet\" href=\"../static.css\">\n<title>`<$transclude field=\"caption\"><$view field=\"title\"/></$transclude>: {{$:/core/wiki/title}}`</title>\n</head>\n<body class=\"tc-body\">\n`{{$:/StaticBanner||$:/core/templates/html-tiddler}}`\n<section class=\"tc-story-river\">\n`<$importvariables filter=\"[[$:/core/ui/PageMacros]] [all[shadows+tiddlers]tag[$:/tags/Macro]!has[draft.of]]\">\n<$view tiddler=\"$:/plugins/tiddlywiki/blog/templates/tiddler\" format=\"htmlwikified\"/>\n<$view tiddler=\"$:/plugins/tiddlywiki/blog/templates/menu\" format=\"htmlwikified\"/>\n</$importvariables>`\n</section>\n</body>\n</html>\n`\n"},"$:/plugins/tiddlywiki/blog/templates/menu":{"title":"$:/plugins/tiddlywiki/blog/templates/menu","text":"<div class=\"tc-blog-menu\">\n\n<div class=\"tc-blog-menu-item\">\n\n<a href=\"../index.html\">\n\n{{$:/core/images/home-button}}\n\n</a>\n\n</div>\n\n</div>\n"},"$:/plugins/tiddlywiki/blog/templates/tiddler":{"title":"$:/plugins/tiddlywiki/blog/templates/tiddler","text":"<div class=\"tc-tiddler-frame tc-tiddler-view-frame\">\n\n<div class=\"tc-tiddler-title\">\n\n<div class=\"tc-titlebar\">\n\n<h2 class=\"tc-title\">\n\n<$transclude field=\"caption\" mode=\"inline\">\n\n<$view field=\"title\"/>\n\n</$transclude>\n\n</h2>\n\n</div>\n\n</div>\n\n<div class=\"tc-subtitle\">\n\n<$view field=\"modified\" format=\"date\" template=\"DDth MMM YYYY\"/>\n\n</div>\n\n<div class=\"tc-tiddler-body\">\n\n<$transclude/>\n\n</div>\n\n</div>\n"}}});