/**
 * Look up the specified or selected text using Dutch Wiktionary.
 *
 * @title Dutch Wiktionary
 */
(function nlwikt() {
	/* Try to get the parameter string from the bookmarklet/search query.
	   Fall back to the current text selection, if any. If those options
	   both fail, prompt the user.
	*/
	var s = (function () { /*%s*/; }).toString()
		.replace(/^function\s*\(\s*\)\s*\{\s*\/\*/, '')
		.replace(/\*\/\s*\;?\s*\}\s*$/, '')
		.replace(/\u0025s/, '');
	if (s === '') {
		s = getSelection() + '' || prompt('Please enter your text:');
	}

	if (s) {
		location = 'https://nl.wiktionary.org/wiki/' + encodeURIComponent(s);
	}
})();
