rm -rf TiddlyWiki5-Jermolene/
git clone https://github.com/Jermolene/TiddlyWiki5 TiddlyWiki5-Jermolene
SOURCE="TiddlyWiki5-Jermolene"
TARGET="5-1-22"
VERSION="5.1.22"
(cd TiddlyWiki5-Jermolene && git checkout tags/v$VERSION)
node ./compile-plugins.js $SOURCE $TARGET $VERSION
cp -vR $SOURCE/tiddlywiki.js $SOURCE/license $SOURCE/licenses $SOURCE/boot $TARGET
zip -rq $TARGET/editions.zip $SOURCE/editions $SOURCE/bin
echo "The 'bin' and 'editions' folders are not required for TiddlyWiki to work correctly as a module. They are both included in a zip file."
# (cd 5-1-22 && npm publish)