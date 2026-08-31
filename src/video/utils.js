const ALLOWED_PROTOCOLS = [ 'http:', 'https:' ];

/**
 * Returns the given URL if it uses a safe protocol (http, https) or is a
 * relative URL. Returns an empty string for any other scheme (e.g.
 * javascript:, data:, vbscript:). Video sources are always either a Media
 * Library URL or a relative path, so mailto:/tel: are intentionally not
 * allowed here (unlike the link-URL variant of this helper used elsewhere).
 */
export function getSafeVideoUrl( url ) {
	if ( ! url ) {
		return url;
	}

	const trimmed = url.trim();

	if ( trimmed.startsWith( '/' ) ) {
		return url;
	}

	const schemeMatch = trimmed.match( /^([a-zA-Z][a-zA-Z0-9+.-]*:)/ );

	if ( ! schemeMatch ) {
		return url;
	}

	return ALLOWED_PROTOCOLS.includes( schemeMatch[ 1 ].toLowerCase() ) ? url : '';
}
