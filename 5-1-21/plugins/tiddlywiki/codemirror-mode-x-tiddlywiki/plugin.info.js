$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-mode-x-tiddlywiki","description":"CodeMirror Mode: Tiddlywiki Classic Highlighting","author":"JeremyRuston","list":"readme","version":"5.1.21","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/plugins/tiddlywiki/codemirror/mode/tiddlywiki/tiddlywiki.css":{"text":"span.cm-underlined {\n  text-decoration: underline;\n}\nspan.cm-strikethrough {\n  text-decoration: line-through;\n}\nspan.cm-brace {\n  color: #170;\n  font-weight: bold;\n}\nspan.cm-table {\n  color: blue;\n  font-weight: bold;\n}\n","type":"text/css","title":"$:/plugins/tiddlywiki/codemirror/mode/tiddlywiki/tiddlywiki.css","tags":"[[$:/tags/Stylesheet]]"},"$:/plugins/tiddlywiki/codemirror/mode/tiddlywiki/tiddlywiki.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(e){\"object\"==typeof exports&&\"object\"==typeof module?e(require(\"../../lib/codemirror\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\"],e):e(CodeMirror)}(function(e){\"use strict\";e.defineMode(\"tiddlywiki\",function(){var e={},t={allTags:!0,closeAll:!0,list:!0,newJournal:!0,newTiddler:!0,permaview:!0,saveChanges:!0,search:!0,slider:!0,tabs:!0,tag:!0,tagging:!0,tags:!0,tiddler:!0,timeline:!0,today:!0,version:!0,option:!0,with:!0,filter:!0},r=/[\\w_\\-]/i,n=/^\\-\\-\\-\\-+$/,i=/^\\/\\*\\*\\*$/,o=/^\\*\\*\\*\\/$/,u=/^<<<$/,a=/^\\/\\/\\{\\{\\{$/,f=/^\\/\\/\\}\\}\\}$/,c=/^<!--\\{\\{\\{-->$/,m=/^<!--\\}\\}\\}-->$/,l=/^\\{\\{\\{$/,k=/^\\}\\}\\}$/,d=/.*?\\}\\}\\}/;function h(e,t,r){return t.tokenize=r,r(e,t)}function s(t,k){var d=t.sol(),s=t.peek();if(k.block=!1,d&&/[<\\/\\*{}\\-]/.test(s)){if(t.match(l))return k.block=!0,h(t,k,$);if(t.match(u))return\"quote\";if(t.match(i)||t.match(o))return\"comment\";if(t.match(a)||t.match(f)||t.match(c)||t.match(m))return\"comment\";if(t.match(n))return\"hr\"}if(t.next(),d&&/[\\/\\*!#;:>|]/.test(s)){if(\"!\"==s)return t.skipToEnd(),\"header\";if(\"*\"==s)return t.eatWhile(\"*\"),\"comment\";if(\"#\"==s)return t.eatWhile(\"#\"),\"comment\";if(\";\"==s)return t.eatWhile(\";\"),\"comment\";if(\":\"==s)return t.eatWhile(\":\"),\"comment\";if(\">\"==s)return t.eatWhile(\">\"),\"quote\";if(\"|\"==s)return\"header\"}if(\"{\"==s&&t.match(/\\{\\{/))return h(t,k,$);if(/[hf]/i.test(s)&&/[ti]/i.test(t.peek())&&t.match(/\\b(ttps?|tp|ile):\\/\\/[\\-A-Z0-9+&@#\\/%?=~_|$!:,.;]*[A-Z0-9+&@#\\/%=~_|$]/i))return\"link\";if('\"'==s)return\"string\";if(\"~\"==s)return\"brace\";if(/[\\[\\]]/.test(s)&&t.match(s))return\"brace\";if(\"@\"==s)return t.eatWhile(r),\"link\";if(/\\d/.test(s))return t.eatWhile(/\\d/),\"number\";if(\"/\"==s){if(t.eat(\"%\"))return h(t,k,b);if(t.eat(\"/\"))return h(t,k,v)}if(\"_\"==s&&t.eat(\"_\"))return h(t,k,w);if(\"-\"==s&&t.eat(\"-\")){if(\" \"!=t.peek())return h(t,k,x);if(\" \"==t.peek())return\"brace\"}return\"'\"==s&&t.eat(\"'\")?h(t,k,p):\"<\"==s&&t.eat(\"<\")?h(t,k,z):(t.eatWhile(/[\\w\\$_]/),e.propertyIsEnumerable(t.current())?\"keyword\":null)}function b(e,t){for(var r,n=!1;r=e.next();){if(\"/\"==r&&n){t.tokenize=s;break}n=\"%\"==r}return\"comment\"}function p(e,t){for(var r,n=!1;r=e.next();){if(\"'\"==r&&n){t.tokenize=s;break}n=\"'\"==r}return\"strong\"}function $(e,t){var r=t.block;return r&&e.current()?\"comment\":!r&&e.match(d)?(t.tokenize=s,\"comment\"):r&&e.sol()&&e.match(k)?(t.tokenize=s,\"comment\"):(e.next(),\"comment\")}function v(e,t){for(var r,n=!1;r=e.next();){if(\"/\"==r&&n){t.tokenize=s;break}n=\"/\"==r}return\"em\"}function w(e,t){for(var r,n=!1;r=e.next();){if(\"_\"==r&&n){t.tokenize=s;break}n=\"_\"==r}return\"underlined\"}function x(e,t){for(var r,n=!1;r=e.next();){if(\"-\"==r&&n){t.tokenize=s;break}n=\"-\"==r}return\"strikethrough\"}function z(e,r){if(\"<<\"==e.current())return\"macro\";var n=e.next();return n?\">\"==n&&\">\"==e.peek()?(e.next(),r.tokenize=s,\"macro\"):(e.eatWhile(/[\\w\\$_]/),t.propertyIsEnumerable(e.current())?\"keyword\":null):(r.tokenize=s,null)}return{startState:function(){return{tokenize:s}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)}}}),e.defineMIME(\"text/x-tiddlywiki\",\"tiddlywiki\")});","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/mode/tiddlywiki/tiddlywiki.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror-mode-x-tiddlywiki/readme":{"title":"$:/plugins/tiddlywiki/codemirror-mode-x-tiddlywiki/readme","text":"This plugin adds Syntax Highlighting for ~TiddlyWiki Classic tiddlers (text/x-tiddlywiki) to the [[CodeMirror|http://codemirror.net]] text editor. It needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\n\n"}}});