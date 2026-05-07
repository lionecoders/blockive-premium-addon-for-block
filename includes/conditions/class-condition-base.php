<?php
/**
 * Condition Base.
 *
 * Abstract base class for all display conditions.
 * Every condition must extend this class and implement match().
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Base
 */
abstract class Condition_Base {

	/**
	 * Unique condition slug.
	 *
	 * @return string
	 */
	abstract public function get_slug(): string;

	/**
	 * Human-readable label.
	 *
	 * @return string
	 */
	abstract public function get_label(): string;

	/**
	 * Condition group this belongs to (e.g. 'general', 'singular', 'archive', 'user', 'date').
	 *
	 * @return string
	 */
	abstract public function get_group(): string;

	/**
	 * Evaluate whether this condition matches the current request.
	 *
	 * @param array $rule The condition rule data. May include:
	 *                    - 'sub_type'  (string)  e.g. 'post', 'page', 'category'.
	 *                    - 'sub_id'    (int)     Specific post/term ID.
	 * @return bool True if the condition is met.
	 */
	abstract public function match( array $rule ): bool;

	/**
	 * Whether this condition supports sub-selection (e.g. specific post, specific term).
	 *
	 * @return bool
	 */
	public function supports_sub_selection(): bool {
		return false;
	}

	/**
	 * Return sub-selection options for the editor UI.
	 *
	 * Override in subclasses that support sub-selection.
	 *
	 * @return array<string, string> slug => label pairs.
	 */
	public function get_sub_options(): array {
		return [];
	}

	/**
	 * Serialize this condition's definition for the REST API / editor.
	 *
	 * @return array
	 */
	public function to_array(): array {
		return [
			'slug'              => $this->get_slug(),
			'label'             => $this->get_label(),
			'group'             => $this->get_group(),
			'supportsSubSelect' => $this->supports_sub_selection(),
			'subOptions'        => $this->get_sub_options(),
		];
	}
}
