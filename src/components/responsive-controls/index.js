import { __ } from '@wordpress/i18n';
import { Button, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';

const BREAKPOINTS = [
	{ name: 'desktop', label: __( 'Desktop', 'blockive-premium-addon-for-block' ) },
	{ name: 'tablet', label: __( 'Tablet', 'blockive-premium-addon-for-block' ) },
	{ name: 'mobile', label: __( 'Mobile', 'blockive-premium-addon-for-block' ) },
];

/**
 * Desktop / Tablet / Mobile switcher. Renders `children(device)` for the
 * currently active breakpoint so the caller decides which attribute suffix
 * (e.g. 'PaddingTop' vs 'PaddingTopTablet') to read/write.
 */
export default function ResponsiveControls( { children } ) {
	const [ device, setDevice ] = useState( 'desktop' );

	return (
		<div className="bpafb-responsive-controls">
			<ButtonGroup className="bpafb-responsive-controls__switch">
				{ BREAKPOINTS.map( ( bp ) => (
					<Button
						key={ bp.name }
						variant={ device === bp.name ? 'primary' : 'secondary' }
						isPressed={ device === bp.name }
						onClick={ () => setDevice( bp.name ) }
					>
						{ bp.label }
					</Button>
				) ) }
			</ButtonGroup>
			<div className="bpafb-responsive-controls__panel">{ children( device ) }</div>
		</div>
	);
}
