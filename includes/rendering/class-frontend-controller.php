<?php
/**
 * Frontend Controller.
 *
 * Orchestrates frontend template rendering. Hooks into WordPress
 * template hierarchy to inject header/footer templates and override
 * full-page templates (single, archive, 404, search).
 *
 * IMPORTANT: This is a PLUGIN — it works WITH existing themes,
 * not as a replacement. Header/footer are injected into the theme.
 * Full-page templates only override when a matching blockive_template exists.
 *
 * @package Blockive\ThemeBuilder\Rendering
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Rendering;

use Blockive\ThemeBuilder\Conditions\Condition_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Frontend_Controller
 */
class Frontend_Controller {

	/**
	 * Template Resolver instance.
	 *
	 * @var Template_Resolver
	 */
	private $resolver;

	/**
	 * Template Renderer instance.
	 *
	 * @var Template_Renderer
	 */
	private $renderer;

	/**
	 * Whether header has been replaced on this request.
	 *
	 * @var bool
	 */
	private $header_replaced = false;

	/**
	 * Whether footer has been replaced on this request.
	 *
	 * @var bool
	 */
	private $footer_replaced = false;

	/**
	 * Constructor.
	 *
	 * @param Condition_Manager $condition_manager Condition manager instance.
	 */
	public function __construct( Condition_Manager $condition_manager ) {
		$this->resolver = new Template_Resolver( $condition_manager );
		$this->renderer = new Template_Renderer();

		// Only run on frontend.
		if ( is_admin() ) {
			return;
		}

		$this->register_hooks();
	}

	/**
	 * Register all frontend hooks.
	 *
	 * @return void
	 */
	private function register_hooks(): void {
		// Full-page template override (single, archive, 404, search).
		add_filter( 'template_include', [ $this, 'maybe_override_template' ], 999 );

		// Header injection — runs early in wp_head.
		add_action( 'wp_body_open', [ $this, 'render_header_template' ], 1 );
		// Fallback for themes that don't call wp_body_open.
		add_action( 'wp_head', [ $this, 'schedule_header_fallback' ], 999 );

		// Footer injection — runs late in wp_footer.
		add_action( 'wp_footer', [ $this, 'render_footer_template' ], 1 );

		// Enqueue frontend styles when templates are active.
		add_action( 'wp_enqueue_scripts', [ $this, 'maybe_enqueue_styles' ] );
	}

	/* ──────────────────────────────────────────────
	 * Full-Page Template Override
	 * ────────────────────────────────────────────── */

	/**
	 * Override WordPress template if a matching blockive template exists.
	 *
	 * Handles: single, archive, 404, search template types.
	 * Uses template_include filter (priority 999) to act as the last filter.
	 *
	 * @param string $template Path to the theme template file.
	 * @return string Modified template path or original.
	 */
	public function maybe_override_template( string $template ): string {
		// Determine which template type to look for.
		$type = $this->get_current_page_type();

		/**
		 * Filters the detected page type for template resolution.
		 *
		 * Allows addons to override which template type is resolved
		 * for the current request (e.g., map a custom CPT to 'single').
		 *
		 * @since 1.1.0
		 *
		 * @param string $type The detected template type slug.
		 */
		$type = apply_filters( 'blockive/current_template', $type );

		if ( empty( $type ) ) {
			return $template;
		}

		// Skip header/footer — they are injected, not overridden.
		if ( in_array( $type, [ 'header', 'footer' ], true ) ) {
			return $template;
		}

		$blockive_template = $this->resolver->resolve( $type );

		if ( ! $blockive_template ) {
			return $template;
		}

		/**
		 * Fires before a full-page template is rendered.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post $blockive_template The winning template post.
		 * @param string   $type              Template type slug.
		 */
		do_action( 'blockive/before_render', $blockive_template, $type );

		// Use our custom canvas template.
		$canvas = BPAFB_PATH . 'includes/rendering/templates/canvas.php';

		if ( file_exists( $canvas ) ) {
			// Store the template post for use in the canvas.
			$GLOBALS['blockive_current_template'] = $blockive_template;

			return $canvas;
		}

		return $template;
	}

	/**
	 * Determine the current page's template type.
	 *
	 * @return string Template type slug or empty string.
	 */
	private function get_current_page_type(): string {
		if ( is_404() ) {
			return '404';
		}

		if ( is_search() ) {
			return 'search';
		}

		if ( is_singular() ) {
			return 'single';
		}

		if ( is_archive() || is_home() ) {
			return 'archive';
		}

		return '';
	}

