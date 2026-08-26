import { __ } from '@wordpress/i18n';
import { SelectControl, RangeControl, TextControl } from '@wordpress/components';

const WEIGHT_OPTIONS = [
	{ label: __( 'Default', 'blockive-premium-addon-for-block' ), value: '' },
	{ label: '100', value: '100' },
	{ label: '200', value: '200' },
	{ label: '300', value: '300' },
	{ label: '400 (Normal)', value: '400' },
	{ label: '500', value: '500' },
	{ label: '600', value: '600' },
	{ label: '700 (Bold)', value: '700' },
	{ label: '800', value: '800' },
	{ label: '900', value: '900' },
];

const TRANSFORM_OPTIONS = [
	{ label: __( 'Default', 'blockive-premium-addon-for-block' ), value: '' },
	{ label: __( 'None', 'blockive-premium-addon-for-block' ), value: 'none' },
	{ label: __( 'Uppercase', 'blockive-premium-addon-for-block' ), value: 'uppercase' },
	{ label: __( 'Lowercase', 'blockive-premium-addon-for-block' ), value: 'lowercase' },
	{ label: __( 'Capitalize', 'blockive-premium-addon-for-block' ), value: 'capitalize' },
];

const DECORATION_OPTIONS = [
	{ label: __( 'Default', 'blockive-premium-addon-for-block' ), value: '' },
	{ label: __( 'None', 'blockive-premium-addon-for-block' ), value: 'none' },
	{ label: __( 'Underline', 'blockive-premium-addon-for-block' ), value: 'underline' },
	{ label: __( 'Line Through', 'blockive-premium-addon-for-block' ), value: 'line-through' },
	{ label: __( 'Overline', 'blockive-premium-addon-for-block' ), value: 'overline' },
];

/**
 * values: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textTransform, textDecoration }
 * onChange( key, value )
 */
export default function TypographyControls( { values = {}, onChange } ) {
	const {
		fontFamily = '',
		fontSize,
		fontWeight = '',
		lineHeight,
		letterSpacing,
		textTransform = '',
		textDecoration = '',
	} = values;

	return (
		<>
			<TextControl
				label={ __( 'Font Family', 'blockive-premium-addon-for-block' ) }
				value={ fontFamily }
				onChange={ ( val ) => onChange( 'fontFamily', val ) }
				help={ __( "e.g. 'Poppins', sans-serif", 'blockive-premium-addon-for-block' ) }
			/>
			<RangeControl
				label={ __( 'Font Size (px)', 'blockive-premium-addon-for-block' ) }
				value={ fontSize }
				onChange={ ( val ) => onChange( 'fontSize', val ) }
				min={ 8 }
				max={ 120 }
			/>
			<SelectControl
				label={ __( 'Font Weight', 'blockive-premium-addon-for-block' ) }
				value={ fontWeight }
				options={ WEIGHT_OPTIONS }
				onChange={ ( val ) => onChange( 'fontWeight', val ) }
			/>
			<RangeControl
				label={ __( 'Line Height', 'blockive-premium-addon-for-block' ) }
				value={ lineHeight }
				onChange={ ( val ) => onChange( 'lineHeight', val ) }
				min={ 0.5 }
				max={ 3 }
				step={ 0.1 }
			/>
			<RangeControl
				label={ __( 'Letter Spacing (px)', 'blockive-premium-addon-for-block' ) }
				value={ letterSpacing }
				onChange={ ( val ) => onChange( 'letterSpacing', val ) }
				min={ -5 }
				max={ 20 }
				step={ 0.5 }
			/>
			<SelectControl
				label={ __( 'Text Transform', 'blockive-premium-addon-for-block' ) }
				value={ textTransform }
				options={ TRANSFORM_OPTIONS }
				onChange={ ( val ) => onChange( 'textTransform', val ) }
			/>
			<SelectControl
				label={ __( 'Text Decoration', 'blockive-premium-addon-for-block' ) }
				value={ textDecoration }
				options={ DECORATION_OPTIONS }
				onChange={ ( val ) => onChange( 'textDecoration', val ) }
			/>
		</>
	);
}

/**
 * Turns a typography values object into a CSS custom-property-friendly style object.
 * `prefix` is the CSS variable prefix, e.g. '--bpafb-btn-text'.
 */
export function getTypographyStyles( values = {}, prefix ) {
	const {
		fontFamily,
		fontSize,
		fontWeight,
		lineHeight,
		letterSpacing,
		textTransform,
		textDecoration,
	} = values;

	const styles = {};
	if ( fontFamily ) styles[ `${ prefix }-font-family` ] = fontFamily;
	if ( fontSize !== undefined && fontSize !== null ) styles[ `${ prefix }-font-size` ] = `${ fontSize }px`;
	if ( fontWeight ) styles[ `${ prefix }-font-weight` ] = fontWeight;
	if ( lineHeight !== undefined && lineHeight !== null ) styles[ `${ prefix }-line-height` ] = lineHeight;
	if ( letterSpacing !== undefined && letterSpacing !== null ) styles[ `${ prefix }-letter-spacing` ] = `${ letterSpacing }px`;
	if ( textTransform ) styles[ `${ prefix }-text-transform` ] = textTransform;
	if ( textDecoration ) styles[ `${ prefix }-text-decoration` ] = textDecoration;
	return styles;
}
