<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Upsells Template Block.
 *
 * Card markup is built by Bpafb_Product_Card_List (includes/), shared with
 * the Related Products and Cross Sells blocks, since render.php cannot
 * declare its own functions (it's `include`-d fresh on every render).
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);
$bpafb_product = $bpafb_post_id ? wc_get_product($bpafb_post_id) : null;

$bpafb_number = isset($attributes['numberOfProducts']) ? (int) $attributes['numberOfProducts'] : 4;
$bpafb_layout = isset($attributes['layout']) && $attributes['layout'] === 'slider' ? 'slider' : 'grid';
$bpafb_columns = isset($attributes['columns']) ? (int) $attributes['columns'] : 4;

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-upsells',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php
	if (!$bpafb_product) {
		echo '<p>' . esc_html__('No product found.', 'blockive-premium-addon-for-block') . '</p>';
	} else {
		$bpafb_upsell_ids = $bpafb_product->get_upsell_ids();
		$bpafb_upsell_ids = is_array($bpafb_upsell_ids) ? array_slice($bpafb_upsell_ids, 0, $bpafb_number) : [];
		if (empty($bpafb_upsell_ids)) {
			echo '<p>' . esc_html__('No upsell products found.', 'blockive-premium-addon-for-block') . '</p>';
		} else {
			echo Bpafb_Product_Card_List::render($bpafb_upsell_ids, $bpafb_layout, $bpafb_columns); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}
	?>
</div>
