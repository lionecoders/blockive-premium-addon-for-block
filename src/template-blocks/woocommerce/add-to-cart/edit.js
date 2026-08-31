import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import ColorStateControls from '../../../components/color-state-controls';

// The real Add to Cart form (quantity input, variation dropdowns, AJAX
// button, etc.) is rendered entirely on the front end by WooCommerce's own
// woocommerce_template_single_add_to_cart(), which needs a real global
// $product and isn't safe/meaningful to reproduce inside the block editor
// preview - a static mockup button is shown here instead.
export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, btnBgColor, btnTextColor, btnHoverBgColor, btnHoverTextColor } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-add-to-cart' } );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Add To Cart', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<p className="bpafb-help-text">
							{ __( 'Renders WooCommerce’s own Add to Cart form for the product, so simple, variable, grouped and external products all work correctly on the front end.', 'blockive-premium-addon-for-block' ) }
						</p>
						<TextControl
							label={ __( 'Button Text', 'blockive-premium-addon-for-block' ) }
							help={ __( 'Leave empty to use WooCommerce’s default text (e.g. "Add to cart" or "Select options").', 'blockive-premium-addon-for-block' ) }
							value={ buttonText }
							onChange={ ( value ) => setAttributes( { buttonText: value } ) }
						/>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Button Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<ColorStateControls
							normal={ [
								{
									label: __( 'Background Color', 'blockive-premium-addon-for-block' ),
									value: btnBgColor,
									onChange: ( value ) => setAttributes( { btnBgColor: value } ),
								},
								{
									label: __( 'Text Color', 'blockive-premium-addon-for-block' ),
									value: btnTextColor,
									onChange: ( value ) => setAttributes( { btnTextColor: value } ),
								},
							] }
							hover={ [
								{
									label: __( 'Background Color', 'blockive-premium-addon-for-block' ),
									value: btnHoverBgColor,
									onChange: ( value ) => setAttributes( { btnHoverBgColor: value } ),
								},
								{
									label: __( 'Text Color', 'blockive-premium-addon-for-block' ),
									value: btnHoverTextColor,
									onChange: ( value ) => setAttributes( { btnHoverTextColor: value } ),
								},
							] }
						/>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				<button type="button" className="bpafb-tb-add-to-cart-mock-button" disabled>
					{ buttonText || __( 'Add to cart', 'blockive-premium-addon-for-block' ) }
				</button>
			</div>
		</>
	);
}
