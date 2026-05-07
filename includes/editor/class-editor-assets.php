<?php
/**
 * Editor Assets.
 *
 * Enqueues the Gutenberg editor plugin script and styles
 * only when editing the blockive_template post type.
 *
 * @package Blockive\ThemeBuilder\Editor
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Editor;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Editor_Assets
 */
class Editor_Assets {

	/**
	 * Script handle.
	 */
	private const SCRIPT_HANDLE = 'blockive-tb-editor';

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
	}

	/**
	 * Enqueue editor script and style for the blockive_template CPT.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets(): void {
		$screen = get_current_screen();

		if ( ! $screen || BLOCKIVE_TEMPLATE_POST_TYPE !== $screen->post_type ) {
			return;
		}

		$asset_file = BPAFB_PATH . 'build/editor/theme-builder.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			self::SCRIPT_HANDLE,
			BPAFB_URL . 'build/editor/theme-builder.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// Extracted CSS.
		$css_file = BPAFB_PATH . 'build/editor/style-theme-builder.css';
		if ( file_exists( $css_file ) ) {
			wp_enqueue_style(
				self::SCRIPT_HANDLE,
				BPAFB_URL . 'build/editor/style-theme-builder.css',
				[ 'wp-components' ],
				$asset['version']
			);
		}

		wp_localize_script(
			self::SCRIPT_HANDLE,
			'blockiveEditorData',
			[
				'postType'   => BLOCKIVE_TEMPLATE_POST_TYPE,
				'metaType'   => BLOCKIVE_TEMPLATE_META_TYPE,
				'metaConds'  => BLOCKIVE_TEMPLATE_META_CONDITIONS,
			]
		);

		/**
		 * Fires after Theme Builder editor assets are enqueued.
		 *
		 * Use this hook to enqueue addon scripts and styles that
		 * extend the template editor UI.
		 *
		 * @since 1.1.0
		 *
		 * @param string $script_handle The handle of the main editor script.
		 */
		do_action( 'blockive/editor/enqueue', self::SCRIPT_HANDLE );
	}
}
