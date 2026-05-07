/**
 * Theme Builder — Gutenberg Editor Plugin.
 *
 * Registers a Gutenberg plugin using registerPlugin() that adds:
 * - PluginDocumentSettingPanel  → Template type info
 * - PluginPostStatusInfo        → "Display Conditions" button
 * - PluginPrePublishPanel       → Conditions check reminder
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { registerPlugin } from '@wordpress/plugins';
import TemplateSettingsPanel from './components/TemplateSettingsPanel';
import PostStatusConditionsButton from './components/PostStatusConditionsButton';
import PrePublishConditionsCheck from './components/PrePublishConditionsCheck';
import './style.css';

registerPlugin( 'blockive-theme-builder', {
	render: () => (
		<>
			<TemplateSettingsPanel />
			<PostStatusConditionsButton />
			<PrePublishConditionsCheck />
		</>
	),
} );
