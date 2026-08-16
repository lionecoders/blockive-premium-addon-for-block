<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Short Description Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);
$bpafb_product = $bpafb_post_id ? wc_get_product($bpafb_post_id) : null;

$bpafb_max_width = isset($attributes['maxWidth']) ? (int) $attributes['maxWidth'] : 0;

$bpafb_style = '';
if ($bpafb_max_width > 0) {
	$bpafb_style .= 'max-width:' . $bpafb_max_width . 'px;';
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-short-description',
	'style' => $bpafb_style,
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if (!$bpafb_product) : ?>
		<p><?php esc_html_e('No product found.', 'blockive-premium-addon-for-block'); ?></p>
	<?php else :
		$bpafb_short_description = $bpafb_product->get_short_description();
		if ($bpafb_short_description !== '') {
			// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
			echo apply_filters('woocommerce_short_description', $bpafb_short_description); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
		}
	endif; ?>
</div>
