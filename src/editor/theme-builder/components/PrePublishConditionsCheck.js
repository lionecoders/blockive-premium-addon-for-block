/**
 * PrePublishConditionsCheck Component.
 *
 * Renders a PluginPrePublishPanel that reminds the user
 * to set display conditions before publishing a template.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { PluginPrePublishPanel } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { Button, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import DisplayConditionsModal from './DisplayConditionsModal';

export default function PrePublishConditionsCheck() {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	const meta = window.blockiveEditorData || {};
	const metaCondsKey = meta.metaConds || '_blockive_template_conditions';

	const conditions = useSelect( ( select ) => {
		const postMeta = select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
		return postMeta[ metaCondsKey ] || '';
	}, [ metaCondsKey ] );

	const hasConditions = conditions && conditions !== '[]' && conditions !== '';

	return (
		<>
			<PluginPrePublishPanel
				title={ __( 'Display Conditions', 'blockive-premium-addon-for-block' ) }
				initialOpen={ ! hasConditions }
				className="blockive-tb-prepublish-panel"
			>
				{ hasConditions ? (
					<div className="blockive-tb-prepublish-panel__status blockive-tb-prepublish-panel__status--ok">
						<Icon icon="yes-alt" size={ 20 } />
						<span>
							{ __( 'Conditions are configured.', 'blockive-premium-addon-for-block' ) }
						</span>
					</div>
				) : (
					<div className="blockive-tb-prepublish-panel__status blockive-tb-prepublish-panel__status--warn">
						<Icon icon="info-outline" size={ 20 } />
						<span>
							{ __( 'No display conditions set. This template won\'t appear on your site.', 'blockive-premium-addon-for-block' ) }
						</span>
					</div>
				) }

				<Button
					variant="secondary"
					onClick={ () => setIsModalOpen( true ) }
					className="blockive-tb-prepublish-panel__btn"
					isFullWidth
				>
					{ hasConditions
						? __( 'Edit Conditions', 'blockive-premium-addon-for-block' )
						: __( 'Add Conditions', 'blockive-premium-addon-for-block' )
					}
				</Button>
			</PluginPrePublishPanel>

			{ isModalOpen && (
				<DisplayConditionsModal
					onClose={ () => setIsModalOpen( false ) }
				/>
			) }
		</>
	);
}
