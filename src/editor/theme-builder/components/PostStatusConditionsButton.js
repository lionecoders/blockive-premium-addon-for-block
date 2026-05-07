/**
 * PostStatusConditionsButton Component.
 *
 * Renders a "Display Conditions" button inside
 * PluginPostStatusInfo (the publish sidebar status area).
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { PluginPostStatusInfo } from '@wordpress/editor';
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import DisplayConditionsModal from './DisplayConditionsModal';

export default function PostStatusConditionsButton() {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	return (
		<>
			<PluginPostStatusInfo className="blockive-tb-post-status-info">
				<Button
					variant="tertiary"
					icon="visibility"
					onClick={ () => setIsModalOpen( true ) }
					className="blockive-tb-post-status-info__btn"
				>
					{ __( 'Display Conditions', 'blockive-premium-addon-for-block' ) }
				</Button>
			</PluginPostStatusInfo>

			{ isModalOpen && (
				<DisplayConditionsModal
					onClose={ () => setIsModalOpen( false ) }
				/>
			) }
		</>
	);
}
