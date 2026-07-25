import { __ } from '@wordpress/i18n';
import { TabPanel } from '@wordpress/components';

const TABS = [
	{
		name: 'general',
		title: __( 'General', 'blockive-premium-addon-for-block' ),
		className: 'bpafb-tab-general',
	},
	{
		name: 'style',
		title: __( 'Style', 'blockive-premium-addon-for-block' ),
		className: 'bpafb-tab-style',
	},
	{
		name: 'advanced',
		title: __( 'Advanced', 'blockive-premium-addon-for-block' ),
		className: 'bpafb-tab-advanced',
	},
];

/**
 * Shared Elementor-style 3 tab inspector shell used by every Blockive block.
 * Every block passes its General / Style tab content in as props; the
 * Advanced tab content should be the shared <AdvancedTab /> component.
 */
export default function InspectorTabs( { general, style, advanced } ) {
	const content = { general, style, advanced };

	return (
		<TabPanel className="bpafb-inspector-tabs" activeClass="is-active" tabs={ TABS }>
			{ ( tab ) => <div className="bpafb-inspector-tab-panel">{ content[ tab.name ] }</div> }
		</TabPanel>
	);
}
