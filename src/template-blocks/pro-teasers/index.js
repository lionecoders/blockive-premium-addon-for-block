/**
 * Registers "(Pro)" teaser blocks for the WooCommerce, Events, and Dynamic
 * Field Template Blocks, so they're visible (and clearly marked as Pro) in
 * the Blockive Template inserter even though the free version only supports
 * Post/Page templates so far.
 *
 * Each teaser is a purely client-side, static block: no block.json, no
 * render.php, no PHP registration. Inserting one just drops in a locked
 * placeholder (see ./teaser-edit); `save` returns null so nothing is ever
 * output on the frontend.
 */
import { registerBlockType } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import './style.css';
import { PRO_TEASER_BLOCKS } from './block-list';
import { createTeaserEdit } from './teaser-edit';
import { withProBadge } from './icon';

const NAME_PREFIX = 'blockive-premium-addon-for-block/tb-';

PRO_TEASER_BLOCKS.forEach( ( { slug, title, icon } ) => {
	registerBlockType( NAME_PREFIX + slug, {
		apiVersion: 3,
		title,
		category: 'blockive-template',
		icon: withProBadge( icon ),
		description: sprintf(
			/* translators: %s: Template Block title, e.g. "Product Price". */
			__( '%s - available in Blockive Pro.', 'blockive-premium-addon-for-block' ),
			title
		),
		keywords: [ __( 'pro', 'blockive-premium-addon-for-block' ) ],
		supports: {
			html: false,
			className: false,
			customClassName: false,
			reusable: false,
		},
		edit: createTeaserEdit( title ),
		save: () => null,
	} );
} );
