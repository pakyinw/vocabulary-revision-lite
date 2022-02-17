# Documentation

## Data
1. Chrome storage

| Key | Data |
| --- | --- |
| config | { from, to } |
| vocabs | { id: { vocab, from, to, url } } |

*config* stores the languages which you want to translate from/to currently.
*vocabs* stores the vocabularies with urls/translation(from/to). The id is the timestamp when you click "Translate" of the context menu.

## Reference
1. Empty object from chrome.storage is {} instead of null. Please use Object.keys().length to check if the object is empty. (https://stackoverflow.com/questions/43251342/google-chrome-extension-how-to-check-if-storage-is-empty)

## Goal
1. Shortcut for searching the highlight text
2. Backend for storing data
3. Using lodash.cloneDeep instead of JSON.parse(JSON.stringify(obj))
Currently we are using native JSON object to do [deep clone](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript).
4. Pagination
5. Put all languages supported by google translate into the "Translate from/to" drop down
6. Testing
Unit Test are welcomed to add.