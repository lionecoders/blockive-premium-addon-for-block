import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, BaseControl, ColorPalette } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

// Stock status/quantity is not present on the generic `wp/v2/product` REST
// entity record in this environment, so the editor always previews the
// "In Stock" state with a static sample quantity.
export default function Edit( { attributes, setAttributes } ) {
	const {
		inStockText,
		outOfStockText,
		onBackorderText,
		inStockColor,
		outOfStockColor,
		onBackorderColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-product-stock bpafb-stock-instock',
		style: {
			color: inStockColor || undefined,
		},
	} );

	const previewText = ( inStockText || __( 'In Stock', 'blockive-premium-addon-for-block' ) ).replace( '{qty}', '12' );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Stock Text', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<p className="bpafb-help-text">
							{ __( 'Use the {qty} token in the In Stock text to show the tracked quantity, when the product has stock management enabled.', 'blockive-premium-addon-for-block' ) }
						</p>
						<TextControl
							label={ __( 'In Stock Text', 'blockive-premium-addon-for-block' ) }
							value={ inStockText }
							onChange={ ( value ) => setAttributes( { inStockText: value } ) }
						/>
						<TextControl
							label={ __( 'Out of Stock Text', 'blockive-premium-addon-for-block' ) }
							value={ outOfStockText }
							onChange={ ( value ) => setAttributes( { outOfStockText: value } ) }
						/>
						<TextControl
							label={ __( 'On Backorder Text', 'blockive-premium-addon-for-block' ) }
							value={ onBackorderText }
							onChange={ ( value ) => setAttributes( { onBackorderText: value } ) }
						/>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Status Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<BaseControl label={ __( 'In Stock Color', 'blockive-premium-addon-for-block' ) }>
							<ColorPalette value={ inStockColor } onChange={ ( value ) => setAttributes( { inStockColor: value } ) } />
						</BaseControl>
						<BaseControl label={ __( 'Out of Stock Color', 'blockive-premium-addon-for-block' ) }>
							<ColorPalette value={ outOfStockColor } onChange={ ( value ) => setAttributes( { outOfStockColor: value } ) } />
						</BaseControl>
						<BaseControl label={ __( 'On Backorder Color', 'blockive-premium-addon-for-block' ) }>
							<ColorPalette value={ onBackorderColor } onChange={ ( value ) => setAttributes( { onBackorderColor: value } ) } />
						</BaseControl>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>{ previewText }</div>
		</>
	);
}
