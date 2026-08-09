import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Adds a "Dynamic Content" inspector panel to every block while editing a
 * Blockive Template. Only registered inside the template-builder bundle,
 * which is itself only enqueued on the `blockive_template` editor screen
 * (see Bpafb_Template_Builder::enqueue_assets), so this never affects the
 * editor for posts/pages/products/other post types.
 */
const withDynamicContentControl = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => (
		<>
			<BlockEdit { ...props } />
			<InspectorControls group="advanced">
				<PanelBody
					title={ __( 'Dynamic Content', 'blockive-premium-addon-for-block' ) }
					initialOpen={ false }
				>
					<p>
						{ __(
							'Bind this block to dynamic data (post fields, custom fields, template variables).',
							'blockive-premium-addon-for-block'
						) }
					</p>
				</PanelBody>
			</InspectorControls>
		</>
	),
	'withDynamicContentControl'
);

export default function registerDynamicContentControl() {
	addFilter(
		'editor.BlockEdit',
		'blockive-premium-addon-for-block/dynamic-content',
		withDynamicContentControl
	);
}
