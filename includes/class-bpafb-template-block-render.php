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
			return (int) $block->context['postId'];
		}
		return get_the_ID() ?: 0;
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
}
