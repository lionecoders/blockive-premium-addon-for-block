<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Dynamic Field Template Block.
 *
 * Output formatting lives in Bpafb_Dynamic_Field_Output (includes/), not in
 * this file: render.php is `include`-d fresh every time the block renders,
 * so declaring a top-level function/class here would fatal ("cannot
 * redeclare") the moment a second Dynamic Field block renders on the same
 * page/request.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_provider = isset($attributes['provider']) ? $attributes['provider'] : 'post_meta';
$bpafb_field_key = isset($attributes['fieldKey']) ? $attributes['fieldKey'] : '';

$bpafb_value = $bpafb_field_key !== ''
	? Bpafb_Dynamic_Field_Providers::resolve($bpafb_provider, $bpafb_field_key, $bpafb_post_id)
	: '';

$bpafb_inner = Bpafb_Dynamic_Field_Output::render($bpafb_value, $attributes);

$bpafb_allowed_tags = ['div', 'span', 'p'];
$bpafb_tag = isset($attributes['tagName']) && in_array($attributes['tagName'], $bpafb_allowed_tags, true)
	? $attributes['tagName']
	: 'div';

$bpafb_text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '';
$bpafb_text_hover_color = isset($attributes['textHoverColor']) ? $attributes['textHoverColor'] : '';
$bpafb_uid = !empty($attributes['bpafbUid']) ? sanitize_html_class($attributes['bpafbUid']) : '';

$bpafb_style = '';
if ($bpafb_text_color) {
	$bpafb_style .= 'color:' . esc_attr($bpafb_text_color) . ';';
}

$bpafb_classes = ['bpafb-tb-dynamic-field'];
if ($bpafb_uid) {
	$bpafb_classes[] = 'bpafb-uid-' . $bpafb_uid;
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => implode(' ', $bpafb_classes),
	'style' => $bpafb_style,
]);

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
