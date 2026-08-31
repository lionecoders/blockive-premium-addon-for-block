<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Modified Date Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_format = isset($attributes['dateFormat']) ? $attributes['dateFormat'] : '';
$bpafb_relative = !empty($attributes['relative']);

$bpafb_raw_date = $bpafb_post_id ? get_post_field('post_modified', $bpafb_post_id) : '';
$bpafb_date_text = Bpafb_Template_Block_Render::format_date($bpafb_raw_date, $bpafb_format, $bpafb_relative);
$bpafb_datetime_attr = $bpafb_raw_date ? mysql2date('c', $bpafb_raw_date) : '';

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-modified-date',
]);

printf('<span %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

printf(
	'<time%s>%s</time>',
	$bpafb_datetime_attr ? ' datetime="' . esc_attr($bpafb_datetime_attr) . '"' : '',
	esc_html($bpafb_date_text)
);

echo '</span>';
