<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Title Template Block.
 *
 * Products are a normal post type, so the title resolves exactly like the
 * Post Title block's - no need to load a WC_Product for this one.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

Bpafb_Template_Block_Render::render_title_block($block, $attributes, 'bpafb-tb-product-title');
