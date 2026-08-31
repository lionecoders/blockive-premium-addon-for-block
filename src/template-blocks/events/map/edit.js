import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

export default function Edit( { attributes, setAttributes } ) {
	const { height } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-event-map' } );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Map', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<RangeControl
							label={ __( 'Height (px)', 'blockive-premium-addon-for-block' ) }
							value={ height }
							onChange={ ( value ) => setAttributes( { height: value } ) }
							min={ 100 }
							max={ 800 }
						/>
						<p className="bpafb-help-text">
							{ __( 'The map embeds the venue address using a key-free Google Maps embed. Zoom is not configurable without a Maps API key.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<p className="bpafb-help-text">
							{ __( 'Spacing options are available in the Advanced tab.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				<div className="bpafb-tb-event-map-placeholder" style={ { height: `${ height || 300 }px` } }>
					<i className="fa-solid fa-map-location-dot" />
					<span>{ __( 'Map Preview', 'blockive-premium-addon-for-block' ) }</span>
				</div>
			</div>
		</>
	);
}
