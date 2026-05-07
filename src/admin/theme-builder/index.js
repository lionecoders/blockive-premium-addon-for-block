/**
 * Theme Builder Admin — React Entry Point.
 *
 * Mounts the "Add New Template" button and template-type
 * selection modal into the Theme Builder admin page.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { createRoot } from '@wordpress/element';
import AddNewTemplateButton from './components/AddNewTemplateButton';
import './style.css';

const mountNode = document.getElementById( 'blockive-tb-add-new-wrap' );

if ( mountNode ) {
	const root = createRoot( mountNode );
	root.render( <AddNewTemplateButton /> );
}
