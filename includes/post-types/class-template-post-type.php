<?php
/**
 * Template Post Type Registration.
 *
 * Registers the `blockive_template` custom post type and its
 * associated meta fields used by the Theme Builder.
 *
 * @package Blockive\ThemeBuilder\Post_Types
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Post_Types;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Template_Post_Type
 */
class Template_Post_Type {

	/**
	 * Valid template type slugs.
	 *
	 * @var string[]
	 */
	private const VALID_TYPES = [
		'header',
		'footer',
		'single',
		'archive',
		'404',
		'search',
	];

	/**
	 * Constructor — hooks into WordPress init.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_action( 'init', [ $this, 'register_meta' ] );
		add_action( 'wp_insert_post', [ $this, 'assign_template_type_on_creation' ], 10, 3 );
	}

	/**
	 * Automatically assign template type meta when an auto-draft
	 * is created via post-new.php?template_type=…
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post    Post object.
	 * @param bool     $update  Whether this is an update.
	 * @return void
	 */
	public function assign_template_type_on_creation( int $post_id, \WP_Post $post, bool $update ): void {
		if ( $update ) {
			return;
		}

		if ( BLOCKIVE_TEMPLATE_POST_TYPE !== $post->post_type ) {
			return;
		}

		if ( 'auto-draft' !== $post->post_status ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( empty( $_GET['template_type'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$type = sanitize_text_field( wp_unslash( $_GET['template_type'] ) );

		if ( ! in_array( $type, self::VALID_TYPES, true ) ) {
			return;
		}

		update_post_meta( $post_id, BLOCKIVE_TEMPLATE_META_TYPE, $type );
	}

	/**
	 * Register the blockive_template post type.
	 *
	 * @return void
	 */
	public function register_post_type(): void {
		$labels = [
			'name'                  => _x( 'Templates', 'Post type general name', 'blockive-premium-addon-for-block' ),
			'singular_name'         => _x( 'Template', 'Post type singular name', 'blockive-premium-addon-for-block' ),
			'menu_name'             => __( 'Templates', 'blockive-premium-addon-for-block' ),
			'add_new'               => __( 'Add New Template', 'blockive-premium-addon-for-block' ),
			'add_new_item'          => __( 'Add New Template', 'blockive-premium-addon-for-block' ),
			'edit_item'             => __( 'Edit Template', 'blockive-premium-addon-for-block' ),
			'new_item'              => __( 'New Template', 'blockive-premium-addon-for-block' ),
			'view_item'             => __( 'View Template', 'blockive-premium-addon-for-block' ),
			'search_items'          => __( 'Search Templates', 'blockive-premium-addon-for-block' ),
			'not_found'             => __( 'No templates found.', 'blockive-premium-addon-for-block' ),
			'not_found_in_trash'    => __( 'No templates found in Trash.', 'blockive-premium-addon-for-block' ),
			'all_items'             => __( 'All Templates', 'blockive-premium-addon-for-block' ),
			'filter_items_list'     => __( 'Filter templates list', 'blockive-premium-addon-for-block' ),
			'items_list_navigation' => __( 'Templates list navigation', 'blockive-premium-addon-for-block' ),
			'items_list'            => __( 'Templates list', 'blockive-premium-addon-for-block' ),
		];

		$args = [
			'labels'              => $labels,
			'description'         => __( 'Blockive Theme Builder templates.', 'blockive-premium-addon-for-block' ),
			'public'              => false,
			'publicly_queryable'  => false,
			'show_ui'             => true,
			'show_in_menu'        => false, // We manage the menu ourselves.
			'show_in_rest'        => true,
			'rest_base'           => 'blockive-templates',
			'rest_namespace'      => 'blockive/v1',
			'capability_type'     => 'post',
			'map_meta_cap'        => true,
			'has_archive'         => false,
			'hierarchical'        => false,
			'supports'            => [ 'title', 'editor', 'revisions' ],
			'exclude_from_search' => true,
			'rewrite'             => false,
		];

		register_post_type( BLOCKIVE_TEMPLATE_POST_TYPE, $args );
	}

	/**
	 * Register post meta fields for templates.
	 *
	 * @return void
	 */
	public function register_meta(): void {
		register_post_meta(
			BLOCKIVE_TEMPLATE_POST_TYPE,
			BLOCKIVE_TEMPLATE_META_TYPE,
			[
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'default'           => '',
			]
		);

		register_post_meta(
			BLOCKIVE_TEMPLATE_POST_TYPE,
			BLOCKIVE_TEMPLATE_META_CONDITIONS,
			[
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'default'           => '',
			]
		);

		register_post_meta(
			BLOCKIVE_TEMPLATE_POST_TYPE,
			BLOCKIVE_TEMPLATE_META_PRIORITY,
			[
				'type'              => 'integer',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'absint',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'default'           => 10,
			]
		);
	}
}
