/**
 * AddNewTemplateButton Component.
 *
 * Renders the "Add New Template" button and manages
 * the template-type selection modal state.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import TemplateTypeModal from './TemplateTypeModal';

export default function AddNewTemplateButton() {
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	return (
		<>
			<Button
				variant="primary"
				icon="plus-alt2"
				onClick={ () => setIsModalOpen( true ) }
				className="blockive-tb-add-new-btn"
			>
				{ __( 'Add New Template', 'blockive-premium-addon-for-block' ) }
			</Button>

			{ isModalOpen && (
				<TemplateTypeModal
					onClose={ () => setIsModalOpen( false ) }
				/>
			) }
		</>
	);
}
