<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Event Date Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_icon = isset($attributes['icon']) ? $attributes['icon'] : 'fa-regular fa-calendar';
$bpafb_date_format = isset($attributes['dateFormat']) ? $attributes['dateFormat'] : '';
$bpafb_relative = !empty($attributes['relative']);
$bpafb_show_end_date = !empty($attributes['showEndDate']);
$bpafb_separator = isset($attributes['dateRangeSeparator']) ? $attributes['dateRangeSeparator'] : ' - ';

$bpafb_start_raw = Bpafb_Events_Adapter::get_field('start_date', $bpafb_post_id);
$bpafb_start_display = $bpafb_start_raw !== ''
	? Bpafb_Template_Block_Render::format_date($bpafb_start_raw, $bpafb_date_format, $bpafb_relative)
	: '';

$bpafb_end_display = '';
if ($bpafb_show_end_date) {
	$bpafb_end_raw = Bpafb_Events_Adapter::get_field('end_date', $bpafb_post_id);
	if ($bpafb_end_raw !== '') {
		$bpafb_end_display = Bpafb_Template_Block_Render::format_date($bpafb_end_raw, $bpafb_date_format, $bpafb_relative);
	}
}

$bpafb_text = $bpafb_start_display;
if ($bpafb_end_display !== '' && $bpafb_end_display !== $bpafb_start_display) {
	$bpafb_text .= $bpafb_separator . $bpafb_end_display;
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-event-date',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ($bpafb_text !== '') : ?>
		<?php echo Bpafb_Template_Block_Render::icon_html($bpafb_icon); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php echo esc_html($bpafb_text); ?>
	<?php endif; ?>
</div>
