import { useSelect } from '@wordpress/data';

/**
 * Live-preview data source for Template Blocks.
 *
 * While editing a `blockive_template` there is no real post being displayed
 * (the CPT being edited is the template itself), so every Template Block
 * needs a stand-in post to preview against. This hook fetches the most
 * recently published entity record of the given post type so blocks can show
 * real dynamic data in the editor; callers should fall back to static
 * placeholder content (e.g. "Sample Post Title") when `record` is null.
 *
 * @param {string} [forcedPostType] Post type to preview, e.g. 'product' for
 *                                  WooCommerce blocks or the detected events
 *                                  CPT for Event blocks. When omitted, the
 *                                  post type configured on the template being
 *                                  edited (Template Settings > Template Type)
 *                                  is used, defaulting to 'post'.
 * @return {{ postType: string, record: Object|null, isResolving: boolean }}
 */
export default function usePreviewContext( forcedPostType ) {
	return useSelect(
		( select ) => {
			const editor = select( 'core/editor' );
			const templateMeta = editor ? editor.getEditedPostAttribute( 'meta' ) : undefined;
			const postType = forcedPostType || templateMeta?._bpafb_template_type || 'post';

			const query = {
				per_page: 1,
				orderby: 'date',
				order: 'desc',
				status: 'publish',
				_embed: true,
			};

			const records = select( 'core' ).getEntityRecords( 'postType', postType, query );
			const isResolving = select( 'core' ).isResolving( 'getEntityRecords', [
				'postType',
				postType,
				query,
			] );

			return {
				postType,
				record: records && records.length ? records[ 0 ] : null,
				isResolving: !! isResolving,
			};
		},
		[ forcedPostType ]
	);
}

/**
 * Pulls the featured image URL (at the given size, falling back to full) out
 * of a preview record's embedded `wp:featuredmedia`, mirroring the shape
 * `_embed` produces via the REST API.
 *
 * @param {Object|null} record Entity record fetched with `_embed: true`.
 * @param {string}      [size] Preferred image size key, e.g. 'medium'.
 * @return {string|null}
 */
export function getEmbeddedFeaturedImageUrl( record, size = 'full' ) {
	const media = record?._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ];
	if ( ! media ) {
		return null;
	}
	return (
		media.media_details?.sizes?.[ size ]?.source_url ||
		media.source_url ||
		null
	);
}

/**
 * Pulls the embedded author display name out of a preview record.
 *
 * @param {Object|null} record Entity record fetched with `_embed: true`.
 * @return {string|null}
 */
export function getEmbeddedAuthorName( record ) {
	return record?._embedded?.author?.[ 0 ]?.name || null;
}
