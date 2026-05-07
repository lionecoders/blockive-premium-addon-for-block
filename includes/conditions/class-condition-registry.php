<?php
/**
 * Condition Registry.
 *
 * Handles registration and retrieval of condition groups and condition classes.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Registry
 */
class Condition_Registry {

	/**
	 * Registered condition instances, keyed by slug.
	 *
	 * @var array<string, Condition_Base>
	 */
	private $conditions = [];

	/**
	 * Registered condition groups.
	 *
	 * @var array<string, array>
	 */
	private $groups = [];

	/**
	 * Register default condition groups.
	 *
	 * @return void
	 */
	public function register_default_groups(): void {
		$this->groups = [
			'general'  => [
				'label' => __( 'General', 'blockive-premium-addon-for-block' ),
				'order' => 10,
			],
			'singular' => [
				'label' => __( 'Singular', 'blockive-premium-addon-for-block' ),
				'order' => 20,
			],
			'archive'  => [
				'label' => __( 'Archive', 'blockive-premium-addon-for-block' ),
				'order' => 30,
			],
			'taxonomy' => [
				'label' => __( 'Taxonomy', 'blockive-premium-addon-for-block' ),
				'order' => 40,
			],
			'user'     => [
				'label' => __( 'User', 'blockive-premium-addon-for-block' ),
				'order' => 50,
			],
			'date'     => [
				'label' => __( 'Date & Time', 'blockive-premium-addon-for-block' ),
				'order' => 60,
			],
		];

		/**
		 * Fires after the default condition groups are registered.
		 *
		 * Use this hook to register custom condition groups.
		 *
		 * @since 1.1.0
		 *
		 * @param Condition_Registry $this The Condition_Registry instance.
		 */
		do_action( 'blockive/register_condition_groups', $this );
	}

	/**
	 * Register built-in condition classes.
	 *
	 * @return void
	 */
	public function register_built_in_conditions(): void {
		$this->register_condition( new Condition_General() );
		$this->register_condition( new Condition_Singular() );
		$this->register_condition( new Condition_Archive() );
		$this->register_condition( new Condition_Taxonomy() );
		$this->register_condition( new Condition_User() );
		$this->register_condition( new Condition_Date() );
	}

	/**
	 * Register a condition.
	 *
	 * @param Condition_Base $condition Condition instance.
	 * @return void
	 */
	public function register_condition( Condition_Base $condition ): void {
		$this->conditions[ $condition->get_slug() ] = $condition;
	}

	/**
	 * Register a new condition group.
	 *
	 * @param string $slug  Unique group slug.
	 * @param string $label Human-readable label.
	 * @param int    $order Sort order (lower = first).
	 * @return void
	 */
	public function register_group( string $slug, string $label, int $order = 100 ): void {
		$this->groups[ sanitize_key( $slug ) ] = [
			'label' => sanitize_text_field( $label ),
			'order' => $order,
		];
	}

	/**
	 * Get a specific condition by slug.
	 *
	 * @param string $slug Condition slug.
	 * @return Condition_Base|null
	 */
	public function get_condition( string $slug ): ?Condition_Base {
		return $this->conditions[ $slug ] ?? null;
	}

	/**
	 * Get all registered conditions.
	 *
	 * @return array<string, Condition_Base>
	 */
	public function get_conditions(): array {
		return $this->conditions;
	}

	/**
	 * Get all registered condition groups.
	 *
	 * @return array<string, array>
	 */
	public function get_groups(): array {
		return $this->groups;
	}

	/**
	 * Serialize all conditions for REST / editor consumption.
	 *
	 * @return array
	 */
	public function get_conditions_schema(): array {
		$schema = [];

		foreach ( $this->groups as $group_slug => $group_data ) {
			$group_conditions = [];

			foreach ( $this->conditions as $condition ) {
				if ( $condition->get_group() === $group_slug ) {
					$group_conditions[] = $condition->to_array();
				}
			}

			if ( ! empty( $group_conditions ) ) {
				$schema[] = [
					'slug'       => $group_slug,
					'label'      => $group_data['label'],
					'order'      => $group_data['order'],
					'conditions' => $group_conditions,
				];
			}
		}

		// Sort by order.
		usort( $schema, function ( $a, $b ) {
			return $a['order'] <=> $b['order'];
		} );

		return $schema;
	}
}
