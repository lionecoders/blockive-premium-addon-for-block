<?php
/**
 * Archive Condition.
 *
 * Matches archive views: all archives, post type archives,
 * author archives, date archives, and search results.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Archive
 */
class Condition_Archive extends Condition_Base {

	/**
	 * {@inheritDoc}
	 */
	public function get_slug(): string {
		return 'archive';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_label(): string {
		return __( 'Archive', 'blockive-premium-addon-for-block' );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_group(): string {
		return 'archive';
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
			'all'    => __( 'All Archives', 'blockive-premium-addon-for-block' ),
			'author' => __( 'Author Archive', 'blockive-premium-addon-for-block' ),
			'date'   => __( 'Date Archive', 'blockive-premium-addon-for-block' ),
			'search' => __( 'Search Results', 'blockive-premium-addon-for-block' ),
			'404'    => __( '404 Page', 'blockive-premium-addon-for-block' ),
		];

		// Post type archives.
		$post_types = get_post_types(
			[
				'public'      => true,
				'has_archive' => true,
			],
			'objects'
		);

		foreach ( $post_types as $pt ) {
			$options[ 'post_type_' . $pt->name ] = sprintf(
				/* translators: %s: Post type label */
				__( '%s Archive', 'blockive-premium-addon-for-block' ),
				$pt->label
			);
		}

		return $options;
	}

	/**
	 * {@inheritDoc}
	 */
	public function match( array $rule ): bool {
		$sub_type = $rule['sub_type'] ?? 'all';

		switch ( $sub_type ) {
			case 'all':
				return is_archive() || is_search() || is_404();

			case 'author':
				return is_author();

			case 'date':
				return is_date();

			case 'search':
				return is_search();

			case '404':
				return is_404();
		}

		// Post type archive (sub_type = 'post_type_<name>').
		if ( 0 === strpos( $sub_type, 'post_type_' ) ) {
			$pt = substr( $sub_type, 10 );
			return is_post_type_archive( $pt );
		}

		return false;
	}
}
