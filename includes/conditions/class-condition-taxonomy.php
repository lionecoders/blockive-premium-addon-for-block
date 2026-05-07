<?php
/**
 * Taxonomy Condition.
 *
 * Matches based on taxonomy term archives: category, tag,
 * or custom taxonomy terms.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Taxonomy
 */
class Condition_Taxonomy extends Condition_Base {

	/**
	 * {@inheritDoc}
	 */
	public function get_slug(): string {
		return 'taxonomy';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_label(): string {
		return __( 'Taxonomy', 'blockive-premium-addon-for-block' );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_group(): string {
		return 'taxonomy';
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
			'category'    => __( 'All Categories', 'blockive-premium-addon-for-block' ),
			'post_tag'    => __( 'All Tags', 'blockive-premium-addon-for-block' ),
		];

		// Add custom taxonomies.
		$custom_taxonomies = get_taxonomies(
			[
				'public'   => true,
				'_builtin' => false,
			],
			'objects'
		);

		foreach ( $custom_taxonomies as $tax ) {
			$options[ $tax->name ] = $tax->label;
		}

		return $options;
	}

	/**
	 * {@inheritDoc}
	 */
	public function match( array $rule ): bool {
		$sub_type = $rule['sub_type'] ?? 'category';
		$sub_id   = (int) ( $rule['sub_id'] ?? 0 );

		// Specific term by ID.
		if ( $sub_id > 0 ) {
			$term = get_term( $sub_id );

			if ( ! $term || is_wp_error( $term ) ) {
				return false;
			}

			// Check if we're on this term's archive.
			if ( is_tax( $term->taxonomy, $sub_id ) || is_category( $sub_id ) || is_tag( $sub_id ) ) {
				return true;
			}

			// Check if a singular post has this term.
			if ( is_singular() ) {
				return has_term( $sub_id, $term->taxonomy );
			}

			return false;
		}

		// All terms of a taxonomy.
		switch ( $sub_type ) {
			case 'category':
				return is_category();

			case 'post_tag':
				return is_tag();

			default:
				return is_tax( $sub_type );
		}
	}
}
