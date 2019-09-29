$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/dynaview","description":"Dynamic scrolling and zooming effects","author":"JeremyRuston","core-version":">=5.0.0","list":"readme docs examples config","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/plugins/tiddlywiki/dynaview/above-story":{"title":"$:/plugins/tiddlywiki/dynaview/above-story","tags":"$:/tags/AboveStory-disabled","text":"<!-- Remove the \"-disabled\" part of the tag to cause the currently selected example to appear at the top of the story river. Intended to make it easier to make clean screencaps -->\n<div style=\"height:100em;\">\n<$transclude tiddler={{$:/state/tab--1915807570}} mode=\"block\"/>\n</div>\n"},"$:/config/DynaView/ViewportDimensions":{"title":"$:/config/DynaView/ViewportDimensions","text":"no"},"$:/config/DynaView/UpdateAddressBar":{"title":"$:/config/DynaView/UpdateAddressBar","text":"no"},"$:/plugins/tiddlywiki/dynaview/config":{"title":"$:/plugins/tiddlywiki/dynaview/config","text":"<$checkbox tiddler=\"$:/config/DynaView/ViewportDimensions\" field=\"text\" checked=\"yes\" unchecked=\"no\" default=\"no\"> Enable dynamic saving of the viewport [[width|$:/state/DynaView/ViewportDimensions/Width]] and [[height|$:/state/DynaView/ViewportDimensions/Height]]</$checkbox>\n\n<$checkbox tiddler=\"$:/config/DynaView/UpdateAddressBar\" field=\"text\" checked=\"yes\" unchecked=\"no\" default=\"no\"> Update address bar while scrolling</$checkbox>\n\n"},"$:/plugins/tiddlywiki/dynaview/docs":{"title":"$:/plugins/tiddlywiki/dynaview/docs","text":"! Documentation\n\nThe components of this plugin include:\n\n* A background task that:\n** performs specified actions when elements are scrolled into view\n** updates certain base classes on the `document.body` according to the current zoom level\n** if enabled in the DynaView config panel - dynamically stores the viewport dimensions in $:/state/viewport/width and $:/state/viewport/height\n* Pre-configured CSS classes to simplify using those base classes\n* Usage examples\n\n! Scroll Features\n\n!! Scroll position preservation during refresh\n\nSome recent browsers have a feature called \"scroll anchoring\" whereby they suppress the apparent scrolling that occurs when elements are inserted or removed above the current viewport. (See https://github.com/WICG/ScrollAnchoring for more details).\n\n~DynaView can optionally polyfill this behaviour for older browsers by setting the configuration tiddler $:/config/DynaView/PreserveScrollPosition to `yes`.\n\n!! Startup scroll position restoration\n\nOptionally, ~DynaView can store the current scroll position in local storage and restore it upon startup. Set the configuration tiddler $:/config/DynaView/RestoreScrollPositionAtStartup to `yes`.\n\nNote that it is not recommended to use this setting at the same time as the \"UpdateAddressBar\" option.\n\n!! Visibility tracking\n\nThe background task detects when elements with the class `tc-dynaview-track-tiddler-when-visible` scroll in and out of view. It tracks four different states:\n\n* ''Blank/missing'' -- The element has not yet been scrolled into view\n* ''0'' -- The element has been scrolled into view, but subsequently scrolled out of view\n* ''1'' -- The element is near the viewport\n* ''2'' -- The element is partially or wholly within the viewport\n\nThe processing applied to each element is as follows:\n\n* If the element is partially or wholly within the viewport then set the state to \"2\"\n* If the element is near the viewport then set the state to \"1\"\n* If the element is fully outside the viewport then only set the state to \"0\" if it is currently unset (ie blank/missing)\n\nAttributes on the tracked element specify the following parameters:\n\n* ''data-dynaview-track-tiddler'' -- specifies the tiddler in which the element tracking state will be stored\n\n!! Update address bar when scrolling\n\nIf the configuration tiddler $:/config/DynaView/UpdateAddressBar is set to `yes` the background task detects the tiddler at the top of the viewport and sets the address bar location hash to the title of that tiddler.\n\nNote that it is not recommended to use this setting at the same time as the \"RestoreScrollPositionAtStartup\" option.\n\n! Viewport Size Features\n\n!! Resize Tracking\n\nSome widgets require re-rendering or refreshing if the size of the viewport changes. This can be accomplished using \"resize counting\" in two steps:\n\n* Ensure that a DOM element with the class `tc-dynaview-request-refresh-on-resize` is present in the DOM to enable resize counting\n* Have the widget check for changes to the tiddler $:/state/DynaView/ViewportDimensions/ResizeCount to detect viewport resizes\n\n!! Viewport Size Tracking\n\nThe background task can optionally dynamically update a pair of state tiddlers with the dimensions of the browser viewport.\n\n* Set the configuration tiddler $:/config/DynaView/ViewportDimensions to the text \"yes\" to enable this feature\n* The viewport dimensions can be found in $:/state/DynaView/ViewportDimensions/Width and $:/state/DynaView/ViewportDimensions/Height\n\n! Zoom Features\n\n!! Document Body Zoom Classes\n\nThe background task sets the following classes on `document.body` according to the current zoom level.\n\n|!Class |!Description |\n|`tc-dynaview-zoom-factor-1` |Set when the zoom level is less than 2.00 |\n|`tc-dynaview-zoom-factor-2` |Set when the zoom level is greater than 2.00 and less than 3.00 |\n|`tc-dynaview-zoom-factor-3` |Set when the zoom level is greater than 3.00 and less than 4.00 |\n|`tc-dynaview-zoom-factor-4` |Set when the zoom level is greater than 4.00 |\n|`tc-dynaview-zoom-factor-1-and-above` |Set when the zoom level is greater than or equal to 1.00 |\n|`tc-dynaview-zoom-factor-1a-and-above` |Set when the zoom level is greater than or equal to 1.14 |\n|`tc-dynaview-zoom-factor-1b-and-above` |Set when the zoom level is greater than or equal to 1.33 |\n|`tc-dynaview-zoom-factor-1c-and-above` |Set when the zoom level is greater than or equal to 1.60 |\n|`tc-dynaview-zoom-factor-2-and-above` |Set when the zoom level is greater than or equal to 2.00 |\n|`tc-dynaview-zoom-factor-2a-and-above` |Set when the zoom level is greater than or equal to 2.66 |\n|`tc-dynaview-zoom-factor-3-and-above` |Set when the zoom level is greater than or equal to 3.00 |\n|`tc-dynaview-zoom-factor-4-and-above` |Set when the zoom level is greater than or equal to 4.00 |\n\n!! Pre-configured Classes\n\nThese classes can be used on any element to control its visibility at different zoom levels.\n\n|!Class |!Description |\n|`tc-dynaview-zoom-visible-1-and-above` |Visible when the zoom level is 1.00 or more |\n|`tc-dynaview-zoom-visible-1a-and-above` |Visible when the zoom level is 1.14 or more |\n|`tc-dynaview-zoom-visible-1b-and-above` |Visible when the zoom level is 1.33 or more |\n|`tc-dynaview-zoom-visible-1c-and-above` |Visible when the zoom level is 1.60 or more |\n|`tc-dynaview-zoom-visible-2-and-above` |Visible when the zoom level is 2.00 or more |\n|`tc-dynaview-zoom-visible-2a-and-above` |Visible when the zoom level is 2.66 or more |\n|`tc-dynaview-zoom-visible-3-and-above` |Visible when the zoom level is 3.00 or more |\n|`tc-dynaview-zoom-visible-4-and-above` |Visible when the zoom level is 4.00 or more |\n|`tc-dynaview-zoom-visible-1` |Visible when the zoom level is less than 2.00 |\n|`tc-dynaview-zoom-visible-2` |Visible when the zoom level is greater than or equal to 2.00 and less than 3.00 |\n|`tc-dynaview-zoom-visible-3` |Visible when the zoom level is greater than or equal to 3.00 and less than 4.00 |\n|`tc-dynaview-zoom-visible-4` |Visible when the zoom level is greater than or equal to 4.00 |\n"},"$:/plugins/tiddlywiki/dynaview/dynaview.js":{"title":"$:/plugins/tiddlywiki/dynaview/dynaview.js","text":"/*\\\ntitle: $:/plugins/tiddlywiki/dynaview/dynaview.js\ntype: application/javascript\nmodule-type: startup\n\nZoom everything\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\n// Export name and synchronous status\nexports.name = \"dynaview\";\nexports.platforms = [\"browser\"];\nexports.before = [\"story\"];\nexports.synchronous = true;\n\nvar STATE_OUT_OF_VIEW = \"0\",\n\tSTATE_NEAR_VIEW = \"1\",\n\tSTATE_IN_VIEW = \"2\";\n\nvar isWaitingForAnimationFrame = 0, // Bitmask:\n\tANIM_FRAME_CAUSED_BY_LOAD = 1, // Animation frame was requested because of page load\n\tANIM_FRAME_CAUSED_BY_SCROLL = 2, // Animation frame was requested because of page scroll\n\tANIM_FRAME_CAUSED_BY_RESIZE = 4; // Animation frame was requested because of window resize\n\nvar LOCAL_STORAGE_KEY_PREFIX = \"tw5-dynaview-scroll-position#\";\n\nvar hasRestoredScrollPosition = false;\n\nvar localStorageHasFailed = false;\n\nexports.startup = function() {\n\tvar topmost = null, lastScrollY;\n\t$tw.boot.disableStartupNavigation = true;\n\twindow.addEventListener(\"load\",onLoad,false);\n\twindow.addEventListener(\"scroll\",onScroll,false);\n\twindow.addEventListener(\"resize\",onResize,false);\n\t$tw.hooks.addHook(\"th-page-refreshing\",function() {\n\t\tif(!hasRestoredScrollPosition) {\n\t\t\ttopmost = restoreScrollPosition();\n\t\t} else if(shouldPreserveScrollPosition()) {\n\t\t\ttopmost = findTopmostTiddler();\n\t\t}\n\t\tlastScrollY = window.scrollY;\n\t});\n\t$tw.hooks.addHook(\"th-page-refreshed\",function() {\n\t\tif(lastScrollY === window.scrollY) { // Don't do scroll anchoring if the scroll position got changed\n\t\t\tif(shouldPreserveScrollPosition() || !hasRestoredScrollPosition) {\n\t\t\t\tscrollToTiddler(topmost);\n\t\t\t\thasRestoredScrollPosition = true;\n\t\t\t}\n\t\t}\n\t\tupdateAddressBar();\n\t\tsaveScrollPosition();\n\t\tcheckVisibility();\n\t\tsaveViewportDimensions();\n\t});\n};\n\nfunction onLoad(event) {\n\tif(!isWaitingForAnimationFrame) {\n\t\twindow.requestAnimationFrame(worker);\n\t}\n\tisWaitingForAnimationFrame |= ANIM_FRAME_CAUSED_BY_LOAD;\n}\n\nfunction onScroll(event) {\n\tif(!isWaitingForAnimationFrame) {\n\t\twindow.requestAnimationFrame(worker);\n\t}\n\tisWaitingForAnimationFrame |= ANIM_FRAME_CAUSED_BY_SCROLL;\n}\n\nfunction onResize(event) {\n\tif(!isWaitingForAnimationFrame) {\n\t\twindow.requestAnimationFrame(worker);\n\t}\n\tisWaitingForAnimationFrame |= ANIM_FRAME_CAUSED_BY_RESIZE;\n}\n\nfunction worker() {\n\tif(isWaitingForAnimationFrame & (ANIM_FRAME_CAUSED_BY_RESIZE | ANIM_FRAME_CAUSED_BY_LOAD)) {\n\t\tsaveViewportDimensions();\n\t}\n\tsetZoomClasses();\n\tupdateAddressBar();\n\tsaveScrollPosition();\n\tcheckVisibility();\n\tisWaitingForAnimationFrame = 0;\n}\n\nfunction setZoomClasses() {\n\tvar zoomFactor = document.body.scrollWidth / window.innerWidth,\n\t\tclassList = document.body.classList;\n\tclassList.add(\"tc-dynaview\");\n\tclassList.toggle(\"tc-dynaview-zoom-factor-1\",zoomFactor <= 2);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-1-and-above\",zoomFactor >= 1);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-1a-and-above\",zoomFactor >= 1.14);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-1b-and-above\",zoomFactor >= 1.33);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-1c-and-above\",zoomFactor >= 1.6);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-2\",zoomFactor >= 2 && zoomFactor <= 3);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-2-and-above\",zoomFactor >= 2);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-2a-and-above\",zoomFactor >= 2.66);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-3\",zoomFactor >= 3 && zoomFactor <= 4);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-3-and-above\",zoomFactor >= 3);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-4\",zoomFactor >= 4);\n\tclassList.toggle(\"tc-dynaview-zoom-factor-4-and-above\",zoomFactor >= 4);\n}\n\nfunction checkVisibility() {\n\tvar elements = document.querySelectorAll(\".tc-dynaview-track-tiddler-when-visible\");\n\t$tw.utils.each(elements,function(element) {\n\t\t// Calculate whether the element is visible\n\t\tvar elementRect = element.getBoundingClientRect(),\n\t\t\tviewportWidth = window.innerWidth || document.documentElement.clientWidth,\n\t\t\tviewportHeight = window.innerHeight || document.documentElement.clientHeight,\n\t\t\tviewportRect = {\n\t\t\t\tleft: 0,\n\t\t\t\tright: viewportWidth,\n\t\t\t\ttop: 0,\n\t\t\t\tbottom: viewportHeight\n\t\t\t},\n\t\t\ttitle = element.getAttribute(\"data-dynaview-track-tiddler\");\n\t\tif(title) {\n\t\t\tvar currValue = $tw.wiki.getTiddlerText(title),\n\t\t\t\tnewValue = currValue;\n\t\t\t// Within viewport\n\t\t\tif(!(elementRect.left > viewportRect.right || \n\t\t\t\t\t\t\t\telementRect.right < viewportRect.left || \n\t\t\t\t\t\t\t\telementRect.top > viewportRect.bottom ||\n\t\t\t\t\t\t\t\telementRect.bottom < viewportRect.top)) {\n\t\t\t\tnewValue = STATE_IN_VIEW;\n\t\t\t// Near viewport\n\t\t\t} else if(!(elementRect.left > (viewportRect.right + viewportWidth) || \n\t\t\t\t\t\t\t\telementRect.right < (viewportRect.left - viewportWidth) || \n\t\t\t\t\t\t\t\telementRect.top > (viewportRect.bottom + viewportHeight) ||\n\t\t\t\t\t\t\t\telementRect.bottom < (viewportRect.top - viewportHeight))) {\n\t\t\t\tnewValue = STATE_NEAR_VIEW;\n\t\t\t} else {\n\t\t\t\t// Outside viewport\n\t\t\t\tif(currValue !== undefined) {\n\t\t\t\t\tnewValue = STATE_OUT_OF_VIEW;\n\t\t\t\t}\n\t\t\t}\n\t\t\tif(newValue !== currValue) {\n\t\t\t\t$tw.wiki.addTiddler(new $tw.Tiddler({title: title, text: newValue}));\t\t\t\t\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction updateAddressBar() {\n\tif($tw.wiki.getTiddlerText(\"$:/config/DynaView/UpdateAddressBar\") === \"yes\") {\n\t\tvar top = findTopmostTiddler();\n\t\tif(top.element) {\n\t\t\tvar hash = \"#\" + encodeURIComponent(top.title) + \":\" + encodeURIComponent(\"[list[$:/StoryList]]\");\n\t\t\tif(title && $tw.locationHash !== hash) {\n\t\t\t\t$tw.locationHash = hash;\n\t\t\t\twindow.location.hash = hash;\t\t\t\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction saveScrollPosition() {\n\tif(!localStorageHasFailed) {\n\t\tif(hasRestoredScrollPosition && $tw.wiki.getTiddlerText(\"$:/config/DynaView/RestoreScrollPositionAtStartup\") === \"yes\") {\n\t\t\tvar top = findTopmostTiddler();\n\t\t\tif(top.element) {\n\t\t\t\ttry {\n\t\t\t\t\twindow.localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + window.location.pathname,JSON.stringify({\n\t\t\t\t\t\ttitle: top.title,\n\t\t\t\t\t\toffset: top.offset\n\t\t\t\t\t}));\n\t\t\t\t} catch(e) {\n\t\t\t\t\tlocalStorageHasFailed = true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction restoreScrollPosition() {\n\tvar json;\n\tif(!localStorageHasFailed) {\n\t\ttry {\n\t\t\tjson = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + window.location.pathname));\n\t\t} catch(e) {\n\t\t\tlocalStorageHasFailed = true;\n\t\t};\t\t\n\t}\n\treturn json;\n}\n\n/*\ntiddlerDetails: {title: <title of tiddler to scroll to>, offset: <offset in pixels from the top of the tiddler>}\n*/\nfunction scrollToTiddler(tiddlerDetails) {\n\tif(!$tw.pageScroller.isScrolling() && tiddlerDetails) {\n\t\tvar elements = document.querySelectorAll(\".tc-tiddler-frame[data-tiddler-title]\"),\n\t\t\ttopmostTiddlerElement = null;\n\t\t$tw.utils.each(elements,function(element) {\n\t\t\tif(element.getAttribute(\"data-tiddler-title\") === tiddlerDetails.title) {\n\t\t\t\ttopmostTiddlerElement = element;\n\t\t\t}\n\t\t});\n\t\tif(topmostTiddlerElement) {\n\t\t\tvar rect = topmostTiddlerElement.getBoundingClientRect(),\n\t\t\t\tscrollY = Math.round(window.scrollY + rect.top + tiddlerDetails.offset);\n\t\t\tif(scrollY !== window.scrollY) {\n\t\t\t\twindow.scrollTo(window.scrollX,scrollY);\t\t\t\t\t\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction shouldPreserveScrollPosition() {\n\treturn $tw.wiki.getTiddlerText(\"$:/config/DynaView/PreserveScrollPosition\") === \"yes\";\n}\n\nfunction findTopmostTiddler() {\n\tvar elements = document.querySelectorAll(\".tc-tiddler-frame[data-tiddler-title]\"),\n\t\ttopmostElement = null,\n\t\ttopmostElementTop = 1 * 1000 * 1000;\n\t$tw.utils.each(elements,function(element) {\n\t\t// Check if the element is visible\n\t\tvar elementRect = element.getBoundingClientRect();\n\t\tif((elementRect.top < topmostElementTop) && (elementRect.bottom > 0)) {\n\t\t\ttopmostElement = element;\n\t\t\ttopmostElementTop = elementRect.top;\n\t\t}\n\t});\n\treturn {\n\t\telement: topmostElement,\n\t\toffset: -topmostElementTop,\n\t\ttitle: topmostElement ? topmostElement.getAttribute(\"data-tiddler-title\") : null\n\t};\n}\n\nvar previousViewportWidth, previousViewportHeight;\n\nfunction saveViewportDimensions() {\n\tvar viewportWidth = window.innerWidth || document.documentElement.clientWidth,\n\t\tviewportHeight = window.innerHeight || document.documentElement.clientHeight;\n\tif(document.querySelector(\".tc-dynaview-request-refresh-on-resize\")) {\n\t\tif(previousViewportWidth !== viewportWidth || previousViewportHeight !== viewportHeight) {\n\t\t\tvar count = parseInt($tw.wiki.getTiddlerText(\"$:/state/DynaView/ViewportDimensions/ResizeCount\",\"0\"),10) || 0;\n\t\t\t$tw.wiki.addTiddler(new $tw.Tiddler({title: \"$:/state/DynaView/ViewportDimensions/ResizeCount\", text: (count + 1) + \"\"}));\n\t\t\tpreviousViewportWidth = viewportWidth;\n\t\t\tpreviousViewportHeight = viewportHeight;\n\t\t}\n\t}\n\tif($tw.wiki.getTiddlerText(\"$:/config/DynaView/ViewportDimensions\") === \"yes\") {\n\t\tif($tw.wiki.getTiddlerText(\"$:/state/DynaView/ViewportDimensions/Width\") !== viewportWidth.toString()) {\n\t\t\t$tw.wiki.setText(\"$:/state/DynaView/ViewportDimensions/Width\",undefined,undefined,viewportWidth.toString(),undefined);\n\t\t}\n\t\tif($tw.wiki.getTiddlerText(\"$:/state/DynaView/ViewportDimensions/Height\") !== viewportHeight.toString()) {\n\t\t\t$tw.wiki.setText(\"$:/state/DynaView/ViewportDimensions/Height\",undefined,undefined,viewportHeight.toString(),undefined);\n\t\t}\n\t}\n}\n\n})();\n","type":"application/javascript","module-type":"startup"},"$:/plugins/tiddlywiki/dynaview/examples/progressive-text":{"title":"$:/plugins/tiddlywiki/dynaview/examples/progressive-text","tags":"$:/tags/dynaviewExamples","caption":"Progressive Text","text":"//Zoom into the space below to see a poem//\n\n''N.B. This example only works in Safari at the moment''\n\n<pre><div class=\"tc-dynaview-zoom-visible-1-and-above\" style=\"font-size: 0.7em;line-height:1.5;\">\n         'Fury said to a\n         mouse, That he\n        met in the\n       house,</div><div class=\"tc-dynaview-zoom-visible-1a-and-above\" style=\"font-size: 0.6em;line-height:1.5;\">     \"Let us\n      both go to\n       law: I will\n        prosecute\n         YOU.--Come,</div><div class=\"tc-dynaview-zoom-visible-1b-and-above\" style=\"font-size: 0.5em;line-height:1.5;\">           I'll take no\n           denial; We\n          must have a\n        trial: For</div><div class=\"tc-dynaview-zoom-visible-1c-and-above\" style=\"font-size: 0.4em;line-height:1.5;\">      really this\n     morning I've\n    nothing\n    to do.\"</div><div class=\"tc-dynaview-zoom-visible-2-and-above\" style=\"font-size: 0.3em;line-height:1.5;\">     Said the\n      mouse to the\n       cur, \"Such\n        a trial,\n         dear Sir,</div><div class=\"tc-dynaview-zoom-visible-2a-and-above\" style=\"font-size: 0.25em;line-height:1.5;\">            With\n          no jury\n        or judge,\n       would be\n      wasting\n      our\n      breath.\"</div><div class=\"tc-dynaview-zoom-visible-3-and-above\" style=\"font-size: 0.2em;line-height:1.5;\">       \"I'll be\n        judge, I'll\n         be jury,\"\n            Said\n         cunning\n          old Fury:\n          \"I'll\n          try the\n            whole\n            cause,</div><div class=\"tc-dynaview-zoom-visible-4-and-above\" style=\"font-size: 0.15em;line-height:1.5;\">              and\n           condemn\n           you\n          to\n           death.\"'\n</div></pre>\n"},"$:/plugins/tiddlywiki/dynaview/examples/reveal-on-scroll":{"title":"$:/plugins/tiddlywiki/dynaview/examples/reveal-on-scroll","tags":"$:/tags/dynaviewExamples","caption":"Reveal on Scroll","text":"\\define indicator(index)\n<$reveal state=\"$:/state/unreveal-on-scroll/example$index$\" type=\"match\" text=\"yes\">\n$index$\n</$reveal>\n\\end\n\n\\define lorem-ipsum(index)\n<div class=\"tc-dynaview-set-tiddler-when-visible\" style=\"min-height: 75px;\" data-dynaview-set-tiddler=\"$:/state/unreveal-on-scroll/example$index$\" data-dynaview-set-value=\"yes\">\n<h1>Heading $index$</h1>\n<$reveal state=\"$:/state/unreveal-on-scroll/example$index$\" type=\"match\" text=\"yes\">\n(Rendered at <<now \"[UTC]YYYY-0MM-0DD 0hh:0mm:0ss.XXX\">>) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</$reveal>\n</div>\n\\end\n\nThis example renders tiddlers as they are scrolled into view.\n\nVisible: <$list filter=\"1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\">\n<$macrocall $name=\"indicator\" index=<<currentTiddler>>/>\n</$list>\n\n<$list filter=\"1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\">\n<$macrocall $name=\"lorem-ipsum\" index=<<currentTiddler>>/>\n</$list>"},"$:/plugins/tiddlywiki/dynaview/examples/unreveal-on-scroll":{"title":"$:/plugins/tiddlywiki/dynaview/examples/unreveal-on-scroll","tags":"$:/tags/dynaviewExamples","caption":"Unreveal on Scroll","text":"\\define indicator(index)\n<$reveal state=\"$:/state/reveal-on-scroll/example$index$\" type=\"match\" text=\"yes\">\n$index$\n</$reveal>\n\\end\n\n\\define lorem-ipsum(index)\n<div class=\"tc-dynaview-set-tiddler-when-visible\" style=\"min-height: 75px;\" data-dynaview-set-tiddler=\"$:/state/reveal-on-scroll/example$index$\" data-dynaview-set-value=\"yes\" data-dynaview-unset-tiddler=\"$:/state/reveal-on-scroll/example$index$\" data-dynaview-unset-value=\"no\">\n<h1>Heading $index$</h1>\n<$reveal state=\"$:/state/reveal-on-scroll/example$index$\" type=\"match\" text=\"yes\">\n(Rendered at <<now \"[UTC]YYYY-0MM-0DD 0hh:0mm:0ss.XXX\">>) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</$reveal>\n</div>\n\\end\n\nThis example renders tiddlers as they are scrolled into view, and hides them when they scroll out of view again.\n\nVisible: <$list filter=\"1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\">\n<$macrocall $name=\"indicator\" index=<<currentTiddler>>/>\n</$list>\n\n<$list filter=\"1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16\">\n<$macrocall $name=\"lorem-ipsum\" index=<<currentTiddler>>/>\n</$list>\n"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/TiddlyWiki Architecture":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/TiddlyWiki Architecture","caption":"TiddlyWiki Architecture","tags":"[[$:/tags:/ZoomableDiagram]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Browser Architecture":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Browser Architecture","caption":"Browser Architecture","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/TiddlyWiki Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Service Workers":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Service Workers","caption":"Service Workers","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Browser Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Service Bosses":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Service Bosses","caption":"Service Bosses","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Service Workers]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Out of Service Workers":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Out of Service Workers","caption":"Out of Service Workers","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Service Workers]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Events":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Events","caption":"Events","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Browser Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Non Events":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Non Events","caption":"Non Events","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Events]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Past Events":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Past Events","caption":"Past Events","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Events]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/DOM":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/DOM","caption":"DOM","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Browser Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Nodes":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Nodes","caption":"Nodes","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/DOM]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Attributes":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Attributes","caption":"Attributes","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/DOM]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Pathogens":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Pathogens","caption":"Pathogens","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/DOM]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Connection":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Connection","caption":"Connection","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/TiddlyWiki Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/HTTP":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/HTTP","caption":"HTTP","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Connection]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Server Architecture":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Server Architecture","caption":"Server Architecture","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/TiddlyWiki Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Node.js":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Node.js","caption":"Node.js","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Server Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/C/C++":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/C/C++","caption":"C/C++","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Node.js]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Quotation Marks":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Quotation Marks","caption":"Quotation Marks","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Node.js]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Asterisks":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Asterisks","caption":"Asterisks","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Node.js]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Potatoes":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Potatoes","caption":"Potatoes","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Server Architecture]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Carrots":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Carrots","caption":"Carrots","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Potatoes]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Apricots":{"title":"$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Apricots","caption":"Apricots","tags":"[[$:/plugins/tiddlywiki/dynaview/zoomable-diagram/Potatoes]]","text":"<<lorem-ipsum>>"},"$:/plugins/tiddlywiki/dynaview/examples/zoomable-diagram":{"title":"$:/plugins/tiddlywiki/dynaview/examples/zoomable-diagram","tags":"$:/tags/dynaviewExamples","caption":"Zoomable Diagram","text":"\\define lorem-ipsum()\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\\end\n\n\\define zoomable-diagram(tag,level:\"1 2 3 4 5 6 7\")\n<div class={{{ $level$ +[addprefix[zoomable-diagram-level-]addprefix[zoomable-diagram-list ]] }}}>\n\t<$list filter=\"[all[shadows+tiddlers]tag[$tag$]]\">\n\t\t<div class=\"zoomable-diagram-item\">\n\t\t\t<div class=\"zoomable-diagram-title\">\n\t\t\t\t<$transclude field=\"caption\" mode=\"inline\"/>\n\t\t\t</div>\n\t\t\t<div class=\"zoomable-diagram-body\">\n\t\t\t\t<div class=\"zoomable-diagram-text\">\n\t\t\t\t\t<$transclude field=\"text\" mode=\"block\"/>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"zoomable-diagram-children\">\n\t\t\t\t\t<$set name=\"new-level\" filter=\"\"\" $level$ +[butfirst[]] \"\"\">\n\t\t\t\t\t\t<$macrocall $name=\"zoomable-diagram\" tag=<<currentTiddler>> level=<<new-level>>/>\n\t\t\t\t\t</$set>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</$list>\n</div>\n\\end\n\n//Zoom into the diagram below to find out more//\n\n''N.B. This example only works in Safari at the moment''\n\n<style>\n.zoomable-diagram-wrapper {\n\tmin-height: 300px;\n}\n\n.zoomable-diagram-list {\n\tdisplay: flex;\n\tflex-direction: row;\n\tline-height: 1.5;\n}\n\n.zoomable-diagram-level-1 {font-size: 1em;}\n.zoomable-diagram-level-2 {font-size: 0.8em;}\n.zoomable-diagram-level-3 {font-size: 0.6em;}\n.zoomable-diagram-level-4 {font-size: 0.4em;}\n\n.zoomable-diagram-level-1,\n.zoomable-diagram-level-2,\n.zoomable-diagram-level-3,\n.zoomable-diagram-level-4,\n.zoomable-diagram-text {\n\ttransition: opacity 150ms ease-in-out;\n}\n\nbody.tc-dynaview.tc-dynaview-zoom-factor-1 .zoomable-diagram-level-1 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-1 .zoomable-diagram-level-2 {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-1 .zoomable-diagram-level-3 {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-1 .zoomable-diagram-level-4 {opacity: 0;}\n\nbody.tc-dynaview.tc-dynaview-zoom-factor-2 .zoomable-diagram-level-1 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-2 .zoomable-diagram-level-1 > .zoomable-diagram-item > .zoomable-diagram-body > .zoomable-diagram-text {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-2 .zoomable-diagram-level-2 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-2 .zoomable-diagram-level-3 {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-2 .zoomable-diagram-level-4 {opacity: 0;}\n\nbody.tc-dynaview.tc-dynaview-zoom-factor-3 .zoomable-diagram-level-1 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-3 .zoomable-diagram-level-1 > .zoomable-diagram-item > .zoomable-diagram-body > .zoomable-diagram-text {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-3 .zoomable-diagram-level-2 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-3 .zoomable-diagram-level-2 > .zoomable-diagram-item > .zoomable-diagram-body > .zoomable-diagram-text {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-3 .zoomable-diagram-level-3 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-3 .zoomable-diagram-level-4 {opacity: 0;}\n\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .zoomable-diagram-level-1 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .zoomable-diagram-level-1 > .zoomable-diagram-item > .zoomable-diagram-body > .zoomable-diagram-text {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .zoomable-diagram-level-2 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .zoomable-diagram-level-2 > .zoomable-diagram-item > .zoomable-diagram-body > .zoomable-diagram-text {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .zoomable-diagram-level-3 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .zoomable-diagram-level-3 > .zoomable-diagram-item > .zoomable-diagram-body > .zoomable-diagram-text {opacity: 0;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .zoomable-diagram-level-4 {opacity: 1;}\n\n.zoomable-diagram-item {\n\tmargin: 0.5em;\n\tflex: 1 1 0;\n}\n\n.zoomable-diagram-title {\n\tfont-weight: bold;\n}\n\n.zoomable-diagram-body {\n\tdisplay: flex;\n\tflex-direction: column;\n\tposition: relative;\n}\n\n.zoomable-diagram-text {\n\tposition: absolute;\n}\n\n.zoomable-diagram-children {\n}\n\n</style>\n\n<div class=\"zoomable-diagram-wrapper\">\n<<zoomable-diagram \"$:/tags:/ZoomableDiagram\">>\n</div>\n"},"$:/plugins/tiddlywiki/dynaview/examples/zoomable-tooltips":{"title":"$:/plugins/tiddlywiki/dynaview/examples/zoomable-tooltips","tags":"$:/tags/dynaviewExamples","caption":"Zoomable Tooltips","text":"//Zoom into the images below to see their titles//\n\n''N.B. This example only works in Safari at the moment''\n\n<style>\n.zoomable-tooltip-demo-container {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n\n.zoomable-tooltip-demo-item {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\tpadding: 4px;\n\twidth: 5em;\n\theight: 7em;\n}\n\n.zoomable-tooltip-demo-item-image {\n\tflex: 0 0 auto;\n}\n\n.zoomable-tooltip-demo-item-image svg {\n\twidth: 4em;\n\theight: 4em;\n}\n\n.zoomable-tooltip-demo-item-text {\n\tfont-size:0.3em;\n\tflex: 0 0 auto;\n\tline-height: 1.1;\n\ttext-align: center;\n    text-align: center;\n    background: #f7f747;\n    border: 1px solid #c2c235;\n    padding: 2px;\n    border-radius: 2px;\n}\n</style>\n<div class=\"zoomable-tooltip-demo-container\">\n<$list filter=\"[all[tiddlers+shadows]tag[$:/tags/Image]]\">\n<div class=\"zoomable-tooltip-demo-item\">\n<span class=\"zoomable-tooltip-demo-item-image\">\n<$transclude/>\n</span>\n<span class=\"zoomable-tooltip-demo-item-text tc-dynaview-zoom-visible-3-and-above\">\n<$text text=<<currentTiddler>>/>\n</span>\n</div>\n</$list>\n</div>\n"},"$:/plugins/tiddlywiki/dynaview/examples":{"title":"$:/plugins/tiddlywiki/dynaview/examples","text":"<<tabs \"[all[tiddlers+shadows]tag[$:/tags/dynaviewExamples]!has[draft.of]]\" \"$:/plugins/tiddlywiki/dynaview/examples/progressive-text\">>\n"},"$:/plugins/tiddlywiki/dynaview/macros":{"title":"$:/plugins/tiddlywiki/dynaview/macros","tags":"$:/tags/Macro","text":"\\define transclude-when-visible(tiddler,mode:\"block\",state,minHeight:\"1em\",loadingText:\"&hellip;\")\n<$reveal state=<<__state__>> type=\"match\" text=\"visible\" tag=\"div\">\n<div class=\"tc-dynaview-set-tiddler-when-visible\" data-dynaview-set-tiddler=<<__state__>> data-dynaview-set-value=\"visible\">\n<$transclude tiddler=<<__tiddler__>> mode=<<__mode__>>/>\n</div>\n</$reveal>\n<$reveal state=<<__state__>> type=\"nomatch\" text=\"visible\" tag=\"div\">\n<div class=\"tc-dynaview-set-tiddler-when-visible\" style=\"min-height: $minHeight$;\" data-dynaview-set-tiddler=<<__state__>> data-dynaview-set-value=\"visible\">\n$loadingText$\n</div>\n</$reveal>\n\\end\n"},"$:/plugins/tiddlywiki/dynaview/readme":{"title":"$:/plugins/tiddlywiki/dynaview/readme","text":"! Dynaview\n\nThis plugin makes it possible to build user interfaces that dynamically respond to changes in the browser viewport via scrolling or zooming:\n\n* CSS classes that allow rendering to be deferred until the output is scrolled into view\n* CSS classes that allow the opacity of DOM elements to vary according to the current zoom level\n* A daemon that can dynamically update a pair of state tiddlers with the current dimensions of the browser viewport\n* A daemon that can dynamically update the address bar with the title of the tiddler at the top of the viewport\n\nSome points to note about the zoom features:\n\n<<<\n\n* The zoom level currently only works on Safari, both on Mac OS and on the iPhone/iPad\n* The zoom level tracked by the plugin is the pinch-zoom level, and not the text-zoom level\n* Rather than being progressively rendered as needed, hidden item are rendered with zero opacity. Which means that they can still be interacted with\n\nThis is really just a proof of concept to allow the user experience to be evaluated. A production version would need to work in all browsers, which would mean adopting a polyfill such as [[Hammer.js|http://hammerjs.github.io/]] to give us manual pan and zoom support. It would also allow deeper levels of zoom.\n\n<<<\n"},"$:/plugins/tiddlywiki/dynaview/styles":{"title":"$:/plugins/tiddlywiki/dynaview/styles","tags":"$:/tags/Stylesheet","text":"\\define if-tiddler-is(title,value,text)\n<$reveal stateTitle=<<__title__>> text=<<__value__>> type=\"match\">\n<$text text=<<__text__>>/>\n</$reveal>\n\\end\n\\rules only filteredtranscludeinline transcludeinline macrodef macrocallinline\n\n<<if-tiddler-is title:\"$:/config/DynaView/PreserveScrollPosition\" value:\"yes\" text:\"\"\"\nbody {\n\toverflow-anchor: none; /* Turn off browser scroll anchoring */\n}\n\"\"\">>\n\nbody.tc-dynaview .tc-dynaview-zoom-visible-1-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-1a-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-1b-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-1c-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-2-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-2a-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-3-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-4-and-above,\nbody.tc-dynaview .tc-dynaview-zoom-visible-1,\nbody.tc-dynaview .tc-dynaview-zoom-visible-2,\nbody.tc-dynaview .tc-dynaview-zoom-visible-3,\nbody.tc-dynaview .tc-dynaview-zoom-visible-4 {\n\ttransition: opacity 150ms ease-in-out;\n\topacity: 0;\n}\n\nbody.tc-dynaview .tc-dynaview-zoom-visible-1-and-above {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-1a-and-above .tc-dynaview-zoom-visible-1a-and-above {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-1b-and-above .tc-dynaview-zoom-visible-1b-and-above {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-1c-and-above .tc-dynaview-zoom-visible-1c-and-above {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-2-and-above .tc-dynaview-zoom-visible-2-and-above {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-2a-and-above .tc-dynaview-zoom-visible-2a-and-above {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-3-and-above .tc-dynaview-zoom-visible-3-and-above {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4-and-above .tc-dynaview-zoom-visible-4-and-above {opacity: 1;}\n\nbody.tc-dynaview.tc-dynaview-zoom-factor-1 .tc-dynaview-zoom-visible-1 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-2 .tc-dynaview-zoom-visible-2 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-3 .tc-dynaview-zoom-visible-3 {opacity: 1;}\nbody.tc-dynaview.tc-dynaview-zoom-factor-4 .tc-dynaview-zoom-visible-4 {opacity: 1;}\n"}}});