const DEFAULT_ALLOWED_PROTOCOLS = [ 'http:', 'https:', 'mailto:', 'tel:' ];

/**
 * Returns the given URL if it uses an allowed protocol, is a relative URL,
 * or (when allowAnchor is true) is an in-page anchor. Returns an empty
 * string for any other scheme (e.g. javascript:, data:, vbscript:).
 *
 * Shared by every block that accepts a user-entered link/media URL, so a
 * future change to the allowlist only needs to be made in one place.
 *
 * @param {string}  url                        The URL to check.
 * @param {Object}  [options]
 * @param {Array}   [options.allowedProtocols] Protocols allowed besides relative/anchor URLs.
 * @param {boolean} [options.allowAnchor]      Whether a leading "#" in-page anchor is allowed.
 */
export function getSafeUrl( url, { allowedProtocols = DEFAULT_ALLOWED_PROTOCOLS, allowAnchor = true } = {} ) {
	if ( ! url ) {
		return url;
	}

	const trimmed = url.trim();

	if ( trimmed.startsWith( '/' ) || ( allowAnchor && trimmed.startsWith( '#' ) ) ) {
		return url;
	}

	const schemeMatch = trimmed.match( /^([a-zA-Z][a-zA-Z0-9+.-]*:)/ );

	if ( ! schemeMatch ) {
		return url;
	}

	return allowedProtocols.includes( schemeMatch[ 1 ].toLowerCase() ) ? url : '';
}