	/* ──────────────────────────────────────────────
	 * Header / Footer Injection
	 * ────────────────────────────────────────────── */

	/**
	 * Render header template at wp_body_open.
	 *
	 * Injects the header template content right after <body>.
	 *
	 * @return void
	 */
	public function render_header_template(): void {
		if ( $this->header_replaced ) {
			return;
		}

		$header = $this->resolver->resolve( 'header' );

		if ( ! $header ) {
			return;
		}

		$this->header_replaced = true;

		/**
		 * Fires before the header template is rendered.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post $header The header template post.
		 */
		do_action( 'blockive/before_header', $header );

		echo '<div class="blockive-tb-header-template" data-template-id="' . esc_attr( $header->ID ) . '">';
		$this->renderer->render( $header );
		echo '</div>';

		/**
		 * Fires after the header template is rendered.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post $header The header template post.
		 */
		do_action( 'blockive/after_header', $header );
	}

	/**
	 * Schedule header fallback for themes without wp_body_open.
	 *
	 * Outputs a script that moves the header content from wp_head
	 * output into the body. This is a last-resort fallback.
	 *
	 * @return void
	 */
	public function schedule_header_fallback(): void {
		if ( $this->header_replaced ) {
			return;
		}

		$header = $this->resolver->resolve( 'header' );

		if ( ! $header ) {
			return;
		}

		// Mark as replaced so wp_body_open won't double-render.
		$this->header_replaced = true;

		// Output hidden container in head, then move it with JS.
		$content = $this->renderer->render( $header, false );
		$id      = 'blockive-header-fallback-' . $header->ID;

		echo '<script>document.addEventListener("DOMContentLoaded",function(){';
		echo 'var h=document.getElementById("' . esc_js( $id ) . '");';
		echo 'if(h&&document.body.firstChild){document.body.insertBefore(h,document.body.firstChild);h.style.display="";}';
		echo '});</script>';
		echo '<div id="' . esc_attr( $id ) . '" class="blockive-tb-header-template" data-template-id="' . esc_attr( $header->ID ) . '" style="display:none">';
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $content;
		echo '</div>';
	}

	/**
	 * Render footer template in wp_footer.
	 *
	 * @return void
	 */
	public function render_footer_template(): void {
		if ( $this->footer_replaced ) {
			return;
		}

		$footer = $this->resolver->resolve( 'footer' );

		if ( ! $footer ) {
			return;
		}

		$this->footer_replaced = true;

		/**
		 * Fires before the footer template is rendered.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post $footer The footer template post.
		 */
		do_action( 'blockive/before_footer', $footer );

		echo '<div class="blockive-tb-footer-template" data-template-id="' . esc_attr( $footer->ID ) . '">';
		$this->renderer->render( $footer );
		echo '</div>';

		/**
		 * Fires after the footer template is rendered.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post $footer The footer template post.
		 */
		do_action( 'blockive/after_footer', $footer );
	}

	/* ──────────────────────────────────────────────
	 * Frontend Assets
	 * ────────────────────────────────────────────── */

	/**
	 * Enqueue minimal frontend styles when templates are active.
	 *
	 * @return void
	 */
	public function maybe_enqueue_styles(): void {
		$has_any = $this->resolver->has_template( 'header' )
			|| $this->resolver->has_template( 'footer' )
			|| $this->resolver->has_template( $this->get_current_page_type() );

		if ( ! $has_any ) {
			return;
		}

		$css_file = BPAFB_PATH . 'includes/rendering/css/frontend.css';
		if ( file_exists( $css_file ) ) {
			wp_enqueue_style(
				'blockive-tb-frontend',
				BPAFB_URL . 'includes/rendering/css/frontend.css',
				[],
				BPAFB_VERSION
			);
		}
	}

	/* ──────────────────────────────────────────────
	 * Accessors
	 * ────────────────────────────────────────────── */

	/**
	 * Get the Template_Resolver instance.
	 *
	 * @return Template_Resolver
	 */
	public function get_resolver(): Template_Resolver {
		return $this->resolver;
	}

	/**
	 * Get the Template_Renderer instance.
	 *
	 * @return Template_Renderer
	 */
	public function get_renderer(): Template_Renderer {
		return $this->renderer;
	}
}
