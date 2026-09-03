<?php
/**
 * Small shared helpers reused by every Template Block's render.php.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Keeps the repetitive "resolve which post to render" / "format a date the
 * same way everywhere" / "print an icon" logic in one place instead of
 * copy-pasted across ~40 render.php files.
 */
class Bpafb_Template_Block_Render
{
	/**
	 * Resolves the post id a Template Block should render, preferring the
	 * postId supplied via block context (e.g. inside a Query Loop or a
	 * block-based singular template) and falling back to the current post
	 * in The Loop - which is what's in scope once a `blockive_template`'s
	 * content is output in place of a real singular post/product/event.
	 *
	 * @param WP_Block $block Block instance (available as $block in render.php).
	 * @return int
	 */
	public static function get_post_id($block)
	{
		if (!empty($block->context['postId'])) {
			$context_id = (int) $block->context['postId'];
			return self::is_real_post($context_id) ? $context_id : 0;
		}

		$fallback_id = get_the_ID() ?: 0;
		return self::is_real_post($fallback_id) ? $fallback_id : 0;
	}

	/**
	 * Whether a post id is a "real", viewable piece of content (post, page,
	 * product, event, ...) rather than internal WordPress bookkeeping such as
	 * a `revision`/autosave or the `blockive_template` post itself (which is
	 * deliberately not publicly viewable - see Bpafb_Template_Post_Type).
	 *
	 * A Template Block must never resolve to one of those: e.g. a revision of
	 * a template being fetched by the block editor (for autosave preload)
	 * carries the same content as the template it's a revision of, so letting
	 * a Post Content block treat it as "the post" would render that content
	 * again - which contains the very same block - causing infinite
	 * recursion.
	 *
	 * @param int $post_id Post ID.
	 * @return bool
	 */
	private static function is_real_post($post_id)
	{
		if (!$post_id) {
			return false;
		}
		$post_type = get_post_type($post_id);
		return $post_type && is_post_type_viewable($post_type);
	}

	/**
	 * Resolves the post type the same way get_post_id() resolves the post id.
	 *
	 * @param WP_Block $block Block instance.
	 * @return string
	 */
	public static function get_post_type($block)
	{
		if (!empty($block->context['postType'])) {
			return $block->context['postType'];
		}
		$post_id = self::get_post_id($block);
		return $post_id ? (string) get_post_type($post_id) : 'post';
	}

	/**
	 * Formats a date the same way across every date-related Template Block.
	 *
	 * @param string $mysql_date Date in MySQL/WP format (e.g. get_the_date('c', $post) or a post field).
	 * @param string $format     PHP date format string, empty for the site default.
	 * @param bool   $relative   Whether to return a "2 days ago" style relative string instead.
	 * @return string
	 */
	public static function format_date($mysql_date, $format = '', $relative = false)
	{
		if (empty($mysql_date)) {
			return '';
		}
		$timestamp = is_numeric($mysql_date) ? (int) $mysql_date : strtotime($mysql_date);
		if (!$timestamp) {
			return '';
		}
		if ($relative) {
			/* translators: %s: human-readable time difference. */
			return sprintf(__('%s ago', 'blockive-premium-addon-for-block'), human_time_diff($timestamp, current_time('timestamp')));
		}
		return date_i18n($format ? $format : get_option('date_format'), $timestamp);
	}

	/**
	 * Renders an icon `<i>` tag from a Font Awesome class string, matching
	 * the convention used by the Icon Box / Social Icons blocks.
	 *
	 * @param string $icon_class Font Awesome class(es), e.g. "fa-regular fa-calendar".
	 * @return string
	 */
	public static function icon_html($icon_class)
	{
		if (empty($icon_class)) {
			return '';
		}
		return '<i class="' . esc_attr($icon_class) . '" aria-hidden="true"></i> ';
	}

