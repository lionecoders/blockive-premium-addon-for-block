import { __ } from '@wordpress/i18n';
import { BaseControl, ColorPalette, TabPanel } from '@wordpress/components';

/**
 * Renders a list of { label, value, onChange } color fields. When a `hover`
 * list is also provided, wraps everything in a Normal/Hover TabPanel so
 * every block gets the same state-control UX (Button, Icon Box, Image Box,
 * Accordion, FAQ, Progress Bar, etc.).
 */
export default function ColorStateControls( { normal = [], hover = [] } ) {
	const renderFields = ( fields ) => (
		<>
			{ fields.map( ( field ) => (
				<BaseControl key={ field.label } label={ field.label }>
					<ColorPalette value={ field.value } onChange={ field.onChange } />
				</BaseControl>
			) ) }
		</>
	);

	if ( ! hover.length ) {
		return renderFields( normal );
	}

	return (
		<TabPanel
			className="bpafb-color-tabs"
			activeClass="is-active"
			tabs={ [
				{
					name: 'normal',
					title: __( 'Normal', 'blockive-premium-addon-for-block' ),
					className: 'tab-normal',
				},
				{
					name: 'hover',
					title: __( 'Hover', 'blockive-premium-addon-for-block' ),
					className: 'tab-hover',
				},
			] }
		>
			{ ( tab ) => (
				<div className="bpafb-color-tab-content">
					{ renderFields( tab.name === 'normal' ? normal : hover ) }
				</div>
			) }
		</TabPanel>
	);
}
