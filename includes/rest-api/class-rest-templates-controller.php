<?php
/**
 * REST Templates Controller.
 *
 * Registers custom REST API endpoints under blockive/v1/:
 *
 * - GET  /blockive/v1/templates/preview   → Render a template preview (HTML).
 * - POST /blockive/v1/conditions/evaluate → Evaluate conditions for a template.
 * - GET  /blockive/v1/active-templates    → List active templates by type.
 *
 * @package Blockive\ThemeBuilder\REST_API
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\REST_API;

use Blockive\ThemeBuilder\Conditions\Condition_Manager;
use Blockive\ThemeBuilder\Admin\Template_Manager;
use Blockive\ThemeBuilder\Rendering\Template_Renderer;
use Blockive\ThemeBuilder\Rendering\Template_Preview;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class REST_Templates_Controller
 */
class REST_Templates_Controller {

	/**
	 * REST namespace.
	 */
	private const NAMESPACE = 'blockive/v1';

	/**
	 * Condition_Manager instance.
	 *
	 * @var Condition_Manager
	 */
	private $condition_manager;

	/**
	 * Template_Manager instance.
	 *
	 * @var Template_Manager
	 */
	private $template_manager;

	/**
	 * Constructor.
	 *
	 * @param Condition_Manager $condition_manager Condition manager instance.
	 * @param Template_Manager  $template_manager  Template manager instance.
	 */
	public function __construct( Condition_Manager $condition_manager, Template_Manager $template_manager ) {
		$this->condition_manager = $condition_manager;
		$this->template_manager  = $template_manager;

		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Register all REST routes.
	 *
	 * @return void
	 */
	public function register_routes(): void {
		$this->register_preview_route();
		$this->register_evaluate_route();
		$this->register_active_templates_route();
	}

	/* ══════════════════════════════════════════════
	 * Route: GET /templates/preview
	 * ══════════════════════════════════════════════ */

	/**
	 * Register the template preview route.
	 *
	 * @return void
	 */
	private function register_preview_route(): void {
		register_rest_route(
			self::NAMESPACE,
			'/templates/preview',
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'handle_preview' ],
				'permission_callback' => [ $this, 'check_edit_permission' ],
				'args'                => [
					'id' => [
						'required'          => true,
						'type'              => 'integer',
						'minimum'           => 1,
						'description'       => __( 'Template post ID.', 'blockive-premium-addon-for-block' ),
						'validate_callback' => [ $this, 'validate_positive_integer' ],
						'sanitize_callback' => 'absint',
					],
				],
			]
		);
	}

	/**
	 * Handle GET /templates/preview.
	 *
	 * Returns rendered HTML for a template, plus metadata.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function handle_preview( \WP_REST_Request $request ) {
		$template_id = $request->get_param( 'id' );
		$template    = get_post( $template_id );

		if ( ! $template || BLOCKIVE_TEMPLATE_POST_TYPE !== $template->post_type ) {
			return new \WP_Error(
				'blockive_template_not_found',
				__( 'Template not found.', 'blockive-premium-addon-for-block' ),
				[ 'status' => 404 ]
			);
		}

		$renderer = new Template_Renderer();
		$html     = $renderer->render( $template, false );

		$type = get_post_meta( $template_id, BLOCKIVE_TEMPLATE_META_TYPE, true );

		$response_data = [
			'id'          => $template->ID,
			'title'       => $template->post_title,
			'type'        => $type ?: '',
			'status'      => $template->post_status,
			'html'        => $html,
			'preview_url' => Template_Preview::get_preview_url( $template->ID ),
		];

		return new \WP_REST_Response( $response_data, 200 );
	}

	/* ══════════════════════════════════════════════
	 * Route: POST /conditions/evaluate
	 * ══════════════════════════════════════════════ */

	/**
	 * Register the condition evaluation route.
	 *
	 * @return void
	 */
	private function register_evaluate_route(): void {
		register_rest_route(
			self::NAMESPACE,
			'/conditions/evaluate',
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'handle_evaluate' ],
				'permission_callback' => [ $this, 'check_edit_permission' ],
				'args'                => [
					'template_id' => [
						'required'          => false,
						'type'              => 'integer',
						'minimum'           => 1,
						'description'       => __( 'Template post ID to evaluate stored conditions for.', 'blockive-premium-addon-for-block' ),
						'validate_callback' => [ $this, 'validate_positive_integer' ],
						'sanitize_callback' => 'absint',
					],
					'conditions' => [
						'required'          => false,
						'type'              => 'object',
						'description'       => __( 'Inline conditions object to evaluate (include/exclude structure).', 'blockive-premium-addon-for-block' ),
						'validate_callback' => [ $this, 'validate_conditions_object' ],
					],
				],
			]
		);
	}

	/**
	 * Handle POST /conditions/evaluate.
	 *
	 * Evaluates conditions for a template (by ID or inline).
	 * Returns match result plus details per rule group.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function handle_evaluate( \WP_REST_Request $request ) {
		$template_id = $request->get_param( 'template_id' );
		$inline      = $request->get_param( 'conditions' );

		// Must provide at least one.
		if ( ! $template_id && ! $inline ) {
			return new \WP_Error(
				'blockive_missing_params',
				__( 'Provide either template_id or conditions.', 'blockive-premium-addon-for-block' ),
				[ 'status' => 400 ]
			);
		}

		// If template_id provided, evaluate stored conditions.
		if ( $template_id ) {
			$template = get_post( $template_id );

			if ( ! $template || BLOCKIVE_TEMPLATE_POST_TYPE !== $template->post_type ) {
				return new \WP_Error(
					'blockive_template_not_found',
					__( 'Template not found.', 'blockive-premium-addon-for-block' ),
					[ 'status' => 404 ]
				);
			}

			$result     = $this->condition_manager->evaluate( $template_id );
			$conditions = $this->condition_manager->get_template_conditions( $template_id );

			return new \WP_REST_Response( [
				'template_id' => $template_id,
				'match'       => $result,
				'conditions'  => $conditions,
				'schema'      => $this->condition_manager->get_conditions_schema(),
			], 200 );
		}

		// Inline conditions — save temporarily, evaluate, then remove.
		// We create a transient evaluation context.
		$sanitized_inline = [
			'include' => $this->condition_manager->get_storage()->sanitize_rule_groups( $inline['include'] ?? [] ),
			'exclude' => $this->condition_manager->get_storage()->sanitize_rule_groups( $inline['exclude'] ?? [] ),
		];

		$result = $this->evaluate_inline_conditions( $sanitized_inline );

		return new \WP_REST_Response( [
			'match'      => $result['match'],
			'conditions' => $sanitized_inline,
			'details'    => $result['details'],
		], 200 );
	}

	/**
	 * Evaluate inline conditions without saving.
	 *
	 * @param array $conditions Conditions structure.
	 * @return array { match: bool, details: array }
	 */
	private function evaluate_inline_conditions( array $conditions ): array {
		$include_groups = $conditions['include'] ?? [];
		$exclude_groups = $conditions['exclude'] ?? [];

		$include_match = false;
		$include_details = [];

		foreach ( $include_groups as $index => $group ) {
			$group_match = $this->evaluate_group( $group );
			$include_details[] = [
				'group_index' => $index,
				'relation'    => $group['relation'] ?? 'OR',
				'match'       => $group_match,
			];
			if ( $group_match ) {
				$include_match = true;
			}
		}

		$exclude_match = false;
		$exclude_details = [];

		if ( $include_match && ! empty( $exclude_groups ) ) {
			foreach ( $exclude_groups as $index => $group ) {
				$group_match = $this->evaluate_group( $group );
				$exclude_details[] = [
					'group_index' => $index,
					'relation'    => $group['relation'] ?? 'OR',
					'match'       => $group_match,
				];
				if ( $group_match ) {
					$exclude_match = true;
				}
			}
		}

		$final_match = $include_match && ! $exclude_match;

		return [
			'match'   => $final_match,
			'details' => [
				'include' => $include_details,
				'exclude' => $exclude_details,
			],
		];
	}

	/**
	 * Evaluate a single rule group.
	 *
	 * @param array $group Rule group.
	 * @return bool
	 */
	private function evaluate_group( array $group ): bool {
		$relation = strtoupper( $group['relation'] ?? 'OR' );
		$rules    = $group['rules'] ?? [];

		if ( empty( $rules ) ) {
			return false;
		}

		foreach ( $rules as $rule ) {
			$slug      = $rule['condition'] ?? '';
			$condition = $this->condition_manager->get_condition( $slug );

			if ( ! $condition ) {
				$result = false;
			} else {
				$result = $condition->match( $rule );
			}

			if ( 'OR' === $relation && $result ) {
				return true;
			}
			if ( 'AND' === $relation && ! $result ) {
				return false;
			}
		}

		return 'AND' === $relation;
	}

	/* ══════════════════════════════════════════════
	 * Route: GET /active-templates
	 * ══════════════════════════════════════════════ */

	/**
	 * Register the active templates route.
	 *
	 * @return void
	 */
	private function register_active_templates_route(): void {
		register_rest_route(
			self::NAMESPACE,
			'/active-templates',
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'handle_active_templates' ],
				'permission_callback' => [ $this, 'check_edit_permission' ],
				'args'                => [
					'type' => [
						'required'          => false,
						'type'              => 'string',
						'description'       => __( 'Filter by template type.', 'blockive-premium-addon-for-block' ),
						'sanitize_callback' => 'sanitize_key',
						'enum'              => array_keys( $this->template_manager->get_template_types() ),
					],
					'status' => [
						'required'          => false,
						'type'              => 'string',
						'default'           => 'publish',
						'description'       => __( 'Filter by post status.', 'blockive-premium-addon-for-block' ),
						'sanitize_callback' => 'sanitize_key',
						'enum'              => [ 'publish', 'draft', 'any' ],
					],
				],
			]
		);
	}

	/**
	 * Handle GET /active-templates.
	 *
	 * Returns all templates, optionally filtered by type and status.
	 * Each template includes its conditions and priority.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	public function handle_active_templates( \WP_REST_Request $request ): \WP_REST_Response {
		$type   = $request->get_param( 'type' );
		$status = $request->get_param( 'status' ) ?: 'publish';

		$args = [
			'post_type'      => BLOCKIVE_TEMPLATE_POST_TYPE,
			'posts_per_page' => 100,
			'post_status'    => 'any' === $status ? [ 'publish', 'draft' ] : $status,
			'orderby'        => 'meta_value_num',
			'order'          => 'ASC',
			'no_found_rows'  => true,
			'meta_query'     => [], // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
		];

		if ( $type ) {
			$args['meta_query'][] = [
				'key'   => BLOCKIVE_TEMPLATE_META_TYPE,
				'value' => $type,
			];
		}

		$query     = new \WP_Query( $args );
		$templates = [];

		foreach ( $query->posts as $post ) {
			$template_type = get_post_meta( $post->ID, BLOCKIVE_TEMPLATE_META_TYPE, true );
			$priority      = (int) get_post_meta( $post->ID, BLOCKIVE_TEMPLATE_META_PRIORITY, true );
			$conditions    = $this->condition_manager->get_template_conditions( $post->ID );

			$templates[] = [
				'id'          => $post->ID,
				'title'       => $post->post_title,
				'type'        => $template_type ?: '',
				'status'      => $post->post_status,
				'priority'    => $priority ?: 10,
				'conditions'  => $conditions,
				'edit_url'    => get_edit_post_link( $post->ID, 'raw' ),
				'preview_url' => Template_Preview::get_preview_url( $post->ID ),
				'modified'    => $post->post_modified_gmt,
			];
		}

		return new \WP_REST_Response( [
			'templates' => $templates,
			'total'     => count( $templates ),
			'schema'    => $this->condition_manager->get_conditions_schema(),
		], 200 );
	}

	/* ══════════════════════════════════════════════
	 * Permission Callbacks
	 * ══════════════════════════════════════════════ */

	/**
	 * Permission check: user can edit posts.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return bool|\WP_Error
	 */
	public function check_edit_permission( \WP_REST_Request $request ) {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return new \WP_Error(
				'blockive_rest_forbidden',
				__( 'You do not have permission to access this endpoint.', 'blockive-premium-addon-for-block' ),
				[ 'status' => 403 ]
			);
		}

		return true;
	}

	/* ══════════════════════════════════════════════
	 * Validation Callbacks
	 * ══════════════════════════════════════════════ */

	/**
	 * Validate that a value is a positive integer.
	 *
	 * @param mixed            $value   Value to validate.
	 * @param \WP_REST_Request $request Request object.
	 * @param string           $param   Parameter name.
	 * @return bool|\WP_Error
	 */
	public function validate_positive_integer( $value, \WP_REST_Request $request, string $param ) {
		$int_val = (int) $value;

		if ( $int_val < 1 ) {
			return new \WP_Error(
				'blockive_invalid_param',
				/* translators: %s: parameter name */
				sprintf( __( '%s must be a positive integer.', 'blockive-premium-addon-for-block' ), $param ),
				[ 'status' => 400 ]
			);
		}

		return true;
	}

	/**
	 * Validate the conditions object structure.
	 *
	 * @param mixed            $value   Value to validate.
	 * @param \WP_REST_Request $request Request object.
	 * @param string           $param   Parameter name.
	 * @return bool|\WP_Error
	 */
	public function validate_conditions_object( $value, \WP_REST_Request $request, string $param ) {
		if ( ! is_array( $value ) ) {
			return new \WP_Error(
				'blockive_invalid_param',
				__( 'Conditions must be an object with include and/or exclude arrays.', 'blockive-premium-addon-for-block' ),
				[ 'status' => 400 ]
			);
		}

		// Must have at least include or exclude.
		if ( empty( $value['include'] ) && empty( $value['exclude'] ) ) {
			return new \WP_Error(
				'blockive_invalid_param',
				__( 'Conditions must contain at least an include or exclude array.', 'blockive-premium-addon-for-block' ),
				[ 'status' => 400 ]
			);
		}

		return true;
	}
}
