import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, BaseControl, ColorPalette } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

// SKU is not present on the generic `wp/v2/product` REST entity record in
// this environment, so the editor always shows a realistic static
// placeholder SKU.
export default function Edit( { attributes, setAttributes } ) {
	const { label, hideIfEmpty, textColor } = attributes;

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-product-sku',
		style: {
			color: textColor || undefined,
		},
	} );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'SKU', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<TextControl
							label={ __( 'Label', 'blockive-premium-addon-for-block' ) }
							value={ label }
							onChange={ ( value ) => setAttributes( { label: value } ) }
						/>
						<ToggleControl
							label={ __( 'Hide If Empty', 'blockive-premium-addon-for-block' ) }
							help={ __( 'Don’t render anything when the product has no SKU set.', 'blockive-premium-addon-for-block' ) }
							checked={ !! hideIfEmpty }
							onChange={ ( value ) => setAttributes( { hideIfEmpty: value } ) }
						/>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<BaseControl label={ __( 'Text Color', 'blockive-premium-addon-for-block' ) }>
							<ColorPalette value={ textColor } onChange={ ( value ) => setAttributes( { textColor: value } ) } />
						</BaseControl>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				{ label ? <span className="bpafb-tb-sku-label">{ label } </span> : null }
				<span className="bpafb-tb-sku-value">SKU-1234</span>
			</div>
		</>
	);
}
