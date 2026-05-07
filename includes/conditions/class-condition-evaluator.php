<?php
/**
 * Condition Evaluator.
 *
 * The logic engine for display conditions. Evaluates the include/exclude
 * JSON structure against the current WordPress context.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Evaluator
 */
class Condition_Evaluator {

	/**
	 * Registry instance.
	 *
	 * @var Condition_Registry
	 */
	private $registry;

	/**
	 * Constructor.
	 *
	 * @param Condition_Registry $registry Registry instance.
	 */
	public function __construct( Condition_Registry $registry ) {
		$this->registry = $registry;
	}

	/**
	 * Evaluate whether a template's conditions match the current request.
	 *
	 * @param array $data Conditions array (include/exclude groups).
	 * @return bool Whether the template should be displayed.
	 */
	public function evaluate( array $data ): bool {
		$include_groups = $data['include'] ?? [];
		$exclude_groups = $data['exclude'] ?? [];

		// No include rules → no match (must explicitly include).
		if ( empty( $include_groups ) ) {
			return false;
		}

		// Check includes (OR between groups).
		$included = $this->evaluate_groups( $include_groups );

		if ( ! $included ) {
			return false;
		}

		// Check excludes — if any exclude group matches, reject.
		if ( ! empty( $exclude_groups ) ) {
			$excluded = $this->evaluate_groups( $exclude_groups );

			if ( $excluded ) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Evaluate an array of rule groups.
	 *
	 * Groups are combined with OR logic: if ANY group matches, the
	 * result is true.
	 *
	 * @param array $groups Array of rule groups.
	 * @return bool True if any group matches.
	 */
	public function evaluate_groups( array $groups ): bool {
		foreach ( $groups as $group ) {
			if ( $this->evaluate_single_group( $group ) ) {
				return true; // OR — one group match is enough.
			}
		}

		return false;
	}

	/**
	 * Evaluate a single rule group.
	 *
	 * Rules within a group are combined with the group's relation
	 * (AND or OR, default OR).
	 *
	 * @param array $group A single rule group with 'relation' and 'rules'.
	 * @return bool Whether the group matches.
	 */
	public function evaluate_single_group( array $group ): bool {
		$relation = strtoupper( $group['relation'] ?? 'OR' );
		$rules    = $group['rules'] ?? [];

		if ( empty( $rules ) ) {
			return false;
		}

		foreach ( $rules as $rule ) {
			$result = $this->evaluate_single_rule( $rule );

			if ( 'OR' === $relation && $result ) {
				return true; // Short-circuit OR.
			}

			if ( 'AND' === $relation && ! $result ) {
				return false; // Short-circuit AND.
			}
		}

		// If OR and none matched → false. If AND and all matched → true.
		return 'AND' === $relation;
	}

	/**
	 * Evaluate a single condition rule.
	 *
	 * @param array $rule Rule data with 'condition', 'sub_type', 'sub_id'.
	 * @return bool Whether the condition matches.
	 */
	public function evaluate_single_rule( array $rule ): bool {
		$slug = $rule['condition'] ?? '';

		if ( empty( $slug ) ) {
			return false;
		}

		$condition = $this->registry->get_condition( $slug );

		if ( ! $condition ) {
			return false;
		}

		return $condition->match( $rule );
	}
}
