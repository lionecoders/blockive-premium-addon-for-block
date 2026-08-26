import { __ } from '@wordpress/i18n';
import { SelectControl, RangeControl, BaseControl, ColorPalette } from '@wordpress/components';

const TYPE_OPTIONS = [
	{ label: __( 'None', 'blockive-premium-addon-for-block' ), value: 'none' },
	{ label: __( 'Solid', 'blockive-premium-addon-for-block' ), value: 'solid' },
	{ label: __( 'Dashed', 'blockive-premium-addon-for-block' ), value: 'dashed' },
	{ label: __( 'Dotted', 'blockive-premium-addon-for-block' ), value: 'dotted' },
	{ label: __( 'Double', 'blockive-premium-addon-for-block' ), value: 'double' },
];

/**
 * values: { borderType, borderWidth, borderRadius, borderColor }
 * onChange( key, value )
 */
export default function BorderControls( { values = {}, onChange, showRadius = true } ) {
	const { borderType = 'none', borderWidth, borderRadius, borderColor = '' } = values;

	return (
		<>
			<SelectControl
				label={ __( 'Border Type', 'blockive-premium-addon-for-block' ) }
				value={ borderType }
				options={ TYPE_OPTIONS }
				onChange={ ( val ) => onChange( 'borderType', val ) }
			/>
			{ borderType !== 'none' && (
				<>
					<RangeControl
						label={ __( 'Border Width (px)', 'blockive-premium-addon-for-block' ) }
						value={ borderWidth }
						onChange={ ( val ) => onChange( 'borderWidth', val ) }
						min={ 0 }
						max={ 20 }
					/>
					<BaseControl label={ __( 'Border Color', 'blockive-premium-addon-for-block' ) }>
						<ColorPalette value={ borderColor } onChange={ ( val ) => onChange( 'borderColor', val ) } />
					</BaseControl>
				</>
			) }
			{ showRadius && (
				<RangeControl
					label={ __( 'Border Radius (px)', 'blockive-premium-addon-for-block' ) }
					value={ borderRadius }
					onChange={ ( val ) => onChange( 'borderRadius', val ) }
					min={ 0 }
					max={ 150 }
				/>
			) }
		</>
	);
}

export function getBorderStyles( values = {}, prefix ) {
	const { borderType = 'none', borderWidth, borderRadius, borderColor } = values;
	const styles = {};
	if ( borderType && borderType !== 'none' ) {
		styles[ `${ prefix }-border-style` ] = borderType;
		if ( borderWidth !== undefined && borderWidth !== null ) styles[ `${ prefix }-border-width` ] = `${ borderWidth }px`;
		if ( borderColor ) styles[ `${ prefix }-border-color` ] = borderColor;
	} else {
		styles[ `${ prefix }-border-style` ] = 'none';
	}
	if ( borderRadius !== undefined && borderRadius !== null ) styles[ `${ prefix }-border-radius` ] = `${ borderRadius }px`;
	return styles;
}
