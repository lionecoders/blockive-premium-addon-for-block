<?php
/**
 * Shared "grid or slider of product cards" renderer used by the Related
 * Products, Upsells and Cross Sells Template Blocks.
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
 * request (e.g. Related Products and Upsells both rendering on one page).
 */
class Bpafb_Product_Card_List
{
	/**
	 * Renders a grid or slider of product cards (image + title + price) from
	 * an array of product ids.
	 *
	 * @param int[]  $product_ids Product ids to render.
	 * @param string $layout      'grid' or 'slider'.
	 * @param int    $columns     Number of grid columns / desktop slides.
	 * @param string $extra_class Optional extra wrapper class, e.g. 'bpafb-tb-product-upsells-list'.
	 * @return string
	 */
	public static function render($product_ids, $layout = 'grid', $columns = 4, $extra_class = '')
	{
		$product_ids = is_array($product_ids) ? array_filter(array_map('absint', $product_ids)) : [];
		if (empty($product_ids)) {
			return '';
		}

		$layout = $layout === 'slider' ? 'slider' : 'grid';
		$columns = $columns ? max(1, (int) $columns) : 4;

		$cards = '';
		foreach ($product_ids as $product_id) {
			$product = wc_get_product($product_id);
			if (!$product || !$product->is_visible()) {
				continue;
			}

			$slide_class = $layout === 'slider' ? ' swiper-slide' : '';
			$image = $product->get_image('medium');
			$name = $product->get_name();
			$price_html = $product->get_price_html();

			$cards .= '<div class="bpafb-product-card' . esc_attr($slide_class) . '">';
			$cards .= '<a class="bpafb-product-card-link" href="' . esc_url(get_permalink($product_id)) . '">';
			$cards .= '<div class="bpafb-product-card-image">' . $image . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_image() is core-escaped.
			$cards .= '<h3 class="bpafb-product-card-title">' . esc_html($name) . '</h3>';
			$cards .= '<span class="bpafb-product-card-price">' . $price_html . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_price_html() is core-escaped.
			$cards .= '</a>';
			$cards .= '</div>';
		}

		if ($cards === '') {
			return '';
		}

		$classes = 'bpafb-product-card-list bpafb-product-card-list--' . $layout;
		if ($extra_class) {
			$classes .= ' ' . $extra_class;
		}

		$html = '<div class="' . esc_attr($classes) . '" data-columns="' . esc_attr($columns) . '" style="--bpafb-pcl-columns:' . esc_attr($columns) . ';">';

		if ($layout === 'slider') {
			$html .= '<div class="bpafb-product-card-list-track swiper"><div class="swiper-wrapper">' . $cards . '</div></div>';
			$html .= '<div class="swiper-button-prev bpafb-pcl-prev"></div>';
			$html .= '<div class="swiper-button-next bpafb-pcl-next"></div>';
			$html .= '<div class="swiper-pagination bpafb-pcl-pagination"></div>';
		} else {
			$html .= $cards;
		}

		$html .= '</div>';

		return $html;
	}
}
