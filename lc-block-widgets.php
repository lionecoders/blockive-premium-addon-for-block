<?php
/**
 * Plugin Name:       Lc Block Widgets
 * Description:       Essential collection of premium Gutenberg blocks for WordPress.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Lionecoders
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lc-block-widgets
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define('LCBW_PATH', plugin_dir_path(__FILE__));
define('LCBW_URL', plugin_dir_url(__FILE__));
define('LCBW_VERSION', '1.0.0');

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
		$this->lcbw_setup_hooks();
	}

	/**
	 * Setup WordPress hooks.
	 */
	public function lcbw_setup_hooks()
	{
		add_filter('block_categories_all', [$this, 'lcbw_register_block_categories'], 10, 2);
		add_action('init', [$this, 'lcbw_register_blocks']);
		add_action('enqueue_block_assets', [$this, 'lcbw_enqueue_global_assets']);
	}

	/**
	 * Registers the block categories.
	 *
	 * @param array $categories Array of categories for blocks.
	 * @return array
	 */
	public function lcbw_register_block_categories($categories)
	{
		return array_merge(
			[
				[
					'slug' => 'lc-widgets',
					'title' => esc_html__('LC Widgets', 'lc-block-widgets'),
				],
			],
			$categories
		);
	}

	/**
	 * Registers the blocks based on the manifest.
	 */
	public function lcbw_register_blocks()
	{
		if (function_exists('wp_register_block_types_from_metadata_collection')) {
			wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		}
	}

	/**
	 * Enqueue global assets for blocks.
	 */
	public function lcbw_enqueue_global_assets()
	{
		wp_enqueue_style('lc-font-awesome', LCBW_URL . 'assets/css/lc-block-webfonts.css', [], LCBW_VERSION);
	}
}

// Initialize the plugin class.
new LC_Block_Widgets();
