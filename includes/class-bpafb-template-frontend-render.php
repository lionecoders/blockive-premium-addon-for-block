<?php
/**
 * Applies a matching Blockive Template in place of the default frontend
 * content for singular views (post, page, product, event CPT, ...).
 *
 * Renders entirely inside the active theme's own singular template (never
 * swaps it for a plugin-owned one) so the theme's real width, spacing, and
 * typography always apply with no per-theme special-casing or hardcoded
 * CSS: the template's content replaces `the_content`, and the theme's own
 * title/featured-image output is suppressed via core's own `the_title` /
 * `post_thumbnail_html` filters (and, on block themes, by not rendering the
 * corresponding blocks at all) so nothing renders twice.
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
	 * Whether resolve_template_for_current_request() has already run for
	 * this request - including when it found no match, so that outcome is
	 * memoized too (0 is otherwise indistinguishable from "not resolved
	 * yet", which would defeat the point of caching).
	 *
	 * @var bool
	 */
	private static $has_resolved_template = false;

	/**
	 * Guard against recursive the_content calls.
	 *
	 * @var bool
	 */
	private static $is_rendering = false;

	/**
	 * Theme blocks that make up the post's title/byline "header" - what a
	 * Blockive Template's own tb-post-title (etc.) Template Blocks already
	 * render. Suppressed together, gated on the "Hide title" setting: they're
	 * conceptually one unit (a theme's "Written by <author> in <category>"
	 * byline doesn't make sense on its own once the heading above it is gone).
	 *
	 * @var string[]
	 */
	private static $title_block_names = [
		'core/post-title',
		'core/post-author',
		'core/post-author-name',
		'core/post-author-biography',
		'core/avatar',
		'core/post-date',
		'core/post-terms',
		'core/post-excerpt',
	];

	/**
	 * Theme blocks that render the post's featured image, gated on the
	 * "Hide featured image" setting.
	 *
	 * @var string[]
	 */
	private static $featured_image_block_names = [
		'core/post-featured-image',
	];

	/**
	 * Block names that iterate their own items (other posts, comments, ...).
	 * A wrapper-suppression scan must not descend into these - a block like
	 * `core/avatar` or `core/post-title` found inside one belongs to that
	 * loop's items (a commenter, a related post, ...), not the theme's
	 * singular post header.
	 *
	 * @var string[]
	 */
	private static $loop_boundary_block_names = [
		'core/query',
		'core/post-template',
		'core/comments',
		'core/comment-template',
	];

	/**
	 * How many loop-boundary blocks (see above) are currently rendering,
	 * innermost included. A block rendering while this is > 0 belongs to a
	 * loop item (another post, a comment, ...), not the theme's singular
	 * post header, and must never be suppressed.
	 *
	 * Block context (WP_Block::$context) can't be used for this instead:
	 * it's filtered down to only the keys a block's own block.json declares
	 * via `usesContext`, and both core/post-template and core/comment-template
	 * render their loop items via `new WP_Block(...)->render()` calls that
	 * don't pass the parent's context down - a plain `core/group` wrapper
	 * inside the loop (neither declaring `usesContext` itself) would then
	 * read back an empty context and look like it's outside the loop. A
	 * render-time depth counter around the loop blocks themselves sidesteps
	 * that entirely.
	 *
	 * @var int
	 */
	private static $active_loop_depth = 0;

	/**
	 * Per-theme "no sidebar" layout adapters backing the template's "Full
	 * width (no sidebar)" setting. Each entry names the filter a theme
	 * already exposes for overriding its own sidebar-layout decision, and
	 * either the value that means "no sidebar" to that theme, or (when a
	 * theme's filter carries a whole settings array rather than a single
	 * value, e.g. Kadence) a `transform` callback that edits just the
	 * relevant part of it. Both are taken from the theme's own layout
	 * system - the same one its own page-builder integrations use, e.g.
	 * Astra's own Elementor compatibility code sets this exact filter/value
	 * - never guessed or forced via CSS. A theme with no entry here just
	 * leaves the setting inert.
	 *
	 * Exposed to other code via the `bpafb_sidebar_layout_adapters` filter
	 * (see register_sidebar_layout_adapter()) rather than being a closed
	 * list - a theme not covered here can add its own adapter without
	 * editing this plugin.
	 *
	 * @var array<string, array{filter: string, value?: string, transform?: string}>
	 */
	private static $default_sidebar_layout_adapters = [
		'astra' => [
			'filter' => 'astra_page_layout',
			'value'  => 'no-sidebar',
		],
		'generatepress' => [
			'filter' => 'generate_sidebar_layout',
			'value'  => 'no-sidebar',
		],
		'oceanwp' => [
			// Read before the theme's own sidebar meta ("prevents filters
			// from overriding meta" per the theme's own comment), so this
			// still wins even on a post with no explicit layout chosen.
			'filter' => 'ocean_post_layout_meta_value',
			'value'  => 'full-width',
		],
		'neve' => [
			'filter' => 'neve_sidebar_position',
			'value'  => 'full-width',
		],
		'blocksy' => [
			'filter' => 'blocksy:global:page_structure',
			'value'  => 'none',
		],
		'kadence' => [
			// Kadence's filter carries a settings array (keys like
			// 'sidebar' => 'enable'|'disable'), not a single scalar.
			'filter'    => 'kadence_post_layout',
			'transform' => 'disable_kadence_sidebar',
		],
	];

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		add_action('template_redirect', [$this, 'resolve_matched_template']);
		// Priority PHP_INT_MAX: page builders (Elementor, Divi, ...) hook
		// `the_content` themselves and substitute their own stored builder
		// output unconditionally, ignoring whatever earlier filters already
		// produced. Running last - after any of them, not just Elementor
		// specifically - means a matched template always has the final say,
		// the same way those builders themselves expect to.
		add_filter('the_content', [$this, 'filter_the_content'], PHP_INT_MAX);
		add_filter('the_title', [$this, 'suppress_duplicate_title'], 10, 2);
		add_filter('post_thumbnail_id', [$this, 'suppress_duplicate_featured_image_id'], 10, 2);
		add_filter('post_thumbnail_html', [$this, 'suppress_duplicate_featured_image'], 10, 2);
		add_filter('comments_template', [$this, 'suppress_duplicate_comments_template']);
		add_filter('pre_render_block', [$this, 'track_loop_boundary_enter'], 1, 2);
		add_filter('pre_render_block', [$this, 'suppress_duplicate_theme_blocks'], 10, 2);
		add_filter('render_block', [$this, 'track_loop_boundary_exit'], 999, 2);
		// No class_exists('WooCommerce') guard here: this plugin's own main
		// file constructs this class directly at load time rather than on
		// a hook, so whether the WooCommerce class already exists at that
		// exact moment depends on plugin load order and isn't reliable.
		// Registering unconditionally is safe regardless - `woocommerce_before_single_product`
		// is a WooCommerce-only action that simply never fires when WooCommerce isn't active.
		add_action('woocommerce_before_single_product', [$this, 'setup_woocommerce_template']);
		$this->register_sidebar_layout_adapter();
	}

	/**
	 * Hooks the active theme's own "no sidebar" filter, if one is known,
	 * so the "Full width (no sidebar)" template setting can ask the theme
	 * to drop its sidebar for this request the same way the theme's own
	 * page-builder integrations do.
	 *
	 * The adapter list is filterable (`bpafb_sidebar_layout_adapters`) so a
	 * theme or site builder can register support for a theme not covered by
	 * the built-in defaults, without editing this plugin's code.
	 */
	private function register_sidebar_layout_adapter()
	{
		$theme = get_template();

		/**
		 * Filters the per-theme "no sidebar" layout adapters backing the
		 * "Full width (no sidebar)" template setting.
		 *
		 * @param array<string, array{filter: string, value?: string, transform?: string}> $adapters
		 *     Map of theme template slug (get_template()) to an adapter
		 *     describing the theme's own layout-override filter: `filter`
		 *     (the filter name to hook), and either `value` (the value that
		 *     means "no sidebar" to that theme) or `transform` (a callable
		 *     receiving and returning the filtered value, for a theme whose
		 *     filter carries a whole settings array rather than one scalar).
		 */
		$adapters = apply_filters('bpafb_sidebar_layout_adapters', self::$default_sidebar_layout_adapters);

		if (!isset($adapters[$theme])) {
			return;
		}

		$adapter = $adapters[$theme];

		add_filter($adapter['filter'], function ($layout) use ($adapter) {
			if (!$this->matched_template_wants_full_width()) {
				return $layout;
			}

			if (!empty($adapter['transform'])) {
				$transform = $adapter['transform'];
				// A string naming one of this class's own transform methods
				// (e.g. the built-in Kadence adapter) resolves against $this;
				// an adapter added via the filter can supply any callable
				// (closure, function name, [object, method]) instead.
				if (is_string($transform) && method_exists($this, $transform)) {
					$transform = [$this, $transform];
				}
				if (is_callable($transform)) {
					return call_user_func($transform, $layout);
				}
			}

			return isset($adapter['value']) ? $adapter['value'] : $layout;
		});
	}

	/**
	 * Kadence's `kadence_post_layout` filter carries the theme's whole
	 * layout-settings array; only the 'sidebar' key needs changing to drop
	 * the sidebar, everything else the theme decided stays as-is.
	 *
	 * @param mixed $layout Value passed through the `kadence_post_layout` filter.
	 * @return mixed
	 */
	private function disable_kadence_sidebar($layout)
	{
		if (is_array($layout)) {
			$layout['sidebar'] = 'disable';
		}
		return $layout;
	}

	/**
	 * Whether the currently matched template has "Full width (no sidebar)"
	 * enabled for the current singular request.
	 *
	 * @return bool
	 */
	private function matched_template_wants_full_width()
	{
		if (is_admin() || !is_singular()) {
			return false;
		}

		$template_id = self::get_matched_template_id();
		if (!$template_id) {
			return false;
		}

		return (bool) get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_FULL_WIDTH, true);
	}

	/**
	 * The matched template ID, if the current request is rendering that
	 * matched singular post's own entry inside the main Loop - i.e. exactly
	 * where a theme prints its own title/featured-image for that post, as
	 * opposed to a document `<title>` tag, an RSS entry, an admin list, or
	 * some other post being shown in a "more posts"/related/comments loop
	 * elsewhere on the page. Returns 0 when none of that holds.
	 *
	 * Also returns 0 while the matched template's own content is what's
	 * currently rendering (self::$is_rendering): a Template Block within it
	 * - e.g. a Post/Product/Event Title block, or a Featured Image block -
	 * legitimately calls get_the_title()/get_the_post_thumbnail() for the
	 * very same post to render itself, and those go through this exact same
	 * the_title/post_thumbnail_html/post_thumbnail_id filter chain. Without
	 * this check, a template with "Hide title" or "Hide featured image" on
	 * (the default) would blank out its own Title/Featured Image Template
	 * Block the moment it tried to use one - suppressing the theme's
	 * duplicate must never suppress the template's own intentional one.
	 *
	 * @param int $post_id Post ID passed by the filter being checked.
	 * @return int
	 */
	private function matched_template_id_for_post_in_loop($post_id)
	{
		if (self::$is_rendering) {
			return 0;
		}

		if (is_admin() || is_feed() || !is_singular() || !in_the_loop() || !is_main_query()) {
			return 0;
		}

		if ((int) $post_id !== (int) get_queried_object_id()) {
			return 0;
		}

		return self::get_matched_template_id();
	}

	/**
	 * Blanks out the theme's own title output for the matched singular post,
	 * via the same `the_title` filter both classic themes (`the_title()`)
	 * and block themes (the core/post-title block, through `get_the_title()`)
	 * already route through - so the theme's real heading markup/CSS is
	 * simply never given text to show, rather than being replaced. Gated on
	 * the template's own "Hide title" setting (on by default, to match this
	 * plugin's behavior before that setting existed).
	 *
	 * @param string $title   Post title.
	 * @param int    $post_id Post ID.
	 * @return string
	 */
	public function suppress_duplicate_title($title, $post_id)
	{
		$template_id = $this->matched_template_id_for_post_in_loop($post_id);
		if (!$template_id) {
			return $title;
		}

		$hide = get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_HIDE_TITLE, true);
		return $hide ? '' : $title;
	}

	/**
	 * Blanks out the theme's own featured-image output for the matched
	 * singular post, via the same `post_thumbnail_html` filter both classic
	 * themes (`the_post_thumbnail()`) and block themes (the
	 * core/post-featured-image block, through `get_the_post_thumbnail()`)
	 * already route through. Gated on the template's own "Hide featured
	 * image" setting (on by default, to match this plugin's behavior before
	 * that setting existed).
	 *
	 * @param string $html    Featured image HTML.
	 * @param int    $post_id Post ID.
	 * @return string
	 */
	public function suppress_duplicate_featured_image($html, $post_id)
	{
		$template_id = $this->matched_template_id_for_post_in_loop($post_id);
		if (!$template_id) {
			return $html;
		}

		$hide = get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_HIDE_FEATURED, true);
		return $hide ? '' : $html;
	}

	/**
	 * Blanks out the matched singular post's thumbnail ID itself (not just the
	 * rendered `<img>` markup) so `has_post_thumbnail()` reports false too.
	 * Some themes (e.g. Kadence) gate their own featured-image wrapper markup
	 * - including a CSS aspect-ratio box that reserves visual space - on
	 * `has_post_thumbnail()` rather than on whether `the_post_thumbnail()`
	 * actually produced any HTML, so suppressing only `post_thumbnail_html`
	 * leaves a blank reserved area behind on those themes.
	 *
	 * @param int|false $thumbnail_id Post thumbnail attachment ID.
	 * @param WP_Post   $post         Post object.
	 * @return int|false
	 */
	public function suppress_duplicate_featured_image_id($thumbnail_id, $post)
	{
		$template_id = $this->matched_template_id_for_post_in_loop($post->ID);
		if (!$template_id) {
			return $thumbnail_id;
		}

		$hide = get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_HIDE_FEATURED, true);
		return $hide ? 0 : $thumbnail_id;
	}

	/**
	 * Points `comments_template()` at an intentionally empty file for the
	 * matched singular post when the template's "Hide comments" setting is
	 * on, so classic themes render nothing for the comments area (default
	 * off, since suppressing comments is a new capability rather than
	 * something this plugin already did).
	 *
	 * @param string $template Path to the theme's own comments template file.
	 * @return string
	 */
	public function suppress_duplicate_comments_template($template)
	{
		if (is_admin() || !is_singular() || !is_main_query()) {
			return $template;
		}

		$template_id = self::get_matched_template_id();
		if (!$template_id) {
			return $template;
		}

		if (!get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_HIDE_COMMENTS, true)) {
			return $template;
		}

		$blank = BPAFB_PATH . 'includes/templates/blank-comments.php';
		return file_exists($blank) ? $blank : $template;
	}

	/**
	 * Increments the loop-boundary depth counter just before a loop
	 * container (Query Loop, Comment Template, ...) starts rendering its
	 * items. Paired with track_loop_boundary_exit().
	 *
	 * @param string|null $pre_render   Left untouched.
	 * @param array       $parsed_block The block about to render.
	 * @return string|null
	 */
	public function track_loop_boundary_enter($pre_render, $parsed_block)
	{
		$block_name = isset($parsed_block['blockName']) ? $parsed_block['blockName'] : '';
		if (in_array($block_name, self::$loop_boundary_block_names, true)) {
			self::$active_loop_depth++;
		}
		return $pre_render;
	}

	/**
	 * Decrements the loop-boundary depth counter once a loop container has
	 * finished rendering all of its items. Paired with track_loop_boundary_enter().
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $parsed_block  The block that finished rendering.
	 * @return string
	 */
	public function track_loop_boundary_exit($block_content, $parsed_block)
	{
		$block_name = isset($parsed_block['blockName']) ? $parsed_block['blockName'] : '';
		if (in_array($block_name, self::$loop_boundary_block_names, true)) {
			self::$active_loop_depth = max(0, self::$active_loop_depth - 1);
		}
		return $block_content;
	}

	/**
	 * Suppresses the theme's own singular post-header blocks (title,
	 * featured image, byline, date, terms) and/or its Comments block when a
	 * Blockive Template has matched the current request and the
	 * corresponding "Hide ..." template setting is on, so they don't render
	 * a second time alongside the template's own content. Blocks inside a
	 * Query Loop or Comment Template (e.g. "related posts", "more posts",
	 * the comment list) are left untouched since those belong to other
	 * posts/comments, not the theme's singular header.
	 *
	 * A block that only *wraps* a suppressed one (e.g. a theme's "Written by
	 * <author> in <category>" pattern, built from a paragraph plus a
	 * post-author-name and post-terms block) is suppressed as a whole
	 * rather than leaving its static filler text behind with nothing to
	 * fill it - as long as that wrapper doesn't also contain the real
	 * post-content block.
	 *
	 * @param string|null $pre_render   Short-circuit value; non-null skips this block entirely.
	 * @param array       $parsed_block The block about to render.
	 * @return string|null
	 */
	public function suppress_duplicate_theme_blocks($pre_render, $parsed_block)
	{
		if ($pre_render !== null) {
			return $pre_render;
		}

		$block_name = isset($parsed_block['blockName']) ? $parsed_block['blockName'] : '';
		if (empty($block_name)) {
			return $pre_render;
		}

		if (is_admin() || !is_singular() || !is_main_query()) {
			return $pre_render;
		}

		$template_id = self::get_matched_template_id();
		if (!$template_id) {
			return $pre_render;
		}

		if (self::$active_loop_depth > 0) {
			return $pre_render;
		}

		if ('core/comments' === $block_name) {
			$hide_comments = get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_HIDE_COMMENTS, true);
			return $hide_comments ? '' : $pre_render;
		}

		$suppressed_names = [];
		if (get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_HIDE_TITLE, true)) {
			$suppressed_names = array_merge($suppressed_names, self::$title_block_names);
		}
		if (get_post_meta($template_id, Bpafb_Template_Display_Conditions::META_HIDE_FEATURED, true)) {
			$suppressed_names = array_merge($suppressed_names, self::$featured_image_block_names);
		}

		if (empty($suppressed_names)) {
			return $pre_render;
		}

		if (in_array($block_name, $suppressed_names, true)) {
			return '';
		}

		if (in_array($block_name, self::$loop_boundary_block_names, true)) {
			// This block's own innerBlocks are loop items (other posts,
			// comments, ...) - never wrapper-suppress a loop itself.
			return $pre_render;
		}

		if ('core/pattern' === $block_name && !empty($parsed_block['attrs']['slug'])) {
			$slug = $parsed_block['attrs']['slug'];
			if (
				$this->pattern_contains_block($slug, $suppressed_names)
				&& !$this->pattern_contains_block($slug, ['core/post-content'])
			) {
				return '';
			}
			return $pre_render;
		}

		if (
			!empty($parsed_block['innerBlocks'])
			&& $this->subtree_contains_block($parsed_block['innerBlocks'], $suppressed_names)
			&& !$this->subtree_contains_block($parsed_block['innerBlocks'], ['core/post-content'])
		) {
			return '';
		}

		return $pre_render;
	}

	/**
	 * Whether a parsed block tree contains any block whose name is in $names,
	 * recursing into inner blocks and resolving `core/pattern` references.
	 *
	 * @param array    $blocks Parsed blocks (as from parse_blocks()).
	 * @param string[] $names  Block names to look for.
	 * @return bool
	 */
	private function subtree_contains_block($blocks, array $names)
	{
		foreach ($blocks as $block) {
			$name = isset($block['blockName']) ? $block['blockName'] : '';
			if ('' === $name) {
				continue;
			}
			if (in_array($name, $names, true)) {
				return true;
			}
			if (in_array($name, self::$loop_boundary_block_names, true)) {
				// Its contents belong to whatever this block iterates over
				// (other posts, comments, ...), not the current singular post.
				continue;
			}
			if ('core/pattern' === $name && !empty($block['attrs']['slug'])) {
				if ($this->pattern_contains_block($block['attrs']['slug'], $names)) {
					return true;
				}
				continue;
			}
			if (!empty($block['innerBlocks']) && $this->subtree_contains_block($block['innerBlocks'], $names)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Whether a registered pattern's content contains any block in $names.
	 *
	 * @param string   $slug  Pattern slug.
	 * @param string[] $names Block names to look for.
	 * @return bool
	 */
	private function pattern_contains_block($slug, array $names)
	{
		if (!class_exists('WP_Block_Patterns_Registry')) {
			return false;
		}
		$registry = WP_Block_Patterns_Registry::get_instance();
		if (!$registry->is_registered($slug)) {
			return false;
		}
		$pattern = $registry->get_registered($slug);
		if (empty($pattern['content'])) {
			return false;
		}
		return $this->subtree_contains_block(parse_blocks($pattern['content']), $names);
	}

	/**
	 * Resolves whether the current singular request matches a Blockive
	 * Template. Also resets the loop-boundary depth counter for the new
	 * request: it's static, request-scoped state that self-heals here on
	 * every top-level page load rather than relying on every enter/exit
	 * pair it's ever incremented by staying perfectly balanced (e.g. across
	 * an uncaught error partway through some other block's render).
	 */
	public function resolve_matched_template()
	{
		self::$active_loop_depth = 0;

		if (is_admin() || !is_singular()) {
			return;
		}

		self::resolve_template_for_current_request();
	}

	/**
	 * Resolves and memoizes the matched template ID for the current request,
	 * including the "no template matched" outcome - so a singular request
	 * with no matching template (the common case, since templates are
	 * opt-in) doesn't re-run Bpafb_Template_Display_Conditions::get_matching_template_id()'s
	 * get_posts() query from scratch on every single call to
	 * get_matched_template_id(), which happens once per block on the page
	 * via pre_render_block.
	 */
	private static function resolve_template_for_current_request()
	{
		if (self::$has_resolved_template) {
			return;
		}
		self::$has_resolved_template = true;

		$queried_id   = get_queried_object_id();
		$queried_type = get_post_type($queried_id);

		if (!$queried_id || !$queried_type || $queried_type === Bpafb_Template_Post_Type::POST_TYPE) {
			return;
		}

		if (wp_count_posts(Bpafb_Template_Post_Type::POST_TYPE)->publish < 1) {
			return;
		}

		self::$matched_template_id = Bpafb_Template_Display_Conditions::get_matching_template_id($queried_type, $queried_id);
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
		if (!self::$has_resolved_template && !is_admin() && is_singular()) {
			self::resolve_template_for_current_request();
		}
		return self::$matched_template_id;
	}
}
