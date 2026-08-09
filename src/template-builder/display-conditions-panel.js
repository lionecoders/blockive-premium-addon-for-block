import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';

const DisplayConditionsPanel = () => (
	<PluginDocumentSettingPanel
		name="bpafb-display-conditions"
		title={ __( 'Display Conditions', 'blockive-premium-addon-for-block' ) }
		className="bpafb-display-conditions-panel"
	>
		<p>
			{ __(
				'Rules for where this template should apply (post type, taxonomy, page) will live here.',
				'blockive-premium-addon-for-block'
			) }
		</p>
	</PluginDocumentSettingPanel>
);

export default function registerDisplayConditionsPanel() {
	registerPlugin( 'bpafb-display-conditions', {
		render: DisplayConditionsPanel,
	} );
}
