<?php
/**
 * General Condition.
 *
 * Matches site-wide conditions: Entire Site and Front Page.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_General
 */
class Condition_General extends Condition_Base {

	/**
	 * {@inheritDoc}
	 */
	public function get_slug(): string {
		return 'general';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_label(): string {
		return __( 'General', 'blockive-premium-addon-for-block' );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_group(): string {
		return 'general';
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
		return [
			'entire_site' => __( 'Entire Site', 'blockive-premium-addon-for-block' ),
			'front_page'  => __( 'Front Page', 'blockive-premium-addon-for-block' ),
		];
	}

	/**
	 * {@inheritDoc}
	 */
	public function match( array $rule ): bool {
		$sub_type = $rule['sub_type'] ?? 'entire_site';

		switch ( $sub_type ) {
			case 'entire_site':
				return true; // Always matches.

			case 'front_page':
				return is_front_page();
		}

		return false;
	}
}
