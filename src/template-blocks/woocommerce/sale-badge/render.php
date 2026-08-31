<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Sale Badge Template Block.
 *
 * Renders nothing at all when the product isn't on sale. Meant to be placed
 * inside a container with Position: Relative set via the Advanced tab so
 * this badge's `position: absolute` is relative to that container.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);

if (!$bpafb_product || !$bpafb_product->is_on_sale()) {
	return;
}

$bpafb_badge_text = isset($attributes['badgeText']) && $attributes['badgeText'] !== ''
	? $attributes['badgeText']
	: __('Sale!', 'blockive-premium-addon-for-block');

$bpafb_allowed_shapes = ['circle', 'rounded', 'square'];
$bpafb_shape = isset($attributes['badgeShape']) && in_array($attributes['badgeShape'], $bpafb_allowed_shapes, true)
	? $attributes['badgeShape']
	: 'circle';

$bpafb_allowed_positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
$bpafb_position = isset($attributes['position']) && in_array($attributes['position'], $bpafb_allowed_positions, true)
	? $attributes['position']
	: 'top-right';

$bpafb_bg_color = isset($attributes['bgColor']) ? $attributes['bgColor'] : '';
$bpafb_text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '';

$bpafb_style = '';
if ($bpafb_bg_color) {
	$bpafb_style .= 'background-color:' . esc_attr($bpafb_bg_color) . ';';
}
if ($bpafb_text_color) {
	$bpafb_style .= 'color:' . esc_attr($bpafb_text_color) . ';';
}

$bpafb_classes = [
	'bpafb-tb-sale-badge',
	'bpafb-badge-shape-' . sanitize_html_class($bpafb_shape),
	'bpafb-badge-pos-' . sanitize_html_class($bpafb_position),
];

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => implode(' ', $bpafb_classes),
	'style' => $bpafb_style,
]);

printf(
	'<span %1$s>%2$s</span>',
	$bpafb_wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	esc_html($bpafb_badge_text)
);
