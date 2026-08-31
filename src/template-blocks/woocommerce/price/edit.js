import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

// WooCommerce-specific fields like price are not reliably present on the
// generic `wp/v2/product` REST entity record in this environment, so the
// price is always shown as a realistic static placeholder in the editor;
// the real formatted price (with any sale/regular strike-through) only
// renders on the front end via $product->get_price_html().
export default function Edit( { attributes, setAttributes } ) {
	const { textAlign } = attributes;

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-product-price',
		style: {
			textAlign: textAlign || undefined,
		},
	} );

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( value ) => setAttributes( { textAlign: value } ) }
				/>
			</BlockControls>

			<InspectorTabs
				general={
					<PanelBody title={ __( 'Price', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<p className="bpafb-help-text">
							{ __( 'Renders the product’s regular/sale price exactly as WooCommerce formats it. Use the Align toolbar above to set text alignment.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<p className="bpafb-help-text">
							{ __( 'Font, size, weight, color and other typography options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				<span className="woocommerce-Price-amount amount">
					<bdi>
						<span className="woocommerce-Price-currencySymbol">$</span>
						49.99
					</bdi>
				</span>
			</div>
		</>
	);
}
