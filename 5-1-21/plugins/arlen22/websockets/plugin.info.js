$tw.preloadTiddler({"title":"$:/plugins/arlen22/websockets","description":"Websocket server and client","author":"ArlenBeiler","core-version":">=5.0.0","list":"readme","version":"5.1.21","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/arlen22/edit-watcher.js":{"title":"$:/arlen22/edit-watcher.js","text":"/*\\\ntitle: $:/arlen22/edit-watcher.js\ntype: application/javascript\nmodule-type: startup\n \nCommand processing\n \n\\*/\n \nexports.name = \"commands\";\nexports.platforms = [\"browser\"];\nexports.after = [\"story\"];\nexports.synchronous = true;\n\n\n \nexports.startup = function () {\n  $tw.serverevents\n    \n    serverRefresh.addEventListener(\"message\", (msg) => {\n        console.log(msg);\n        // let changes = JSON.parse(msg.data);\n        // Object.keys(changes).forEach(k => {\n        //     if (changes[k] === \"deleted\") $tw.wiki.deleteTiddler(k);\n        // });\n        $tw.syncer.syncFromServer();\n    });\n \n}","type":"application/javascript","module-type":"startup"},"$:/plugins/arlen22/websockets/server.js":{"title":"$:/plugins/arlen22/websockets/server.js","text":"/*\\\ntitle: $:/plugins/arlen22/websockets/server.js\ntype: application/javascript\nmodule-type: startup\n \nCommand processing\n \n\\*/\n\nexports.name = \"websocket-server\";\nexports.platforms = [\"node\"];\nexports.before = [\"commands\"];\nexports.synchronous = true;\n\nexports.startup = function () {\n  const { EventEmitter } = require('events');\n  $tw.hooks.addHook(\"th-server-command-post-start\", function (server, eventer, engine) {\n    let messages = new EventEmitter();\n    let broadcast = new EventEmitter();\n    let connections = new EventEmitter();\n\n    if (eventer === \"tiddlyserver\") {\n      eventer.on(\"ws-client-connect\", function (client, request, subpath) {\n        let onMessage = function (data) { messages.emit(subpath, data); };\n        let onBroadcast = function (data) { client.send(data); }\n        connections.emit(subpath, { client, request });\n        client.on(\"message\", onMessage);\n        broadcast.on(subpath, onBroadcast);\n        client.on(\"close\", () => {\n          broadcast.removeListener(subpath, onBroadcast);\n        })\n      });\n    } else if (eventer === \"tiddlywiki\") {\n\n    }\n\n    $tw.websocket = { messages, broadcast, connections };\n\n    $tw.wiki.addEventListener(\"change\", function (changes) {\n      let res = {};\n      Object.keys(changes).forEach(function (k) { res[k] = changes[k].deleted ? \"deleted\" : \"modified\" });\n      $tw.websocket.broadcast.emit('/server-refresh', JSON.stringify(res));\n    });\n  })\n\n\n\n};","type":"application/javascript","module-type":"startup"}}});