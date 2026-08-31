<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Event Cost Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_icon = isset($attributes['icon']) ? $attributes['icon'] : 'fa-solid fa-ticket';
$bpafb_free_text = isset($attributes['freeText']) && $attributes['freeText'] !== ''
	? $attributes['freeText']
	: __('Free', 'blockive-premium-addon-for-block');

$bpafb_cost_raw = trim((string) Bpafb_Events_Adapter::get_field('cost', $bpafb_post_id));
$bpafb_numeric = preg_replace('/[^0-9.]/', '', $bpafb_cost_raw);
$bpafb_is_free = $bpafb_cost_raw === '' || $bpafb_numeric === '' || (float) $bpafb_numeric === 0.0;

$bpafb_text = $bpafb_is_free ? $bpafb_free_text : $bpafb_cost_raw;

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-event-cost',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo Bpafb_Template_Block_Render::icon_html($bpafb_icon); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php echo esc_html($bpafb_text); ?>
</div>
