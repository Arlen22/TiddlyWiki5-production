$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-autocomplete","description":"CodeMirror AddOn: Autocompletion","author":"JeremyRuston","list":"readme","version":"5.1.21","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/config/codemirror/autocomplete":{"title":"$:/config/codemirror/autocomplete","extend":"extraKeys","type":"json","text":"{\n\t\"Ctrl-Space\": \"autocomplete\"\n}"},"$:/plugins/tiddlywiki/codemirror/addon/hint/anyword-hint.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(e){\"object\"==typeof exports&&\"object\"==typeof module?e(require(\"../../lib/codemirror\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\"],e):e(CodeMirror)}(function(e){\"use strict\";var r=/[\\w$]+/;e.registerHelper(\"hint\",\"anyword\",function(t,o){for(var i=o&&o.word||r,n=o&&o.range||500,f=t.getCursor(),s=t.getLine(f.line),a=f.ch,c=a;c&&i.test(s.charAt(c-1));)--c;for(var l=c!=a&&s.slice(c,a),d=o&&o.list||[],u={},p=new RegExp(i.source,\"g\"),g=-1;g<=1;g+=2)for(var h=f.line,m=Math.min(Math.max(h+g*n,t.firstLine()),t.lastLine())+g;h!=m;h+=g)for(var y,b=t.getLine(h);y=p.exec(b);)h==f.line&&y[0]===l||l&&0!=y[0].lastIndexOf(l,0)||Object.prototype.hasOwnProperty.call(u,y[0])||(u[y[0]]=!0,d.push(y[0]));return{list:d,from:e.Pos(f.line,c),to:e.Pos(f.line,a)}})});","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/addon/hint/anyword-hint.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror/addon/hint/css-hint.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(e){\"object\"==typeof exports&&\"object\"==typeof module?e(require(\"../../lib/codemirror\"),require(\"../../mode/css/css\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\",\"../../mode/css/css\"],e):e(CodeMirror)}(function(e){\"use strict\";var r={link:1,visited:1,active:1,hover:1,focus:1,\"first-letter\":1,\"first-line\":1,\"first-child\":1,before:1,after:1,lang:1};e.registerHelper(\"hint\",\"css\",function(t){var o=t.getCursor(),s=t.getTokenAt(o),i=e.innerMode(t.getMode(),s.state);if(\"css\"==i.mode.name){if(\"keyword\"==s.type&&0==\"!important\".indexOf(s.string))return{list:[\"!important\"],from:e.Pos(o.line,s.start),to:e.Pos(o.line,s.end)};var n=s.start,a=o.ch,d=s.string.slice(0,a-n);/[^\\w$_-]/.test(d)&&(d=\"\",n=a=o.ch);var c=e.resolveMode(\"text/css\"),f=[],l=i.state.state;return\"pseudo\"==l||\"variable-3\"==s.type?p(r):\"block\"==l||\"maybeprop\"==l?p(c.propertyKeywords):\"prop\"==l||\"parens\"==l||\"at\"==l||\"params\"==l?(p(c.valueKeywords),p(c.colorKeywords)):\"media\"!=l&&\"media_parens\"!=l||(p(c.mediaTypes),p(c.mediaFeatures)),f.length?{list:f,from:e.Pos(o.line,n),to:e.Pos(o.line,a)}:void 0}function p(e){for(var r in e)d&&0!=r.lastIndexOf(d,0)||f.push(r)}})});","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/addon/hint/css-hint.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror/addon/hint/html-hint.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(l){\"object\"==typeof exports&&\"object\"==typeof module?l(require(\"../../lib/codemirror\"),require(\"./xml-hint\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\",\"./xml-hint\"],l):l(CodeMirror)}(function(l){\"use strict\";var t=\"ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu\".split(\" \"),e=[\"_blank\",\"_self\",\"_top\",\"_parent\"],a=[\"ascii\",\"utf-8\",\"utf-16\",\"latin1\",\"latin1\"],n=[\"get\",\"post\",\"put\",\"delete\"],r=[\"application/x-www-form-urlencoded\",\"multipart/form-data\",\"text/plain\"],o=[\"all\",\"screen\",\"print\",\"embossed\",\"braille\",\"handheld\",\"print\",\"projection\",\"screen\",\"tty\",\"tv\",\"speech\",\"3d-glasses\",\"resolution [>][<][=] [X]\",\"device-aspect-ratio: X/Y\",\"orientation:portrait\",\"orientation:landscape\",\"device-height: [X]\",\"device-width: [X]\"],s={attrs:{}},u={a:{attrs:{href:null,ping:null,type:null,media:o,target:e,hreflang:t}},abbr:s,acronym:s,address:s,applet:s,area:{attrs:{alt:null,coords:null,href:null,target:null,ping:null,media:o,hreflang:t,type:null,shape:[\"default\",\"rect\",\"circle\",\"poly\"]}},article:s,aside:s,audio:{attrs:{src:null,mediagroup:null,crossorigin:[\"anonymous\",\"use-credentials\"],preload:[\"none\",\"metadata\",\"auto\"],autoplay:[\"\",\"autoplay\"],loop:[\"\",\"loop\"],controls:[\"\",\"controls\"]}},b:s,base:{attrs:{href:null,target:e}},basefont:s,bdi:s,bdo:s,big:s,blockquote:{attrs:{cite:null}},body:s,br:s,button:{attrs:{form:null,formaction:null,name:null,value:null,autofocus:[\"\",\"autofocus\"],disabled:[\"\",\"autofocus\"],formenctype:r,formmethod:n,formnovalidate:[\"\",\"novalidate\"],formtarget:e,type:[\"submit\",\"reset\",\"button\"]}},canvas:{attrs:{width:null,height:null}},caption:s,center:s,cite:s,code:s,col:{attrs:{span:null}},colgroup:{attrs:{span:null}},command:{attrs:{type:[\"command\",\"checkbox\",\"radio\"],label:null,icon:null,radiogroup:null,command:null,title:null,disabled:[\"\",\"disabled\"],checked:[\"\",\"checked\"]}},data:{attrs:{value:null}},datagrid:{attrs:{disabled:[\"\",\"disabled\"],multiple:[\"\",\"multiple\"]}},datalist:{attrs:{data:null}},dd:s,del:{attrs:{cite:null,datetime:null}},details:{attrs:{open:[\"\",\"open\"]}},dfn:s,dir:s,div:s,dl:s,dt:s,em:s,embed:{attrs:{src:null,type:null,width:null,height:null}},eventsource:{attrs:{src:null}},fieldset:{attrs:{disabled:[\"\",\"disabled\"],form:null,name:null}},figcaption:s,figure:s,font:s,footer:s,form:{attrs:{action:null,name:null,\"accept-charset\":a,autocomplete:[\"on\",\"off\"],enctype:r,method:n,novalidate:[\"\",\"novalidate\"],target:e}},frame:s,frameset:s,h1:s,h2:s,h3:s,h4:s,h5:s,h6:s,head:{attrs:{},children:[\"title\",\"base\",\"link\",\"style\",\"meta\",\"script\",\"noscript\",\"command\"]},header:s,hgroup:s,hr:s,html:{attrs:{manifest:null},children:[\"head\",\"body\"]},i:s,iframe:{attrs:{src:null,srcdoc:null,name:null,width:null,height:null,sandbox:[\"allow-top-navigation\",\"allow-same-origin\",\"allow-forms\",\"allow-scripts\"],seamless:[\"\",\"seamless\"]}},img:{attrs:{alt:null,src:null,ismap:null,usemap:null,width:null,height:null,crossorigin:[\"anonymous\",\"use-credentials\"]}},input:{attrs:{alt:null,dirname:null,form:null,formaction:null,height:null,list:null,max:null,maxlength:null,min:null,name:null,pattern:null,placeholder:null,size:null,src:null,step:null,value:null,width:null,accept:[\"audio/*\",\"video/*\",\"image/*\"],autocomplete:[\"on\",\"off\"],autofocus:[\"\",\"autofocus\"],checked:[\"\",\"checked\"],disabled:[\"\",\"disabled\"],formenctype:r,formmethod:n,formnovalidate:[\"\",\"novalidate\"],formtarget:e,multiple:[\"\",\"multiple\"],readonly:[\"\",\"readonly\"],required:[\"\",\"required\"],type:[\"hidden\",\"text\",\"search\",\"tel\",\"url\",\"email\",\"password\",\"datetime\",\"date\",\"month\",\"week\",\"time\",\"datetime-local\",\"number\",\"range\",\"color\",\"checkbox\",\"radio\",\"file\",\"submit\",\"image\",\"reset\",\"button\"]}},ins:{attrs:{cite:null,datetime:null}},kbd:s,keygen:{attrs:{challenge:null,form:null,name:null,autofocus:[\"\",\"autofocus\"],disabled:[\"\",\"disabled\"],keytype:[\"RSA\"]}},label:{attrs:{for:null,form:null}},legend:s,li:{attrs:{value:null}},link:{attrs:{href:null,type:null,hreflang:t,media:o,sizes:[\"all\",\"16x16\",\"16x16 32x32\",\"16x16 32x32 64x64\"]}},map:{attrs:{name:null}},mark:s,menu:{attrs:{label:null,type:[\"list\",\"context\",\"toolbar\"]}},meta:{attrs:{content:null,charset:a,name:[\"viewport\",\"application-name\",\"author\",\"description\",\"generator\",\"keywords\"],\"http-equiv\":[\"content-language\",\"content-type\",\"default-style\",\"refresh\"]}},meter:{attrs:{value:null,min:null,low:null,high:null,max:null,optimum:null}},nav:s,noframes:s,noscript:s,object:{attrs:{data:null,type:null,name:null,usemap:null,form:null,width:null,height:null,typemustmatch:[\"\",\"typemustmatch\"]}},ol:{attrs:{reversed:[\"\",\"reversed\"],start:null,type:[\"1\",\"a\",\"A\",\"i\",\"I\"]}},optgroup:{attrs:{disabled:[\"\",\"disabled\"],label:null}},option:{attrs:{disabled:[\"\",\"disabled\"],label:null,selected:[\"\",\"selected\"],value:null}},output:{attrs:{for:null,form:null,name:null}},p:s,param:{attrs:{name:null,value:null}},pre:s,progress:{attrs:{value:null,max:null}},q:{attrs:{cite:null}},rp:s,rt:s,ruby:s,s:s,samp:s,script:{attrs:{type:[\"text/javascript\"],src:null,async:[\"\",\"async\"],defer:[\"\",\"defer\"],charset:a}},section:s,select:{attrs:{form:null,name:null,size:null,autofocus:[\"\",\"autofocus\"],disabled:[\"\",\"disabled\"],multiple:[\"\",\"multiple\"]}},small:s,source:{attrs:{src:null,type:null,media:null}},span:s,strike:s,strong:s,style:{attrs:{type:[\"text/css\"],media:o,scoped:null}},sub:s,summary:s,sup:s,table:s,tbody:s,td:{attrs:{colspan:null,rowspan:null,headers:null}},textarea:{attrs:{dirname:null,form:null,maxlength:null,name:null,placeholder:null,rows:null,cols:null,autofocus:[\"\",\"autofocus\"],disabled:[\"\",\"disabled\"],readonly:[\"\",\"readonly\"],required:[\"\",\"required\"],wrap:[\"soft\",\"hard\"]}},tfoot:s,th:{attrs:{colspan:null,rowspan:null,headers:null,scope:[\"row\",\"col\",\"rowgroup\",\"colgroup\"]}},thead:s,time:{attrs:{datetime:null}},title:s,tr:s,track:{attrs:{src:null,label:null,default:null,kind:[\"subtitles\",\"captions\",\"descriptions\",\"chapters\",\"metadata\"],srclang:t}},tt:s,u:s,ul:s,var:s,video:{attrs:{src:null,poster:null,width:null,height:null,crossorigin:[\"anonymous\",\"use-credentials\"],preload:[\"auto\",\"metadata\",\"none\"],autoplay:[\"\",\"autoplay\"],mediagroup:[\"movie\"],muted:[\"\",\"muted\"],controls:[\"\",\"controls\"]}},wbr:s},i={accesskey:[\"a\",\"b\",\"c\",\"d\",\"e\",\"f\",\"g\",\"h\",\"i\",\"j\",\"k\",\"l\",\"m\",\"n\",\"o\",\"p\",\"q\",\"r\",\"s\",\"t\",\"u\",\"v\",\"w\",\"x\",\"y\",\"z\",\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\"],class:null,contenteditable:[\"true\",\"false\"],contextmenu:null,dir:[\"ltr\",\"rtl\",\"auto\"],draggable:[\"true\",\"false\",\"auto\"],dropzone:[\"copy\",\"move\",\"link\",\"string:\",\"file:\"],hidden:[\"hidden\"],id:null,inert:[\"inert\"],itemid:null,itemprop:null,itemref:null,itemscope:[\"itemscope\"],itemtype:null,lang:[\"en\",\"es\"],spellcheck:[\"true\",\"false\"],style:null,tabindex:[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\"],title:null,translate:[\"yes\",\"no\"],onclick:null,rel:[\"stylesheet\",\"alternate\",\"author\",\"bookmark\",\"help\",\"license\",\"next\",\"nofollow\",\"noreferrer\",\"prefetch\",\"prev\",\"search\",\"tag\"]};function d(l){for(var t in i)i.hasOwnProperty(t)&&(l.attrs[t]=i[t])}for(var c in d(s),u)u.hasOwnProperty(c)&&u[c]!=s&&d(u[c]);l.htmlSchema=u,l.registerHelper(\"hint\",\"html\",function(t,e){var a={schemaInfo:u};if(e)for(var n in e)a[n]=e[n];return l.hint.xml(t,a)})});","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/addon/hint/html-hint.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror/addon/hint/javascript-hint.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(t){\"object\"==typeof exports&&\"object\"==typeof module?t(require(\"../../lib/codemirror\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\"],t):t(CodeMirror)}(function(t){var e=t.Pos;function r(t,e){for(var r=0,n=t.length;r<n;++r)e(t[r])}function n(n,i,l,f){var c=n.getCursor(),p=l(n,c);if(!/\\b(?:string|comment)\\b/.test(p.type)){var u=t.innerMode(n.getMode(),p.state);if(\"json\"!==u.mode.helperType){p.state=u.state,/^[\\w$_]*$/.test(p.string)?p.end>c.ch&&(p.end=c.ch,p.string=p.string.slice(0,c.ch-p.start)):p={start:c.ch,end:c.ch,string:\"\",state:p.state,type:\".\"==p.string?\"property\":null};for(var d=p;\"property\"==d.type;){if(\".\"!=(d=l(n,e(c.line,d.start))).string)return;if(d=l(n,e(c.line,d.start)),!g)var g=[];g.push(d)}return{list:function(t,e,n,i){var l=[],f=t.string,c=i&&i.globalScope||window;function p(t){0!=t.lastIndexOf(f,0)||function(t,e){if(!Array.prototype.indexOf){for(var r=t.length;r--;)if(t[r]===e)return!0;return!1}return-1!=t.indexOf(e)}(l,t)||l.push(t)}function u(t){\"string\"==typeof t?r(o,p):t instanceof Array?r(s,p):t instanceof Function&&r(a,p),function(t,e){if(Object.getOwnPropertyNames&&Object.getPrototypeOf)for(var r=t;r;r=Object.getPrototypeOf(r))Object.getOwnPropertyNames(r).forEach(e);else for(var n in t)e(n)}(t,p)}if(e&&e.length){var d,g=e.pop();for(g.type&&0===g.type.indexOf(\"variable\")?(i&&i.additionalContext&&(d=i.additionalContext[g.string]),i&&!1===i.useGlobalScope||(d=d||c[g.string])):\"string\"==g.type?d=\"\":\"atom\"==g.type?d=1:\"function\"==g.type&&(null==c.jQuery||\"$\"!=g.string&&\"jQuery\"!=g.string||\"function\"!=typeof c.jQuery?null!=c._&&\"_\"==g.string&&\"function\"==typeof c._&&(d=c._()):d=c.jQuery());null!=d&&e.length;)d=d[e.pop().string];null!=d&&u(d)}else{for(var y=t.state.localVars;y;y=y.next)p(y.name);for(var y=t.state.globalVars;y;y=y.next)p(y.name);i&&!1===i.useGlobalScope||u(c),r(n,p)}return l}(p,g,i,f),from:e(c.line,p.start),to:e(c.line,p.end)}}}}function i(t,e){var r=t.getTokenAt(e);return e.ch==r.start+1&&\".\"==r.string.charAt(0)?(r.end=r.start,r.string=\".\",r.type=\"property\"):/^\\.[\\w$_]*$/.test(r.string)&&(r.type=\"property\",r.start++,r.string=r.string.replace(/\\./,\"\")),r}t.registerHelper(\"hint\",\"javascript\",function(t,e){return n(t,l,function(t,e){return t.getTokenAt(e)},e)}),t.registerHelper(\"hint\",\"coffeescript\",function(t,e){return n(t,f,i,e)});var o=\"charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search\".split(\" \"),s=\"length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight \".split(\" \"),a=\"prototype apply call bind\".split(\" \"),l=\"break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield\".split(\" \"),f=\"and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes\".split(\" \")});\n","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/addon/hint/javascript-hint.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror/addon/hint/show-hint.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(t){\"object\"==typeof exports&&\"object\"==typeof module?t(require(\"../../lib/codemirror\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\"],t):t(CodeMirror)}(function(t){\"use strict\";var i=\"CodeMirror-hint\",e=\"CodeMirror-hint-active\";function n(t,i){this.cm=t,this.options=i,this.widget=null,this.debounce=0,this.tick=0,this.startPos=this.cm.getCursor(\"start\"),this.startLen=this.cm.getLine(this.startPos.line).length-this.cm.getSelection().length;var e=this;t.on(\"cursorActivity\",this.activityFunc=function(){e.cursorActivity()})}t.showHint=function(t,i,e){if(!i)return t.showHint(e);e&&e.async&&(i.async=!0);var n={hint:i};if(e)for(var o in e)n[o]=e[o];return t.showHint(n)},t.defineExtension(\"showHint\",function(i){i=function(t,i,e){var n=t.options.hintOptions,o={};for(var s in a)o[s]=a[s];if(n)for(var s in n)void 0!==n[s]&&(o[s]=n[s]);if(e)for(var s in e)void 0!==e[s]&&(o[s]=e[s]);o.hint.resolve&&(o.hint=o.hint.resolve(t,i));return o}(this,this.getCursor(\"start\"),i);var e=this.listSelections();if(!(e.length>1)){if(this.somethingSelected()){if(!i.hint.supportsSelection)return;for(var o=0;o<e.length;o++)if(e[o].head.line!=e[o].anchor.line)return}this.state.completionActive&&this.state.completionActive.close();var s=this.state.completionActive=new n(this,i);s.options.hint&&(t.signal(this,\"startCompletion\",this),s.update(!0))}});var o=window.requestAnimationFrame||function(t){return setTimeout(t,1e3/60)},s=window.cancelAnimationFrame||clearTimeout;function c(t){return\"string\"==typeof t?t:t.text}function r(t,i){for(;i&&i!=t;){if(\"LI\"===i.nodeName.toUpperCase()&&i.parentNode==t)return i;i=i.parentNode}}function h(n,o){this.completion=n,this.data=o,this.picked=!1;var s=this,h=n.cm,l=this.hints=document.createElement(\"ul\");l.className=\"CodeMirror-hints\",this.selectedHint=o.selectedHint||0;for(var a=o.list,u=0;u<a.length;++u){var f=l.appendChild(document.createElement(\"li\")),d=a[u],p=i+(u!=this.selectedHint?\"\":\" \"+e);null!=d.className&&(p=d.className+\" \"+p),f.className=p,d.render?d.render(f,o,d):f.appendChild(document.createTextNode(d.displayText||c(d))),f.hintId=u}var m=h.cursorCoords(n.options.alignWithWord?o.from:null),g=m.left,v=m.bottom,y=!0;l.style.left=g+\"px\",l.style.top=v+\"px\";var w=window.innerWidth||Math.max(document.body.offsetWidth,document.documentElement.offsetWidth),H=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);(n.options.container||document.body).appendChild(l);var k=l.getBoundingClientRect(),C=k.bottom-H,b=l.scrollHeight>l.clientHeight+1,x=h.getScrollInfo();if(C>0){var A=k.bottom-k.top;if(m.top-(m.bottom-k.top)-A>0)l.style.top=(v=m.top-A)+\"px\",y=!1;else if(A>H){l.style.height=H-5+\"px\",l.style.top=(v=m.bottom-k.top)+\"px\";var S=h.getCursor();o.from.ch!=S.ch&&(m=h.cursorCoords(S),l.style.left=(g=m.left)+\"px\",k=l.getBoundingClientRect())}}var T,M=k.right-w;if(M>0&&(k.right-k.left>w&&(l.style.width=w-5+\"px\",M-=k.right-k.left-w),l.style.left=(g=m.left-M)+\"px\"),b)for(var N=l.firstChild;N;N=N.nextSibling)N.style.paddingRight=h.display.nativeBarWidth+\"px\";(h.addKeyMap(this.keyMap=function(t,i){var e={Up:function(){i.moveFocus(-1)},Down:function(){i.moveFocus(1)},PageUp:function(){i.moveFocus(1-i.menuSize(),!0)},PageDown:function(){i.moveFocus(i.menuSize()-1,!0)},Home:function(){i.setFocus(0)},End:function(){i.setFocus(i.length-1)},Enter:i.pick,Tab:i.pick,Esc:i.close},n=t.options.customKeys,o=n?{}:e;function s(t,n){var s;s=\"string\"!=typeof n?function(t){return n(t,i)}:e.hasOwnProperty(n)?e[n]:n,o[t]=s}if(n)for(var c in n)n.hasOwnProperty(c)&&s(c,n[c]);var r=t.options.extraKeys;if(r)for(var c in r)r.hasOwnProperty(c)&&s(c,r[c]);return o}(n,{moveFocus:function(t,i){s.changeActive(s.selectedHint+t,i)},setFocus:function(t){s.changeActive(t)},menuSize:function(){return s.screenAmount()},length:a.length,close:function(){n.close()},pick:function(){s.pick()},data:o})),n.options.closeOnUnfocus)&&(h.on(\"blur\",this.onBlur=function(){T=setTimeout(function(){n.close()},100)}),h.on(\"focus\",this.onFocus=function(){clearTimeout(T)}));return h.on(\"scroll\",this.onScroll=function(){var t=h.getScrollInfo(),i=h.getWrapperElement().getBoundingClientRect(),e=v+x.top-t.top,o=e-(window.pageYOffset||(document.documentElement||document.body).scrollTop);if(y||(o+=l.offsetHeight),o<=i.top||o>=i.bottom)return n.close();l.style.top=e+\"px\",l.style.left=g+x.left-t.left+\"px\"}),t.on(l,\"dblclick\",function(t){var i=r(l,t.target||t.srcElement);i&&null!=i.hintId&&(s.changeActive(i.hintId),s.pick())}),t.on(l,\"click\",function(t){var i=r(l,t.target||t.srcElement);i&&null!=i.hintId&&(s.changeActive(i.hintId),n.options.completeOnSingleClick&&s.pick())}),t.on(l,\"mousedown\",function(){setTimeout(function(){h.focus()},20)}),t.signal(o,\"select\",a[this.selectedHint],l.childNodes[this.selectedHint]),!0}function l(t,i,e,n){if(t.async)t(i,n,e);else{var o=t(i,e);o&&o.then?o.then(n):n(o)}}n.prototype={close:function(){this.active()&&(this.cm.state.completionActive=null,this.tick=null,this.cm.off(\"cursorActivity\",this.activityFunc),this.widget&&this.data&&t.signal(this.data,\"close\"),this.widget&&this.widget.close(),t.signal(this.cm,\"endCompletion\",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(i,e){var n=i.list[e];n.hint?n.hint(this.cm,i,n):this.cm.replaceRange(c(n),n.from||i.from,n.to||i.to,\"complete\"),t.signal(i,\"pick\",n),this.close()},cursorActivity:function(){this.debounce&&(s(this.debounce),this.debounce=0);var t=this.cm.getCursor(),i=this.cm.getLine(t.line);if(t.line!=this.startPos.line||i.length-t.ch!=this.startLen-this.startPos.ch||t.ch<this.startPos.ch||this.cm.somethingSelected()||t.ch&&this.options.closeCharacters.test(i.charAt(t.ch-1)))this.close();else{var e=this;this.debounce=o(function(){e.update()}),this.widget&&this.widget.disable()}},update:function(t){if(null!=this.tick){var i=this,e=++this.tick;l(this.options.hint,this.cm,this.options,function(n){i.tick==e&&i.finishUpdate(n,t)})}},finishUpdate:function(i,e){this.data&&t.signal(this.data,\"update\");var n=this.widget&&this.widget.picked||e&&this.options.completeSingle;this.widget&&this.widget.close(),this.data=i,i&&i.list.length&&(n&&1==i.list.length?this.pick(i,0):(this.widget=new h(this,i),t.signal(i,\"shown\")))}},h.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null,this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap);var t=this.completion.cm;this.completion.options.closeOnUnfocus&&(t.off(\"blur\",this.onBlur),t.off(\"focus\",this.onFocus)),t.off(\"scroll\",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var t=this;this.keyMap={Enter:function(){t.picked=!0}},this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(i,n){if(i>=this.data.list.length?i=n?this.data.list.length-1:0:i<0&&(i=n?0:this.data.list.length-1),this.selectedHint!=i){var o=this.hints.childNodes[this.selectedHint];o.className=o.className.replace(\" \"+e,\"\"),(o=this.hints.childNodes[this.selectedHint=i]).className+=\" \"+e,o.offsetTop<this.hints.scrollTop?this.hints.scrollTop=o.offsetTop-3:o.offsetTop+o.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=o.offsetTop+o.offsetHeight-this.hints.clientHeight+3),t.signal(this.data,\"select\",this.data.list[this.selectedHint],o)}},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}},t.registerHelper(\"hint\",\"auto\",{resolve:function(i,e){var n,o=i.getHelpers(e,\"hint\");if(o.length){var s=function(t,i,e){var n=function(t,i){if(!t.somethingSelected())return i;for(var e=[],n=0;n<i.length;n++)i[n].supportsSelection&&e.push(i[n]);return e}(t,o);!function o(s){if(s==n.length)return i(null);l(n[s],t,e,function(t){t&&t.list.length>0?i(t):o(s+1)})}(0)};return s.async=!0,s.supportsSelection=!0,s}return(n=i.getHelper(i.getCursor(),\"hintWords\"))?function(i){return t.hint.fromList(i,{words:n})}:t.hint.anyword?function(i,e){return t.hint.anyword(i,e)}:function(){}}}),t.registerHelper(\"hint\",\"fromList\",function(i,e){var n,o=i.getCursor(),s=i.getTokenAt(o),c=t.Pos(o.line,s.start),r=o;s.start<o.ch&&/\\w/.test(s.string.charAt(o.ch-s.start-1))?n=s.string.substr(0,o.ch-s.start):(n=\"\",c=o);for(var h=[],l=0;l<e.words.length;l++){var a=e.words[l];a.slice(0,n.length)==n&&h.push(a)}if(h.length)return{list:h,from:c,to:r}}),t.commands.autocomplete=t.showHint;var a={hint:t.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\\s()\\[\\]{};:>,]/,closeOnUnfocus:!0,completeOnSingleClick:!0,container:null,customKeys:null,extraKeys:null};t.defineOption(\"hintOptions\",null)});\n","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/addon/hint/show-hint.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror/addon/hint/show-hint.css":{"text":".CodeMirror-hints {\n  position: absolute;\n  z-index: 10;\n  overflow: hidden;\n  list-style: none;\n\n  margin: 0;\n  padding: 2px;\n\n  -webkit-box-shadow: 2px 3px 5px rgba(0,0,0,.2);\n  -moz-box-shadow: 2px 3px 5px rgba(0,0,0,.2);\n  box-shadow: 2px 3px 5px rgba(0,0,0,.2);\n  border-radius: 3px;\n  border: 1px solid silver;\n\n  background: white;\n  font-size: 90%;\n  font-family: monospace;\n\n  max-height: 20em;\n  overflow-y: auto;\n}\n\n.CodeMirror-hint {\n  margin: 0;\n  padding: 0 4px;\n  border-radius: 2px;\n  white-space: pre;\n  color: black;\n  cursor: pointer;\n}\n\nli.CodeMirror-hint-active {\n  background: #08f;\n  color: white;\n}\n","type":"text/css","title":"$:/plugins/tiddlywiki/codemirror/addon/hint/show-hint.css","tags":"[[$:/tags/Stylesheet]]"},"$:/plugins/tiddlywiki/codemirror/addon/hint/xml-hint.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(t){\"object\"==typeof exports&&\"object\"==typeof module?t(require(\"../../lib/codemirror\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\"],t):t(CodeMirror)}(function(t){\"use strict\";var e=t.Pos;t.registerHelper(\"hint\",\"xml\",function(r,s){var n=s&&s.schemaInfo,a=s&&s.quoteChar||'\"';if(n){var i=r.getCursor(),o=r.getTokenAt(i);o.end>i.ch&&(o.end=i.ch,o.string=o.string.slice(0,i.ch-o.start));var l=t.innerMode(r.getMode(),o.state);if(\"xml\"==l.mode.name){var f,g,c=[],h=!1,p=/\\btag\\b/.test(o.type)&&!/>$/.test(o.string),u=p&&/^\\w/.test(o.string);if(u){var d=r.getLine(i.line).slice(Math.max(0,o.start-2),o.start),m=/<\\/$/.test(d)?\"close\":/<$/.test(d)?\"open\":null;m&&(g=o.start-(\"close\"==m?2:1))}else p&&\"<\"==o.string?m=\"open\":p&&\"</\"==o.string&&(m=\"close\");if(!p&&!l.state.tagName||m){u&&(f=o.string),h=m;var v=l.state.context,y=v&&n[v.tagName],x=v?y&&y.children:n[\"!top\"];if(x&&\"close\"!=m)for(var O=0;O<x.length;++O)f&&0!=x[O].lastIndexOf(f,0)||c.push(\"<\"+x[O]);else if(\"close\"!=m)for(var b in n)!n.hasOwnProperty(b)||\"!top\"==b||\"!attrs\"==b||f&&0!=b.lastIndexOf(f,0)||c.push(\"<\"+b);v&&(!f||\"close\"==m&&0==v.tagName.lastIndexOf(f,0))&&c.push(\"</\"+v.tagName+\">\")}else{var w=(y=n[l.state.tagName])&&y.attrs,I=n[\"!attrs\"];if(!w&&!I)return;if(w){if(I){var P={};for(var A in I)I.hasOwnProperty(A)&&(P[A]=I[A]);for(var A in w)w.hasOwnProperty(A)&&(P[A]=w[A]);w=P}}else w=I;if(\"string\"==o.type||\"=\"==o.string){var M,N=(d=r.getRange(e(i.line,Math.max(0,i.ch-60)),e(i.line,\"string\"==o.type?o.start:o.end))).match(/([^\\s\\u00a0=<>\\\"\\']+)=$/);if(!N||!w.hasOwnProperty(N[1])||!(M=w[N[1]]))return;if(\"function\"==typeof M&&(M=M.call(this,r)),\"string\"==o.type){f=o.string;var $=0;/['\"]/.test(o.string.charAt(0))&&(a=o.string.charAt(0),f=o.string.slice(1),$++);var C=o.string.length;/['\"]/.test(o.string.charAt(C-1))&&(a=o.string.charAt(C-1),f=o.string.substr($,C-2)),h=!0}for(O=0;O<M.length;++O)f&&0!=M[O].lastIndexOf(f,0)||c.push(a+M[O]+a)}else for(var j in\"attribute\"==o.type&&(f=o.string,h=!0),w)!w.hasOwnProperty(j)||f&&0!=j.lastIndexOf(f,0)||c.push(j)}return{list:c,from:h?e(i.line,null==g?o.start:g):i,to:h?e(i.line,o.end):i}}}})});","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/addon/hint/xml-hint.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror-autocomplete/readme":{"title":"$:/plugins/tiddlywiki/codemirror-autocomplete/readme","text":"This plugin enhances the [[CodeMirror|http://codemirror.net]] text editor with Autocompletion functionality. It needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\n\nIt adds Autocompletion for ''html'', ''javascript'' and ''xml'' and also for ''already present words'' within a text-editor instance\n\nThe ''Keyboard Shortcut'' for autocompletion is `Ctrl+Space`\n\n"}}});