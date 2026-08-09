import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, BaseControl, ColorPalette } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

const SHAPE_OPTIONS = [
	{ label: __( 'Circle', 'blockive-premium-addon-for-block' ), value: 'circle' },
	{ label: __( 'Rounded', 'blockive-premium-addon-for-block' ), value: 'rounded' },
	{ label: __( 'Square', 'blockive-premium-addon-for-block' ), value: 'square' },
];

const POSITION_OPTIONS = [
	{ label: __( 'Top Left', 'blockive-premium-addon-for-block' ), value: 'top-left' },
	{ label: __( 'Top Right', 'blockive-premium-addon-for-block' ), value: 'top-right' },
	{ label: __( 'Bottom Left', 'blockive-premium-addon-for-block' ), value: 'bottom-left' },
	{ label: __( 'Bottom Right', 'blockive-premium-addon-for-block' ), value: 'bottom-right' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { badgeText, badgeShape, bgColor, textColor, position } = attributes;

	const blockProps = useBlockProps( {
		className: `bpafb-tb-sale-badge bpafb-badge-shape-${ badgeShape || 'circle' } bpafb-badge-pos-${ position || 'top-right' }`,
		style: {
			backgroundColor: bgColor || undefined,
			color: textColor || undefined,
		},
	} );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Sale Badge', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Only renders on the front end when the product is on sale. Place this block inside a container with Position set to Relative (Advanced tab > Layout) so it positions correctly.', 'blockive-premium-addon-for-block' ) }
							</p>
							<TextControl
								label={ __( 'Badge Text', 'blockive-premium-addon-for-block' ) }
								value={ badgeText }
								onChange={ ( value ) => setAttributes( { badgeText: value } ) }
							/>
							<SelectControl
								label={ __( 'Badge Shape', 'blockive-premium-addon-for-block' ) }
								value={ badgeShape }
								options={ SHAPE_OPTIONS }
								onChange={ ( value ) => setAttributes( { badgeShape: value } ) }
							/>
							<SelectControl
								label={ __( 'Position', 'blockive-premium-addon-for-block' ) }
								value={ position }
								options={ POSITION_OPTIONS }
								onChange={ ( value ) => setAttributes( { position: value } ) }
							/>
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<BaseControl label={ __( 'Background Color', 'blockive-premium-addon-for-block' ) }>
								<ColorPalette value={ bgColor } onChange={ ( value ) => setAttributes( { bgColor: value } ) } />
							</BaseControl>
							<BaseControl label={ __( 'Text Color', 'blockive-premium-addon-for-block' ) }>
								<ColorPalette value={ textColor } onChange={ ( value ) => setAttributes( { textColor: value } ) } />
							</BaseControl>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<span { ...blockProps }>{ badgeText || __( 'Sale!', 'blockive-premium-addon-for-block' ) }</span>
		</>
	);
}
