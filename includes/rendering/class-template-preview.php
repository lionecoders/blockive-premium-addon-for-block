<?php
/**
 * Template Preview.
 *
 * Handles the ?blockive-preview=<ID> URL parameter.
 * Intercepts at template_redirect, validates user capability,
 * and renders the template in a clean preview canvas with
 * a top admin bar.
 *
 * @package Blockive\ThemeBuilder\Rendering
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Rendering;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Template_Preview
 */
class Template_Preview {

	/**
	 * Query parameter name.
	 */
	public const QUERY_VAR = 'blockive-preview';

	/**
	 * Nonce action prefix.
	 */
	private const NONCE_ACTION = 'blockive_preview_';

	/**
	 * Constructor.
	 */
	public function __construct() {
		if ( is_admin() ) {
			$this->register_admin_hooks();
			return;
		}

		add_action( 'template_redirect', [ $this, 'handle_preview_request' ], 5 );
	}

	/* ──────────────────────────────────────────────
	 * Frontend: Preview Handler
	 * ────────────────────────────────────────────── */

	/**
	 * Intercept preview requests at template_redirect.
	 *
	 * URL format: ?blockive-preview=123&_wpnonce=abc123
	 *
	 * @return void
	 */
	public function handle_preview_request(): void {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( empty( $_GET[ self::QUERY_VAR ] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$template_id = absint( $_GET[ self::QUERY_VAR ] );

		if ( ! $template_id ) {
			return;
		}

		// Verify nonce.
		$nonce = isset( $_GET['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ) : '';

		if ( ! wp_verify_nonce( $nonce, self::NONCE_ACTION . $template_id ) ) {
			wp_die(
				esc_html__( 'Invalid or expired preview link.', 'blockive-premium-addon-for-block' ),
				esc_html__( 'Preview Error', 'blockive-premium-addon-for-block' ),
				[ 'response' => 403 ]
			);
		}

		// Capability check.
		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_die(
				esc_html__( 'You do not have permission to preview templates.', 'blockive-premium-addon-for-block' ),
				esc_html__( 'Preview Error', 'blockive-premium-addon-for-block' ),
				[ 'response' => 403 ]
			);
		}

		// Validate the template exists and is the correct post type.
		$template = get_post( $template_id );

		if ( ! $template || BLOCKIVE_TEMPLATE_POST_TYPE !== $template->post_type ) {
			wp_die(
				esc_html__( 'Template not found.', 'blockive-premium-addon-for-block' ),
				esc_html__( 'Preview Error', 'blockive-premium-addon-for-block' ),
				[ 'response' => 404 ]
			);
		}

		// Prevent search engines from indexing preview pages.
		header( 'X-Robots-Tag: noindex, nofollow', true );

		// Render the preview.
		$this->render_preview( $template );

		exit; // Stop WordPress from continuing to the theme template.
	}

	/**
	 * Render the preview page.
	 *
	 * @param \WP_Post $template Template post object.
	 * @return void
	 */
	private function render_preview( \WP_Post $template ): void {
		$preview_file = BPAFB_PATH . 'includes/rendering/templates/preview.php';

		if ( ! file_exists( $preview_file ) ) {
			wp_die(
				esc_html__( 'Preview template file not found.', 'blockive-premium-addon-for-block' ),
				'',
				[ 'response' => 500 ]
			);
		}

		// Make data available to the template.
		$GLOBALS['blockive_preview_template'] = $template;

		include $preview_file;
	}

	/* ──────────────────────────────────────────────
	 * Admin: Row Actions + Preview Links
	 * ────────────────────────────────────────────── */

	/**
	 * Register admin-side hooks for preview links.
	 *
	 * @return void
	 */
	private function register_admin_hooks(): void {
		add_filter(
			'post_row_actions',
			[ $this, 'add_preview_row_action' ],
			10,
			2
		);
	}

	/**
	 * Add a "Preview" link to the CPT list table row actions.
	 *
	 * @param array    $actions Existing row actions.
	 * @param \WP_Post $post    Current post object.
	 * @return array Modified actions.
	 */
	public function add_preview_row_action( array $actions, \WP_Post $post ): array {
		if ( BLOCKIVE_TEMPLATE_POST_TYPE !== $post->post_type ) {
			return $actions;
		}

		if ( ! current_user_can( 'edit_post', $post->ID ) ) {
			return $actions;
		}

		$preview_url = self::get_preview_url( $post->ID );

		$actions['blockive_preview'] = sprintf(
			'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
			esc_url( $preview_url ),
			esc_html__( 'Preview', 'blockive-premium-addon-for-block' )
		);

		return $actions;
	}

	/* ──────────────────────────────────────────────
	 * Static Helpers
	 * ────────────────────────────────────────────── */

	/**
	 * Generate a secure preview URL for a template.
	 *
	 * @param int $template_id Template post ID.
	 * @return string Full preview URL with nonce.
	 */
	public static function get_preview_url( int $template_id ): string {
		return wp_nonce_url(
			add_query_arg( self::QUERY_VAR, $template_id, home_url( '/' ) ),
			self::NONCE_ACTION . $template_id
		);
	}
}
