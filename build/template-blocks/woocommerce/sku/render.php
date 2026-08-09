<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product SKU Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);
$bpafb_sku = $bpafb_product ? $bpafb_product->get_sku() : '';

$bpafb_hide_if_empty = !isset($attributes['hideIfEmpty']) || !empty($attributes['hideIfEmpty']);

if ($bpafb_sku === '' && $bpafb_hide_if_empty) {
	return;
}

$bpafb_label = isset($attributes['label']) ? $attributes['label'] : __('SKU:', 'blockive-premium-addon-for-block');
$bpafb_text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '';

$bpafb_style = '';
if ($bpafb_text_color) {
	$bpafb_style .= 'color:' . esc_attr($bpafb_text_color) . ';';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-sku',
	'style' => $bpafb_style,
]);

printf('<div %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if ($bpafb_label !== '') {
	printf('<span class="bpafb-tb-sku-label">%s </span>', esc_html($bpafb_label));
}

printf(
	'<span class="bpafb-tb-sku-value">%s</span>',
	esc_html($bpafb_sku !== '' ? $bpafb_sku : __('N/A', 'blockive-premium-addon-for-block'))
);

echo '</div>';
