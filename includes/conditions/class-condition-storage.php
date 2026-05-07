<?php
/**
 * Condition Storage.
 *
 * Handles saving and retrieving condition data from the database,
 * as well as sanitizing the complex JSON structure.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Storage
 */
class Condition_Storage {

	/**
	 * Get conditions stored for a specific template.
	 *
	 * @param int $template_id Template post ID.
	 * @return array Decoded conditions structure.
	 */
	public function get_template_conditions( int $template_id ): array {
		$raw = get_post_meta( $template_id, BLOCKIVE_TEMPLATE_META_CONDITIONS, true );

		if ( empty( $raw ) ) {
			return [
				'include' => [],
				'exclude' => [],
			];
		}

		$decoded = json_decode( $raw, true );

		if ( ! is_array( $decoded ) ) {
			return [
				'include' => [],
				'exclude' => [],
			];
		}

		return wp_parse_args( $decoded, [
			'include' => [],
			'exclude' => [],
		] );
	}

	/**
	 * Save conditions for a specific template.
	 *
	 * @param int   $template_id Template post ID.
	 * @param array $conditions  Conditions structure with include/exclude.
	 * @return bool True on success, false on failure.
	 */
	public function save_template_conditions( int $template_id, array $conditions ): bool {
		// Validate structure.
		$sanitized = [
			'include' => $this->sanitize_rule_groups( $conditions['include'] ?? [] ),
			'exclude' => $this->sanitize_rule_groups( $conditions['exclude'] ?? [] ),
		];

		$encoded = wp_json_encode( $sanitized );

		if ( false === $encoded ) {
			return false;
		}

		return (bool) update_post_meta(
			$template_id,
			BLOCKIVE_TEMPLATE_META_CONDITIONS,
			$encoded
		);
	}

	/**
	 * Sanitize an array of rule groups.
	 *
	 * @param array $groups Rule groups.
	 * @return array Sanitized groups.
	 */
	public function sanitize_rule_groups( array $groups ): array {
		$sanitized = [];

		foreach ( $groups as $group ) {
			if ( ! is_array( $group ) || empty( $group['rules'] ) ) {
				continue;
			}

			$relation = isset( $group['relation'] ) && 'AND' === strtoupper( $group['relation'] )
				? 'AND'
				: 'OR';

			$rules = [];
			foreach ( (array) $group['rules'] as $rule ) {
				if ( empty( $rule['condition'] ) ) {
					continue;
				}

				$rules[] = [
					'condition' => sanitize_key( $rule['condition'] ),
					'sub_type'  => sanitize_key( $rule['sub_type'] ?? '' ),
					'sub_id'    => absint( $rule['sub_id'] ?? 0 ),
				];
			}

			if ( ! empty( $rules ) ) {
				$sanitized[] = [
					'relation' => $relation,
					'rules'    => $rules,
				];
			}
		}

		return $sanitized;
	}
}
