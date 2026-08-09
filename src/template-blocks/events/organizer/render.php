<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Organizer Template Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_icon = isset($attributes['icon']) ? $attributes['icon'] : 'fa-regular fa-address-card';
$bpafb_is_link = !empty($attributes['isLink']);
$bpafb_link_target = isset($attributes['linkTarget']) ? $attributes['linkTarget'] : '_self';

$bpafb_organizer = Bpafb_Events_Adapter::get_field('organizer', $bpafb_post_id);
$bpafb_organizer_url = $bpafb_is_link ? Bpafb_Events_Adapter::get_field('organizer_url', $bpafb_post_id) : '';

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-event-organizer',
]);

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ($bpafb_organizer !== '') : ?>
		<?php echo Bpafb_Template_Block_Render::icon_html($bpafb_icon); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php if ($bpafb_is_link && $bpafb_organizer_url !== '') : ?>
			<a href="<?php echo esc_url($bpafb_organizer_url); ?>" target="<?php echo esc_attr($bpafb_link_target); ?>"<?php echo $bpafb_link_target === '_blank' ? ' rel="noopener noreferrer"' : ''; ?>>
				<?php echo esc_html($bpafb_organizer); ?>
			</a>
		<?php else : ?>
			<?php echo esc_html($bpafb_organizer); ?>
		<?php endif; ?>
	<?php endif; ?>
</div>
