<?php
/**
 * Applies a matching Blockive Template in place of the default frontend
 * template for singular views (post, page, product, event CPT, ...).
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Hooks `template_include` at a late priority so it runs after other plugins
 * (e.g. WooCommerce, which swaps in its own single-product.php via the same
 * filter at the default priority) and, when the queried singular post
 * matches a published Blockive Template's display conditions, replaces the
 * template file entirely with one that renders that template's block markup
 * instead.
 */
class Bpafb_Template_Frontend_Render
{
	/**
	 * Template post ID matched for the current request, resolved once in
	 * before_template_include() and read back by the bundled template file.
	 *
	 * @var int
	 */
	private static $matched_template_id = 0;

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		add_filter('template_include', [$this, 'before_template_include'], 100);
	}

	/**
	 * Resolves whether the current singular request matches a Blockive
	 * Template and, if so, swaps in the bundled render template.
	 *
	 * @param string $template Template path resolved so far.
	 * @return string
	 */
	public function before_template_include($template)
	{
		if (is_admin() || !is_singular()) {
			return $template;
		}

		$queried_id   = get_queried_object_id();
		$queried_type = get_post_type($queried_id);

		if (!$queried_id || !$queried_type || $queried_type === Bpafb_Template_Post_Type::POST_TYPE) {
			return $template;
		}

		if (wp_count_posts(Bpafb_Template_Post_Type::POST_TYPE)->publish < 1) {
			return $template;
		}

		$template_id = Bpafb_Template_Display_Conditions::get_matching_template_id($queried_type, $queried_id);
		if (!$template_id) {
			return $template;
		}

		$render_template = BPAFB_PATH . 'templates/single-blockive-template.php';
		if (!file_exists($render_template)) {
			return $template;
		}

		self::$matched_template_id = $template_id;

		return $render_template;
	}

	/**
	 * Returns the Blockive Template post ID matched for the current request.
	 *
	 * @return int
	 */
	public static function get_matched_template_id()
	{
		return self::$matched_template_id;
	}
}
