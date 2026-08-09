<?php
/**
 * Resolves individual Post Meta block items to their rendered HTML.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Kept out of render.php on purpose: render.php is `include`-d fresh every
 * time a Template Block renders (it's not include_once), so any top-level
 * function/class declared inside a render.php would fatal with "cannot
 * redeclare" the moment that block renders more than once on the same
 * request (e.g. inside Related Posts, or the block used twice on a page).
 */
class Bpafb_Post_Meta_Items
{
	/**
	 * Resolves a single Post Meta item's markup.
	 *
	 * @param string $key     Item key (author, date, categories, tags, comments, readingTime).
	 * @param int    $post_id Post id.
	 * @param bool   $icons   Whether to prefix an icon.
	 * @return string
	 */
	public static function get_html($key, $post_id, $icons = true)
	{
		if (!$post_id) {
			return '';
		}

		switch ($key) {
			case 'author':
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-regular fa-user') : '';
				return $icon . esc_html(get_the_author_meta('display_name', get_post_field('post_author', $post_id)));

			case 'date':
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-regular fa-calendar') : '';
				return $icon . esc_html(get_the_date('', $post_id));

			case 'categories':
				$list = get_the_category_list(', ', '', $post_id);
				if (!$list) {
					return '';
				}
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-regular fa-folder') : '';
				return $icon . $list;

			case 'tags':
				$list = get_the_tag_list('', ', ', '', $post_id);
				if (!$list || is_wp_error($list)) {
					return '';
				}
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-solid fa-tags') : '';
				return $icon . $list;

			case 'comments':
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-regular fa-comment') : '';
				$count = (int) get_comments_number($post_id);
				/* translators: %s: number of comments. */
				return $icon . sprintf(esc_html(_n('%s Comment', '%s Comments', $count, 'blockive-premium-addon-for-block')), number_format_i18n($count));

			case 'readingTime':
				$content = get_post_field('post_content', $post_id);
				$words = str_word_count(wp_strip_all_tags(strip_shortcodes($content)));
				$minutes = max(1, (int) ceil($words / 200));
				$icon = $icons ? Bpafb_Template_Block_Render::icon_html('fa-regular fa-clock') : '';
				/* translators: %s: number of minutes. */
				return $icon . sprintf(esc_html__('%s min read', 'blockive-premium-addon-for-block'), $minutes);

			default:
				/**
				 * Filters an unknown Post Meta item key so extensions can add their own.
				 *
				 * @param string $html    Empty by default.
				 * @param string $key     Item key.
				 * @param int    $post_id Post id.
				 */
				return apply_filters('blockive_post_meta_item_html', '', $key, $post_id);
		}
	}
}
