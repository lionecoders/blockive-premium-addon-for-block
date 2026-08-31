<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Tags Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_separator = isset($attributes['separator']) ? $attributes['separator'] : ', ';
$bpafb_badge_style = !empty($attributes['badgeStyle']);

$bpafb_classes = ['bpafb-tb-tags'];
if ($bpafb_badge_style) {
	$bpafb_classes[] = 'bpafb-tags-badge';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => implode(' ', $bpafb_classes),
]);

$bpafb_tags = $bpafb_post_id ? get_the_tags($bpafb_post_id) : [];
if (!is_array($bpafb_tags)) {
	$bpafb_tags = [];
}

echo '<div ' . $bpafb_wrapper_attributes . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if (!empty($bpafb_tags)) {
	if ($bpafb_badge_style) {
		foreach ($bpafb_tags as $bpafb_tag) {
			printf(
				'<a href="%s" class="bpafb-tb-tag-badge">%s</a>',
				esc_url(get_tag_link($bpafb_tag)),
				esc_html($bpafb_tag->name)
			);
		}
	} else {
		$bpafb_list = get_the_tag_list('', esc_html($bpafb_separator), '', $bpafb_post_id);
		if ($bpafb_list && !is_wp_error($bpafb_list)) {
			echo $bpafb_list; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}
}

echo '</div>';
