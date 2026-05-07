<?php
/**
 * Plugin Name:       Blockive - Premium Addon For Block
 * Description: A powerful Blockive addon plugin that offers a wide range of Blocks
 * Plugin URI: https://lionecoders.com
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Lionecoders
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blockive-premium-addon-for-block
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define('BPAFB_PATH', plugin_dir_path(__FILE__));
define('BPAFB_URL', plugin_dir_url(__FILE__));
define('BPAFB_VERSION', '1.0.0');

/**
 * Theme Builder constants & bootstrap.
 */
require_once BPAFB_PATH . 'includes/constants.php';

/**
 * Main Class for Blockive Premium Addon For Block.
 */
class Blockive_Premium_Addon_For_Block
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->bpafb_setup_hooks();
		$this->bpafb_load_theme_builder();
	}

	/**
	 * Bootstrap the Theme Builder module.
	 *
	 * @return void
	 */
	private function bpafb_load_theme_builder()
	{
		require_once BPAFB_PATH . 'includes/class-theme-builder.php';
		\Blockive\ThemeBuilder\Theme_Builder::instance();
	}

	/**
	 * Setup WordPress hooks.
	 */
	public function bpafb_setup_hooks()
	{
		add_filter('block_categories_all', [$this, 'bpafb_register_block_categories'], 10, 2);
		add_action('init', [$this, 'bpafb_register_blocks']);
		add_action('enqueue_block_assets', [$this, 'bpafb_enqueue_global_assets']);
	}

	/**
	 * Registers the block categories.
	 *
	 * @param array $categories Array of categories for blocks.
	 * @return array
	 */
	public function bpafb_register_block_categories($categories)
	{
		return array_merge(
			[
				[
					'slug' => 'bpafb-widgets',
					'title' => esc_html__('Blockive', 'blockive-premium-addon-for-block'),
				],
			],
			$categories
		);
	}

	/**
	 * Registers the blocks based on the manifest.
	 */
	public function bpafb_register_blocks()
	{
		if (function_exists('wp_register_block_types_from_metadata_collection')) {
			wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		}
	}

	/**
	 * Enqueue global assets for blocks.
	 */
	public function bpafb_enqueue_global_assets()
	{
		wp_enqueue_style('bpafb-font-awesome', BPAFB_URL . 'assets/css/blockive-webfonts.css', [], BPAFB_VERSION);
	}
}

// Initialize the plugin class.
new Blockive_Premium_Addon_For_Block();
