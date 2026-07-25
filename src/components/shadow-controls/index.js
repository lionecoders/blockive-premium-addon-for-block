import { __ } from '@wordpress/i18n';
import { ToggleControl, RangeControl, BaseControl, ColorPalette, TabPanel } from '@wordpress/components';

function ShadowFields( { values = {}, onChange } ) {
	const {
		enabled = false,
		color = 'rgba(0,0,0,0.15)',
		blur = 15,
		spread = 0,
	} = values;

	return (
		<>
			<ToggleControl
				label={ __( 'Enable Box Shadow', 'blockive-premium-addon-for-block' ) }
				checked={ !! enabled }
				onChange={ ( val ) => onChange( 'enabled', val ) }
			/>
			{ enabled && (
				<>
					<BaseControl label={ __( 'Shadow Color', 'blockive-premium-addon-for-block' ) }>
						<ColorPalette value={ color } onChange={ ( val ) => onChange( 'color', val ) } />
					</BaseControl>
					<RangeControl
						label={ __( 'Shadow Blur', 'blockive-premium-addon-for-block' ) }
						value={ blur }
						onChange={ ( val ) => onChange( 'blur', val ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Shadow Spread', 'blockive-premium-addon-for-block' ) }
						value={ spread }
						onChange={ ( val ) => onChange( 'spread', val ) }
						min={ -50 }
						max={ 50 }
					/>
				</>
			) }
		</>
	);
}

/**
 * normalValues / hoverValues: { enabled, color, blur, spread }
 * onNormalChange( key, value ) / onHoverChange( key, value )
 * Pass hasHover=false to render a single (Normal-only) shadow control.
 */
export default function ShadowControls( { normalValues, onNormalChange, hoverValues, onHoverChange, hasHover = true } ) {
	if ( ! hasHover ) {
		return <ShadowFields values={ normalValues } onChange={ onNormalChange } />;
	}

	return (
		<TabPanel
			className="bpafb-color-tabs"
			activeClass="is-active"
			tabs={ [
				{ name: 'normal', title: __( 'Normal', 'blockive-premium-addon-for-block' ) },
				{ name: 'hover', title: __( 'Hover', 'blockive-premium-addon-for-block' ) },
			] }
		>
			{ ( tab ) =>
				tab.name === 'normal' ? (
					<ShadowFields values={ normalValues } onChange={ onNormalChange } />
				) : (
					<ShadowFields values={ hoverValues } onChange={ onHoverChange } />
				)
			}
		</TabPanel>
	);
}

export function getShadowStyle( values = {} ) {
	const { enabled, color = 'rgba(0,0,0,0.15)', blur = 15, spread = 0 } = values;
	if ( ! enabled ) return 'none';
	return `0 4px ${ blur }px ${ spread }px ${ color }`;
}
