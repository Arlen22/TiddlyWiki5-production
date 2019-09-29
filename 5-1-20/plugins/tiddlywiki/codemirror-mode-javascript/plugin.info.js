$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/codemirror-mode-javascript","description":"CodeMirror Mode: Javascript Highlighting","author":"JeremyRuston","list":"readme","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/plugins/tiddlywiki/codemirror/mode/javascript/javascript.js":{"text":"// CodeMirror, copyright (c) by Marijn Haverbeke and others\n// Distributed under an MIT license: http://codemirror.net/LICENSE\n!function(e){\"object\"==typeof exports&&\"object\"==typeof module?e(require(\"../../lib/codemirror\")):\"function\"==typeof define&&define.amd?define([\"../../lib/codemirror\"],e):e(CodeMirror)}(function(e){\"use strict\";e.defineMode(\"javascript\",function(t,r){var n,a,i=t.indentUnit,o=r.statementIndent,c=r.jsonld,u=r.json||c,s=r.typescript,f=r.wordCharacters||/[\\w$\\xa1-\\uffff]/,l=function(){function e(e){return{type:e,style:\"keyword\"}}var t=e(\"keyword a\"),r=e(\"keyword b\"),n=e(\"keyword c\"),a=e(\"keyword d\"),i=e(\"operator\"),o={type:\"atom\",style:\"atom\"};return{if:e(\"if\"),while:t,with:t,else:r,do:r,try:r,finally:r,return:a,break:a,continue:a,new:e(\"new\"),delete:n,void:n,throw:n,debugger:e(\"debugger\"),var:e(\"var\"),const:e(\"var\"),let:e(\"var\"),function:e(\"function\"),catch:e(\"catch\"),for:e(\"for\"),switch:e(\"switch\"),case:e(\"case\"),default:e(\"default\"),in:i,typeof:i,instanceof:i,true:o,false:o,null:o,undefined:o,NaN:o,Infinity:o,this:e(\"this\"),class:e(\"class\"),super:e(\"atom\"),yield:n,export:e(\"export\"),import:e(\"import\"),extends:n,await:n}}(),d=/[+\\-*&%=<>!?|~^@]/,p=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)\"/;function m(e,t,r){return n=e,a=r,t}function k(e,t){var r,n=e.next();if('\"'==n||\"'\"==n)return t.tokenize=(r=n,function(e,t){var n,a=!1;if(c&&\"@\"==e.peek()&&e.match(p))return t.tokenize=k,m(\"jsonld-keyword\",\"meta\");for(;null!=(n=e.next())&&(n!=r||a);)a=!a&&\"\\\\\"==n;return a||(t.tokenize=k),m(\"string\",\"string\")}),t.tokenize(e,t);if(\".\"==n&&e.match(/^\\d+(?:[eE][+\\-]?\\d+)?/))return m(\"number\",\"number\");if(\".\"==n&&e.match(\"..\"))return m(\"spread\",\"meta\");if(/[\\[\\]{}\\(\\),;\\:\\.]/.test(n))return m(n);if(\"=\"==n&&e.eat(\">\"))return m(\"=>\",\"operator\");if(\"0\"==n&&e.eat(/x/i))return e.eatWhile(/[\\da-f]/i),m(\"number\",\"number\");if(\"0\"==n&&e.eat(/o/i))return e.eatWhile(/[0-7]/i),m(\"number\",\"number\");if(\"0\"==n&&e.eat(/b/i))return e.eatWhile(/[01]/i),m(\"number\",\"number\");if(/\\d/.test(n))return e.match(/^\\d*(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/),m(\"number\",\"number\");if(\"/\"==n)return e.eat(\"*\")?(t.tokenize=v,v(e,t)):e.eat(\"/\")?(e.skipToEnd(),m(\"comment\",\"comment\")):He(e,t,1)?(function(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if(\"/\"==t&&!n)return;\"[\"==t?n=!0:n&&\"]\"==t&&(n=!1)}r=!r&&\"\\\\\"==t}}(e),e.match(/^\\b(([gimyu])(?![gimyu]*\\2))+\\b/),m(\"regexp\",\"string-2\")):(e.eat(\"=\"),m(\"operator\",\"operator\",e.current()));if(\"`\"==n)return t.tokenize=y,y(e,t);if(\"#\"==n)return e.skipToEnd(),m(\"error\",\"error\");if(d.test(n))return\">\"==n&&t.lexical&&\">\"==t.lexical.type||(e.eat(\"=\")?\"!\"!=n&&\"=\"!=n||e.eat(\"=\"):/[<>*+\\-]/.test(n)&&(e.eat(n),\">\"==n&&e.eat(n))),m(\"operator\",\"operator\",e.current());if(f.test(n)){e.eatWhile(f);var a=e.current();if(\".\"!=t.lastType){if(l.propertyIsEnumerable(a)){var i=l[a];return m(i.type,i.style,a)}if(\"async\"==a&&e.match(/^(\\s|\\/\\*.*?\\*\\/)*[\\[\\(\\w]/,!1))return m(\"async\",\"keyword\",a)}return m(\"variable\",\"variable\",a)}}function v(e,t){for(var r,n=!1;r=e.next();){if(\"/\"==r&&n){t.tokenize=k;break}n=\"*\"==r}return m(\"comment\",\"comment\")}function y(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&(\"`\"==r||\"$\"==r&&e.eat(\"{\"))){t.tokenize=k;break}n=!n&&\"\\\\\"==r}return m(\"quasi\",\"string-2\",e.current())}var b=\"([{}])\";function w(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf(\"=>\",e.start);if(!(r<0)){if(s){var n=/:\\s*(?:\\w+(?:<[^>]*>|\\[\\])?|\\{[^}]*\\})\\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var a=0,i=!1,o=r-1;o>=0;--o){var c=e.string.charAt(o),u=b.indexOf(c);if(u>=0&&u<3){if(!a){++o;break}if(0==--a){\"(\"==c&&(i=!0);break}}else if(u>=3&&u<6)++a;else if(f.test(c))i=!0;else{if(/[\"'\\/]/.test(c))return;if(i&&!a){++o;break}}}i&&!a&&(t.fatArrowAt=o)}}var x={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,\"jsonld-keyword\":!0};function h(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function g(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}var j={state:null,column:null,marked:null,cc:null};function M(){for(var e=arguments.length-1;e>=0;e--)j.cc.push(arguments[e])}function V(){return M.apply(null,arguments),!0}function A(e){function t(t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}var n=j.state;if(j.marked=\"def\",n.context){if(t(n.localVars))return;n.localVars={name:e,next:n.localVars}}else{if(t(n.globalVars))return;r.globalVars&&(n.globalVars={name:e,next:n.globalVars})}}function E(e){return\"public\"==e||\"private\"==e||\"protected\"==e||\"abstract\"==e||\"readonly\"==e}var z={name:\"this\",next:{name:\"arguments\"}};function I(){j.state.context={prev:j.state.context,vars:j.state.localVars},j.state.localVars=z}function T(){j.state.localVars=j.state.context.vars,j.state.context=j.state.context.prev}function $(e,t){var r=function(){var r=j.state,n=r.indented;if(\"stat\"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&\")\"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new h(n,j.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function C(){var e=j.state;e.lexical.prev&&(\")\"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function q(e){return function t(r){return r==e?V():\";\"==e?M():V(t)}}function O(e,t){return\"var\"==e?V($(\"vardef\",t.length),pe,q(\";\"),C):\"keyword a\"==e?V($(\"form\"),W,O,C):\"keyword b\"==e?V($(\"form\"),O,C):\"keyword d\"==e?j.stream.match(/^\\s*$/,!1)?V():V($(\"stat\"),U,q(\";\"),C):\"debugger\"==e?V(q(\";\")):\"{\"==e?V($(\"}\"),te,C):\";\"==e?V():\"if\"==e?(\"else\"==j.state.lexical.info&&j.state.cc[j.state.cc.length-1]==C&&j.state.cc.pop()(),V($(\"form\"),W,O,C,be)):\"function\"==e?V(Me):\"for\"==e?V($(\"form\"),we,O,C):\"class\"==e||s&&\"interface\"==t?(j.marked=\"keyword\",V($(\"form\"),Ee,C)):\"variable\"==e?s&&\"declare\"==t?(j.marked=\"keyword\",V(O)):s&&(\"module\"==t||\"enum\"==t||\"type\"==t)&&j.stream.match(/^\\s*\\w/,!1)?(j.marked=\"keyword\",\"enum\"==t?V(Ue):\"type\"==t?V(ie,q(\"operator\"),ie,q(\";\")):V($(\"form\"),me,q(\"{\"),$(\"}\"),te,C,C)):s&&\"namespace\"==t?(j.marked=\"keyword\",V($(\"form\"),P,te,C)):s&&\"abstract\"==t?(j.marked=\"keyword\",V(O)):V($(\"stat\"),Q):\"switch\"==e?V($(\"form\"),W,q(\"{\"),$(\"}\",\"switch\"),te,C,C):\"case\"==e?V(P,q(\":\")):\"default\"==e?V(q(\":\")):\"catch\"==e?V($(\"form\"),I,q(\"(\"),Ve,q(\")\"),O,C,T):\"export\"==e?V($(\"stat\"),$e,C):\"import\"==e?V($(\"stat\"),qe,C):\"async\"==e?V(O):\"@\"==t?V(P,O):M($(\"stat\"),P,q(\";\"),C)}function P(e,t){return N(e,t,!1)}function S(e,t){return N(e,t,!0)}function W(e){return\"(\"!=e?M():V($(\")\"),P,q(\")\"),C)}function N(e,t,r){if(j.state.fatArrowAt==j.stream.start){var n=r?J:G;if(\"(\"==e)return V(I,$(\")\"),_(Ve,\")\"),C,q(\"=>\"),n,T);if(\"variable\"==e)return M(I,me,q(\"=>\"),n,T)}var a,i=r?H:B;return x.hasOwnProperty(e)?V(i):\"function\"==e?V(Me,i):\"class\"==e||s&&\"interface\"==t?(j.marked=\"keyword\",V($(\"form\"),Ae,C)):\"keyword c\"==e||\"async\"==e?V(r?S:P):\"(\"==e?V($(\")\"),U,q(\")\"),C,i):\"operator\"==e||\"spread\"==e?V(r?S:P):\"[\"==e?V($(\"]\"),Ne,C,i):\"{\"==e?ee(X,\"}\",null,i):\"quasi\"==e?M(D,i):\"new\"==e?V((a=r,function(e){return\".\"==e?V(a?L:K):\"variable\"==e&&s?V(fe,a?H:B):M(a?S:P)})):\"import\"==e?V(P):V()}function U(e){return e.match(/[;\\}\\)\\],]/)?M():M(P)}function B(e,t){return\",\"==e?V(P):H(e,t,!1)}function H(e,t,r){var n=0==r?B:H,a=0==r?P:S;return\"=>\"==e?V(I,r?J:G,T):\"operator\"==e?/\\+\\+|--/.test(t)||s&&\"!\"==t?V(n):s&&\"<\"==t&&j.stream.match(/^([^>]|<.*?>)*>\\s*\\(/,!1)?V($(\">\"),_(ie,\">\"),C,n):\"?\"==t?V(P,q(\":\"),a):V(a):\"quasi\"==e?M(D,n):\";\"!=e?\"(\"==e?ee(S,\")\",\"call\",n):\".\"==e?V(R,n):\"[\"==e?V($(\"]\"),U,q(\"]\"),C,n):s&&\"as\"==t?(j.marked=\"keyword\",V(ie,n)):\"regexp\"==e?(j.state.lastType=j.marked=\"operator\",j.stream.backUp(j.stream.pos-j.stream.start-1),V(a)):void 0:void 0}function D(e,t){return\"quasi\"!=e?M():\"${\"!=t.slice(t.length-2)?V(D):V(P,F)}function F(e){if(\"}\"==e)return j.marked=\"string-2\",j.state.tokenize=y,V(D)}function G(e){return w(j.stream,j.state),M(\"{\"==e?O:P)}function J(e){return w(j.stream,j.state),M(\"{\"==e?O:S)}function K(e,t){if(\"target\"==t)return j.marked=\"keyword\",V(B)}function L(e,t){if(\"target\"==t)return j.marked=\"keyword\",V(H)}function Q(e){return\":\"==e?V(C,O):M(B,q(\";\"),C)}function R(e){if(\"variable\"==e)return j.marked=\"property\",V()}function X(e,t){if(\"async\"==e)return j.marked=\"property\",V(X);if(\"variable\"==e||\"keyword\"==j.style){return j.marked=\"property\",\"get\"==t||\"set\"==t?V(Y):(s&&j.state.fatArrowAt==j.stream.start&&(r=j.stream.match(/^\\s*:\\s*/,!1))&&(j.state.fatArrowAt=j.stream.pos+r[0].length),V(Z));var r}else{if(\"number\"==e||\"string\"==e)return j.marked=c?\"property\":j.style+\" property\",V(Z);if(\"jsonld-keyword\"==e)return V(Z);if(s&&E(t))return j.marked=\"keyword\",V(X);if(\"[\"==e)return V(P,re,q(\"]\"),Z);if(\"spread\"==e)return V(S,Z);if(\"*\"==t)return j.marked=\"keyword\",V(X);if(\":\"==e)return M(Z)}}function Y(e){return\"variable\"!=e?M(Z):(j.marked=\"property\",V(Me))}function Z(e){return\":\"==e?V(S):\"(\"==e?M(Me):void 0}function _(e,t,r){function n(a,i){if(r?r.indexOf(a)>-1:\",\"==a){var o=j.state.lexical;return\"call\"==o.info&&(o.pos=(o.pos||0)+1),V(function(r,n){return r==t||n==t?M():M(e)},n)}return a==t||i==t?V():V(q(t))}return function(r,a){return r==t||a==t?V():M(e,n)}}function ee(e,t,r){for(var n=3;n<arguments.length;n++)j.cc.push(arguments[n]);return V($(t,r),_(e,t),C)}function te(e){return\"}\"==e?V():M(O,te)}function re(e,t){if(s){if(\":\"==e)return V(ie);if(\"?\"==t)return V(re)}}function ne(e){if(s&&\":\"==e)return j.stream.match(/^\\s*\\w+\\s+is\\b/,!1)?V(P,ae,ie):V(ie)}function ae(e,t){if(\"is\"==t)return j.marked=\"keyword\",V()}function ie(e,t){return\"keyof\"==t||\"typeof\"==t?(j.marked=\"keyword\",V(\"keyof\"==t?ie:S)):\"variable\"==e||\"void\"==t?(j.marked=\"type\",V(se)):\"string\"==e||\"number\"==e||\"atom\"==e?V(se):\"[\"==e?V($(\"]\"),_(ie,\"]\",\",\"),C,se):\"{\"==e?V($(\"}\"),_(ce,\"}\",\",;\"),C,se):\"(\"==e?V(_(ue,\")\"),oe):\"<\"==e?V(_(ie,\">\"),ie):void 0}function oe(e){if(\"=>\"==e)return V(ie)}function ce(e,t){return\"variable\"==e||\"keyword\"==j.style?(j.marked=\"property\",V(ce)):\"?\"==t?V(ce):\":\"==e?V(ie):\"[\"==e?V(P,re,q(\"]\"),ce):void 0}function ue(e,t){return\"variable\"==e&&j.stream.match(/^\\s*[?:]/,!1)||\"?\"==t?V(ue):\":\"==e?V(ie):M(ie)}function se(e,t){return\"<\"==t?V($(\">\"),_(ie,\">\"),C,se):\"|\"==t||\".\"==e||\"&\"==t?V(ie):\"[\"==e?V(q(\"]\"),se):\"extends\"==t||\"implements\"==t?(j.marked=\"keyword\",V(ie)):void 0}function fe(e,t){if(\"<\"==t)return V($(\">\"),_(ie,\">\"),C,se)}function le(){return M(ie,de)}function de(e,t){if(\"=\"==t)return V(ie)}function pe(e,t){return\"enum\"==t?(j.marked=\"keyword\",V(Ue)):M(me,re,ve,ye)}function me(e,t){return s&&E(t)?(j.marked=\"keyword\",V(me)):\"variable\"==e?(A(t),V()):\"spread\"==e?V(me):\"[\"==e?ee(me,\"]\"):\"{\"==e?ee(ke,\"}\"):void 0}function ke(e,t){return\"variable\"!=e||j.stream.match(/^\\s*:/,!1)?(\"variable\"==e&&(j.marked=\"property\"),\"spread\"==e?V(me):\"}\"==e?M():V(q(\":\"),me,ve)):(A(t),V(ve))}function ve(e,t){if(\"=\"==t)return V(S)}function ye(e){if(\",\"==e)return V(pe)}function be(e,t){if(\"keyword b\"==e&&\"else\"==t)return V($(\"form\",\"else\"),O,C)}function we(e,t){return\"await\"==t?V(we):\"(\"==e?V($(\")\"),xe,q(\")\"),C):void 0}function xe(e){return\"var\"==e?V(pe,q(\";\"),ge):\";\"==e?V(ge):\"variable\"==e?V(he):M(P,q(\";\"),ge)}function he(e,t){return\"in\"==t||\"of\"==t?(j.marked=\"keyword\",V(P)):V(B,ge)}function ge(e,t){return\";\"==e?V(je):\"in\"==t||\"of\"==t?(j.marked=\"keyword\",V(P)):M(P,q(\";\"),je)}function je(e){\")\"!=e&&V(P)}function Me(e,t){return\"*\"==t?(j.marked=\"keyword\",V(Me)):\"variable\"==e?(A(t),V(Me)):\"(\"==e?V(I,$(\")\"),_(Ve,\")\"),C,ne,O,T):s&&\"<\"==t?V($(\">\"),_(le,\">\"),C,Me):void 0}function Ve(e,t){return\"@\"==t&&V(P,Ve),\"spread\"==e?V(Ve):s&&E(t)?(j.marked=\"keyword\",V(Ve)):M(me,re,ve)}function Ae(e,t){return\"variable\"==e?Ee(e,t):ze(e,t)}function Ee(e,t){if(\"variable\"==e)return A(t),V(ze)}function ze(e,t){return\"<\"==t?V($(\">\"),_(le,\">\"),C,ze):\"extends\"==t||\"implements\"==t||s&&\",\"==e?(\"implements\"==t&&(j.marked=\"keyword\"),V(s?ie:P,ze)):\"{\"==e?V($(\"}\"),Ie,C):void 0}function Ie(e,t){return\"async\"==e||\"variable\"==e&&(\"static\"==t||\"get\"==t||\"set\"==t||s&&E(t))&&j.stream.match(/^\\s+[\\w$\\xa1-\\uffff]/,!1)?(j.marked=\"keyword\",V(Ie)):\"variable\"==e||\"keyword\"==j.style?(j.marked=\"property\",V(s?Te:Me,Ie)):\"[\"==e?V(P,re,q(\"]\"),s?Te:Me,Ie):\"*\"==t?(j.marked=\"keyword\",V(Ie)):\";\"==e?V(Ie):\"}\"==e?V():\"@\"==t?V(P,Ie):void 0}function Te(e,t){return\"?\"==t?V(Te):\":\"==e?V(ie,ve):\"=\"==t?V(S):M(Me)}function $e(e,t){return\"*\"==t?(j.marked=\"keyword\",V(We,q(\";\"))):\"default\"==t?(j.marked=\"keyword\",V(P,q(\";\"))):\"{\"==e?V(_(Ce,\"}\"),We,q(\";\")):M(O)}function Ce(e,t){return\"as\"==t?(j.marked=\"keyword\",V(q(\"variable\"))):\"variable\"==e?M(S,Ce):void 0}function qe(e){return\"string\"==e?V():\"(\"==e?M(P):M(Oe,Pe,We)}function Oe(e,t){return\"{\"==e?ee(Oe,\"}\"):(\"variable\"==e&&A(t),\"*\"==t&&(j.marked=\"keyword\"),V(Se))}function Pe(e){if(\",\"==e)return V(Oe,Pe)}function Se(e,t){if(\"as\"==t)return j.marked=\"keyword\",V(Oe)}function We(e,t){if(\"from\"==t)return j.marked=\"keyword\",V(P)}function Ne(e){return\"]\"==e?V():M(_(S,\"]\"))}function Ue(){return M($(\"form\"),me,q(\"{\"),$(\"}\"),_(Be,\"}\"),C,C)}function Be(){return M(me,ve)}function He(e,t,r){return t.tokenize==k&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\\[{}\\(,;:]|=>)$/.test(t.lastType)||\"quasi\"==t.lastType&&/\\{\\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return C.lex=!0,{startState:function(e){var t={tokenize:k,lastType:\"sof\",cc:[],lexical:new h((e||0)-i,0,\"block\",!1),localVars:r.localVars,context:r.localVars&&{vars:r.localVars},indented:e||0};return r.globalVars&&\"object\"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty(\"align\")||(t.lexical.align=!1),t.indented=e.indentation(),w(e,t)),t.tokenize!=v&&e.eatSpace())return null;var r=t.tokenize(e,t);return\"comment\"==n?r:(t.lastType=\"operator\"!=n||\"++\"!=a&&\"--\"!=a?n:\"incdec\",function(e,t,r,n,a){var i=e.cc;for(j.state=e,j.stream=a,j.marked=null,j.cc=i,j.style=t,e.lexical.hasOwnProperty(\"align\")||(e.lexical.align=!0);;)if((i.length?i.pop():u?P:O)(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return j.marked?j.marked:\"variable\"==r&&g(e,n)?\"variable-2\":t}}(t,r,n,a,e))},indent:function(t,n){if(t.tokenize==v)return e.Pass;if(t.tokenize!=k)return 0;var a,c=n&&n.charAt(0),u=t.lexical;if(!/^\\s*else\\b/.test(n))for(var s=t.cc.length-1;s>=0;--s){var f=t.cc[s];if(f==C)u=u.prev;else if(f!=be)break}for(;(\"stat\"==u.type||\"form\"==u.type)&&(\"}\"==c||(a=t.cc[t.cc.length-1])&&(a==B||a==H)&&!/^[,\\.=+\\-*:?[\\(]/.test(n));)u=u.prev;o&&\")\"==u.type&&\"stat\"==u.prev.type&&(u=u.prev);var l,p,m=u.type,y=c==m;return\"vardef\"==m?u.indented+(\"operator\"==t.lastType||\",\"==t.lastType?u.info+1:0):\"form\"==m&&\"{\"==c?u.indented:\"form\"==m?u.indented+i:\"stat\"==m?u.indented+(p=n,\"operator\"==(l=t).lastType||\",\"==l.lastType||d.test(p.charAt(0))||/[,.]/.test(p.charAt(0))?o||i:0):\"switch\"!=u.info||y||0==r.doubleIndentSwitch?u.align?u.column+(y?0:1):u.indented+(y?0:i):u.indented+(/^(?:case|default)\\b/.test(n)?i:2*i)},electricInput:/^\\s*(?:case .*?:|default:|\\{|\\})$/,blockCommentStart:u?null:\"/*\",blockCommentEnd:u?null:\"*/\",blockCommentContinue:u?null:\" * \",lineComment:u?null:\"//\",fold:\"brace\",closeBrackets:\"()[]{}''\\\"\\\"``\",helperType:u?\"json\":\"javascript\",jsonldMode:c,jsonMode:u,expressionAllowed:He,skipExpression:function(e){var t=e.cc[e.cc.length-1];t!=P&&t!=S||e.cc.pop()}}}),e.registerHelper(\"wordChars\",\"javascript\",/[\\w$]/),e.defineMIME(\"text/javascript\",\"javascript\"),e.defineMIME(\"text/ecmascript\",\"javascript\"),e.defineMIME(\"application/javascript\",\"javascript\"),e.defineMIME(\"application/x-javascript\",\"javascript\"),e.defineMIME(\"application/ecmascript\",\"javascript\"),e.defineMIME(\"application/json\",{name:\"javascript\",json:!0}),e.defineMIME(\"application/x-json\",{name:\"javascript\",json:!0}),e.defineMIME(\"application/ld+json\",{name:\"javascript\",jsonld:!0}),e.defineMIME(\"text/typescript\",{name:\"javascript\",typescript:!0}),e.defineMIME(\"application/typescript\",{name:\"javascript\",typescript:!0})});\n","type":"application/javascript","title":"$:/plugins/tiddlywiki/codemirror/mode/javascript/javascript.js","module-type":"codemirror"},"$:/plugins/tiddlywiki/codemirror-mode-javascript/readme":{"title":"$:/plugins/tiddlywiki/codemirror-mode-javascript/readme","text":"This plugin adds Syntax Highlighting for Javascript tiddlers (application/javascript) to the [[CodeMirror|http://codemirror.net]] text editor. It needs the latest [[CodeMirror plugin|$:/plugins/tiddlywiki/codemirror]] to be installed\n\n"}}});