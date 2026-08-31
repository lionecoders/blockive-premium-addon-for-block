<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Images Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);
$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_size = isset($attributes['imageSize']) ? $attributes['imageSize'] : 'large';
$bpafb_aspect_ratio = isset($attributes['aspectRatio']) ? $attributes['aspectRatio'] : '';
$bpafb_border_radius = isset($attributes['borderRadius']) ? (int) $attributes['borderRadius'] : 0;
$bpafb_object_fit = isset($attributes['objectFit']) ? $attributes['objectFit'] : 'cover';
$bpafb_lazy_load = !isset($attributes['lazyLoad']) || !empty($attributes['lazyLoad']);
$bpafb_is_link = !isset($attributes['isLink']) || !empty($attributes['isLink']);

$bpafb_figure_style = '';
if ($bpafb_aspect_ratio) {
	$bpafb_figure_style .= 'aspect-ratio:' . esc_attr($bpafb_aspect_ratio) . ';';
}
if ($bpafb_border_radius) {
	$bpafb_figure_style .= 'border-radius:' . $bpafb_border_radius . 'px;overflow:hidden;';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-images',
	'style' => $bpafb_figure_style,
]);

$bpafb_image_id = $bpafb_product ? Bpafb_Product_Template_Render::get_main_image_id($bpafb_product) : 0;

printf('<figure %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if ($bpafb_image_id) {
	$bpafb_img_atts = [
		'style' => 'object-fit:' . esc_attr($bpafb_object_fit) . ';width:100%;height:100%;',
		'loading' => $bpafb_lazy_load ? 'lazy' : 'eager',
	];
	$bpafb_img_html = wp_get_attachment_image($bpafb_image_id, $bpafb_size, false, $bpafb_img_atts);

	if ($bpafb_is_link && $bpafb_post_id) {
		printf(
			'<a href="%s">%s</a>',
			esc_url(get_permalink($bpafb_post_id)),
			$bpafb_img_html // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		);
	} else {
		echo $bpafb_img_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
} else {
	echo '<div class="bpafb-tb-product-images-placeholder" aria-hidden="true"></div>';
}

echo '</figure>';
