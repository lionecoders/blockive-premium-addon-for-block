<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Attributes Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);
$bpafb_product = $bpafb_post_id ? wc_get_product($bpafb_post_id) : null;

$bpafb_layout = isset($attributes['layout']) && $attributes['layout'] === 'list' ? 'list' : 'table';
$bpafb_show_label = !isset($attributes['showLabel']) || !empty($attributes['showLabel']);

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-attributes bpafb-tb-product-attributes--' . $bpafb_layout,
]);

$bpafb_rows = [];
if ($bpafb_product) {
	$bpafb_product_attributes = $bpafb_product->get_attributes();
	foreach ($bpafb_product_attributes as $bpafb_attribute) {
		if (!$bpafb_attribute->get_visible()) {
			continue;
		}

		if ($bpafb_attribute->is_taxonomy()) {
			$bpafb_taxonomy = $bpafb_attribute->get_name();
			$bpafb_label = wc_attribute_label($bpafb_taxonomy);
			$bpafb_terms = wc_get_product_terms($bpafb_product->get_id(), $bpafb_taxonomy, ['fields' => 'names']);
			$bpafb_value = is_wp_error($bpafb_terms) ? '' : implode(', ', $bpafb_terms);
		} else {
			$bpafb_label = $bpafb_attribute->get_name();
			$bpafb_value = implode(', ', $bpafb_attribute->get_options());
		}

		if ($bpafb_value === '') {
			continue;
		}

		$bpafb_rows[] = [
			'label' => $bpafb_label,
			'value' => $bpafb_value,
		];
	}
}

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if (!$bpafb_product) : ?>
		<p><?php esc_html_e('No product found.', 'blockive-premium-addon-for-block'); ?></p>
	<?php elseif (empty($bpafb_rows)) : ?>
		<p><?php esc_html_e('No attributes found.', 'blockive-premium-addon-for-block'); ?></p>
	<?php elseif ($bpafb_layout === 'list') : ?>
		<ul class="bpafb-tb-product-attributes-list">
			<?php foreach ($bpafb_rows as $bpafb_row) : ?>
				<li>
					<?php if ($bpafb_show_label) : ?>
						<span class="bpafb-tb-attr-label"><?php echo esc_html($bpafb_row['label']); ?>:</span>
					<?php endif; ?>
					<?php echo esc_html($bpafb_row['value']); ?>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php else : ?>
		<table class="bpafb-tb-product-attributes-table">
			<tbody>
				<?php foreach ($bpafb_rows as $bpafb_row) : ?>
					<tr>
						<?php if ($bpafb_show_label) : ?>
							<th><?php echo esc_html($bpafb_row['label']); ?></th>
						<?php endif; ?>
						<td><?php echo esc_html($bpafb_row['value']); ?></td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	<?php endif; ?>
</div>
