<?php
/**
 * Theme Builder Module Bootstrap.
 *
 * Orchestrates all Theme Builder sub-modules: CPT registration,
 * managers, admin UI, REST API, and rendering.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Theme_Builder
 *
 * Main entry point for the Theme Builder module.
 * Follows the singleton pattern to prevent multiple instantiations.
 */
final class Theme_Builder {

	/**
	 * Singleton instance.
	 *
	 * @var Theme_Builder|null
	 */
	private static $instance = null;

	/**
	 * Template_Manager instance.
	 *
	 * @var Admin\Template_Manager|null
	 */
	private $template_manager = null;

	/**
	 * Condition_Manager instance.
	 *
	 * @var Conditions\Condition_Manager|null
	 */
	private $condition_manager = null;

	/**
	 * Returns the singleton instance.
	 *
	 * @return Theme_Builder
	 */
	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Private constructor — initialise sub-modules.
	 */
	private function __construct() {
		$this->load_dependencies();
		$this->init_modules();
	}

	/**
	 * Prevent cloning.
	 */
	private function __clone() {}

	/**
	 * Prevent unserialization.
	 *
	 * @throws \Exception Always.
	 */
	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize singleton.' );
	}

	/**
	 * Require all module files.
	 *
	 * @return void
	 */
	private function load_dependencies(): void {
		$base = BPAFB_PATH . 'includes/';

		// Post Types.
		require_once $base . 'post-types/class-template-post-type.php';

		// Admin.
		require_once $base . 'admin/class-template-manager.php';
		require_once $base . 'admin/class-admin-menu.php';
		require_once $base . 'admin/class-template-list-page.php';

		// Conditions engine.
		require_once $base . 'conditions/class-condition-base.php';
		require_once $base . 'conditions/class-condition-registry.php';
		require_once $base . 'conditions/class-condition-storage.php';
		require_once $base . 'conditions/class-condition-evaluator.php';
		require_once $base . 'conditions/class-condition-manager.php';
		require_once $base . 'conditions/class-condition-general.php';
		require_once $base . 'conditions/class-condition-singular.php';
		require_once $base . 'conditions/class-condition-archive.php';
		require_once $base . 'conditions/class-condition-taxonomy.php';
		require_once $base . 'conditions/class-condition-user.php';
		require_once $base . 'conditions/class-condition-date.php';

		// Rendering.
		require_once $base . 'rendering/class-template-cache.php';
		require_once $base . 'rendering/class-template-resolver.php';
		require_once $base . 'rendering/class-template-renderer.php';
		require_once $base . 'rendering/class-frontend-controller.php';
		require_once $base . 'rendering/class-template-preview.php';

		// Editor.
		require_once $base . 'editor/class-editor-assets.php';

		// REST API.
		require_once $base . 'rest-api/class-rest-templates-controller.php';

		// Integrations (skeleton — no logic yet).
		// require_once $base . 'integrations/class-integration-loader.php';
	}

	/**
	 * Instantiate and wire up all active modules.
	 *
	 * @return void
	 */
	private function init_modules(): void {
		// Register the custom post type.
		new Post_Types\Template_Post_Type();

		// Managers.
		$this->template_manager  = new Admin\Template_Manager();
		$this->condition_manager = new Conditions\Condition_Manager();

		// Admin UI.
		new Admin\Admin_Menu();

		// Editor integration.
		new Editor\Editor_Assets();

		// Cache layer (must init before rendering to register hooks).
		new Rendering\Template_Cache();

		// Frontend rendering.
		new Rendering\Frontend_Controller( $this->condition_manager );

		// Template preview.
		new Rendering\Template_Preview();

		// REST API.
		new REST_API\REST_Templates_Controller( $this->condition_manager, $this->template_manager );
	}

	/**
	 * Get the Template_Manager instance.
	 *
	 * @return Admin\Template_Manager
	 */
	public function get_template_manager(): Admin\Template_Manager {
		return $this->template_manager;
	}

	/**
	 * Get the Condition_Manager instance.
	 *
	 * @return Conditions\Condition_Manager
	 */
	public function get_condition_manager(): Conditions\Condition_Manager {
		return $this->condition_manager;
	}
}
