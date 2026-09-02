import { __, sprintf } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { PanelRow, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { Icon, lock } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

const TEMPLATE_POST_TYPE = window.bpafbTemplateBuilder?.postType || 'blockive_template';
const PRO_DISPLAY_CONDITION_LOCK = 'bpafb_pro_display_condition_lock';

const DisplayConditionsPanel = () => {
	const [ meta, setMeta ] = useEntityProp( 'postType', TEMPLATE_POST_TYPE, 'meta' );
	const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );

	const targetPostType = meta?._bpafb_template_type || 'post';
	const scope = meta?._bpafb_display_condition_scope || 'all';
	const priority = Number.isFinite( meta?._bpafb_template_priority ) ? meta._bpafb_template_priority : 10;

	useEffect( () => {
		if ( scope === 'specific' ) {
			lockPostSaving( PRO_DISPLAY_CONDITION_LOCK );
		} else {
			unlockPostSaving( PRO_DISPLAY_CONDITION_LOCK );
		}

		return () => {
			unlockPostSaving( PRO_DISPLAY_CONDITION_LOCK );
		};
	}, [ scope, lockPostSaving, unlockPostSaving ] );

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

			<PanelRow>
				<ToggleControl
					label={ __( 'Full width (no sidebar)', 'blockive-premium-addon-for-block' ) }
					help={ __(
						'Ask the active theme to drop its sidebar on posts/pages this template applies to. Supported on Astra, GeneratePress, OceanWP, Neve, Kadence, and Blocksy so far; has no effect on other themes.',
						'blockive-premium-addon-for-block'
					) }
					checked={ !! meta?._bpafb_full_width }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_full_width: value } ) }
				/>
			</PanelRow>

			<PanelRow>
				<ToggleControl
					label={ __( "Hide theme's post title", 'blockive-premium-addon-for-block' ) }
					help={ __(
						"Keep off unless the template itself already shows its own title - otherwise the theme's title (and byline: author, date, categories) would render twice.",
						'blockive-premium-addon-for-block'
					) }
					checked={ meta?._bpafb_hide_title !== false }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_hide_title: value } ) }
				/>
			</PanelRow>

			<PanelRow>
				<ToggleControl
					label={ __( "Hide theme's featured image", 'blockive-premium-addon-for-block' ) }
					help={ __(
						'Keep off unless the template itself already shows the featured image - otherwise it would render twice.',
						'blockive-premium-addon-for-block'
					) }
					checked={ meta?._bpafb_hide_featured_image !== false }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_hide_featured_image: value } ) }
				/>
			</PanelRow>

			<PanelRow>
				<ToggleControl
					label={ __( 'Hide comments', 'blockive-premium-addon-for-block' ) }
					help={ __(
						"Hide the theme's comment list and form on posts/pages this template applies to.",
						'blockive-premium-addon-for-block'
					) }
					checked={ !! meta?._bpafb_hide_comments }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_hide_comments: value } ) }
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
