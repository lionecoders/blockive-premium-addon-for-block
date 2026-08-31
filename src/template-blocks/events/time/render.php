<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Event Time Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_icon = isset($attributes['icon']) ? $attributes['icon'] : 'fa-regular fa-clock';
$bpafb_show_end_time = !empty($attributes['showEndTime']);
$bpafb_separator = isset($attributes['timeRangeSeparator']) ? $attributes['timeRangeSeparator'] : ' - ';

$bpafb_start_time = Bpafb_Events_Adapter::get_field('start_time', $bpafb_post_id);

$bpafb_end_time = '';
if ($bpafb_show_end_time) {
	$bpafb_end_time = Bpafb_Events_Adapter::get_field('end_time', $bpafb_post_id);
}

$bpafb_text = $bpafb_start_time;
if ($bpafb_end_time !== '' && $bpafb_end_time !== $bpafb_start_time) {
	$bpafb_text .= $bpafb_separator . $bpafb_end_time;
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-event-time',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ($bpafb_text !== '') : ?>
		<?php echo Bpafb_Template_Block_Render::icon_html($bpafb_icon); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php echo esc_html($bpafb_text); ?>
	<?php endif; ?>
</div>
