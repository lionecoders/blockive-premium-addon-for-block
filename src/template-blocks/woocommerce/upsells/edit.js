import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

const LAYOUT_OPTIONS = [
	{ label: __( 'Grid', 'blockive-premium-addon-for-block' ), value: 'grid' },
	{ label: __( 'Slider', 'blockive-premium-addon-for-block' ), value: 'slider' },
];

/**
 * WooCommerce upsell product ids can't be resolved from the generic REST
 * post shape used for editor previews, so this always renders static
 * placeholder cards (gray image box + sample title/price) matching the
 * chosen layout/column count.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { numberOfProducts, layout, columns } = attributes;

	const blockProps = useBlockProps( {
		className: `bpafb-tb-product-upsells bpafb-product-card-list bpafb-product-card-list--${ layout }`,
		style: layout === 'grid' ? { '--bpafb-pcl-columns': columns } : undefined,
	} );

	const previewCount = Math.min( numberOfProducts || 4, layout === 'slider' ? columns || 4 : numberOfProducts || 4 );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<RangeControl
								label={ __( 'Number of Products', 'blockive-premium-addon-for-block' ) }
								value={ numberOfProducts }
								onChange={ ( value ) => setAttributes( { numberOfProducts: value } ) }
								min={ 1 }
								max={ 12 }
							/>
							<SelectControl
								label={ __( 'Layout', 'blockive-premium-addon-for-block' ) }
								value={ layout }
								options={ LAYOUT_OPTIONS }
								onChange={ ( value ) => setAttributes( { layout: value } ) }
							/>
							{ layout === 'grid' && (
								<RangeControl
									label={ __( 'Columns', 'blockive-premium-addon-for-block' ) }
									value={ columns }
									onChange={ ( value ) => setAttributes( { columns: value } ) }
									min={ 1 }
									max={ 6 }
								/>
							) }
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Card colors follow theme defaults; use Advanced > Custom CSS for further styling.', 'blockive-premium-addon-for-block' ) }
							</p>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				{ Array.from( { length: Math.max( 1, previewCount ) } ).map( ( _, index ) => (
					<div className="bpafb-product-card" key={ index }>
						<div className="bpafb-tb-product-card-list-editor-placeholder" />
						<h3 className="bpafb-product-card-title">{ __( 'Sample Product', 'blockive-premium-addon-for-block' ) }</h3>
						<span className="bpafb-product-card-price">$59.99</span>
					</div>
				) ) }
			</div>
		</>
	);
}
