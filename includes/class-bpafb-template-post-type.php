<?php
/**
 * Registers the Blockive Template custom post type.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the `blockive_template` CPT used by the Template Builder.
 */
class Bpafb_Template_Post_Type
{
	const POST_TYPE = 'blockive_template';

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		add_action('init', [$this, 'register_post_type']);
		add_action('init', [$this, 'register_meta']);
		add_filter('manage_' . self::POST_TYPE . '_posts_columns', [$this, 'add_admin_columns']);
		add_action('manage_' . self::POST_TYPE . '_posts_custom_column', [$this, 'render_admin_column'], 10, 2);
	}

	/**
	 * Inserts "Template Type" and "Display Condition" columns into the
	 * Blockive Templates list table, between Title and Date.
	 *
	 * @param array $columns Existing column list.
	 * @return array Modified column list.
	 */
	public function add_admin_columns($columns)
	{
		$date = $columns['date'] ?? null;
		unset($columns['date']);

		$columns['bpafb_template_type']     = __('Template Type', 'blockive-premium-addon-for-block');
		$columns['bpafb_display_condition'] = __('Display Condition', 'blockive-premium-addon-for-block');

		if (null !== $date) {
			$columns['date'] = $date;
		}

		return $columns;
	}

	/**
	 * Renders the "Template Type" and "Display Condition" column content.
	 *
	 * @param string $column  Column key.
	 * @param int    $post_id Post ID.
	 */
	public function render_admin_column($column, $post_id)
	{
		if ('bpafb_template_type' !== $column && 'bpafb_display_condition' !== $column) {
			return;
		}

		$post_type_slug = get_post_meta($post_id, '_bpafb_template_type', true) ?: 'post';
		$post_type_obj  = get_post_type_object($post_type_slug);

		if ('bpafb_template_type' === $column) {
			echo esc_html($post_type_obj ? $post_type_obj->labels->singular_name : $post_type_slug);
			return;
		}

		$post_type_name = $post_type_obj ? $post_type_obj->labels->name : $post_type_slug;
		$scope          = get_post_meta($post_id, Bpafb_Template_Display_Conditions::META_SCOPE, true);

		if ('all' === $scope) {
			echo esc_html(
				sprintf(
					/* translators: %s: post type name, e.g. "Posts". */
					__('All %s', 'blockive-premium-addon-for-block'),
					$post_type_name
				)
			);
		} else {
			echo esc_html(
				sprintf(
					/* translators: %s: post type name, e.g. "Posts". */
					__('Specific %s (Pro)', 'blockive-premium-addon-for-block'),
					$post_type_name
				)
			);
		}
	}

	/**
	 * Registers the post type.
	 */
	public function register_post_type()
	{
		register_post_type(self::POST_TYPE, [
			'labels' => [
				'name'               => __('Blockive Templates', 'blockive-premium-addon-for-block'),
				'singular_name'      => __('Blockive Template', 'blockive-premium-addon-for-block'),
				'add_new'            => __('Add New', 'blockive-premium-addon-for-block'),
				'add_new_item'       => __('Add New Template', 'blockive-premium-addon-for-block'),
				'edit_item'          => __('Edit Template', 'blockive-premium-addon-for-block'),
				'new_item'           => __('New Template', 'blockive-premium-addon-for-block'),
				'view_item'          => __('View Template', 'blockive-premium-addon-for-block'),
				'search_items'       => __('Search Templates', 'blockive-premium-addon-for-block'),
				'not_found'          => __('No templates found', 'blockive-premium-addon-for-block'),
				'not_found_in_trash' => __('No templates found in Trash', 'blockive-premium-addon-for-block'),
				'all_items'          => __('Blockive Templates', 'blockive-premium-addon-for-block'),
				'menu_name'          => __('Blockive Templates', 'blockive-premium-addon-for-block'),
			],
			'public'              => false,
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'menu_icon'           => 'dashicons-layout',
			'supports'            => ['title', 'editor', 'custom-fields', 'revisions'],
			'capability_type'     => 'post',
			'map_meta_cap'        => true,
			'has_archive'         => false,
			'rewrite'             => false,
		]);
	}

	/**
	 * Registers the "Template Type" meta - which real post type (post,
	 * page, product, event CPT, ...) this template is meant to be used
	 * with. Template Blocks use it to resolve which post to preview
	 * live data from while editing.
	 */
	public function register_meta()
	{
		register_post_meta(self::POST_TYPE, '_bpafb_template_type', [
			'type'          => 'string',
			'single'        => true,
			'default'       => 'post',
			'show_in_rest'  => true,
			'auth_callback' => function ($allowed, $meta_key, $post_id) {
				return current_user_can('edit_post', $post_id);
			},
		]);
	}
}
