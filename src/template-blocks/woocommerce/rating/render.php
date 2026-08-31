<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Rating Template Block.
 *
 * WooCommerce's wc_get_rating_html() outputs markup that colors filled
 * stars via a `::before` content trick on the active theme's star font, so
 * this block can't reliably recolor it with inline styles alone - it wraps
 * the returned HTML in a div exposing a `--wc-star-color` CSS custom
 * property and ships a best-effort stylesheet override (see style-index.css).
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);

if (!$bpafb_product) {
	return;
}

$bpafb_show_count = !isset($attributes['showCount']) || !empty($attributes['showCount']);
$bpafb_star_color = isset($attributes['starColor']) ? $attributes['starColor'] : '';

$bpafb_average = $bpafb_product->get_average_rating();
$bpafb_rating_html = function_exists('wc_get_rating_html') ? wc_get_rating_html($bpafb_average) : '';

if ($bpafb_rating_html === '') {
	return;
}

$bpafb_style = '';
if ($bpafb_star_color) {
	$bpafb_style .= '--wc-star-color:' . esc_attr($bpafb_star_color) . ';';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-rating',
	'style' => $bpafb_style,
]);

printf('<div %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

echo wp_kses_post($bpafb_rating_html);

if ($bpafb_show_count) {
	$bpafb_count = (int) $bpafb_product->get_review_count();
	printf(
		'<span class="bpafb-tb-rating-count">(%s)</span>',
		/* translators: %s: number of reviews. */
		esc_html(sprintf(_n('%s review', '%s reviews', $bpafb_count, 'blockive-premium-addon-for-block'), number_format_i18n($bpafb_count)))
	);
}

echo '</div>';
