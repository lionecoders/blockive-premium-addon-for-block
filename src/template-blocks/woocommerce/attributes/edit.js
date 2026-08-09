import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

const LAYOUT_OPTIONS = [
	{ label: __( 'Table', 'blockive-premium-addon-for-block' ), value: 'table' },
	{ label: __( 'List', 'blockive-premium-addon-for-block' ), value: 'list' },
];

// WooCommerce attribute values aren't part of the generic REST post shape, so
// the editor preview always shows realistic sample rows instead of live data.
const SAMPLE_ROWS = [
	{ label: __( 'Color', 'blockive-premium-addon-for-block' ), value: 'Red, Blue, Green' },
	{ label: __( 'Size', 'blockive-premium-addon-for-block' ), value: 'Small, Medium, Large' },
	{ label: __( 'Material', 'blockive-premium-addon-for-block' ), value: 'Cotton' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { layout, showLabel } = attributes;

	const blockProps = useBlockProps( {
		className: `bpafb-tb-product-attributes bpafb-tb-product-attributes--${ layout }`,
	} );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<SelectControl
								label={ __( 'Layout', 'blockive-premium-addon-for-block' ) }
								value={ layout }
								options={ LAYOUT_OPTIONS }
								onChange={ ( value ) => setAttributes( { layout: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show Attribute Label', 'blockive-premium-addon-for-block' ) }
								checked={ !! showLabel }
								onChange={ ( value ) => setAttributes( { showLabel: value } ) }
							/>
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Font size and text color are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
							</p>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				{ layout === 'list' ? (
					<ul className="bpafb-tb-product-attributes-list">
						{ SAMPLE_ROWS.map( ( row ) => (
							<li key={ row.label }>
								{ showLabel && <span className="bpafb-tb-attr-label">{ row.label }:</span> } { row.value }
							</li>
						) ) }
					</ul>
				) : (
					<table className="bpafb-tb-product-attributes-table">
						<tbody>
							{ SAMPLE_ROWS.map( ( row ) => (
								<tr key={ row.label }>
									{ showLabel && <th>{ row.label }</th> }
									<td>{ row.value }</td>
								</tr>
							) ) }
						</tbody>
					</table>
				) }
			</div>
		</>
	);
}
