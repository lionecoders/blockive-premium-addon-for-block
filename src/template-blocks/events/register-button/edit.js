import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import ColorStateControls from '../../../components/color-state-controls';

export default function Edit( { attributes, setAttributes } ) {
	const {
		buttonText,
		url,
		useEventRegistrationMeta,
		openInNewTab,
		bgColor,
		bgHoverColor,
		textColor,
		textHoverColor,
	} = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-event-register-button' } );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<TextControl
							label={ __( 'Button Text', 'blockive-premium-addon-for-block' ) }
							value={ buttonText }
							onChange={ ( value ) => setAttributes( { buttonText: value } ) }
						/>
						<ToggleControl
							label={ __( 'Use Event Registration Meta', 'blockive-premium-addon-for-block' ) }
							checked={ !! useEventRegistrationMeta }
							onChange={ ( value ) => setAttributes( { useEventRegistrationMeta: value } ) }
							help={ __( 'Reads the "_event_registration_url" post meta first, if present.', 'blockive-premium-addon-for-block' ) }
						/>
						<TextControl
							label={ __( 'Manual URL', 'blockive-premium-addon-for-block' ) }
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
							help={ __( 'Used when the registration meta is empty (or disabled above). Falls back to the event permalink if also empty.', 'blockive-premium-addon-for-block' ) }
						/>
						<ToggleControl
							label={ __( 'Open in New Tab', 'blockive-premium-addon-for-block' ) }
							checked={ !! openInNewTab }
							onChange={ ( value ) => setAttributes( { openInNewTab: value } ) }
						/>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<ColorStateControls
							normal={ [
								{
									label: __( 'Background Color', 'blockive-premium-addon-for-block' ),
									value: bgColor,
									onChange: ( value ) => setAttributes( { bgColor: value } ),
								},
								{
									label: __( 'Text Color', 'blockive-premium-addon-for-block' ),
									value: textColor,
									onChange: ( value ) => setAttributes( { textColor: value } ),
								},
							] }
							hover={ [
								{
									label: __( 'Background Color', 'blockive-premium-addon-for-block' ),
									value: bgHoverColor,
									onChange: ( value ) => setAttributes( { bgHoverColor: value } ),
								},
								{
									label: __( 'Text Color', 'blockive-premium-addon-for-block' ),
									value: textHoverColor,
									onChange: ( value ) => setAttributes( { textHoverColor: value } ),
								},
							] }
						/>
						<p className="bpafb-help-text">
							{ __( 'Font, size, weight and other typography options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				<a
					href="#register-preview"
					className="bpafb-tb-event-register-button-link"
					style={ {
						backgroundColor: bgColor || undefined,
						color: textColor || undefined,
					} }
					onClick={ ( event ) => event.preventDefault() }
				>
					{ buttonText || __( 'Register Now', 'blockive-premium-addon-for-block' ) }
				</a>
			</div>
		</>
	);
}
