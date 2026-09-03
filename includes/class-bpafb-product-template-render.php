<?php
/**
 * Shared helpers reused by the WooCommerce Product Template Blocks'
 * render.php files (tb-product-*).
 *
 * Kept out of any single render.php on purpose: render.php is `include`-d
 * fresh every time a Template Block renders (it's not include_once), so any
 * top-level function/class declared inside a render.php would fatal with
 * "cannot redeclare" the moment a block renders more than once on the same
 * request (e.g. a product grid rendering this template repeatedly).
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

class Bpafb_Product_Template_Render
{
	/**
	 * Resolves the WC_Product a Product Template Block should render,
	 * preferring the postId supplied via block context the same way every
	 * other Template Block resolves its post.
	 *
	 * @param WP_Block $block Block instance (available as $block in render.php).
	 * @return WC_Product|null
	 */
	public static function get_product($block)
	{
		if (!function_exists('wc_get_product')) {
			return null;
		}

		$post_id = Bpafb_Template_Block_Render::get_post_id($block);
		if (!$post_id) {
			return null;
		}

		$product = wc_get_product($post_id);
		return $product instanceof WC_Product ? $product : null;
	}

	/**
	 * Resolves the ordered, de-duplicated list of image attachment ids that
	 * make up a product's gallery: the main product image first, followed by
	 * the WooCommerce product gallery images.
	 *
	 * @param WC_Product $product Product.
	 * @return array<int,int>
	 */
	public static function get_gallery_image_ids($product)
	{
		if (!$product) {
			return [];
		}

		$ids = [];

		$main_id = (int) $product->get_image_id();
		if ($main_id) {
			$ids[] = $main_id;
		}

		$gallery_ids = $product->get_gallery_image_ids();
		if (is_array($gallery_ids)) {
			foreach ($gallery_ids as $gallery_id) {
				$gallery_id = (int) $gallery_id;
				if ($gallery_id && !in_array($gallery_id, $ids, true)) {
					$ids[] = $gallery_id;
				}
			}
		}

		return $ids;
	}

	/**
	 * Resolves the main product image id, falling back to the post's regular
	 * featured image if the product has no dedicated image set.
	 *
	 * @param WC_Product $product Product.
	 * @return int
	 */
	public static function get_main_image_id($product)
	{
		if (!$product) {
			return 0;
		}

		$image_id = (int) $product->get_image_id();
		if ($image_id) {
			return $image_id;
		}

		$post_id = $product->get_id();
		return $post_id ? (int) get_post_thumbnail_id($post_id) : 0;
	}

	/**
	 * Resolves a product's visible attributes as label/value rows, resolving
	 * taxonomy-backed attributes (e.g. a global "Color" attribute) to their
	 * term names and custom attributes to their raw option list. Shared by
	 * the Attributes Template Block and the "Additional Information" tab of
	 * the Product Tabs Template Block, which otherwise duplicated this exact
	 * loop.
	 *
	 * @param WC_Product|null $product Product.
	 * @return array<int, array{label: string, value: string}>
	 */
	public static function get_visible_attribute_rows($product)
	{
		if (!$product) {
			return [];
		}

		$rows = [];

		foreach ($product->get_attributes() as $attribute) {
			if (!$attribute->get_visible()) {
				continue;
			}

			if ($attribute->is_taxonomy()) {
				$taxonomy = $attribute->get_name();
				$label = wc_attribute_label($taxonomy);
				$terms = wc_get_product_terms($product->get_id(), $taxonomy, ['fields' => 'names']);
				$value = is_wp_error($terms) ? '' : implode(', ', $terms);
			} else {
				$label = $attribute->get_name();
				$value = implode(', ', $attribute->get_options());
			}

			if ($value === '') {
				continue;
			}

			$rows[] = [
				'label' => $label,
				'value' => $value,
			];
		}

		return $rows;
	}

	/**
	 * Replaces the `{qty}` token in a Stock block text template with the
	 * product's tracked stock quantity, when available.
	 *
	 * @param string     $template Text template, e.g. "In Stock ({qty} available)".
	 * @param WC_Product $product  Product.
	 * @return string
	 */
	public static function format_stock_text($template, $product)
	{
		if (strpos($template, '{qty}') === false) {
			return $template;
		}

		$qty = '';
		if ($product && $product->get_manage_stock()) {
			$quantity = $product->get_stock_quantity();
			if ($quantity !== null) {
				$qty = (string) $quantity;
			}
		}

		return str_replace('{qty}', $qty, $template);
	}

	/**
	 * Renders WooCommerce's single-product Add to Cart form/button for an
	 * arbitrary product, handling simple/variable/grouped/external products
	 * alike since it calls the same template WooCommerce itself uses.
	 *
	 * WooCommerce's add-to-cart templates read the global `$product` rather
	 * than accepting one as a parameter, so this temporarily swaps the
	 * global, captures the template output, then restores whatever was
	 * there before - even if the template throws, so a broken product never
	 * leaves a stale global product behind for the rest of the request.
	 *
	 * @param WC_Product $product     Product to render the Add to Cart form for.
	 * @param string     $button_text Optional button text override, empty for the WooCommerce default.
	 * @return string
	 */
	public static function render_add_to_cart_html($product, $button_text = '')
	{
		if (!$product || !function_exists('woocommerce_template_single_add_to_cart')) {
			return '';
		}

		$had_global_product = array_key_exists('product', $GLOBALS);
		$previous_product = $had_global_product ? $GLOBALS['product'] : null;
		// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['product'] = $product;
		// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

		$button_text_filter = null;
		if ($button_text !== '') {
			$button_text_filter = function () use ($button_text) {
				return $button_text;
			};
			add_filter('woocommerce_product_single_add_to_cart_text', $button_text_filter);
			add_filter('woocommerce_product_add_to_cart_text', $button_text_filter);
		}

		ob_start();

		try {
			woocommerce_template_single_add_to_cart();
		} catch (\Throwable $e) {
			// Swallow (including PHP Error/TypeError, not just Exception) -
			// a broken add-to-cart template must not skip the $GLOBALS['product']
			// restore below and leak corrupted state into later renders on
			// the same request/worker.
		}

		$html = ob_get_clean();

		if ($button_text_filter) {
			remove_filter('woocommerce_product_single_add_to_cart_text', $button_text_filter);
			remove_filter('woocommerce_product_add_to_cart_text', $button_text_filter);
		}

		if ($had_global_product) {
			// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
			$GLOBALS['product'] = $previous_product;
			// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		} else {
			unset($GLOBALS['product']);
		}

		return $html;
	}
}
