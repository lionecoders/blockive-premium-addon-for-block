<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Add To Cart Template Block.
 *
 * Delegates the actual form/button markup to WooCommerce's own single
 * product template (via Bpafb_Product_Template_Render::render_add_to_cart_html()),
 * which is the only way to correctly support simple, variable, grouped and
 * external products without reimplementing each product type's UI + AJAX.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_product = Bpafb_Product_Template_Render::get_product($block);

if (!$bpafb_product) {
	return;
}

$bpafb_button_text = isset($attributes['buttonText']) ? trim($attributes['buttonText']) : '';
// All four go straight into a <style> tag's CSS text below, not an HTML
// attribute, so they need to look like actual CSS colors, not just be
// esc_attr()-safe (see Bpafb_Template_Block_Render::sanitize_css_color()).
$bpafb_bg_color = Bpafb_Template_Block_Render::sanitize_css_color(isset($attributes['btnBgColor']) ? $attributes['btnBgColor'] : '');
$bpafb_text_color = Bpafb_Template_Block_Render::sanitize_css_color(isset($attributes['btnTextColor']) ? $attributes['btnTextColor'] : '');
$bpafb_hover_bg_color = Bpafb_Template_Block_Render::sanitize_css_color(isset($attributes['btnHoverBgColor']) ? $attributes['btnHoverBgColor'] : '');
$bpafb_hover_text_color = Bpafb_Template_Block_Render::sanitize_css_color(isset($attributes['btnHoverTextColor']) ? $attributes['btnHoverTextColor'] : '');
$bpafb_uid = !empty($attributes['bpafbUid']) ? sanitize_html_class($attributes['bpafbUid']) : '';

$bpafb_form_html = Bpafb_Product_Template_Render::render_add_to_cart_html($bpafb_product, $bpafb_button_text);

if ($bpafb_form_html === '') {
	return;
}

$bpafb_classes = ['bpafb-tb-add-to-cart'];
if ($bpafb_uid) {
	$bpafb_classes[] = 'bpafb-uid-' . $bpafb_uid;
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => implode(' ', $bpafb_classes),
]);

if ($bpafb_uid && ($bpafb_bg_color || $bpafb_text_color || $bpafb_hover_bg_color || $bpafb_hover_text_color)) {
	$bpafb_css = '';
	if ($bpafb_bg_color || $bpafb_text_color) {
		$bpafb_css .= '.bpafb-uid-' . esc_attr($bpafb_uid) . ' .button, .bpafb-uid-' . esc_attr($bpafb_uid) . ' button {';
		if ($bpafb_bg_color) {
			$bpafb_css .= 'background-color:' . esc_attr($bpafb_bg_color) . ' !important;';
		}
		if ($bpafb_text_color) {
			$bpafb_css .= 'color:' . esc_attr($bpafb_text_color) . ' !important;';
		}
		$bpafb_css .= '}';
	}
	if ($bpafb_hover_bg_color || $bpafb_hover_text_color) {
		$bpafb_css .= '.bpafb-uid-' . esc_attr($bpafb_uid) . ' .button:hover, .bpafb-uid-' . esc_attr($bpafb_uid) . ' button:hover {';
		if ($bpafb_hover_bg_color) {
			$bpafb_css .= 'background-color:' . esc_attr($bpafb_hover_bg_color) . ' !important;';
		}
		if ($bpafb_hover_text_color) {
			$bpafb_css .= 'color:' . esc_attr($bpafb_hover_text_color) . ' !important;';
		}
		$bpafb_css .= '}';
	}
	if ($bpafb_css !== '') {
		echo '<style>' . $bpafb_css . '</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

printf('<div %s>', $bpafb_wrapper_attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo $bpafb_form_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo '</div>';
