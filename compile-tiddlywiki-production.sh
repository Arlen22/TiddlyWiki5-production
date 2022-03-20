#!/bin/bash
SOURCE="TiddlyWiki5-Jermolene"
TARGET="5-2-1"
VERSION="5.2.1"

([ -d "$TARGET-client" ] || [ -d "$TARGET-server" ]) && echo "Output folder already exists" && exit 1

rm -rf $SOURCE
git clone https://github.com/Jermolene/TiddlyWiki5 $SOURCE
(cd $SOURCE && git checkout v$VERSION) 
#  tags/v$VERSION

node ./compile-tiddlywiki-production.js $SOURCE $TARGET-client $VERSION client
node ./compile-tiddlywiki-production.js $SOURCE $TARGET-server $VERSION server

cp -vR $SOURCE/tiddlywiki.js $SOURCE/license $SOURCE/licenses $SOURCE/boot $TARGET-client
cp -vR $SOURCE/tiddlywiki.js $SOURCE/license $SOURCE/licenses $SOURCE/boot $TARGET-server

zip -rq $TARGET-server/editions.zip $SOURCE/editions $SOURCE/bin

cp -v README.md $TARGET-server
cp -v README.md $TARGET-client

echo "The 'bin' and 'editions' folders are not required for TiddlyWiki to work correctly as a module. They are both included in a zip file."

# (cd 5-1-22-server && npm publish) && (cd 5-1-22-client && npm publish)
