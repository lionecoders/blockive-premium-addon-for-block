<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Stock Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);

if (!$bpafb_product) {
	return;
}

$bpafb_status = $bpafb_product->get_stock_status();

$bpafb_in_stock_text = isset($attributes['inStockText']) && $attributes['inStockText'] !== ''
	? $attributes['inStockText']
	: __('In Stock', 'blockive-premium-addon-for-block');
$bpafb_out_of_stock_text = isset($attributes['outOfStockText']) && $attributes['outOfStockText'] !== ''
	? $attributes['outOfStockText']
	: __('Out of Stock', 'blockive-premium-addon-for-block');
$bpafb_on_backorder_text = isset($attributes['onBackorderText']) && $attributes['onBackorderText'] !== ''
	? $attributes['onBackorderText']
	: __('On Backorder', 'blockive-premium-addon-for-block');

$bpafb_in_stock_color = isset($attributes['inStockColor']) ? $attributes['inStockColor'] : '';
$bpafb_out_of_stock_color = isset($attributes['outOfStockColor']) ? $attributes['outOfStockColor'] : '';
$bpafb_on_backorder_color = isset($attributes['onBackorderColor']) ? $attributes['onBackorderColor'] : '';

switch ($bpafb_status) {
	case 'outofstock':
		$bpafb_text = $bpafb_out_of_stock_text;
		$bpafb_color = $bpafb_out_of_stock_color;
		$bpafb_status_class = 'outofstock';
		break;

	case 'onbackorder':
		$bpafb_text = Bpafb_Product_Template_Render::format_stock_text($bpafb_on_backorder_text, $bpafb_product);
		$bpafb_color = $bpafb_on_backorder_color;
		$bpafb_status_class = 'onbackorder';
		break;

	case 'instock':
	default:
		$bpafb_text = Bpafb_Product_Template_Render::format_stock_text($bpafb_in_stock_text, $bpafb_product);
		$bpafb_color = $bpafb_in_stock_color;
		$bpafb_status_class = 'instock';
		break;
}

$bpafb_style = '';
if ($bpafb_color) {
	$bpafb_style .= 'color:' . esc_attr($bpafb_color) . ';';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-stock bpafb-stock-' . sanitize_html_class($bpafb_status_class),
	'style' => $bpafb_style,
]);

printf(
	'<div %1$s>%2$s</div>',
	$bpafb_wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	esc_html($bpafb_text)
);
