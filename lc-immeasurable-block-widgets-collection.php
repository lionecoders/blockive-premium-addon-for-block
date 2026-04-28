<?php
/**
 * Plugin Name:       Lc immeasurable Block Widgets collection
 * Description:       Essential collection of premium Gutenberg blocks for WordPress.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Lionecoders
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lc-immeasurable-block-widgets-collection
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define('LCIBWC_PATH', plugin_dir_path(__FILE__));
define('LCIBWC_URL', plugin_dir_url(__FILE__));
define('LCIBWC_VERSION', '1.0.0');

/**
 * Main Class for LC Block Widgets
 */
class LC_Block_Widgets
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->lcibwc_setup_hooks();
	}

	/**
	 * Setup WordPress hooks.
	 */
	public function lcibwc_setup_hooks()
	{
		add_filter('block_categories_all', [$this, 'lcibwc_register_block_categories'], 10, 2);
		add_action('init', [$this, 'lcibwc_register_blocks']);
		add_action('enqueue_block_assets', [$this, 'lcibwc_enqueue_global_assets']);
	}

	/**
	 * Registers the block categories.
	 *
	 * @param array $categories Array of categories for blocks.
	 * @return array
	 */
	public function lcibwc_register_block_categories($categories)
	{
		return array_merge(
			[
				[
					'slug' => 'lcibwc-widgets',
					'title' => esc_html__('LC Widgets', 'lc-immeasurable-block-widgets-collection'),
				],
			],
			$categories
		);
	}

	/**
	 * Registers the blocks based on the manifest.
	 */
	public function lcibwc_register_blocks()
	{
		if (function_exists('wp_register_block_types_from_metadata_collection')) {
			wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		}
	}

	/**
	 * Enqueue global assets for blocks.
	 */
	public function lcibwc_enqueue_global_assets()
	{
		wp_enqueue_style('lcibwc-font-awesome', LCIBWC_URL . 'assets/css/lc-block-webfonts.css', [], LCIBWC_VERSION);
	}
}

// Initialize the plugin class.
new LC_Block_Widgets();
