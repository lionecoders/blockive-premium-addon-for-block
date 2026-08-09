import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

export default function Edit( { attributes, setAttributes } ) {
	const { showEndTime, timeRangeSeparator, icon } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-event-time' } );

	const previewText = showEndTime
		? __( '7:00 PM - 10:00 PM', 'blockive-premium-addon-for-block' )
		: __( '7:00 PM', 'blockive-premium-addon-for-block' );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<ToggleControl
								label={ __( 'Show End Time', 'blockive-premium-addon-for-block' ) }
								checked={ !! showEndTime }
								onChange={ ( value ) => setAttributes( { showEndTime: value } ) }
							/>
							{ showEndTime && (
								<TextControl
									label={ __( 'Time Range Separator', 'blockive-premium-addon-for-block' ) }
									value={ timeRangeSeparator }
									onChange={ ( value ) => setAttributes( { timeRangeSeparator: value } ) }
								/>
							) }
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
			</InspectorControls>

			<div { ...blockProps }>
				{ icon && <i className={ icon } /> }
				{ ' ' }
				{ previewText }
			</div>
		</>
	);
}
