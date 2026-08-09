<?php
/**
 * Resolves individual Product Meta block items to their rendered HTML.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Kept out of render.php on purpose: render.php is `include`-d fresh every
 * time a Template Block renders (it's not include_once), so any top-level
 * function/class declared inside a render.php would fatal with "cannot
 * redeclare" the moment that block renders more than once on the same
 * request. Mirrors Bpafb_Post_Meta_Items but resolves from a WC_Product
 * instance instead of a post id.
 */
class Bpafb_Product_Meta_Items
{
	/**
	 * Resolves a single Product Meta item's markup.
	 *
	 * @param string     $key     Item key (sku, categories, tags, stockStatus).
	 * @param WC_Product $product Product instance.
	 * @param bool       $icons   Whether to prefix an icon.
	 * @return string
	 */
	public static function get_html($key, $product, $icons = true)
	{
		if (!($product instanceof WC_Product)) {
			return '';
		}

		switch ($key) {
			case 'sku':
				$sku = $product->get_sku();
				if (!$sku) {
					return '';
				}
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-solid fa-barcode') : '';
				return $icon . esc_html__('SKU:', 'blockive-premium-addon-for-block') . ' ' . esc_html($sku);

			case 'categories':
				$list = wc_get_product_category_list($product->get_id(), ', ');
				if (!$list) {
					return '';
				}
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-regular fa-folder') : '';
				return $icon . $list;

			case 'tags':
				$list = wc_get_product_tag_list($product->get_id(), ', ');
				if (!$list || is_wp_error($list)) {
					return '';
				}
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-solid fa-tags') : '';
				return $icon . $list;

			case 'stockStatus':
				$availability = $product->get_availability();
				$text = !empty($availability['availability']) ? $availability['availability'] : '';
				if ($text === '') {
					return '';
				}
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-solid fa-boxes-stacked') : '';
				$class = !empty($availability['class']) ? ' bpafb-tb-product-meta-stock-' . sanitize_html_class($availability['class']) : '';
				return '<span class="bpafb-tb-product-meta-stock' . esc_attr($class) . '">' . $icon . esc_html($text) . '</span>';

			default:
				/**
				 * Filters an unknown Product Meta item key so extensions can add their own.
				 *
				 * @param string     $html    Empty by default.
				 * @param string     $key     Item key.
				 * @param WC_Product $product Product instance.
				 */
				return apply_filters('blockive_product_meta_item_html', '', $key, $product);
		}
	}
}
