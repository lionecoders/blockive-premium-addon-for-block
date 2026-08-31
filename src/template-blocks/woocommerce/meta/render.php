<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Meta Template Block.
 *
 * Item resolution lives in Bpafb_Product_Meta_Items (includes/), not in this
 * file: render.php is `include`-d fresh every time the block renders, so
 * declaring a top-level function here would fatal ("cannot redeclare") the
 * moment this block renders more than once on the same request.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);
$bpafb_product = $bpafb_post_id ? wc_get_product($bpafb_post_id) : null;

$bpafb_items = isset($attributes['items']) && is_array($attributes['items']) ? $attributes['items'] : [];
$bpafb_separator = isset($attributes['separator']) ? $attributes['separator'] : '•';
$bpafb_show_icons = !isset($attributes['showIcons']) || !empty($attributes['showIcons']);

$bpafb_rendered_items = [];
if ($bpafb_product) {
	foreach ($bpafb_items as $bpafb_item) {
		if (empty($bpafb_item['enabled'])) {
			continue;
		}
		$bpafb_html = Bpafb_Product_Meta_Items::get_html($bpafb_item['key'], $bpafb_product, $bpafb_show_icons);
		if ($bpafb_html !== '') {
			$bpafb_rendered_items[] = $bpafb_html;
		}
	}
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-meta',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php foreach ($bpafb_rendered_items as $bpafb_index => $bpafb_html) : ?>
		<?php if ($bpafb_index > 0 && $bpafb_separator) : ?>
			<span class="bpafb-tb-product-meta-sep"><?php echo esc_html($bpafb_separator); ?></span>
		<?php endif; ?>
		<span class="bpafb-tb-product-meta-item">
			<?php echo $bpafb_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</span>
	<?php endforeach; ?>
</div>
