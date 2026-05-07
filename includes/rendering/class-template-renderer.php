<?php
/**
 * Template Renderer.
 *
 * Renders template post content through the full WordPress
 * block rendering pipeline: do_blocks(), do_shortcode(),
 * and wpautop().
 *
 * @package Blockive\ThemeBuilder\Rendering
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Rendering;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Template_Renderer
 */
class Template_Renderer {

	/**
	 * Render a template post's content.
	 *
	 * Passes content through the full WordPress rendering pipeline:
	 * 1. do_blocks()    — Parse and render Gutenberg blocks.
	 * 2. do_shortcode() — Process shortcodes.
	 * 3. wpautop()      — Auto-paragraph classic content.
	 * 4. wp_filter      — Apply 'the_content' filters.
	 *
	 * @param \WP_Post $template Template post object.
	 * @param bool     $echo     Whether to echo or return. Default true.
	 * @return string|void Rendered HTML if $echo is false.
	 */
	public function render( \WP_Post $template, bool $echo = true ) {
		$content = $template->post_content;

		if ( empty( $content ) ) {
			return $echo ? null : '';
		}

		/**
		 * Fires before a template's content is rendered.
		 *
		 * Useful for enqueueing assets, setting up global state,
		 * or adding wrapper markup before the template output.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post $template The template post object.
		 */
		do_action( 'blockive/before_render', $template );

		// Run through the block parser first.
		$content = do_blocks( $content );

		// Process shortcodes.
		$content = do_shortcode( $content );

		// Auto-paragraph for classic content.
		$content = wpautop( $content );

		/**
		 * Filters the rendered template content.
		 *
		 * @since 1.1.0
		 *
		 * @param string   $content  The rendered HTML.
		 * @param \WP_Post $template The template post object.
		 */
		$content = apply_filters( 'blockive/template_content', $content, $template );

		if ( $echo ) {
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo $content;
		}

		/**
		 * Fires after a template's content has been rendered.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post $template The template post object.
		 * @param string   $content  The rendered HTML.
		 */
		do_action( 'blockive/after_render', $template, $content );

		if ( ! $echo ) {
			return $content;
		}
	}

	/**
	 * Render a template by its post ID.
	 *
	 * @param int  $template_id Template post ID.
	 * @param bool $echo        Whether to echo or return. Default true.
	 * @return string|void Rendered HTML if $echo is false, null if not found.
	 */
	public function render_by_id( int $template_id, bool $echo = true ) {
		$post = get_post( $template_id );

		if ( ! $post || BLOCKIVE_TEMPLATE_POST_TYPE !== $post->post_type ) {
			return $echo ? null : '';
		}

		return $this->render( $post, $echo );
	}
}
