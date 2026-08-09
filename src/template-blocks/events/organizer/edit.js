import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

export default function Edit( { attributes, setAttributes } ) {
	const { isLink, linkTarget, icon } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-event-organizer' } );

	const previewText = __( 'Jane Smith Events Co.', 'blockive-premium-addon-for-block' );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<ToggleControl
								label={ __( 'Link to Organizer Website', 'blockive-premium-addon-for-block' ) }
								checked={ !! isLink }
								onChange={ ( value ) => setAttributes( { isLink: value } ) }
							/>
							{ isLink && (
								<ToggleControl
									label={ __( 'Open in New Tab', 'blockive-premium-addon-for-block' ) }
									checked={ linkTarget === '_blank' }
									onChange={ ( value ) => setAttributes( { linkTarget: value ? '_blank' : '_self' } ) }
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
				{ isLink ? (
					<a href="#organizer-preview" onClick={ ( event ) => event.preventDefault() }>
						{ previewText }
					</a>
				) : (
					previewText
				) }
			</div>
		</>
	);
}
