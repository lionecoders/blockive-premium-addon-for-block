<?php
/**
 * Plugin Name:       Lc Block Widgets
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lc-block-widgets
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_lc_block_widgets_categories( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'lc-widgets',
				'title' => esc_html__( 'LC Widgets', 'lc-block-widgets' ),
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'create_block_lc_block_widgets_categories', 10, 2 );

function create_block_lc_block_widgets_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'create_block_lc_block_widgets_block_init' );

function create_block_lc_block_widgets_enqueue_assets() {
	wp_enqueue_style( 'lc-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0' );
}
add_action( 'enqueue_block_assets', 'create_block_lc_block_widgets_enqueue_assets' );
