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
 * Renders the matched Blockive Template seamlessly inside the active theme's
 * singular layout, preserving the theme's headers, footers, typography,
 * and page container styling.
 */
class Bpafb_Template_Frontend_Render
{
	/**
	 * Template post ID matched for the current request.
	 *
	 * @var int
	 */
	private static $matched_template_id = 0;

	/**
	 * Guard against recursive the_content calls.
	 *
	 * @var bool
	 */
	private static $is_rendering = false;

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		add_action('template_redirect', [$this, 'resolve_matched_template']);
		add_filter('the_content', [$this, 'filter_the_content'], 1);
		add_action('woocommerce_before_single_product', [$this, 'setup_woocommerce_template']);
	}

	/**
	 * Resolves whether the current singular request matches a Blockive Template.
	 */
	public function resolve_matched_template()
	{
		if (is_admin() || !is_singular()) {
			return;
		}

		$queried_id   = get_queried_object_id();
		$queried_type = get_post_type($queried_id);

		if (!$queried_id || !$queried_type || $queried_type === Bpafb_Template_Post_Type::POST_TYPE) {
			return;
		}

		if (wp_count_posts(Bpafb_Template_Post_Type::POST_TYPE)->publish < 1) {
			return;
		}

		$template_id = Bpafb_Template_Display_Conditions::get_matching_template_id($queried_type, $queried_id);
		if ($template_id) {
			self::$matched_template_id = $template_id;
		}
	}

	/**
	 * Filters the post content on singular views to output the matched
	 * Blockive Template's content instead of the post's own content.
	 *
	 * @param string $content Original post content.
	 * @return string
	 */
	public function filter_the_content($content)
	{
		if (is_admin() || !is_singular() || !in_the_loop() || !is_main_query()) {
			return $content;
		}

		if (self::$is_rendering) {
			return $content;
		}

		$template_id = self::get_matched_template_id();
		if (!$template_id) {
			return $content;
		}

		$queried_id = get_queried_object_id();
		if (get_the_ID() !== $queried_id) {
			return $content;
		}

		$template_post = get_post($template_id);
		if (!$template_post || empty($template_post->post_content)) {
			return $content;
		}

		self::$is_rendering = true;

		$rendered = do_blocks($template_post->post_content);

		self::$is_rendering = false;

		return '<div class="bpafb-template-render">' . $rendered . '</div>';
	}

	/**
	 * Sets up WooCommerce single-product display when a template matches.
	 */
	public function setup_woocommerce_template()
	{
		$template_id = self::get_matched_template_id();
		if (!$template_id) {
			return;
		}

		$queried_id = get_queried_object_id();
		if (get_post_type($queried_id) !== 'product') {
			return;
		}

		remove_all_actions('woocommerce_before_single_product_summary');
		remove_all_actions('woocommerce_single_product_summary');
		remove_all_actions('woocommerce_after_single_product_summary');

		add_action('woocommerce_single_product_summary', function () use ($template_id) {
			$template_post = get_post($template_id);
			if ($template_post && !empty($template_post->post_content)) {
				self::$is_rendering = true;
				$rendered = do_blocks($template_post->post_content);
				self::$is_rendering = false;
				echo '<div class="bpafb-template-render">' . $rendered . '</div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}, 1);
	}

	/**
	 * Returns the Blockive Template post ID matched for the current request.
	 *
	 * @return int
	 */
	public static function get_matched_template_id()
	{
		if (!self::$matched_template_id && is_singular()) {
			$queried_id   = get_queried_object_id();
			$queried_type = get_post_type($queried_id);
			if ($queried_id && $queried_type && $queried_type !== Bpafb_Template_Post_Type::POST_TYPE) {
				self::$matched_template_id = Bpafb_Template_Display_Conditions::get_matching_template_id($queried_type, $queried_id);
			}
		}
		return self::$matched_template_id;
	}
}
