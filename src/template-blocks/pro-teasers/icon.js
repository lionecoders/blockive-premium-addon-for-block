/**
 * Overlays a small lock badge on a Dashicon, marking a Template Block as
 * Pro-only in the inserter grid.
 *
 * @param {string} dashicon Dashicon slug (without the "dashicons-" prefix).
 * @return {JSX.Element} Icon element for the block's `icon` setting.
 */
export function withProBadge( dashicon ) {
	return (
		<span className="bpafb-pro-teaser-icon">
			<span className={ `dashicons dashicons-${ dashicon }` } />
			<span
				className="dashicons dashicons-lock bpafb-pro-teaser-icon__badge"
				aria-hidden="true"
			/>
		</span>
	);
}
