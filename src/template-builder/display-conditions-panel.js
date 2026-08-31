import { __, sprintf } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { PanelRow, SelectControl, TextControl } from '@wordpress/components';
import { Icon, lock } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

const TEMPLATE_POST_TYPE = window.bpafbTemplateBuilder?.postType || 'blockive_template';

const DisplayConditionsPanel = () => {
	const [ meta, setMeta ] = useEntityProp( 'postType', TEMPLATE_POST_TYPE, 'meta' );

	const targetPostType = meta?._bpafb_template_type || 'post';
	const scope = meta?._bpafb_display_condition_scope || 'all';
	const priority = Number.isFinite( meta?._bpafb_template_priority ) ? meta._bpafb_template_priority : 10;

	const targetPostTypeLabel = useSelect(
		( select ) => select( 'core' ).getPostType( targetPostType )?.labels?.name || targetPostType,
		[ targetPostType ]
	);

	return (
		<PluginDocumentSettingPanel
			name="bpafb-display-conditions"
			title={ __( 'Display Conditions', 'blockive-premium-addon-for-block' ) }
			className="bpafb-display-conditions-panel"
		>
			<PanelRow>
				<SelectControl
					label={ __( 'Apply this template to', 'blockive-premium-addon-for-block' ) }
					value={ scope }
					options={ [
						{
							label: sprintf(
								/* translators: %s: post type name, e.g. "Products". */
								__( 'All %s', 'blockive-premium-addon-for-block' ),
								targetPostTypeLabel
							),
							value: 'all',
						},
						{
							label: sprintf(
								/* translators: %s: "(Pro)" suffix marking this option as a Pro-only feature. */
								__( 'Specific posts %s', 'blockive-premium-addon-for-block' ),
								__( '(Pro)', 'blockive-premium-addon-for-block' )
							),
							value: 'specific',
						},
					] }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_display_condition_scope: value } ) }
				/>
			</PanelRow>

			{ scope === 'specific' && (
				<PanelRow>
					<div className="bpafb-pro-notice">
						<Icon icon={ lock } className="bpafb-pro-notice__icon" />
						<div className="bpafb-pro-notice__body">
							<span className="bpafb-pro-notice__badge">{ __( 'PRO', 'blockive-premium-addon-for-block' ) }</span>
							<p className="bpafb-pro-notice__text">
								{ __(
									'Applying a template to specific posts or pages is available in the Pro version.',
									'blockive-premium-addon-for-block'
								) }
							</p>
						</div>
					</div>
				</PanelRow>
			) }

			<PanelRow>
				<TextControl
					type="number"
					label={ __( 'Priority', 'blockive-premium-addon-for-block' ) }
					help={ __(
						'When more than one template matches the same post, the lowest number wins.',
						'blockive-premium-addon-for-block'
					) }
					value={ priority }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_template_priority: parseInt( value, 10 ) || 10 } ) }
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default function registerDisplayConditionsPanel() {
	registerPlugin( 'bpafb-display-conditions', {
		render: DisplayConditionsPanel,
	} );
}
