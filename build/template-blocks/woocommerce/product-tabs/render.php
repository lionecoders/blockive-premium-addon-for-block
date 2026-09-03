<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Product Tabs Template Block.
 *
 * Server-rendered tabs (Description / Additional Information / Reviews)
 * with simple vanilla-JS click switching (see view.js). No functions or
 * classes are declared here since render.php is `include`-d fresh every
 * time this block renders.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

if ($bpafb_post_id && post_password_required($bpafb_post_id)) {
	echo get_the_password_form($bpafb_post_id); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_the_password_form() returns pre-escaped WordPress core markup.
	return;
}

$bpafb_product = $bpafb_post_id ? wc_get_product($bpafb_post_id) : null;

$bpafb_show_description = !isset($attributes['showDescriptionTab']) || !empty($attributes['showDescriptionTab']);
$bpafb_show_attributes = !isset($attributes['showAttributesTab']) || !empty($attributes['showAttributesTab']);
$bpafb_show_reviews = !isset($attributes['showReviewsTab']) || !empty($attributes['showReviewsTab']);

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-product-tabs-wrapper',
]);

$bpafb_tabs = [];

if ($bpafb_product) {
	if ($bpafb_show_description) {
		$bpafb_tabs['description'] = __('Description', 'blockive-premium-addon-for-block');
	}
	if ($bpafb_show_attributes) {
		$bpafb_tabs['attributes'] = __('Additional Information', 'blockive-premium-addon-for-block');
	}
	if ($bpafb_show_reviews) {
		/* translators: %d: number of reviews. */
		$bpafb_tabs['reviews'] = sprintf(__('Reviews (%d)', 'blockive-premium-addon-for-block'), (int) $bpafb_product->get_review_count());
	}
}

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if (!$bpafb_product) : ?>
		<p><?php esc_html_e('No product found.', 'blockive-premium-addon-for-block'); ?></p>
	<?php elseif (empty($bpafb_tabs)) : ?>
		<p><?php esc_html_e('No tabs enabled.', 'blockive-premium-addon-for-block'); ?></p>
	<?php else : ?>
		<div class="bpafb-tb-product-tabs-nav" role="tablist">
			<?php $bpafb_first = true; ?>
			<?php foreach ($bpafb_tabs as $bpafb_key => $bpafb_label) : ?>
				<button
					type="button"
					class="bpafb-tb-product-tab-pill<?php echo $bpafb_first ? ' active' : ''; ?>"
					data-tab="<?php echo esc_attr($bpafb_key); ?>"
				><?php echo esc_html($bpafb_label); ?></button>
				<?php $bpafb_first = false; ?>
			<?php endforeach; ?>
		</div>
		<div class="bpafb-tb-product-tabs-panels">
			<?php $bpafb_first = true; ?>
			<?php foreach ($bpafb_tabs as $bpafb_key => $bpafb_label) : ?>
				<div
					class="bpafb-tb-product-tab-pane<?php echo $bpafb_first ? ' active' : ''; ?>"
					data-tab-pane="<?php echo esc_attr($bpafb_key); ?>"
				>
					<?php if ($bpafb_key === 'description') :
						$bpafb_description = $bpafb_product->get_description();
						if ($bpafb_description !== '') {
							// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
							echo apply_filters('the_content', $bpafb_description); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
							// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
						} else {
							echo '<p>' . esc_html__('No description available.', 'blockive-premium-addon-for-block') . '</p>';
						}
					elseif ($bpafb_key === 'attributes') :
						$bpafb_rows = Bpafb_Product_Template_Render::get_visible_attribute_rows($bpafb_product);
						if (empty($bpafb_rows)) :
							?>
							<p><?php esc_html_e('No additional information available.', 'blockive-premium-addon-for-block'); ?></p>
							<?php
						else :
							?>
							<table class="bpafb-tb-product-attributes-table">
								<tbody>
									<?php foreach ($bpafb_rows as $bpafb_row) : ?>
										<tr>
											<th><?php echo esc_html($bpafb_row['label']); ?></th>
											<td><?php echo esc_html($bpafb_row['value']); ?></td>
										</tr>
									<?php endforeach; ?>
								</tbody>
							</table>
							<?php
						endif;
					elseif ($bpafb_key === 'reviews') :
						$bpafb_review_post = get_post($bpafb_product->get_id());
						if ($bpafb_review_post && comments_open($bpafb_review_post) && function_exists('wc_get_template')) {
							global $product, $post;
							$bpafb_prev_product = $product;
							$bpafb_prev_post = $post;

							// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
							$product = $bpafb_product; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- WooCommerce's own review template reads this global, same convention used by the Add To Cart / Variations Template Blocks.
							// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
							$post = $bpafb_review_post; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
							setup_postdata($post);

							wc_get_template('single-product/tabs/reviews.php', ['product' => $bpafb_product]);

							wp_reset_postdata();
							// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
							$product = $bpafb_prev_product;
							// phpcs:enable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
							$post = $bpafb_prev_post;
						} else {
							?>
							<p><?php esc_html_e('Reviews are closed for this product.', 'blockive-premium-addon-for-block'); ?></p>
							<?php
						}
					endif; ?>
				</div>
				<?php $bpafb_first = false; ?>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</div>
