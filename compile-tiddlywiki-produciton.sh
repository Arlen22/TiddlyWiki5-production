SOURCE="TiddlyWiki5-Jermolene"
TARGET="patch-31"
VERSION="5.1.23-prerelease"

([ -d "$TARGET-client" ] || [ -d "$TARGET-server" ]) && echo "Output folder already exists" && exit 1

rm -rf $SOURCE
git clone https://github.com/Arlen22/TiddlyWiki5 $SOURCE
(cd TiddlyWiki5-Jermolene && git checkout patch-31) 
#  tags/v$VERSION

node ./compile-tiddlywiki-production.js $SOURCE $TARGET-client $VERSION client
node ./compile-tiddlywiki-production.js $SOURCE $TARGET-server $VERSION server

cp -vR $SOURCE/tiddlywiki.js $SOURCE/license $SOURCE/licenses $SOURCE/boot $TARGET-client
cp -vR $SOURCE/tiddlywiki.js $SOURCE/license $SOURCE/licenses $SOURCE/boot $TARGET-server

zip -rq $TARGET-server/editions.zip $SOURCE/editions $SOURCE/bin


echo "The 'bin' and 'editions' folders are not required for TiddlyWiki to work correctly as a module. They are both included in a zip file."

# (cd 5-1-22-server && npm publish) && (cd 5-1-22-client && npm publish)
