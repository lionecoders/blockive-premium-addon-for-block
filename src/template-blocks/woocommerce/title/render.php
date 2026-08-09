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

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_allowed_tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'];
$bpafb_tag = isset($attributes['tagName']) && in_array($attributes['tagName'], $bpafb_allowed_tags, true)
	? $attributes['tagName']
	: 'h2';

$bpafb_is_link = !empty($attributes['isLink']);
$bpafb_link_target = isset($attributes['linkTarget']) ? $attributes['linkTarget'] : '_self';
$bpafb_text_align = isset($attributes['textAlign']) ? $attributes['textAlign'] : '';
$bpafb_text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '';
$bpafb_text_hover_color = isset($attributes['textHoverColor']) ? $attributes['textHoverColor'] : '';
$bpafb_uid = !empty($attributes['bpafbUid']) ? sanitize_html_class($attributes['bpafbUid']) : '';

$bpafb_title = $bpafb_post_id ? get_the_title($bpafb_post_id) : '';
if ($bpafb_title === '') {
	$bpafb_title = __('(no title)', 'blockive-premium-addon-for-block');
}

$bpafb_style = '';
if ($bpafb_text_align) {
	$bpafb_style .= 'text-align:' . esc_attr($bpafb_text_align) . ';';
}
if ($bpafb_text_color) {
	$bpafb_style .= 'color:' . esc_attr($bpafb_text_color) . ';';
}

$bpafb_classes = ['bpafb-tb-product-title'];
if ($bpafb_uid) {
	$bpafb_classes[] = 'bpafb-uid-' . $bpafb_uid;
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => implode(' ', $bpafb_classes),
	'style' => $bpafb_style,
]);

$bpafb_inner = esc_html($bpafb_title);
if ($bpafb_is_link && $bpafb_post_id) {
	$bpafb_rel = $bpafb_link_target === '_blank' ? ' rel="noopener noreferrer"' : '';
	$bpafb_inner = '<a href="' . esc_url(get_permalink($bpafb_post_id)) . '" target="' . esc_attr($bpafb_link_target) . '"' . $bpafb_rel . '>' . $bpafb_inner . '</a>';
}

if ($bpafb_text_hover_color && $bpafb_uid) {
	echo '<style>.bpafb-uid-' . esc_attr($bpafb_uid) . ':hover, .bpafb-uid-' . esc_attr($bpafb_uid) . ':hover a { color:' . esc_attr($bpafb_text_hover_color) . ' !important; }</style>';
}

printf(
	'<%1$s %2$s>%3$s</%1$s>',
	tag_escape($bpafb_tag),
	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	$bpafb_wrapper_attributes,
	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	$bpafb_inner
);
