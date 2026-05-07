<?php
/**
 * Condition Manager (Facade).
 *
 * Central access point for the display conditions engine.
 * Delegates work to the Registry, Storage, and Evaluator classes
 * to maintain SOLID architecture while keeping backward compatibility.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Manager
 */
class Condition_Manager {

	/**
	 * Condition Registry instance.
	 *
	 * @var Condition_Registry
	 */
	private $registry;

	/**
	 * Condition Storage instance.
	 *
	 * @var Condition_Storage
	 */
	private $storage;

	/**
	 * Condition Evaluator instance.
	 *
	 * @var Condition_Evaluator
	 */
	private $evaluator;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->registry  = new Condition_Registry();
		$this->storage   = new Condition_Storage();
		$this->evaluator = new Condition_Evaluator( $this->registry );

		// Initialize default conditions and groups.
		$this->registry->register_default_groups();
		$this->registry->register_built_in_conditions();

		/**
		 * Fires after built-in conditions are registered.
		 *
		 * Use this hook to register custom conditions via
		 * $manager->register_condition( new My_Condition() ).
		 *
		 * @since 1.1.0
		 *
		 * @param Condition_Manager $this The manager instance.
		 */
		do_action( 'blockive/register_conditions', $this );
	}

	/* ──────────────────────────────────────────────
	 * Registry Delegation
	 * ────────────────────────────────────────────── */

	/**
	 * Register a condition.
	 *
	 * @param Condition_Base $condition Condition instance.
	 * @return void
	 */
	public function register_condition( Condition_Base $condition ): void {
		$this->registry->register_condition( $condition );
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
		$this->registry->register_group( $slug, $label, $order );
	}

	/**
	 * Get a specific condition by slug.
	 *
	 * @param string $slug Condition slug.
	 * @return Condition_Base|null
	 */
	public function get_condition( string $slug ): ?Condition_Base {
		return $this->registry->get_condition( $slug );
	}

	/**
	 * Get all registered conditions.
	 *
	 * @return array<string, Condition_Base>
	 */
	public function get_conditions(): array {
		return $this->registry->get_conditions();
	}

	/**
	 * Get all registered condition groups.
	 *
	 * @return array<string, array>
	 */
	public function get_groups(): array {
		return $this->registry->get_groups();
	}

	/**
	 * Serialize all conditions for REST / editor consumption.
	 *
	 * @return array
	 */
	public function get_conditions_schema(): array {
		return $this->registry->get_conditions_schema();
	}

	/* ──────────────────────────────────────────────
	 * Storage Delegation
	 * ────────────────────────────────────────────── */

	/**
	 * Get conditions stored for a specific template.
	 *
	 * @param int $template_id Template post ID.
	 * @return array Decoded conditions structure.
	 */
	public function get_template_conditions( int $template_id ): array {
		return $this->storage->get_template_conditions( $template_id );
	}

	/**
	 * Save conditions for a specific template.
	 *
	 * @param int   $template_id Template post ID.
	 * @param array $conditions  Conditions structure with include/exclude.
	 * @return bool True on success, false on failure.
	 */
	public function save_template_conditions( int $template_id, array $conditions ): bool {
		return $this->storage->save_template_conditions( $template_id, $conditions );
	}

	/* ──────────────────────────────────────────────
	 * Evaluator Delegation
	 * ────────────────────────────────────────────── */

	/**
	 * Evaluate whether a template's conditions match the current request.
	 *
	 * @param int $template_id Template post ID.
	 * @return bool Whether the template should be displayed.
	 */
	public function evaluate( int $template_id ): bool {
		$data = $this->storage->get_template_conditions( $template_id );
		return $this->evaluator->evaluate( $data );
	}

	/**
	 * Expose the underlying storage component.
	 * Useful for REST API sanitization.
	 *
	 * @return Condition_Storage
	 */
	public function get_storage(): Condition_Storage {
		return $this->storage;
	}
}
