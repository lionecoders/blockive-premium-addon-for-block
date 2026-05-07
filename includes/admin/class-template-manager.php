<?php
/**
 * Template Manager.
 *
 * Skeleton class responsible for template CRUD operations,
 * querying, and template-type resolution.
 *
 * @package Blockive\ThemeBuilder\Admin
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Template_Manager
 */
class Template_Manager {

	/**
	 * Supported template types.
	 *
	 * @var array<string, string>
	 */
	private const TEMPLATE_TYPES = [
		'header'       => 'Header',
		'footer'       => 'Footer',
		'single'       => 'Single',
		'archive'      => 'Archive',
		'search'       => 'Search Results',
		'404'          => '404 Page',
		'page'         => 'Page',
	];

	/**
	 * Constructor.
	 */
	public function __construct() {
		/**
		 * Fires when template types are being registered.
		 *
		 * Use this hook to register custom template types via
		 * the blockive/template_types filter.
		 *
		 * @since 1.1.0
		 *
		 * @param Template_Manager $this The Template_Manager instance.
		 */
		do_action( 'blockive/register_template_types', $this );
	}

	/**
	 * Get all registered template types.
	 *
	 * @return array<string, string> Associative array of slug => label.
	 */
	public function get_template_types(): array {
		/**
		 * Filters the available template types.
		 *
		 * Addons can add custom types (e.g., 'mega_menu', 'popup') here.
		 *
		 * @since 1.1.0
		 *
		 * @param array<string, string> $types Default template types (slug => label).
		 */
		return apply_filters( 'blockive/template_types', self::TEMPLATE_TYPES );
	}

	/**
	 * Get all templates, optionally filtered by type.
	 *
	 * @param string $type Optional. Template type slug to filter by.
	 * @return \WP_Post[] Array of template posts.
	 */
	public function get_templates( string $type = '' ): array {
		$args = [
			'post_type'      => BLOCKIVE_TEMPLATE_POST_TYPE,
			'posts_per_page' => -1,
			'post_status'    => 'any',
			'orderby'        => 'title',
			'order'          => 'ASC',
		];

		if ( '' !== $type ) {
			$args['meta_query'] = [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				[
					'key'   => BLOCKIVE_TEMPLATE_META_TYPE,
					'value' => sanitize_text_field( $type ),
				],
			];
		}

		$query = new \WP_Query( $args );

		return $query->posts;
	}

	/**
	 * Get a single template by ID.
	 *
	 * @param int $template_id Template post ID.
	 * @return \WP_Post|null Post object or null.
	 */
	public function get_template( int $template_id ): ?\WP_Post {
		$post = get_post( $template_id );

		if ( ! $post || BLOCKIVE_TEMPLATE_POST_TYPE !== $post->post_type ) {
			return null;
		}

		return $post;
	}

	/**
	 * Create a new template.
	 *
	 * @param array $data {
	 *     Template data.
	 *
	 *     @type string $title      Template title.
	 *     @type string $type       Template type slug.
	 *     @type string $content    Optional. Block content.
	 *     @type string $status     Optional. Post status. Default 'draft'.
	 * }
	 * @return int|\WP_Error Post ID on success, WP_Error on failure.
	 */
	public function create_template( array $data ) {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return new \WP_Error(
				'blockive_forbidden',
				__( 'You do not have permission to create templates.', 'blockive-premium-addon-for-block' ),
				[ 'status' => 403 ]
			);
		}

		$post_data = [
			'post_type'    => BLOCKIVE_TEMPLATE_POST_TYPE,
			'post_title'   => sanitize_text_field( $data['title'] ?? '' ),
			'post_content' => wp_kses_post( $data['content'] ?? '' ),
			'post_status'  => sanitize_text_field( $data['status'] ?? 'draft' ),
		];

		$post_id = wp_insert_post( $post_data, true );

		if ( ! is_wp_error( $post_id ) && ! empty( $data['type'] ) ) {
			update_post_meta( $post_id, BLOCKIVE_TEMPLATE_META_TYPE, sanitize_text_field( $data['type'] ) );
		}

		return $post_id;
	}

	/**
	 * Delete a template.
	 *
	 * @param int  $template_id Template post ID.
	 * @param bool $force_delete Optional. Whether to bypass Trash. Default false.
	 * @return \WP_Post|false|null Post data on success, false or null on failure.
	 */
	public function delete_template( int $template_id, bool $force_delete = false ) {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return false;
		}

		$post = $this->get_template( $template_id );

		if ( ! $post ) {
			return false;
		}

		return wp_delete_post( $template_id, $force_delete );
	}
}
