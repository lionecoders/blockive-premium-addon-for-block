<?php
/**
 * Conditionally loads Template Builder editor assets.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueues the Template Builder JS/CSS bundle only when editing a `blockive_template`.
 */
class Bpafb_Template_Builder
{
	/**
	 * Constructor.
	 */
	public function __construct()
	{
		add_action('enqueue_block_editor_assets', [$this, 'enqueue_assets']);
	}

	/**
	 * Enqueues the Template Builder bundle, gated to the template editor only.
	 */
	public function enqueue_assets()
	{
		if (!Bpafb_Screen_Helper::is_template_editor()) {
			return;
		}

		$script_path = BPAFB_PATH . 'build/template-builder/index.js';
		if (!file_exists($script_path)) {
			return;
		}

		$asset_file = BPAFB_PATH . 'build/template-builder/index.asset.php';
		$asset      = file_exists($asset_file) ? require $asset_file : [
			'dependencies' => [],
			'version'      => BPAFB_VERSION,
		];

		wp_enqueue_script(
			'bpafb-template-builder',
			BPAFB_URL . 'build/template-builder/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		if (file_exists(BPAFB_PATH . 'build/template-builder/style-index.css')) {
			wp_enqueue_style(
				'bpafb-template-builder',
				BPAFB_URL . 'build/template-builder/style-index.css',
				['wp-components'],
				$asset['version']
			);
		}

		wp_localize_script('bpafb-template-builder', 'bpafbTemplateBuilder', [
			'postType' => Bpafb_Template_Post_Type::POST_TYPE,
		]);
	}
}
