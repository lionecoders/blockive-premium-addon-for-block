<?php
/**
 * Editor screen/post-type detection helper.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Single source of truth for "is the current admin screen the Template Builder editor?".
 */
class Bpafb_Screen_Helper
{
	/**
	 * Whether the current admin request is editing (or creating) a `blockive_template` post.
	 *
	 * @return bool
	 */
	public static function is_template_editor()
	{
		if (!is_admin()) {
			return false;
		}

		if (function_exists('get_current_screen')) {
			$screen = get_current_screen();
			if ($screen && $screen->post_type === Bpafb_Template_Post_Type::POST_TYPE) {
				return true;
			}
		}

		// Fallback for early admin hooks that fire before the screen object is populated.
		if (isset($_GET['post_type']) && sanitize_key(wp_unslash($_GET['post_type'])) === Bpafb_Template_Post_Type::POST_TYPE) {
			return true;
		}

		if (isset($_GET['post'])) {
			$post_type = get_post_type(absint($_GET['post']));
			if ($post_type === Bpafb_Template_Post_Type::POST_TYPE) {
				return true;
			}
		}

		return false;
	}
}
