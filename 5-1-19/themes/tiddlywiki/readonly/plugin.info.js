$tw.preloadTiddler({"title":"$:/themes/tiddlywiki/readonly","name":"ReadOnly","author":"JeremyRuston","core-version":">=5.0.0","plugin-type":"theme","description":"Hides the ability to edit tiddlers","dependents":"$:/themes/tiddlywiki/snowwhite","version":"5.1.19","type":"application/json","tiddlers":{"$:/themes/tiddlywiki/readonly/styles.tid":{"title":"$:/themes/tiddlywiki/readonly/styles.tid","tags":"[[$:/tags/Stylesheet]]","text":"\\define button-selector(title)\nbutton.$title$, .tc-drop-down button.$title$, div.$title$\n\\end\n\n\\rules only filteredtranscludeinline transcludeinline macrodef macrocallinline\n\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fclone>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fdelete>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fedit>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fnew-here>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fnew-journal-here>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fimport>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fmanager>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fnew-image>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fnew-journal>>,\n<<button-selector tc-btn-\\%24\\%3A\\%2Fcore\\%2Fui\\%2FButtons\\%2Fnew-tiddler>> {\n\tdisplay: none;\n}"}}});