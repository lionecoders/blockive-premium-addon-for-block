import { InspectorControls } from '@wordpress/block-editor';

/**
 * Shared inspector wiring used by every Blockive block. There is no custom
 * tab navigation here — `general` renders as plain PanelBody sections in
 * the block's native Settings tab, `style` in the block's native Styles
 * tab, and `advanced` (the shared <AdvancedTab />) places its own panels
 * across both native tabs itself. This keeps every existing setting
 * available, just as ordinary collapsible panels instead of behind a
 * second layer of tab navigation.
 */
export default function InspectorTabs( { general, style, advanced } ) {
	return (
		<>
			{ general && <InspectorControls group="settings">{ general }</InspectorControls> }
			{ style && <InspectorControls group="styles">{ style }</InspectorControls> }
			{ advanced }
		</>
	);
}