	/**
	 * Validates a color attribute value before it's interpolated directly
	 * into a `<style>` tag's CSS text - a different output context from an
	 * HTML attribute, where `esc_attr()` alone is the right tool. `esc_attr()`
	 * stops the value from closing the `<style>` tag early, but does nothing
	 * about CSS-syntax characters (`{`, `}`, `;`), so e.g. a value of
	 * `red; } body { display:none` would still break out of the intended
	 * rule and inject arbitrary CSS. This instead only accepts values that
	 * look like an actual CSS color: a hex code, a named color, or an
	 * `rgb()`/`rgba()`/`hsl()`/`hsla()`/`var()` function call - anything
	 * else (including one containing `{`, `}`, or `;`) is rejected.
	 *
	 * @param string $color Color value from a block attribute.
	 * @return string The color unchanged, or '' if it doesn't look like a safe CSS color.
	 */
	public static function sanitize_css_color($color)
	{
		$color = trim((string) $color);
		if ($color === '') {
			return '';
		}
		if (preg_match('/^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+|(?:rgba?|hsla?|var)\([^{};]*\))$/', $color)) {
			return $color;
		}
		return '';
	}

	/**
	 * Renders a post/product/event "title" Template Block. Titles resolve
	 * the same way for all three - products and events are both normal
	 * WordPress post types - so the Post Title, Product Title, and Event
	 * Title blocks share this one implementation, differing only in their
	 * wrapper CSS class.
	 *
	 * @param WP_Block $block         Block instance (available as $block in render.php).
	 * @param array    $attributes    Block attributes.
	 * @param string   $wrapper_class Block-specific wrapper class, e.g. 'bpafb-tb-post-title'.
	 */
	public static function render_title_block($block, $attributes, $wrapper_class)
	{
		$post_id = self::get_post_id($block);

		$allowed_tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'];
		$tag = isset($attributes['tagName']) && in_array($attributes['tagName'], $allowed_tags, true)
			? $attributes['tagName']
			: 'h2';

		$is_link = !empty($attributes['isLink']);
		$link_target = isset($attributes['linkTarget']) ? $attributes['linkTarget'] : '_self';
		$text_align = isset($attributes['textAlign']) ? $attributes['textAlign'] : '';
		$text_color = isset($attributes['textColor']) ? $attributes['textColor'] : '';
		$text_hover_color = self::sanitize_css_color(
			isset($attributes['textHoverColor']) ? $attributes['textHoverColor'] : ''
		);
		$uid = !empty($attributes['bpafbUid']) ? sanitize_html_class($attributes['bpafbUid']) : '';

		$title = $post_id ? get_the_title($post_id) : '';
		if ($title === '') {
			$title = __('(no title)', 'blockive-premium-addon-for-block');
		}

		$style = '';
		if ($text_align) {
			$style .= 'text-align:' . esc_attr($text_align) . ';';
		}
		if ($text_color) {
			$style .= 'color:' . esc_attr($text_color) . ';';
		}

		$classes = [$wrapper_class];
		if ($uid) {
			$classes[] = 'bpafb-uid-' . $uid;
		}

		$wrapper_attributes = get_block_wrapper_attributes([
			'class' => implode(' ', $classes),
			'style' => $style,
		]);

		$inner = esc_html($title);
		if ($is_link && $post_id) {
			$rel = $link_target === '_blank' ? ' rel="noopener noreferrer"' : '';
			$inner = '<a href="' . esc_url(get_permalink($post_id)) . '" target="' . esc_attr($link_target) . '"' . $rel . '>' . $inner . '</a>';
		}

		if ($text_hover_color && $uid) {
			echo '<style>.bpafb-uid-' . esc_attr($uid) . ':hover, .bpafb-uid-' . esc_attr($uid) . ':hover a { color:' . esc_attr($text_hover_color) . ' !important; }</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}

		printf(
			'<%1$s %2$s>%3$s</%1$s>',
			tag_escape($tag),
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			$wrapper_attributes,
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			$inner
		);
	}
}
