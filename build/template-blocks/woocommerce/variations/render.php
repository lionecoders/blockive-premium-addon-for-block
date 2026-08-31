<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Variations Template Block.
 *
 * For variable products this defers entirely to WooCommerce's own
 * `single-product/add-to-cart/variable.php` template (via
 * woocommerce_template_single_add_to_cart()), which already handles the
 * variation attribute dropdowns, AJAX price/availability updates and cart
 * form. This block is a thin wrapper around that native WooCommerce UI, so
 * it pairs with (or can replace) the Add To Cart Template Block for variable
 * products.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);
$bpafb_product = $bpafb_post_id ? wc_get_product($bpafb_post_id) : null;

$bpafb_show_price_range = !isset($attributes['showPriceRange']) || !empty($attributes['showPriceRange']);

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-variations',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php
	if (!$bpafb_product) {
		echo '<p>' . esc_html__('No product found.', 'blockive-premium-addon-for-block') . '</p>';
	} elseif (!$bpafb_product->is_type('variable')) {
		echo '<p>' . esc_html__('This product has no variations.', 'blockive-premium-addon-for-block') . '</p>';
	} else {
		if ($bpafb_show_price_range) {
			echo '<div class="bpafb-tb-product-variations-price">' . $bpafb_product->get_price_html() . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}

		global $product, $post;
		$bpafb_prev_product = $product;
		$bpafb_prev_post = $post;

		// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$product = $bpafb_product; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- woocommerce_template_single_add_to_cart() and the variable.php template it loads read this global.
		// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$bpafb_product_post = get_post($bpafb_product->get_id());
		if ($bpafb_product_post) {
			$post = $bpafb_product_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
			setup_postdata($post);
		}

		woocommerce_template_single_add_to_cart();

		wp_reset_postdata();
		// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$product = $bpafb_prev_product;
		// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$post = $bpafb_prev_post;
	}
	?>
</div>
