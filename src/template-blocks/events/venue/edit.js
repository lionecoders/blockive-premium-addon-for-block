import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

export default function Edit( { attributes, setAttributes } ) {
	const { showAddress, icon } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-event-venue' } );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<ToggleControl
							label={ __( 'Show Address', 'blockive-premium-addon-for-block' ) }
							checked={ !! showAddress }
							onChange={ ( value ) => setAttributes( { showAddress: value } ) }
						/>
						<TextControl
							label={ __( 'Icon (Font Awesome class)', 'blockive-premium-addon-for-block' ) }
							value={ icon }
							onChange={ ( value ) => setAttributes( { icon: value } ) }
							help={ __( 'Leave blank to hide the icon.', 'blockive-premium-addon-for-block' ) }
						/>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<p className="bpafb-help-text">
							{ __( 'Text color, font, size, weight and other typography options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				{ icon && <i className={ icon } /> }
				{ ' ' }
				{ __( 'Grand Ballroom, Downtown Hotel', 'blockive-premium-addon-for-block' ) }
				{ showAddress && (
					<span className="bpafb-tb-event-venue-address">
						{ ', ' }
						{ __( '123 Main St, Springfield', 'blockive-premium-addon-for-block' ) }
					</span>
				) }
			</div>
		</>
	);
}
