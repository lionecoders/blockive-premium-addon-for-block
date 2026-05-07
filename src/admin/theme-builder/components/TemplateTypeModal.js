/**
 * TemplateTypeModal Component.
 *
 * Displays a modal with template type cards. On selection,
 * redirects to post-new.php with the chosen template_type
 * query parameter.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Available template types with their metadata.
 */
const TEMPLATE_TYPES = [
	{
		slug: 'header',
		label: __( 'Header', 'blockive-premium-addon-for-block' ),
		description: __( 'Design the top section of your site.', 'blockive-premium-addon-for-block' ),
		dashicon: 'arrow-up-alt',
	},
	{
		slug: 'footer',
		label: __( 'Footer', 'blockive-premium-addon-for-block' ),
		description: __( 'Design the bottom section of your site.', 'blockive-premium-addon-for-block' ),
		dashicon: 'arrow-down-alt',
	},
	{
		slug: 'single',
		label: __( 'Single', 'blockive-premium-addon-for-block' ),
		description: __( 'Template for individual posts or pages.', 'blockive-premium-addon-for-block' ),
		dashicon: 'media-text',
	},
	{
		slug: 'archive',
		label: __( 'Archive', 'blockive-premium-addon-for-block' ),
		description: __( 'Layout for category, tag, or date archives.', 'blockive-premium-addon-for-block' ),
		dashicon: 'grid-view',
	},
	{
		slug: '404',
		label: __( '404', 'blockive-premium-addon-for-block' ),
		description: __( 'Page shown when content is not found.', 'blockive-premium-addon-for-block' ),
		dashicon: 'warning',
	},
	{
		slug: 'search',
		label: __( 'Search', 'blockive-premium-addon-for-block' ),
		description: __( 'Template for search results page.', 'blockive-premium-addon-for-block' ),
		dashicon: 'search',
	},
];

/**
 * Redirect to the new-template editor with the chosen type.
 *
 * @param {string} typeSlug Template type slug.
 */
function handleSelect( typeSlug ) {
	const baseUrl = window.blockiveThemeBuilder?.newPostUrl || '';
	window.location.href = `${ baseUrl }&template_type=${ encodeURIComponent( typeSlug ) }`;
}

export default function TemplateTypeModal( { onClose } ) {
	return (
		<Modal
			title={ __( 'Choose a Template Type', 'blockive-premium-addon-for-block' ) }
			onRequestClose={ onClose }
			className="blockive-tb-modal"
			isDismissible
		>
			<p className="blockive-tb-modal__description">
				{ __(
					'Select the type of template you want to create.',
					'blockive-premium-addon-for-block'
				) }
			</p>

			<div className="blockive-tb-type-grid">
				{ TEMPLATE_TYPES.map( ( type ) => (
					<button
						key={ type.slug }
						type="button"
						className="blockive-tb-type-card"
						onClick={ () => handleSelect( type.slug ) }
					>
						<span
							className={ `dashicons dashicons-${ type.dashicon } blockive-tb-type-card__icon` }
						/>
						<span className="blockive-tb-type-card__label">
							{ type.label }
						</span>
						<span className="blockive-tb-type-card__desc">
							{ type.description }
						</span>
					</button>
				) ) }
			</div>
		</Modal>
	);
}
