$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/aws","description":"Tools for working with Amazon Web Services","author":"JeremyRuston","core-version":">=5.0.0","list":"readme setup commands lambda","version":"5.1.19","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/plugins/tiddlywiki/aws/commands":{"title":"$:/plugins/tiddlywiki/aws/commands","text":"{{$:/language/Help/aws}}\n"},"$:/language/Help/aws":{"title":"$:/language/Help/aws","description":"Operations for working with Amazon Web Services","text":"! Commands\n\nPerform operation on Amazon Web Services\n\n```\n--aws <sub-command> [<parameter> ...]\n```\n\n! \"s3-load\" subcommand\n\nLoad tiddlers from files in an S3 bucket.\n\n```\n--aws s3-load <region> <bucket> <filename>...\n```\n\n* ''region'': AWS region\n* ''bucket'': name of the bucket containing the files\n* ''filename'': one or more filenames of the files to load\n\nThe content in the files is deserialized according to the content type reported by S3.\n\n! \"s3-savetiddler\" subcommand\n\nSave a raw tiddler to a file in an S3 bucket.\n\n```\n--aws s3-savetiddler <title> <region> <bucket> <filename> <zipfilename> <savetype>\n```\n\n* ''title'': title of the tiddler to save\n* ''region'': AWS region\n* ''bucket'': name of the bucket to save the saved file\n* ''filename'': filename of the saved file\n* ''zipfilename'': optional; the file will be packed into a ZIP file with the specified name\n* ''savetype'': optional; the MIME type for the saved file (defaults to ''type'' or \"text/html\")\n\n! \"s3-savetiddlers\" subcommand\n\nSave raw tiddlers matching a filter to an S3 bucket.\n\n```\n--aws s3-savetiddlers <filter> <region> <bucket> <filenamefilter> <savetypefilter>\n```\n\n* ''filter'': filter identifying tiddlers to render\n* ''region'': AWS region\n* ''bucket'': name of the bucket to save the files\n* ''filenamefilter'': filter for converting tiddler titles to filepaths (eg `[encodeuricomponent[]addprefix[files/]addsuffix[.html]]`)\n* ''savetypefilter'': optional; a filter that is passed the title of the tiddler being saved and should yield the MIME type for the saved file (defaults to a filter that yields the value of the ''type'' field)\n\n! \"s3-rendertiddler\" subcommand\n\nSave the results of rendering a tiddler to a file in an S3 bucket.\n\n```\n--aws s3-rendertiddler <title> <region> <bucket> <filename> <type> <template> <zipfilename> <savetype>\n```\n\n* ''title'': title of the tiddler to render\n* ''region'': AWS region\n* ''bucket'': name of the bucket to save the rendered file\n* ''filename'': filename of the rendered file\n* ''type'': optional render type (defaults to \"text/html\")\n* ''template'': optional template (defaults to directly rendering the tiddler without using a template)\n* ''zipfilename'': optional; the file will be packed into a ZIP file with the specified name\n* ''savetype'': optional; the MIME type for the saved file (defaults to ''type'' or \"text/html\")\n\n! \"s3-rendertiddlers\" subcommand\n\nSave the results of rendering tiddlers identified by a filter to files in an S3 bucket.\n\n```\n--aws s3-rendertiddlers <filter> <template> <region> <bucket> <filenamefilter> <type> <savetypefilter>\n```\n\n* ''filter'': filter identifying tiddlers to render\n* ''template'': template for rendering each tiddler\n* ''region'': AWS region\n* ''bucket'': name of the bucket to save the rendered file\n* ''filenamefilter'': filter for converting tiddler titles to filepaths (eg `[encodeuricomponent[]addprefix[files/]addsuffix[.html]]`)\n* ''type'': optional render type (defaults to \"text/html\")\n* ''savetypefilter'': optional; a filter that is passed the title of the tiddler being rendered and should yield the MIME type for the saved file (defaults to the value of the ''type'' field via `[is[tiddler]get[type]]`)\n"},"$:/plugins/tiddlywiki/aws/lambda":{"title":"$:/plugins/tiddlywiki/aws/lambda","text":"! Template\n\nThe template [[$:/plugins/tiddlywiki/aws/lambdas/main]] transcludes everything required to render a TiddlyWiki as an AWS Lambda function.\n\nThe Lambda is build with this command:\n\n```\ntiddlywiki editions/aws --rendertiddler $:/plugins/tiddlywiki/aws/lambdas/main index.js text/plain\n```\n\nOr:\n\n```\ntiddlywiki editions/aws --build lambda\n```\n\n! Execution\n\nThe Lambda boot code looks for an array of tiddlers to load in `event.tiddlers`, and an array of commands to execute in `event.commands`. For example:\n\n```\n{\n\t\"commands\": [\n\t\t\"--aws\",\"s3-rendertiddler\",\"HelloThere\",\"eu-west-2\",\"my-bucket-name\",\"rendered.html\"\n\t],\n\t\"tiddlers\": [\n\t\t{\n\t\t\t\"title\": \"HelloThere\",\n\t\t\t\"text\": \"Hello from {{Platform}}.\"\n\t\t},\n\t\t{\n\t\t\t\"title\": \"Platform\",\n\t\t\t\"text\": \"TiddlyWiki\"\n\t\t}\n\t]\n}\n\n```\n\nThe event data can optionally be compressed by passing a JSON object with a single property `compressed` that contains a base64 encoded GZIP compressed representation of the JSON payload data. For example:\n\n```\nvar strPayload = JSON.stringify(payload);\nrequire(\"zlib\").gzip(strPayload,function(err,buff) {\n\tvar compressedPayload = {compressed: new Buffer(buff).toString(\"base64\")};\n\t// Invoke lambda with compressed payload\n\t...\n});\n```\n\n! Return data\n\nIf the Lambda function successfully executes it returns an object with the following fields:\n\n* ''lambda-result'': An array of `{bucketname,key}` pairs for each file written to S3 within the lambda function\n"},"$:/plugins/tiddlywiki/aws/readme":{"title":"$:/plugins/tiddlywiki/aws/readme","text":"This plugin provides several tools for working with Amazon Web Services:\n\n* Templates for saving a TiddlyWiki as a single JavaScript file in a ZIP file that can be executed as an AWS Lambda function. In this form, TiddlyWiki is a self contained single file containing both code and data, just like the standalone HTML file configuration\n* Commands that can be used to interact with AWS services, under both the Node.js and Lambda configurations of TiddlyWiki\n"},"$:/plugins/tiddlywiki/aws/setup":{"title":"$:/plugins/tiddlywiki/aws/setup","text":"! Introduction\n\n!! About Amazon Web Services\n\nAmazon Web Services is a collection of online APIs to services that allow cloud-based applications to be built. It is a commercial service that charges usage fees, but there is a free tier that is sufficient for most personal use.\n\nAn ordinary Amazon account can be used to sign into the AWS console at https://aws.amazon.com/console/. Here you can see a menu of the available services and use interactive dashboards to inspect and configure resources.\n\n! Getting Started\n\n!! Setup Amazon Credentials\n\nThe main root account has super-user privileges across all the resources owned by the account. The Identity and Access Management (IAM) service allows subsidiary user accounts to be created for specific tasks. Here we create a new user account for running TiddlyWiki code:\n\n# Visit the AWS console at https://aws.amazon.com/console/\n# Choose ''IAM'' from the ''Services'' dropdown menu\n# Choose ''Users'' from the left hand menu\n# Click the ''Create New Users'' button\n# Enter ''tiddlywiki'' as the first user name\n# Check the box labelled //Generate an access key for each user//\n# Click the ''Create'' button\n# Click the ''Download Credentials'' button to download a file called \"credentials.csv\"\n#* The file contains three values:\n#*# ''User Name'': Username for\n#*# ''Password'': \n#*# ''Direct Signin Link'': \n# Create a text file with the following content:\n#> <div><pre><code>[default]\naws_access_key_id = &lt;your access key>\naws_secret_access_key = &lt;your secret access key>\n</code></pre></div>\n# Save the file as `~/.aws/credentials` (Mac/Linux) or `?` (Windows)\n\n!! Download or Clone TiddlyWiki Repository\n\nEven if you have already installed TiddlyWiki, you should create a new installation for working with the AWS plugin.\n\nVisit the TiddlyWiki5 repository at https://github.com/Jermolene/TiddlyWiki5. You can either download or clone a copy:\n\n* Download to get up and running quickly\n* Clone to make it easier to upgrade in the future\n\n!! Install `aws-sdk`\n\nOpen a command terminal, switch to the directory where TiddlyWiki is installed and run the following command:\n\n```\nnpm install aws-sdk\n```\n"},"$:/plugins/tiddlywiki/aws/command.js":{"title":"$:/plugins/tiddlywiki/aws/command.js","text":"/*\\\ntitle: $:/plugins/tiddlywiki/aws/command.js\ntype: application/javascript\nmodule-type: command\n\n--aws command\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\nvar async,\n\tawsUtils;\n\nexports.info = {\n\tname: \"aws\",\n\tsynchronous: false\n};\n\nvar Command = function(params,commander,callback) {\n\tasync = require(\"$:/plugins/tiddlywiki/async/async.js\");\n\tawsUtils = require(\"$:/plugins/tiddlywiki/aws/utils.js\");\n\tthis.params = params;\n\tthis.commander = commander;\n\tthis.callback = callback;\n};\n\nCommand.prototype.execute = function() {\n\tvar self = this,\n\t\twiki = this.commander.wiki,\n\t\tsubCommand = this.params[0],\n\t\tfn = this.subCommands[subCommand];\n\tif(!fn) {\n\t\treturn this.callback(\"AWS: Unknown subcommand\")\n\t}\n\tfn.bind(this)();\n\treturn null;\n};\n\nCommand.prototype.subCommands = {};\n\n// Load tiddlers from files in an S3 bucket\nCommand.prototype.subCommands[\"s3-load\"] = function() {\n\tvar self = this,\n\t\twiki = this.commander.wiki,\n\t\tregion = this.params[1],\n\t\tbucket = this.params[2],\n\t\tfilepaths = this.params.slice(3);\n\t// Check parameters\n\tif(!region || !bucket || filepaths.length < 1) {\n\t\tthrow \"Missing parameters\";\n\t}\n\tasync.eachLimit(\n\t\tfilepaths,\n\t\t20,\n\t\tfunction(filepath,callback) {\n\t\t\tawsUtils.getFile(region,bucket,filepath,function(err,data) {\n\t\t\t\tif(err) {\n\t\t\t\t\treturn callback(err);\n\t\t\t\t}\n\t\t\t\tvar tiddlers = self.commander.wiki.deserializeTiddlers(data.type,data.body,{});\n\t\t\t\t$tw.utils.each(tiddlers,function(tiddler) {\n\t\t\t\t\tself.commander.wiki.importTiddler(new $tw.Tiddler(tiddler));\n\t\t\t\t});\n\t\t\t\tcallback(null);\n\t\t\t});\n\t\t},\n\t\tfunction(err,results) {\n\t\t\tself.callback(err,results);\n\t\t}\n\t);\n\treturn null;\n};\n\n// Render a tiddler to an S3 bucket\nCommand.prototype.subCommands[\"s3-rendertiddler\"] = function() {\n\tvar self = this,\n\t\twiki = this.commander.wiki,\n\t\ttitle = this.params[1],\n\t\tregion = this.params[2],\n\t\tbucket = this.params[3],\n\t\tfilename = this.params[4],\n\t\ttype = this.params[5] || \"text/html\",\n\t\ttemplate = this.params[6],\n\t\tzipfilename = this.params[7],\n\t\tsaveType = this.params[8] || type,\n\t\tvariables = {};\n\t// Check parameters\n\tif(!title || !region || !bucket || !filename) {\n\t\tthrow \"Missing parameters\";\n\t}\n\t// Process the template if present\n\tif(template) {\n\t\tvariables.currentTiddler = title;\n\t\ttitle = template;\n\t}\n\t// Render the tiddler\n\tvar text = this.commander.wiki.renderTiddler(type,title,{variables: variables}),\n\t\ttype = \"text/plain\",\n\t\tencoding = ($tw.config.contentTypeInfo[type] || {encoding: \"utf8\"}).encoding;\n\t// Zip it if needed\n\tif(zipfilename) {\n\t\tvar JSZip = require(\"$:/plugins/tiddlywiki/jszip/jszip.js\"),\n\t\t\tzip = new JSZip();\n\t\tzip.file(filename,new Buffer(text,encoding));\n\t\ttext = zip.generate({type: \"base64\"});\n\t\ttype = \"application/zip\";\n\t\tfilename = zipfilename;\n\t}\n\t// Save the file\n\tasync.series([\n\t\tawsUtils.putFile.bind(null,region,bucket,filename,text,saveType)\n\t],\n\tfunction(err,results){\n\t\tself.callback(err,results);\n\t});\n\treturn null;\n};\n\nCommand.prototype.subCommands[\"s3-rendertiddlers\"] = function() {\n\tvar self = this,\n\t\twiki = this.commander.wiki,\n\t\tfilter = this.params[1],\n\t\ttemplate = this.params[2],\n\t\tregion = this.params[3],\n\t\tbucket = this.params[4],\n\t\tfilenameFilter = this.params[5],\n\t\ttype = this.params[6] || \"text/html\",\n\t\tsaveTypeFilter = this.params[7] || \"[[\" + type + \"]]\",\n\t\ttiddlers = wiki.filterTiddlers(filter);\n\t// Check parameters\n\tif(!filter || !region || !bucket || !filenameFilter) {\n\t\tthrow \"Missing parameters\";\n\t}\n\tasync.eachLimit(\n\t\ttiddlers,\n\t\t20,\n\t\tfunction(title,callback) {\n\t\t\tvar parser = wiki.parseTiddler(template || title),\n\t\t\t\twidgetNode = wiki.makeWidget(parser,{variables: {currentTiddler: title}}),\n\t\t\t\tcontainer = $tw.fakeDocument.createElement(\"div\");\n\t\t\twidgetNode.render(container,null);\n\t\t\tvar text = type === \"text/html\" ? container.innerHTML : container.textContent,\n\t\t\t\tfilename = wiki.filterTiddlers(filenameFilter,$tw.rootWidget,wiki.makeTiddlerIterator([title]))[0],\n\t\t\t\tsaveType = wiki.filterTiddlers(saveTypeFilter,$tw.rootWidget,wiki.makeTiddlerIterator([title]))[0];\n\t\t\tawsUtils.putFile(region,bucket,filename,text,saveType,callback);\n\t\t},\n\t\tfunction(err,results) {\n\t\t\tself.callback(err,results);\n\t\t}\n\t);\n\treturn null;\n};\n\n// Save a tiddler to an S3 bucket\nCommand.prototype.subCommands[\"s3-savetiddler\"] = function() {\n\tvar self = this,\n\t\twiki = this.commander.wiki,\n\t\ttitle = this.params[1],\n\t\tregion = this.params[2],\n\t\tbucket = this.params[3],\n\t\tfilename = this.params[4],\n\t\tzipfilename = this.params[5],\n\t\tsaveType = this.params[6],\n\t\ttiddler = wiki.getTiddler(title),\n\t\ttext = tiddler.fields.text,\n\t\ttype = tiddler.fields.type,\n\t\tencoding = ($tw.config.contentTypeInfo[type] || {encoding: \"utf8\"}).encoding;\n\t// Check parameters\n\tif(!title || !region || !bucket || !filename) {\n\t\tthrow \"Missing parameters\";\n\t}\n\t// Zip it if needed\n\tif(zipfilename) {\n\t\tvar JSZip = require(\"$:/plugins/tiddlywiki/jszip/jszip.js\"),\n\t\t\tzip = new JSZip();\n\t\tzip.file(filename,new Buffer(text,encoding));\n\t\ttext = zip.generate({type: \"base64\"});\n\t\ttype = \"application/zip\";\n\t\tfilename = zipfilename;\n\t}\n\t// Save the file\n\tasync.series([\n\t\tawsUtils.putFile.bind(null,region,bucket,filename,text,saveType || type)\n\t],\n\tfunction(err,results){\n\t\tself.callback(err,results);\n\t});\n\treturn null;\n};\n\n// Save a tiddler to an S3 bucket\nCommand.prototype.subCommands[\"s3-savetiddlers\"] = function() {\n\tvar self = this,\n\t\twiki = this.commander.wiki,\n\t\tfilter = this.params[1],\n\t\tregion = this.params[2],\n\t\tbucket = this.params[3],\n\t\tfilenameFilter = this.params[4],\n\t\tsaveTypeFilter = this.params[5] || \"[is[tiddler]get[type]]\",\n\t\ttiddlers = wiki.filterTiddlers(filter);\n\t// Check parameters\n\tif(!filter || !region || !bucket || !filenameFilter) {\n\t\tthrow \"Missing parameters\";\n\t}\n\tasync.eachLimit(\n\t\ttiddlers,\n\t\t20,\n\t\tfunction(title,callback) {\n\t\t\tvar tiddler = wiki.getTiddler(title);\n\t\t\tif(tiddler) {\n\t\t\t\tvar text = tiddler.fields.text || \"\",\n\t\t\t\t\ttype = tiddler.fields.type || \"text/vnd.tiddlywiki\",\n\t\t\t\t\tfilename = wiki.filterTiddlers(filenameFilter,$tw.rootWidget,wiki.makeTiddlerIterator([title]))[0],\n\t\t\t\t\tsaveType = wiki.filterTiddlers(saveTypeFilter,$tw.rootWidget,wiki.makeTiddlerIterator([title]))[0];\n\t\t\t\tawsUtils.putFile(region,bucket,filename,text,saveType || type,callback);\t\t\t\t\n\t\t\t} else {\n\t\t\t\tprocess.nextTick(callback,null);\n\t\t\t}\n\t\t},\n\t\tfunction(err,results) {\n\t\t\tself.callback(err,results);\n\t\t}\n\t);\n\treturn null;\n};\n\nexports.Command = Command;\n\n})();\n\n","type":"application/javascript","module-type":"command"},"$:/plugins/tiddlywiki/aws/init.js":{"title":"$:/plugins/tiddlywiki/aws/init.js","text":"/*\\\ntitle: $:/plugins/tiddlywiki/aws/init.js\ntype: application/javascript\nmodule-type: startup\n\nAWS initialisation\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\n// Export name and synchronous status\nexports.name = \"aws-init\";\nexports.before = [\"startup\"];\nexports.synchronous = true;\n\nexports.startup = function() {\n\tvar logger = new $tw.utils.Logger(\"aws\");\n\t\tif($tw.node) {\n\t\ttry {\n\t\t\trequire(\"aws-sdk\");\n\t\t} catch(e) {\n\t\t\tlogger.alert(\"The plugin 'tiddlywiki/aws' requires the aws-sdk to be installed. Run 'npm install aws-sdk' in the root of the TiddlyWiki repository\");\n\t\t}\n\t}\n\tif(!$tw.modules.titles[\"$:/plugins/tiddlywiki/async/async.js\"]) {\n\t\tlogger.alert(\"The plugin 'tiddlywiki/aws' requires the 'tiddlywiki/async' plugin to be installed\");\n\t}\n\tif(!$tw.modules.titles[\"$:/plugins/tiddlywiki/jszip/jszip.js\"]) {\n\t\tlogger.alert(\"The plugin 'tiddlywiki/aws' requires the 'tiddlywiki/jszip' plugin to be installed\");\n\t}\n};\n\n})();\n","type":"application/javascript","module-type":"startup"},"$:/plugins/tiddlywiki/aws/utils.js":{"title":"$:/plugins/tiddlywiki/aws/utils.js","text":"/*\\\ntitle: $:/plugins/tiddlywiki/aws/utils.js\ntype: application/javascript\nmodule-type: library\n\nAWS utility functions\n\n\\*/\n(function(){\n\n/*jslint node: true, browser: true */\n/*global $tw: false */\n\"use strict\";\n\n/*\nGet a file from an S3 bucket\nregion:\nbucketName:\ntitle:\ncallback: invoked with (err,{body:,type:}\n*/\nfunction getFile(region,bucketName,title,callback) {\n\t// console.log(\"Reading file from S3\",bucketName,title);\n\tvar AWS = require(\"aws-sdk\"),\n\t\ts3bucket = new AWS.S3({\n\t\t\tregion: region\n\t\t}),\n\t\tparams = {\n\t\t\tBucket: bucketName,\n\t\t\tKey: title\n\t\t};\n\ts3bucket.getObject(params,function(err,data) {\n\t\tif(err) {\n\t\t\treturn callback(err);\n\t\t}\n\t\tcallback(null,{\n\t\t\tetag: data.ETag,\n\t\t\tversion: data.VersionId,\n\t\t\ttype: data.ContentType,\n\t\t\tbody: data.Body.toString()\n\t\t});\n\t});\n}\n\n/*\nPut a file to an S3 bucket\n*/\nfunction putFile(region,bucketName,title,text,type,callback) {\n\t// Log the write\n\tif($tw[\"lambda-result\"]) {\n\t\t$tw[\"lambda-result\"][\"files-written\"].push({bucket: bucketName,key: title});\t\t\n\t}\n\t// console.log(\"Writing file to S3\",bucketName,title,type);\n\tvar AWS = require(\"aws-sdk\"),\n\t\ts3bucket = new AWS.S3({\n\t\t\tregion: region\n\t\t}),\n\t\tencoding = ($tw.config.contentTypeInfo[type] || {encoding: \"utf8\"}).encoding,\n\t\tparams = {\n\t\t\tBucket: bucketName,\n\t\t\tKey: title,\n\t\t\tBody: new Buffer(text,encoding),\n\t\t\tContentType: type || \"text/plain\"\n\t\t};\n\ts3bucket.upload(params,function(err,data) {\n\t\tif(err) {\n\t\t\treturn callback(err + \" (writing \" + title + \" to \" + bucketName + \", type \" + type + \")\");\n\t\t}\n\t\tcallback(null,data);\n\t});\n}\n\nexports.putFile = putFile;\nexports.getFile = getFile;\n\n})();\n","type":"application/javascript","module-type":"library"},"$:/plugins/tiddlywiki/aws/lambda/handler":{"title":"$:/plugins/tiddlywiki/aws/lambda/handler","type":"text/plain","text":"/*\nTiddlyWiki for AWS\n*/\n\nexports.handler = function(event,context,callback) {\n\t// Initialise the boot prefix\n\tglobal.$tw = _bootprefix();\n\t// Initialise the returned results\n\t$tw[\"lambda-result\"] = {\n\t\t\"files-written\": []\n\t};\n\t// Some default package info\n\t$tw.packageInfo = lambdaPackageInfo;\n\t// Load any tiddlers from the package\n\t$tw.preloadTiddlerArray(lambdaTiddlers);\n\t// Decompress the event data if required\n\tif(typeof event.compressed === \"string\") {\n\t\trequire(\"zlib\").gunzip(Buffer.from(event.compressed,\"base64\"),function(err,buff) {\n\t\t\tif(err) {\n\t\t\t\treturn callback(err);\n\t\t\t}\n\t\t\tboot(JSON.parse(buff.toString()));\n\t  });\n\t} else {\n\t\tboot(event);\n\t}\n\n\tfunction boot(event) {\n\t\t// Load any tiddlers from the event\n\t\tif(event.tiddlers) {\n\t\t\t$tw.preloadTiddlerArray(event.tiddlers);\t\n\t\t}\n\t\t// Load the commands from the event\n\t\t$tw.boot.argv = (event.commands || []).slice(0);\n\t\t// Boot the TW5 app\n\t\t_boot($tw);\n\t\t$tw.boot.boot(function() {\n\t\t\tcallback(null,$tw[\"lambda-result\"]);\n\t\t});\t\n\t}\n}\n"},"$:/plugins/tiddlywiki/aws/lambdas/main":{"title":"$:/plugins/tiddlywiki/aws/lambdas/main","text":"\\rules only filteredtranscludeinline transcludeinline\n\n/*\n{{ $:/core/copyright.txt }}\n*/\n\n{{$:/plugins/tiddlywiki/aws/lambda/tiddlers}}\n\n{{$:/plugins/tiddlywiki/aws/lambda/sjcl}}\n\n{{ $:/boot/bootprefix.js ||$:/core/templates/plain-text-tiddler}}\n\n{{ $:/boot/boot.js ||$:/core/templates/plain-text-tiddler}}\n\n{{$:/plugins/tiddlywiki/aws/lambda/package-info}}\n\n{{ $:/plugins/tiddlywiki/aws/lambda/handler ||$:/core/templates/plain-text-tiddler}}\n"},"$:/plugins/tiddlywiki/aws/lambda/package-info":{"title":"$:/plugins/tiddlywiki/aws/lambda/package-info","text":"\\rules only filteredtranscludeinline transcludeinline codeinline macrocallinline\n`\nvar lambdaPackageInfo = {\n\t\"version\": \"`<<version>>`\",\n\t\"engines\": {\n\t\t\"node\": \">=0.8.2\"\n\t}\n};\n`\n"},"$:/plugins/tiddlywiki/aws/lambda/sjcl":{"title":"$:/plugins/tiddlywiki/aws/lambda/sjcl","text":"\\rules only filteredtranscludeinline transcludeinline\n\n(function() {\n\nvar module;\n\nglobal.sjcl = (function() {\n\n{{ $:/library/sjcl.js ||$:/core/templates/plain-text-tiddler}}\n\nreturn sjcl;\n\n})();\n\n})();\n"},"$:/plugins/tiddlywiki/aws/lambda/tiddlers":{"title":"$:/plugins/tiddlywiki/aws/lambda/tiddlers","text":"`\nvar lambdaTiddlers = `<$text text=<<jsontiddlers \"[all[tiddlers]]\">>/>`;\n`\n"}}});