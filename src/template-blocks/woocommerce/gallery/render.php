<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Gallery Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);

$bpafb_allowed_positions = ['bottom', 'left', 'right', 'none'];
$bpafb_thumb_position = isset($attributes['thumbnailPosition']) && in_array($attributes['thumbnailPosition'], $bpafb_allowed_positions, true)
	? $attributes['thumbnailPosition']
	: 'bottom';
$bpafb_thumb_size = isset($attributes['thumbnailSize']) ? $attributes['thumbnailSize'] : 'thumbnail';
$bpafb_main_size = isset($attributes['mainImageSize']) ? $attributes['mainImageSize'] : 'large';

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-gallery bpafb-gallery-thumbs-' . sanitize_html_class($bpafb_thumb_position),
]);

printf('<div %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if (!$bpafb_product) {
	echo '<div class="bpafb-tb-product-gallery-placeholder" aria-hidden="true"></div>';
	echo '</div>';
	return;
}

$bpafb_image_ids = Bpafb_Product_Template_Render::get_gallery_image_ids($bpafb_product);

if (empty($bpafb_image_ids)) {
	echo '<div class="bpafb-tb-product-gallery-placeholder" aria-hidden="true"></div>';
	echo '</div>';
	return;
}

$bpafb_main_id = $bpafb_image_ids[0];

echo '<div class="bpafb-tb-product-gallery-main">';
echo wp_get_attachment_image($bpafb_main_id, $bpafb_main_size, false, ['class' => 'bpafb-tb-product-gallery-main-image']); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo '</div>';

if ($bpafb_thumb_position !== 'none' && count($bpafb_image_ids) > 1) {
	echo '<div class="bpafb-tb-product-gallery-thumbs">';
	foreach ($bpafb_image_ids as $bpafb_thumb_id) {
		printf(
			'<div class="bpafb-tb-product-gallery-thumb">%s</div>',
			wp_get_attachment_image($bpafb_thumb_id, $bpafb_thumb_size) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		);
	}
	echo '</div>';
}

echo '</div>';
