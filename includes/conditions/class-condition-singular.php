<?php
/**
 * Singular Condition.
 *
 * Matches singular views: all singular, specific post types,
 * specific posts/pages, and the front page.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Singular
 */
class Condition_Singular extends Condition_Base {

	/**
	 * {@inheritDoc}
	 */
	public function get_slug(): string {
		return 'singular';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_label(): string {
		return __( 'Singular', 'blockive-premium-addon-for-block' );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_group(): string {
		return 'singular';
	}

	/**
	 * {@inheritDoc}
	 */
	public function supports_sub_selection(): bool {
		return true;
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_sub_options(): array {
		$options = [
			'all'        => __( 'All Singular', 'blockive-premium-addon-for-block' ),
			'front_page' => __( 'Front Page', 'blockive-premium-addon-for-block' ),
			'post'       => __( 'All Posts', 'blockive-premium-addon-for-block' ),
			'page'       => __( 'All Pages', 'blockive-premium-addon-for-block' ),
		];

		// Add registered custom post types.
		$custom_types = get_post_types(
			[
				'public'   => true,
				'_builtin' => false,
			],
			'objects'
		);

		foreach ( $custom_types as $pt ) {
			$options[ $pt->name ] = $pt->label;
		}

		return $options;
	}

	/**
	 * {@inheritDoc}
	 */
	public function match( array $rule ): bool {
		$sub_type = $rule['sub_type'] ?? 'all';
		$sub_id   = (int) ( $rule['sub_id'] ?? 0 );

		// Front page.
		if ( 'front_page' === $sub_type ) {
			return is_front_page();
		}

		// Specific post/page by ID.
		if ( $sub_id > 0 ) {
			return is_singular() && get_queried_object_id() === $sub_id;
		}

		// All singular content.
		if ( 'all' === $sub_type ) {
			return is_singular();
		}

		// Specific post type.
		return is_singular( $sub_type );
	}
}
