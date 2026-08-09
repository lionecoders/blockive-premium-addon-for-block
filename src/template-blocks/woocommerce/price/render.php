<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Price Template Block.
 *
 * WooCommerce's own get_price_html() already handles regular/sale price
 * strike-through and formatting, so this block just needs to place it.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);
$bpafb_text_align = isset($attributes['textAlign']) ? $attributes['textAlign'] : '';

$bpafb_style = '';
if ($bpafb_text_align) {
	$bpafb_style .= 'text-align:' . esc_attr($bpafb_text_align) . ';';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-price',
	'style' => $bpafb_style,
]);

$bpafb_price_html = $bpafb_product ? $bpafb_product->get_price_html() : '';

printf('<div %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if ($bpafb_price_html !== '') {
	echo wp_kses_post($bpafb_price_html);
}

echo '</div>';
