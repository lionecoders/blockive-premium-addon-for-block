<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Venue Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_icon = isset($attributes['icon']) ? $attributes['icon'] : 'fa-solid fa-location-dot';
$bpafb_show_address = !empty($attributes['showAddress']);

$bpafb_venue = Bpafb_Events_Adapter::get_field('venue', $bpafb_post_id);

$bpafb_address = '';
if ($bpafb_show_address) {
	$bpafb_address = Bpafb_Events_Adapter::get_field('address', $bpafb_post_id);
}

$bpafb_text = $bpafb_venue;
if ($bpafb_address !== '') {
	$bpafb_text = $bpafb_text !== '' ? $bpafb_text . ', ' . $bpafb_address : $bpafb_address;
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-event-venue',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ($bpafb_text !== '') : ?>
		<?php echo Bpafb_Template_Block_Render::icon_html($bpafb_icon); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php echo esc_html($bpafb_text); ?>
	<?php endif; ?>
</div>
