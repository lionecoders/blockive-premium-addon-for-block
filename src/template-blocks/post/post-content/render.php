<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Post Content Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_word_limit = isset($attributes['wordLimit']) ? (int) $attributes['wordLimit'] : 0;
$bpafb_show_read_more = !isset($attributes['showReadMore']) || !empty($attributes['showReadMore']);
$bpafb_read_more_text = isset($attributes['readMoreText']) && $attributes['readMoreText'] !== ''
	? $attributes['readMoreText']
	: __('Read More', 'blockive-premium-addon-for-block');
$bpafb_max_width = isset($attributes['maxWidth']) ? (int) $attributes['maxWidth'] : 0;
$bpafb_drop_cap = !empty($attributes['dropCap']);
$bpafb_text_align = isset($attributes['textAlign']) ? $attributes['textAlign'] : '';

$bpafb_raw_content = $bpafb_post_id ? get_post_field('post_content', $bpafb_post_id) : '';
$bpafb_is_truncated = false;

if ($bpafb_word_limit > 0 && $bpafb_raw_content !== '') {
	$bpafb_plain = wp_strip_all_tags(strip_shortcodes($bpafb_raw_content));
	$bpafb_word_count = str_word_count($bpafb_plain);
	if ($bpafb_word_count > $bpafb_word_limit) {
		$bpafb_is_truncated = true;
	}
	$bpafb_content_html = '<p>' . esc_html(wp_trim_words($bpafb_plain, $bpafb_word_limit, '…')) . '</p>';
} else {
	// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
	$bpafb_content_html = $bpafb_post_id ? apply_filters('the_content', $bpafb_raw_content) : '';
	// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
}

$bpafb_style = '';
if ($bpafb_text_align) {
	$bpafb_style .= 'text-align:' . esc_attr($bpafb_text_align) . ';';
}
if ($bpafb_max_width) {
	$bpafb_style .= 'max-width:' . $bpafb_max_width . 'px;';
}

$bpafb_classes = ['bpafb-tb-post-content'];
if ($bpafb_drop_cap) {
	$bpafb_classes[] = 'bpafb-has-drop-cap';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => implode(' ', $bpafb_classes),
	'style' => $bpafb_style,
]);

printf('<div %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

echo $bpafb_content_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if ($bpafb_is_truncated && $bpafb_show_read_more && $bpafb_post_id) {
	printf(
		'<p class="bpafb-tb-post-content-readmore"><a href="%s">%s</a></p>',
		esc_url(get_permalink($bpafb_post_id)),
		esc_html($bpafb_read_more_text)
	);
}

echo '</div>';
