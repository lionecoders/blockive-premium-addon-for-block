const ALLOWED_PROTOCOLS = [ 'http:', 'https:', 'mailto:', 'tel:' ];

/**
 * Returns the given URL if it uses a safe protocol (http, https, mailto, tel),
 * is a relative URL, or is an in-page anchor. Returns an empty string for any
 * other scheme (e.g. javascript:, data:, vbscript:).
 */
export function getSafeMailchimpUrl( url ) {
	if ( ! url ) {
		return url;
	}

	const trimmed = url.trim();

	if ( trimmed.startsWith( '#' ) || trimmed.startsWith( '/' ) ) {
		return url;
	}

	const schemeMatch = trimmed.match( /^([a-zA-Z][a-zA-Z0-9+.-]*:)/ );

	if ( ! schemeMatch ) {
		return url;
	}

	return ALLOWED_PROTOCOLS.includes( schemeMatch[ 1 ].toLowerCase() ) ? url : '';
}
