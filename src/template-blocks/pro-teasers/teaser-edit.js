import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';

/**
 * Builds the `edit` component shown when a Pro teaser block is inserted:
 * a locked placeholder, not the real block - these blocks ship with no
 * `render.php` and no server-side registration, so nothing is output on
 * the frontend either.
 *
 * @param {string} title Block title, e.g. "Product Price".
 * @return {Function} React component.
 */
export function createTeaserEdit( title ) {
	return function TeaserEdit() {
		const blockProps = useBlockProps();
		return (
			<div { ...blockProps }>
				<Placeholder
					icon="lock"
					label={ sprintf(
						/* translators: %s: Template Block title, e.g. "Product Price". */
						__( '%s (Pro)', 'blockive-premium-addon-for-block' ),
						title
					) }
					instructions={ __(
						'This Template Block is part of Blockive Pro and is not available in the free version yet.',
						'blockive-premium-addon-for-block'
					) }
				/>
			</div>
		);
	};
}
