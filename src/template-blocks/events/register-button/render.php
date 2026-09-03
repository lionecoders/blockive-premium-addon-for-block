<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Register Button Template Block.
 *
 * Registration URL resolution order: the "_event_registration_url" post
 * meta key (when enabled), then the manual URL attribute, then the event's
 * permalink as a last resort.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);

$bpafb_button_text = isset($attributes['buttonText']) && $attributes['buttonText'] !== ''
	? $attributes['buttonText']
	: __('Register Now', 'blockive-premium-addon-for-block');
$bpafb_manual_url = isset($attributes['url']) ? trim($attributes['url']) : '';
$bpafb_use_meta = !isset($attributes['useEventRegistrationMeta']) || !empty($attributes['useEventRegistrationMeta']);
$bpafb_open_new_tab = !empty($attributes['openInNewTab']);
$bpafb_bg_color = isset($attributes['bgColor']) ? $attributes['bgColor'] : '';
// These two go into a <style> tag's CSS text below, not an HTML attribute,
// so they need to look like actual CSS colors (see
// Bpafb_Template_Block_Render::sanitize_css_color()).
$bpafb_bg_hover_color = Bpafb_Template_Block_Render::sanitize_css_color(isset($attributes['bgHoverColor']) ? $attributes['bgHoverColor'] : '');
$bpafb_text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '';
$bpafb_text_hover_color = Bpafb_Template_Block_Render::sanitize_css_color(isset($attributes['textHoverColor']) ? $attributes['textHoverColor'] : '');
$bpafb_uid = !empty($attributes['bpafbUid']) ? sanitize_html_class($attributes['bpafbUid']) : '';

$bpafb_href = '';
if ($bpafb_use_meta && $bpafb_post_id) {
	$bpafb_href = (string) get_post_meta($bpafb_post_id, '_event_registration_url', true);
}
if ($bpafb_href === '' && $bpafb_manual_url !== '') {
	$bpafb_href = $bpafb_manual_url;
}
if ($bpafb_href === '' && $bpafb_post_id) {
	$bpafb_href = (string) get_permalink($bpafb_post_id);
}

$bpafb_link_style = '';
if ($bpafb_bg_color) {
	$bpafb_link_style .= 'background-color:' . esc_attr($bpafb_bg_color) . ';';
}
if ($bpafb_text_color) {
	$bpafb_link_style .= 'color:' . esc_attr($bpafb_text_color) . ';';
}

$bpafb_link_classes = ['bpafb-tb-event-register-button-link'];
if ($bpafb_uid) {
	$bpafb_link_classes[] = 'bpafb-uid-' . $bpafb_uid;
}

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-event-register-button',
]);

if (($bpafb_bg_hover_color || $bpafb_text_hover_color) && $bpafb_uid) {
	echo '<style>.bpafb-uid-' . esc_attr($bpafb_uid) . ':hover{';
	if ($bpafb_bg_hover_color) {
		echo 'background-color:' . esc_attr($bpafb_bg_hover_color) . ' !important;';
	}
	if ($bpafb_text_hover_color) {
		echo 'color:' . esc_attr($bpafb_text_hover_color) . ' !important;';
	}
	echo '}</style>';
}

?>
<div <?php echo $bpafb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<a
		href="<?php echo esc_url($bpafb_href); ?>"
		class="<?php echo esc_attr(implode(' ', $bpafb_link_classes)); ?>"
		style="<?php echo esc_attr($bpafb_link_style); ?>"
		target="<?php echo esc_attr($bpafb_open_new_tab ? '_blank' : '_self'); ?>"
		<?php echo $bpafb_open_new_tab ? 'rel="noopener noreferrer"' : ''; ?>
	>
		<?php echo esc_html($bpafb_button_text); ?>
	</a>
</div>
