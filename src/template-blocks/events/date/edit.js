import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

export default function Edit( { attributes, setAttributes } ) {
	const { dateFormat, relative, icon, showEndDate, dateRangeSeparator } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-event-date' } );

	const previewText = showEndDate
		? __( 'January 15, 2026 - January 17, 2026', 'blockive-premium-addon-for-block' )
		: __( 'January 15, 2026', 'blockive-premium-addon-for-block' );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<TextControl
								label={ __( 'Date Format', 'blockive-premium-addon-for-block' ) }
								value={ dateFormat }
								onChange={ ( value ) => setAttributes( { dateFormat: value } ) }
								placeholder={ __( 'F j, Y (site default)', 'blockive-premium-addon-for-block' ) }
								help={ __( 'PHP date format, e.g. F j, Y. Leave blank for the site default.', 'blockive-premium-addon-for-block' ) }
							/>
							<ToggleControl
								label={ __( 'Relative Time', 'blockive-premium-addon-for-block' ) }
								checked={ !! relative }
								onChange={ ( value ) => setAttributes( { relative: value } ) }
								help={ __( 'Show "in 3 days" style relative time instead of a formatted date.', 'blockive-premium-addon-for-block' ) }
							/>
							<ToggleControl
								label={ __( 'Show End Date', 'blockive-premium-addon-for-block' ) }
								checked={ !! showEndDate }
								onChange={ ( value ) => setAttributes( { showEndDate: value } ) }
							/>
							{ showEndDate && (
								<TextControl
									label={ __( 'Date Range Separator', 'blockive-premium-addon-for-block' ) }
									value={ dateRangeSeparator }
									onChange={ ( value ) => setAttributes( { dateRangeSeparator: value } ) }
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
