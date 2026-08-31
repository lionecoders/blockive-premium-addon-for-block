<?php
/**
 * Renders a matched Blockive Template in place of the default singular
 * template. Swapped in via Bpafb_Template_Frontend_Render::before_template_include().
 *
 * The real queried post (product/post/page/event/...) stays the loop's
 * global post, so every Template Block's `get_the_ID()` fallback
 * (see Bpafb_Template_Block_Render::get_post_id()) still resolves to it -
 * only the markup being rendered comes from the matched template post
 * instead of the real post's own content.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

get_header();

while (have_posts()) :
	the_post();

	$bpafb_template_id   = Bpafb_Template_Frontend_Render::get_matched_template_id();
	$bpafb_template_post = $bpafb_template_id ? get_post($bpafb_template_id) : null;
	?>
	<div class="bpafb-template-render">
		<?php
		if ($bpafb_template_post) {
			// Same mechanism WordPress core uses to turn block markup into
			// HTML (do_blocks() et al), matching how the template's content
			// already renders inside the block editor.
			echo apply_filters('the_content', $bpafb_template_post->post_content); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		?>
	</div>
	<?php
endwhile;

get_footer();
