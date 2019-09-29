$tw.preloadTiddler({"title":"$:/plugins/tiddlywiki/translators","description":"Translation editing tools","author":"JeremyRuston","core-version":">=5.0.0","list":"readme","version":"5.1.20","plugin-type":"plugin","dependents":"","type":"application/json","tiddlers":{"$:/Translators":{"title":"$:/Translators","text":"\\define allTheTranslatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/]] [all[tiddlers+shadows]prefix[$:/config/NewJournal/]] [[GettingStarted]] [[$:/SiteTitle]] [[$:/SiteSubtitle]] \n[[$:/core/readme]] +[sort[title]]\n\\end\n\\define allTheTranslatedTiddlerTitles()\n[all[tiddlers]prefix[$:/language/]] [all[tiddlers]prefix[$:/config/NewJournal/]] [[GettingStarted]is[tiddler]] [[$:/SiteTitle]is[tiddler]] [[$:/SiteSubtitle]is[tiddler]] \n[[$:/core/readme]is[tiddler]] +[sort[title]]\n\\end\n\\define allTheNotTranslatedTiddlerTitles()\n[all[tiddlers+shadows]!is[tiddler]prefix[$:/language/]] [all[tiddlers+shadows]!is[tiddler]prefix[$:/config/NewJournal/]] [[GettingStarted]!is[tiddler]] [[$:/SiteTitle]!is[tiddler]] [[$:/SiteSubtitle]!is[tiddler]] \n[[$:/core/readme]!is[tiddler]] +[sort[title]]\n\\end\n\nNumber of translated tiddlers: <$count filter=<<allTheTranslatedTiddlerTitles>>/> of <$count filter=<<allTheTranslatableTiddlerTitles>>/>\n\n{{$:/core/ui/PageTemplate/pagecontrols}}\n\n<<tabs \"[all[tiddlers+shadows]tag[$:/tags/TranslationGroup]sort[caption]]\" \"$:/plugins/tiddlywiki/translators/ui/group/Miscellaneous\" \"$:/state/translatorsTab\" \"tc-vertical\">>\n"},"$:/plugins/tiddlywiki/translators/macros/translatableStringEditor":{"title":"$:/plugins/tiddlywiki/translators/macros/translatableStringEditor","tags":"$:/tags/Macro","text":"\\define translatableStringEditorInner(tiddlerTitle)\n<tr>\n<td width=\"1px\">\n<$link><$list filter=<<shortenTitle>>><$text text=<<currentTiddler>>/></$list></$link>\n</td>\n<td width=\"100%\">\n<$list filter=\"\"\"$(editFieldsFilter)$\"\"\" variable=\"editorField\">\n<$edit-text tag=\"$(editorTagName)$\" field=<<editorField>> type=\"text\" class=\"tc-edit-texteditor\" minHeight=\"10px\"/>\n</$list>\n</td>\n<td width=\"1px\">\n<div class=\"tc-drop-down-wrapper\">\n<$button class=\"tc-btn-invisible\" popup=<<qualify \"$:/state/popup/translationInfo/$tiddlerTitle$\">>>\n{{$:/core/images/down-arrow}}\n</$button>\n<$reveal state=<<qualify \"$:/state/popup/translationInfo/$tiddlerTitle$\">> type=\"popup\" position=\"belowleft\" text=\"\" default=\"\">\n<div class=\"tc-drop-down\">\n<p>\nOriginal en-GB text:\n</p>\n<$list filter=\"\"\"$(editFieldsFilter)$\"\"\" variable=\"editorField\">\n<p>\n<textarea class=\"tc-edit-texteditor\" readonly><$view tiddler=\"$:/core\" subtiddler=<<currentTiddler>> field=<<editorField>>/>\n</textarea>\n</p>\n</$list>\n<p>\n<$button message=\"tm-delete-tiddler\" param=<<currentTiddler>>>\nDelete translation\n</$button>\n</p>\n</div>\n</$reveal>\n</div>\n</td>\n</tr>\n\\end\n\n\\define translatableStringEditorWrapperAll(tiddlerTitle)\n<<translatableStringEditorInner \"$tiddlerTitle$\">>\n\\end\n\n\\define translatableStringEditorWrapperTranslated(tiddlerTitle)\n<$list filter=\"[all[current]is[tiddler]]\">\n<<translatableStringEditorInner \"$tiddlerTitle$\">>\n</$list>\n\\end\n\n\\define translatableStringEditorWrapperNotTranslated(tiddlerTitle)\n<$list filter=\"[all[current]!is[tiddler]]\">\n<<translatableStringEditorInner \"$tiddlerTitle$\">>\n</$list>\n\\end\n\n\\define translatableStringEditorOuter()\n<div class=\"tc-translators-string-table\">\n\n//<$count filter=<<translatableTiddlerTitles>>/> translatable tiddlers in this group//\n\n<$radio tiddler=\"$:/plugins/tiddlywiki/translators/editorTag\" value=\"textarea\"> Multi-line editors</$radio><br>\n<$radio tiddler=\"$:/plugins/tiddlywiki/translators/editorTag\" value=\"input\"> Single-line editors</$radio>\n\n<$select tiddler=\"$:/plugins/tiddlywiki/translators/editorView\">\n<option value=\"translatableStringEditorWrapperAll\">Show all strings</option>\n<option value=\"translatableStringEditorWrapperTranslated\">Only show translated strings</option>\n<option value=\"translatableStringEditorWrapperNotTranslated\">Only show strings that have not been translated</option>\n</$select>\n\n<table>\n<tbody>\n<tr>\n<th>\nTitle\n</th>\n<th>\nFields: $(editFieldsFilter)$\n</th>\n<th>\n&nbsp;\n</th>\n</tr>\n<$set name=\"editorView\" value={{$:/plugins/tiddlywiki/translators/editorView}}>\n<$list filter=<<translatableTiddlerTitles>>>\n<$macrocall $name=<<editorView>> tiddlerTitle=<<currentTiddler>>/>\n</$list>\n</$set>\n</tbody>\n</table>\n\\end\n\n\\define translatableStringEditor(editorTag:\"input\",editorFields:\"text\")\n<$set name=\"editorTagName\" value={{$:/plugins/tiddlywiki/translators/editorTag}}>\n<$set name=\"editFieldsFilter\" value=\"\"\"$editorFields$\"\"\">\n<<translatableStringEditorOuter>>\n</$set>\n</$set>\n\\end\n"},"$:/plugins/tiddlywiki/translators/templates/Buttons.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Buttons.multids","text":"{{$:/language/Buttons/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/ControlPanel.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/ControlPanel.multids","text":"{{$:/language/ControlPanel/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/CoreReadMe.tid":{"title":"$:/plugins/tiddlywiki/translators/templates/CoreReadMe.tid","text":"{{$:/core/readme||$:/plugins/tiddlywiki/translators/templates/tid}}"},"$:/plugins/tiddlywiki/translators/templates/Dates.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Dates.multids","text":"{{[prefix[$:/language/Date/]] [prefix[$:/language/RelativeDate/]]||$:/plugins/tiddlywiki/translators/templates/filtered-multids}}"},"$:/plugins/tiddlywiki/translators/templates/EditTemplate.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/EditTemplate.multids","text":"{{$:/language/EditTemplate/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/Exporters.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Exporters.multids","text":"{{$:/language/Exporters/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/Fields.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Fields.multids","text":"{{$:/language/Docs/Fields/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/Filters.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Filters.multids","text":"{{$:/language/Filters/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/GettingStarted.tid":{"title":"$:/plugins/tiddlywiki/translators/templates/GettingStarted.tid","text":"{{GettingStarted||$:/plugins/tiddlywiki/translators/templates/tid}}"},"$:/plugins/tiddlywiki/translators/templates/Import.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Import.multids","text":"{{$:/language/Import/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/Misc.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Misc.multids","text":"{{[all[tiddlers]prefix[$:/language/]]\n-[all[tiddlers]prefix[$:/language/Buttons/]]\n-[all[tiddlers]prefix[$:/language/ControlPanel/]]\n-[all[tiddlers]prefix[$:/language/Date/]]\n-[all[tiddlers]prefix[$:/language/Docs/]]\n-[all[tiddlers]prefix[$:/language/EditTemplate/]]\n-[all[tiddlers]prefix[$:/language/Exporters/]]\n-[all[tiddlers]prefix[$:/language/Filters/]]\n-[all[tiddlers]prefix[$:/language/Help/]]\n-[all[tiddlers]prefix[$:/language/Import/]]\n-[all[tiddlers]prefix[$:/language/Modals/]]\n-[all[tiddlers]prefix[$:/language/Notifications/]]\n-[all[tiddlers]prefix[$:/language/RelativeDate/]]\n-[all[tiddlers]prefix[$:/language/Search/]]\n-[all[tiddlers]prefix[$:/language/SideBar/]]\n-[all[tiddlers]prefix[$:/language/Snippets/]]\n-[all[tiddlers]prefix[$:/language/ThemeTweaks/]]\n-[all[tiddlers]prefix[$:/language/TiddlerInfo/]]\n+[sort[title]]||$:/plugins/tiddlywiki/translators/templates/filtered-multids}}"},"$:/plugins/tiddlywiki/translators/templates/ModuleTypes.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/ModuleTypes.multids","text":"{{$:/language/Docs/ModuleTypes/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/NewJournal.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/NewJournal.multids","text":"{{$:/config/NewJournal/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/Notifications.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Notifications.multids","text":"{{$:/language/Notifications/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/PaletteColours.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/PaletteColours.multids","text":"{{$:/language/Docs/PaletteColours/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/Search.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/Search.multids","text":"{{$:/language/Search/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/SideBar.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/SideBar.multids","text":"{{$:/language/SideBar/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/SiteSubtitle.tid":{"title":"$:/plugins/tiddlywiki/translators/templates/SiteSubtitle.tid","text":"{{$:/SiteSubtitle||$:/plugins/tiddlywiki/translators/templates/tid}}"},"$:/plugins/tiddlywiki/translators/templates/SiteTitle.tid":{"title":"$:/plugins/tiddlywiki/translators/templates/SiteTitle.tid","text":"{{$:/SiteTitle||$:/plugins/tiddlywiki/translators/templates/tid}}"},"$:/plugins/tiddlywiki/translators/templates/ThemeTweaks.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/ThemeTweaks.multids","text":"{{$:/language/ThemeTweaks/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/templates/TiddlerInfo.multids":{"title":"$:/plugins/tiddlywiki/translators/templates/TiddlerInfo.multids","text":"{{$:/language/TiddlerInfo/||$:/plugins/tiddlywiki/translators/templates/multids}}"},"$:/plugins/tiddlywiki/translators/palette":{"title":"$:/plugins/tiddlywiki/translators/palette","name":"Translators Colour Palette","description":"A palette for the translators edition","tags":"$:/tags/Palette","type":"application/x-tiddler-dictionary","text":"alert-background: #ffe476\nalert-border: #b99e2f\nalert-highlight: #881122\nalert-muted-foreground: #b99e2f\nbackground: #ffffff\nblockquote-bar: <<colour muted-foreground>>\ncode-background: #f7f7f9\ncode-border: #e1e1e8\ncode-foreground: #dd1144\ndirty-indicator: #ff0000\ndownload-background: #34c734\ndownload-foreground: <<colour background>>\ndragger-background: <<colour foreground>>\ndragger-foreground: <<colour background>>\ndropdown-background: <<colour background>>\ndropdown-border: <<colour muted-foreground>>\ndropdown-tab-background-selected: #fff\ndropdown-tab-background: #ececec\ndropzone-background: rgba(0,200,0,0.7)\nexternal-link-background-hover: inherit\nexternal-link-background-visited: inherit\nexternal-link-background: inherit\nexternal-link-foreground-hover: inherit\nexternal-link-foreground-visited: #0000aa\nexternal-link-foreground: #0000ee\nforeground: #333333\nmessage-background: #ecf2ff\nmessage-border: #cfd6e6\nmessage-foreground: #547599\nmodal-backdrop: <<colour foreground>>\nmodal-background: <<colour background>>\nmodal-border: #999999\nmodal-footer-background: #f5f5f5\nmodal-footer-border: #dddddd\nmodal-header-border: #eeeeee\nmuted-foreground: #bbb\nnotification-background: #ffffdd\nnotification-border: #999999\npage-background: #b9ceb8\npre-background: #f5f5f5\npre-border: #cccccc\nprimary: #5778d8\nsidebar-button-foreground: <<colour foreground>>\nsidebar-controls-foreground-hover: #000000\nsidebar-controls-foreground: #aaaaaa\nsidebar-foreground-shadow: rgba(255,255,255, 0.8)\nsidebar-foreground: #acacac\nsidebar-muted-foreground-hover: #444444\nsidebar-muted-foreground: #c0c0c0\nsidebar-tab-background-selected: #ececec\nsidebar-tab-background: <<colour tab-background>>\nsidebar-tab-border-selected: <<colour tab-border-selected>>\nsidebar-tab-border: <<colour tab-border>>\nsidebar-tab-divider: #e4e4e4\nsidebar-tab-foreground-selected: \nsidebar-tab-foreground: <<colour tab-foreground>>\nsidebar-tiddler-link-foreground-hover: #444444\nsidebar-tiddler-link-foreground: #999999\nstatic-alert-foreground: #aaaaaa\ntab-background-selected: #ffffff\ntab-background: #d8d8d8\ntab-border-selected: #d8d8d8\ntab-border: #cccccc\ntab-divider: #d8d8d8\ntab-foreground-selected: <<colour tab-foreground>>\ntab-foreground: #666666\ntable-border: #dddddd\ntable-footer-background: #a8a8a8\ntable-header-background: #f0f0f0\ntag-background: #d5ad34\ntag-foreground: #ffffff\ntiddler-background: <<colour background>>\ntiddler-border: <<colour background>>\ntiddler-controls-foreground-hover: #888888\ntiddler-controls-foreground-selected: #444444\ntiddler-controls-foreground: #cccccc\ntiddler-editor-background: #f8f8f8\ntiddler-editor-border-image: #ffffff\ntiddler-editor-border: #cccccc\ntiddler-editor-fields-even: #e0e8e0\ntiddler-editor-fields-odd: #f0f4f0\ntiddler-info-background: #f8f8f8\ntiddler-info-border: #dddddd\ntiddler-info-tab-background: #f8f8f8\ntiddler-link-background: <<colour background>>\ntiddler-link-foreground: <<colour primary>>\ntiddler-subtitle-foreground: #c0c0c0\ntiddler-title-foreground: #182955\ntoolbar-new-button: \ntoolbar-options-button: \ntoolbar-save-button: \ntoolbar-info-button: \ntoolbar-edit-button: \ntoolbar-close-button: \ntoolbar-delete-button: \ntoolbar-cancel-button: \ntoolbar-done-button: \nuntagged-background: #999999\nvery-muted-foreground: #888888\n"},"$:/plugins/tiddlywiki/translators/readme":{"title":"$:/plugins/tiddlywiki/translators/readme","text":"This plugin exposes a new system tiddler [[$:/Translators]] that presents a user interface for creating and maintaining translations. It is used to build the special [[translators edition|https://tiddlywiki.com/editions/translators]].\n\n[[Source code|https://github.com/Jermolene/TiddlyWiki5/blob/master/plugins/tiddlywiki/translators]]\n"},"$:/plugins/tiddlywiki/translators/styles":{"title":"$:/plugins/tiddlywiki/translators/styles","tags":"$:/tags/Stylesheet","text":".tc-translators-string-table table {\n\twidth: 100%;\n}\n\n.tc-translators-string-table .tc-btn-invisible {\n\twidth: 1em;\n\theight: 2em;\n}\n\n.tc-translators-string-table .tc-drop-down {\n\tmin-width: 500px;\n}"},"$:/plugins/tiddlywiki/translators/templates/filtered-multids":{"title":"$:/plugins/tiddlywiki/translators/templates/filtered-multids","text":"\\define generateMultids(filter)\ntitle: $:/language/\n\n<$list filter=\"\"\"$filter$\"\"\"><$list filter=\"[is[current]removeprefix[$:/language/]]\"><$text text=<<currentTiddler>>/></$list>: <$text text={{!!text}}/>\n</$list>\n\\end\n<$macrocall $name=\"generateMultids\" filter=<<currentTiddler>>/>"},"$:/plugins/tiddlywiki/translators/templates/help-tid":{"title":"$:/plugins/tiddlywiki/translators/templates/help-tid","text":"\\define generateTid(title)\ntitle: $:/language/Help/$title$\ndescription: <$text text={{$:/language/Help/$title$!!description}}/>\n\n<$text text={{$:/language/Help/$title$}}/>\n\\end\n<$macrocall $name=\"generateTid\" title=<<currentTiddler>>/>"},"$:/plugins/tiddlywiki/translators/templates/modal-tid":{"title":"$:/plugins/tiddlywiki/translators/templates/modal-tid","text":"\\define generateTid(title)\ntitle: $:/language/Modals/$title$\ntype: <$text text={{$:/language/Modals/$title$!!type}}/>\nsubtitle: <$text text={{$:/language/Modals/$title$!!subtitle}}/>\nfooter: <$text text={{$:/language/Modals/$title$!!footer}}/>\nhelp: <$text text={{$:/language/Modals/$title$!!help}}/>\n\n<$text text={{$:/language/Modals/$title$}}/>\n\\end\n<$macrocall $name=\"generateTid\" title=<<currentTiddler>>/>"},"$:/plugins/tiddlywiki/translators/templates/multids":{"title":"$:/plugins/tiddlywiki/translators/templates/multids","text":"\\define generateMultids(prefix)\ntitle: $prefix$\n\n<$list filter=\"[prefix[$prefix$]sort[title]]\"><$list filter=\"[is[current]removeprefix[$prefix$]]\"><$text text=<<currentTiddler>>/></$list>: <$text text={{!!text}}/>\n</$list>\n\\end\n<$macrocall $name=\"generateMultids\" prefix=<<currentTiddler>>/>"},"$:/plugins/tiddlywiki/translators/templates/snippet-tid":{"title":"$:/plugins/tiddlywiki/translators/templates/snippet-tid","text":"\\define generateTid(title)\ntitle: $:/language/Snippets/$title$\ntags: $:/tags/TextEditor/Snippet\ncaption: <$text text={{$:/language/Snippets/$title$!!caption}}/>\n\n<$text text={{$:/language/Snippets/$title$}}/>\n\\end\n<$macrocall $name=\"generateTid\" title=<<currentTiddler>>/>"},"$:/plugins/tiddlywiki/translators/templates/tid":{"title":"$:/plugins/tiddlywiki/translators/templates/tid","text":"\\define generateTid(title)\ntitle: $title$\n\n<$list filter=\"\"\"[[$title$]is[tiddler]]\"\"\"><$text text={{$title$}}/></$list>\n\\end\n<$macrocall $name=\"generateTid\" title=<<currentTiddler>>/>"},"$:/plugins/tiddlywiki/translators/templates/type-tid":{"title":"$:/plugins/tiddlywiki/translators/templates/type-tid","text":"\\define generateTid(title)\ntitle: $:/language/Docs/Types/$title$\ndescription: <$text text={{$:/language/Docs/Types/$title$!!description}}/>\nname: <$text text={{$:/language/Docs/Types/$title$!!name}}/>\ngroup: <$text text={{$:/language/Docs/Types/$title$!!group}}/>\n\n\\end\n<$macrocall $name=\"generateTid\" title=<<currentTiddler>>/>"},"$:/plugins/tiddlywiki/translators/editorTag":{"title":"$:/plugins/tiddlywiki/translators/editorTag","text":"textarea"},"$:/plugins/tiddlywiki/translators/editorView":{"title":"$:/plugins/tiddlywiki/translators/editorView","text":"translatableStringEditorWrapperAll"},"$:/plugins/tiddlywiki/translators/ui/group/Buttons":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Buttons","caption":"Buttons","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/Buttons/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Buttons/]]\n\\end\n\n! Buttons\n\nToolbar buttons. The ''/Caption'' tiddlers specify the text to be displayed on the button and the ''/Hint'' tiddlers specify the tooltip text.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/ControlPanel":{"title":"$:/plugins/tiddlywiki/translators/ui/group/ControlPanel","caption":"Control Panel","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/ControlPanel/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/ControlPanel/]]\n\\end\n\n! Control Panel\n\n[[Control Panel|$:/ControlPanel]].\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Date":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Date","caption":"Date","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/Date/]]\n[all[tiddlers+shadows]prefix[$:/language/RelativeDate/]]\n+[sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Date/]] [all[current]removeprefix[$:/language/RelativeDate/]]\n\\end\n\n! Date\n\nAbsolute and relative dates.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/EditTemplate":{"title":"$:/plugins/tiddlywiki/translators/ui/group/EditTemplate","caption":"Edit Template","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/EditTemplate/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/EditTemplate/]]\n\\end\n\n! Edit Template\n\nStrings used in the tiddler edit template.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Docs/Fields":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Docs/Fields","caption":"Fields","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[shadows+tiddlers]prefix[$:/language/Docs/Fields/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Docs/Fields/]]\n\\end\n\n! Fields\n\nDescriptions of commonly used fields.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Filters":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Filters","caption":"Filters","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/Filters/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Filters/]]\n\\end\n\n! Filters\n\nTranslatable titles of the preconfigured filters available in [[advanced search|$:/AdvancedSearch]].\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/GettingStarted":{"title":"$:/plugins/tiddlywiki/translators/ui/group/GettingStarted","caption":"Getting Started","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\nGettingStarted\n\\end\n\\define shortenTitle()\n[all[current]]\n\\end\n\n! Getting Started\n\nThe GettingStarted tiddler that is displayed when an empty ~TiddlyWiki starts.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Help":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Help","caption":"Help","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/Help/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Help/]]\n\\end\n\n! Help\n\nHelp text for the ~TiddlyWiki commands available under Node.js.\n\n<<translatableStringEditor editorFields:\"text description\">>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Import":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Import","caption":"Import","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/Import/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Import/]]\n\\end\n\n! Import\n\nImport mechanism.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Miscellaneous":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Miscellaneous","caption":"Miscellaneous","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/]]\n-[all[tiddlers+shadows]prefix[$:/language/Buttons/]]\n-[all[tiddlers+shadows]prefix[$:/language/ControlPanel/]]\n-[all[tiddlers+shadows]prefix[$:/language/Date/]]\n-[all[tiddlers+shadows]prefix[$:/language/Docs/]]\n-[all[tiddlers+shadows]prefix[$:/language/EditTemplate/]]\n-[all[tiddlers+shadows]prefix[$:/language/Filters/]]\n-[all[tiddlers+shadows]prefix[$:/language/Help/]]\n-[all[tiddlers+shadows]prefix[$:/language/Import/]]\n-[all[tiddlers+shadows]prefix[$:/language/RelativeDate/]]\n-[all[tiddlers+shadows]prefix[$:/language/Search/]]\n-[all[tiddlers+shadows]prefix[$:/language/SideBar/]]\n-[all[tiddlers+shadows]prefix[$:/language/Snippets/]]\n-[all[tiddlers+shadows]prefix[$:/language/ThemeTweaks/]]\n-[all[tiddlers+shadows]prefix[$:/language/TiddlerInfo/]]\n[all[tiddlers+shadows]prefix[$:/config/NewJournal/]]\n[[$:/SiteTitle]]\n[[$:/SiteSubtitle]]\n[[$:/core/readme]]\n+[sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/]] [all[current]removeprefix[$:/config/]] [all[current]!prefix[$:/language/]!prefix[$:/config/]]\n\\end\n\n! Miscellaneous\n\nMiscellaneous translatable strings.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Docs/ModuleTypes":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Docs/ModuleTypes","caption":"Module Types","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[shadows+tiddlers]prefix[$:/language/Docs/ModuleTypes/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Docs/ModuleTypes/]]\n\\end\n\n! Module Types\n\nModule types. This is technical information that is probably not required in most translations.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Docs/PaletteColours":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Docs/PaletteColours","caption":"Palette Colours","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[shadows+tiddlers]prefix[$:/language/Docs/PaletteColours/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Docs/PaletteColours/]]\n\\end\n\n! Palette Colours\n\nPalette colours.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Search":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Search","caption":"Search","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/Search/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Search/]]\n\\end\n\n! Search\n\nSearch-related translatable strings.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/SideBar":{"title":"$:/plugins/tiddlywiki/translators/ui/group/SideBar","caption":"Sidebar","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/SideBar/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/SideBar/]]\n\\end\n\n! Sidebar\n\nSidebar-related translatable strings.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Snippets":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Snippets","caption":"Snippets","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/Snippets/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Snippets/]]\n\\end\n\n! Snippets\n\nText snippets for use by the stamp text editor toolbar button.\n\n<<translatableStringEditor editorFields:\"caption text\">>\n"},"$:/plugins/tiddlywiki/translators/ui/group/ThemeTweaks":{"title":"$:/plugins/tiddlywiki/translators/ui/group/ThemeTweaks","caption":"Theme Tweaks","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/ThemeTweaks/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/ThemeTweaks/]]\n\\end\n\n! Theme Tweaks\n\nStrings used in the theme tweaks for Vanilla.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/TiddlerInfo":{"title":"$:/plugins/tiddlywiki/translators/ui/group/TiddlerInfo","caption":"Tiddler Info","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[tiddlers+shadows]prefix[$:/language/TiddlerInfo/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/TiddlerInfo/]]\n\\end\n\n! Tiddler Info\n\nTiddler info panel.\n\n<<translatableStringEditor>>\n"},"$:/plugins/tiddlywiki/translators/ui/group/Docs/Types":{"title":"$:/plugins/tiddlywiki/translators/ui/group/Docs/Types","caption":"Types","tags":"$:/tags/TranslationGroup","text":"\\define translatableTiddlerTitles()\n[all[shadows+tiddlers]prefix[$:/language/Docs/Types/]sort[title]]\n\\end\n\\define shortenTitle()\n[all[current]removeprefix[$:/language/Docs/Types/]]\n\\end\n\n! Types\n\nDescriptions for each content type (as appears in the type dropdown in the tiddler editor).\n\n<<translatableStringEditor editorFields:\"description group\">>\n"}}});