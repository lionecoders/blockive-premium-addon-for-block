<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Event Map Template Block.
 *
 * Prefers building a key-free Google Maps embed from the venue's full
 * address (most reliable across events plugins). Falls back to a plain
 * link when only a map URL is available, and to a placeholder message
 * when neither is available.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);
$bpafb_height = isset($attributes['height']) ? (int) $attributes['height'] : 300;
if ($bpafb_height < 1) {
	$bpafb_height = 300;
}

$bpafb_address = Bpafb_Events_Adapter::get_field('address', $bpafb_post_id);
$bpafb_map_url = Bpafb_Events_Adapter::get_field('map_url', $bpafb_post_id);

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-event-map',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ($bpafb_address !== '') : ?>
		<?php
		$bpafb_embed_src = 'https://www.google.com/maps?q=' . rawurlencode($bpafb_address) . '&output=embed';
		?>
		<iframe
			class="bpafb-tb-event-map-iframe"
			src="<?php echo esc_url($bpafb_embed_src); ?>"
			width="100%"
			height="<?php echo (int) $bpafb_height; ?>"
			style="border:0;"
			loading="lazy"
			allowfullscreen
			referrerpolicy="no-referrer-when-downgrade"
			title="<?php echo esc_attr__('Event location map', 'blockive-premium-addon-for-block'); ?>"
		></iframe>
	<?php elseif ($bpafb_map_url !== '') : ?>
		<div class="bpafb-tb-event-map-link" style="height:<?php echo (int) $bpafb_height; ?>px;">
			<a href="<?php echo esc_url($bpafb_map_url); ?>" target="_blank" rel="noopener noreferrer">
				<?php esc_html_e('View Map', 'blockive-premium-addon-for-block'); ?>
			</a>
		</div>
	<?php else : ?>
		<div class="bpafb-tb-event-map-placeholder" style="height:<?php echo (int) $bpafb_height; ?>px;">
			<?php esc_html_e('No address available.', 'blockive-premium-addon-for-block'); ?>
		</div>
	<?php endif; ?>
</div>
