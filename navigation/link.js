/**
 * Show a minimal HTML page linking to the current page.
 *
 * @title Link this
 */
(function link() {
	var s = (<><![CDATA[%s]]></> + '').replace(/\u0025s/, '');
	if (s && !s.match(/^\w+:/)) {
		s = 'http://' + s;
	}
	var root = document.createDocumentFragment().appendChild(document.createElement('html')),
	    titleText = s || (document.querySelector('title') && document.querySelector('title').textContent || document.title).replace(/\n/g, ' ').trim(),
	    originalIconLink = s || document.querySelector('link[rel*="icon"]');

	/* Build a basic HTML document for easy element access. */
	root.innerHTML = '<head><title></title><link rel="icon"><style>html { font-family: "Calibri", sans-serif; } img { max-width: 32px; max-height: 32px; } textarea { width: 100%; padding: 1ex; border: 1px dotted grey; }</style><body><p><img> <span><a></a></span><p>Link code:<br><textarea rows="10" cols="80"></textarea>';
	var title = root.querySelector('title'),
	    iconLink = root.querySelector('link'),
	    styleSheet = root.querySelector('style'),
	    iconImage = root.querySelector('img'),
	    link = root.querySelector('a'),
	    textarea = root.querySelector('textarea');

	/* Link to the current page using its title. */
	link.href = s || location;
	link.textContent = title.textContent = s || titleText;
	var domain = (s && link.hostname) || document.domain || location.hostname;
	if (titleText) {
		link.parentNode.insertBefore(document.createTextNode(' [' + (domain || link.hostname) + ']'), link.nextSibling);
	}

	/* Make sure the favicon HREF is absolute. If there was none, use Google S2. */
	iconLink.href = iconImage.src = originalIconLink && originalIconLink.href || 'http://www.google.com/s2/favicons?domain=' + (domain || link.hostname);

	/* Show the link code in various formats. */
	textarea.textContent = 'Plain text:\n"' + link.textContent + '": ' + link.href;
	textarea.textContent += '\n\nHTML:\n' + link.parentNode.innerHTML;
	textarea.textContent += '\n\nMarkdown:\n[' + link.textContent + '](' + link.href + ')';

	/* Open the data: URI with existing %XX encodings intact. */
	location = 'data:text/html;charset=UTF-8,' + encodeURIComponent(root.innerHTML);
})();
