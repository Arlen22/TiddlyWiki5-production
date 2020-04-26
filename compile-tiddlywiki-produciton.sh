SOURCE="TiddlyWiki5-Jermolene"
TARGET="5-1-22"
VERSION="5.1.22"

[ -d "$TARGET" ] && echo "Output folder already exists" && exit 1

rm -rf $SOURCE
git clone https://github.com/Jermolene/TiddlyWiki5 $SOURCE
(cd TiddlyWiki5-Jermolene && git checkout tags/v$VERSION)

node ./compile-tiddlywiki-production.js $SOURCE $TARGET $VERSION
cp -vR $SOURCE/tiddlywiki.js $SOURCE/license $SOURCE/licenses $SOURCE/boot $TARGET
zip -rq $TARGET/editions.zip $SOURCE/editions $SOURCE/bin

echo "The 'bin' and 'editions' folders are not required for TiddlyWiki to work correctly as a module. They are both included in a zip file."

# (cd $TARGET && npm publish)