import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

export default function Edit( { attributes, setAttributes } ) {
	const { showPriceRange } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-product-variations' } );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<ToggleControl
							label={ __( 'Show Price Range', 'blockive-premium-addon-for-block' ) }
							checked={ !! showPriceRange }
							onChange={ ( value ) => setAttributes( { showPriceRange: value } ) }
						/>
						<p className="bpafb-help-text">
							{ __(
								'Renders WooCommerce’s native variation selector for variable products (dropdowns, AJAX price/availability). Non-variable products render nothing extra here.',
								'blockive-premium-addon-for-block'
							) }
						</p>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<p className="bpafb-help-text">
							{ __( 'This block renders WooCommerce’s own variation form markup/styles on the frontend and cannot be restyled here beyond spacing.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				{ showPriceRange && (
					<div className="bpafb-tb-product-variations-price">{ __( '$29.99 – $49.99', 'blockive-premium-addon-for-block' ) }</div>
				) }
				<div className="bpafb-tb-product-variations-editor-preview">
					<table className="variations">
						<tbody>
							<tr>
								<td className="label">{ __( 'Size', 'blockive-premium-addon-for-block' ) }</td>
								<td className="value">
									<select disabled>
										<option>{ __( 'Choose an option', 'blockive-premium-addon-for-block' ) }</option>
										<option>{ __( 'Small', 'blockive-premium-addon-for-block' ) }</option>
										<option>{ __( 'Medium', 'blockive-premium-addon-for-block' ) }</option>
										<option>{ __( 'Large', 'blockive-premium-addon-for-block' ) }</option>
									</select>
								</td>
							</tr>
							<tr>
								<td className="label">{ __( 'Color', 'blockive-premium-addon-for-block' ) }</td>
								<td className="value">
									<select disabled>
										<option>{ __( 'Choose an option', 'blockive-premium-addon-for-block' ) }</option>
										<option>{ __( 'Red', 'blockive-premium-addon-for-block' ) }</option>
										<option>{ __( 'Blue', 'blockive-premium-addon-for-block' ) }</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
					<span className="bpafb-variations-btn">{ __( 'Add to cart', 'blockive-premium-addon-for-block' ) }</span>
				</div>
				<p className="bpafb-tb-product-variations-editor-note">
					{ __( 'Live variation selection with real WooCommerce AJAX pricing renders on the frontend.', 'blockive-premium-addon-for-block' ) }
				</p>
			</div>
		</>
	);
}
