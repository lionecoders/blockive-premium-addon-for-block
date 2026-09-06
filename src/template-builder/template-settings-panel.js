import { __, sprintf } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { PanelRow, SelectControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

const TEMPLATE_POST_TYPE = window.bpafbTemplateBuilder?.postType || 'blockive_template';

const FREE_POST_TYPES = [ 'post', 'page' ];

const isFreePostType = ( slug ) => FREE_POST_TYPES.includes( slug );

const postTypeOptions = [
	{ label: __( 'Post', 'blockive-premium-addon-for-block' ), value: 'post' },
	{ label: __( 'Page', 'blockive-premium-addon-for-block' ), value: 'page' },
	{
		label: sprintf(
			/* translators: %s: "(Pro)" suffix marking this option as a Pro-only feature. */
			__( 'Custom Post Type %s', 'blockive-premium-addon-for-block' ),
			__( '(Pro)', 'blockive-premium-addon-for-block' )
		),
		value: 'custom',
		disabled: true,
	},
];

const TemplateSettingsPanel = () => {
	const [ meta, setMeta ] = useEntityProp( 'postType', TEMPLATE_POST_TYPE, 'meta' );

	const templateType = meta?._bpafb_template_type || 'post';

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
						'The post type this template is designed for. Template Blocks use it to source live preview data and to know which dynamic fields apply. The free version supports Post and Page templates.',
						'blockive-premium-addon-for-block'
					) }
					value={ templateType }
					options={ postTypeOptions }
					onChange={ ( value ) => {
						if ( ! isFreePostType( value ) ) {
							return;
						}
						setMeta( { ...meta, _bpafb_template_type: value } );
					} }
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default function registerTemplateSettingsPanel() {
	registerPlugin( 'bpafb-template-settings', {
		render: TemplateSettingsPanel,
	} );
}

