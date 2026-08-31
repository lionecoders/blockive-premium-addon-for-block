import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

const SIDES = [ 'top', 'right', 'bottom', 'left' ];
const SIDE_LABELS = {
	top: __( 'Top', 'blockive-premium-addon-for-block' ),
	right: __( 'Right', 'blockive-premium-addon-for-block' ),
	bottom: __( 'Bottom', 'blockive-premium-addon-for-block' ),
	left: __( 'Left', 'blockive-premium-addon-for-block' ),
};

/**
 * Reusable box-model (Top/Right/Bottom/Left) control for Padding, Margin,
 * Gap, Icon Spacing, etc.
 *
 * value: { top, right, bottom, left }
 * onChange( { top, right, bottom, left } )
 */
export default function SpacingControls( { label, value = {}, onChange, min = -100, max = 200 } ) {
	return (
		<div className="bpafb-spacing-controls">
			{ label && <p className="bpafb-spacing-controls__label">{ label }</p> }
			<div className="bpafb-spacing-controls__grid">
				{ SIDES.map( ( side ) => (
					<RangeControl
						key={ side }
						label={ SIDE_LABELS[ side ] }
						value={ value[ side ] }
						onChange={ ( val ) => onChange( { ...value, [ side ]: val } ) }
						min={ min }
						max={ max }
					/>
				) ) }
			</div>
		</div>
	);
}
