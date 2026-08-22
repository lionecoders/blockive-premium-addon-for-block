import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

export default function Edit( { attributes, setAttributes } ) {
	const { freeText, icon } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-event-cost' } );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<TextControl
							label={ __( 'Free Event Text', 'blockive-premium-addon-for-block' ) }
							value={ freeText }
							onChange={ ( value ) => setAttributes( { freeText: value } ) }
							help={ __( 'Shown when the resolved cost is empty or zero.', 'blockive-premium-addon-for-block' ) }
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
				{ __( '$25.00', 'blockive-premium-addon-for-block' ) }
			</div>
		</>
	);
}
