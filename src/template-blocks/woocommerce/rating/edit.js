import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, BaseControl, ColorPalette } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

// The average rating and review count are not reliably present on the
// generic `wp/v2/product` REST entity record in this environment, so the
// editor always shows a realistic static placeholder rating.
export default function Edit( { attributes, setAttributes } ) {
	const { showCount, starColor } = attributes;

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-product-rating',
		style: {
			'--wc-star-color': starColor || undefined,
		},
	} );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Rating', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<ToggleControl
								label={ __( 'Show Review Count', 'blockive-premium-addon-for-block' ) }
								checked={ !! showCount }
								onChange={ ( value ) => setAttributes( { showCount: value } ) }
							/>
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<BaseControl label={ __( 'Star Color', 'blockive-premium-addon-for-block' ) }>
								<ColorPalette value={ starColor } onChange={ ( value ) => setAttributes( { starColor: value } ) } />
							</BaseControl>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<span className="bpafb-tb-rating-stars" aria-hidden="true">★★★★☆</span>
				{ showCount && (
					<span className="bpafb-tb-rating-count">
						{ __( '(24 reviews)', 'blockive-premium-addon-for-block' ) }
					</span>
				) }
			</div>
		</>
	);
}
