import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { PanelRow, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

const TEMPLATE_POST_TYPE = window.bpafbTemplateBuilder?.postType || 'blockive_template';

const TemplateSettingsPanel = () => {
	const [ meta, setMeta ] = useEntityProp( 'postType', TEMPLATE_POST_TYPE, 'meta' );

	const postTypeOptions = useSelect( ( select ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } );
		if ( ! types ) {
			return [ { label: __( 'Post', 'blockive-premium-addon-for-block' ), value: 'post' } ];
		}
		return types
			.filter( ( type ) => type.viewable && type.slug !== TEMPLATE_POST_TYPE )
			.map( ( type ) => ( { label: type.labels.singular_name, value: type.slug } ) );
	}, [] );

	return (
		<PluginDocumentSettingPanel
			name="bpafb-template-settings"
			title={ __( 'Template Settings', 'blockive-premium-addon-for-block' ) }
			className="bpafb-template-settings-panel"
		>
			<PanelRow>
				<SelectControl
					label={ __( 'Template Type', 'blockive-premium-addon-for-block' ) }
					help={ __(
						'The post type this template is designed for. Template Blocks use it to source live preview data and to know which dynamic fields (e.g. WooCommerce, Events) apply.',
						'blockive-premium-addon-for-block'
					) }
					value={ meta?._bpafb_template_type || 'post' }
					options={ postTypeOptions }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_template_type: value } ) }
				/>
			</PanelRow>
			<p>
				{ __(
					'Additional template-level settings (assignment, priority) will live here.',
					'blockive-premium-addon-for-block'
				) }
			</p>
		</PluginDocumentSettingPanel>
	);
};

export default function registerTemplateSettingsPanel() {
	registerPlugin( 'bpafb-template-settings', {
		render: TemplateSettingsPanel,
	} );
}
