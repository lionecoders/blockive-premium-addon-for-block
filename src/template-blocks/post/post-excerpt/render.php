<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Post Excerpt Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_length = isset($attributes['excerptLength']) ? (int) $attributes['excerptLength'] : 150;
$bpafb_show_read_more = !isset($attributes['showReadMore']) || !empty($attributes['showReadMore']);
$bpafb_read_more_text = isset($attributes['readMoreText']) && $attributes['readMoreText'] !== ''
	? $attributes['readMoreText']
	: __('Read More', 'blockive-premium-addon-for-block');
$bpafb_text_align = isset($attributes['textAlign']) ? $attributes['textAlign'] : '';

$bpafb_excerpt = $bpafb_post_id ? wp_strip_all_tags(get_the_excerpt($bpafb_post_id)) : '';
$bpafb_is_truncated = false;

if ($bpafb_length > 0 && $bpafb_excerpt !== '' && mb_strlen($bpafb_excerpt) > $bpafb_length) {
	$bpafb_is_truncated = true;
	$bpafb_trimmed = mb_substr($bpafb_excerpt, 0, $bpafb_length);
	$bpafb_last_space = mb_strrpos($bpafb_trimmed, ' ');
	if ($bpafb_last_space !== false) {
		$bpafb_trimmed = mb_substr($bpafb_trimmed, 0, $bpafb_last_space);
	}
	$bpafb_excerpt = rtrim($bpafb_trimmed) . '…';
}

$bpafb_style = '';
if ($bpafb_text_align) {
	$bpafb_style .= 'text-align:' . esc_attr($bpafb_text_align) . ';';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-post-excerpt',
	'style' => $bpafb_style,
]);

printf('<p %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

echo esc_html($bpafb_excerpt);

if ($bpafb_is_truncated && $bpafb_show_read_more && $bpafb_post_id) {
	printf(
		' <a class="bpafb-tb-post-excerpt-readmore" href="%s">%s</a>',
		esc_url(get_permalink($bpafb_post_id)),
		esc_html($bpafb_read_more_text)
	);
}

echo '</p>';
