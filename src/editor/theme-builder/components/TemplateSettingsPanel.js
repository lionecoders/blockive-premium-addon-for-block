/**
 * TemplateSettingsPanel Component.
 *
 * Renders a PluginDocumentSettingPanel in the editor sidebar
 * showing the current template type and a button to open the
 * Display Conditions modal.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { Button, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import DisplayConditionsModal from './DisplayConditionsModal';

/**
 * Map of template type slugs to human-readable labels.
 */
const TYPE_LABELS = {
	header: __( 'Header', 'blockive-premium-addon-for-block' ),
	footer: __( 'Footer', 'blockive-premium-addon-for-block' ),
	single: __( 'Single', 'blockive-premium-addon-for-block' ),
	archive: __( 'Archive', 'blockive-premium-addon-for-block' ),
	'404': __( '404', 'blockive-premium-addon-for-block' ),
	search: __( 'Search', 'blockive-premium-addon-for-block' ),
};

/**
 * Map of template type slugs to dashicon names.
 */
const TYPE_ICONS = {
	header: 'arrow-up-alt',
	footer: 'arrow-down-alt',
	single: 'media-text',
	archive: 'grid-view',
	'404': 'warning',
	search: 'search',
};

export default function TemplateSettingsPanel() {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	const meta = window.blockiveEditorData || {};
	const metaTypeKey = meta.metaType || '_blockive_template_type';

	const templateType = useSelect( ( select ) => {
		const postMeta = select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
		return postMeta[ metaTypeKey ] || '';
	}, [ metaTypeKey ] );

	const typeLabel = TYPE_LABELS[ templateType ] || __( 'Unknown', 'blockive-premium-addon-for-block' );
	const typeIcon = TYPE_ICONS[ templateType ] || 'layout';

	return (
		<>
			<PluginDocumentSettingPanel
				name="blockive-template-settings"
				title={ __( 'Template Settings', 'blockive-premium-addon-for-block' ) }
				className="blockive-tb-editor-panel"
			>
				{ templateType ? (
					<div className="blockive-tb-editor-panel__type">
						<div className="blockive-tb-editor-panel__type-badge">
							<Icon icon={ typeIcon } size={ 20 } />
							<span>{ typeLabel }</span>
						</div>
						<p className="blockive-tb-editor-panel__type-hint">
							{ __( 'Template type is set during creation.', 'blockive-premium-addon-for-block' ) }
						</p>
					</div>
				) : (
					<p className="blockive-tb-editor-panel__no-type">
						{ __( 'No template type assigned.', 'blockive-premium-addon-for-block' ) }
					</p>
				) }

				<hr className="blockive-tb-editor-panel__divider" />

				<Button
					variant="secondary"
					icon="visibility"
					onClick={ () => setIsModalOpen( true ) }
					className="blockive-tb-editor-panel__conditions-btn"
					isFullWidth
				>
					{ __( 'Display Conditions', 'blockive-premium-addon-for-block' ) }
				</Button>
			</PluginDocumentSettingPanel>

			{ isModalOpen && (
				<DisplayConditionsModal
					onClose={ () => setIsModalOpen( false ) }
				/>
			) }
		</>
	);
}
