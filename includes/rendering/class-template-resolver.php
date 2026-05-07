<?php
/**
 * Template Resolver.
 *
 * Queries published templates by type, evaluates their conditions
 * against the current request, and returns the highest-priority
 * winning template.
 *
 * Performance:
 * - Template IDs are cached in transients (survive page loads).
 * - Resolved winners are cached in object cache (per-request).
 * - Condition results are cached per template per request.
 * - An early-exit "has any templates?" check avoids all queries
 *   when no templates exist at all.
 *
 * @package Blockive\ThemeBuilder\Rendering
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Rendering;

use Blockive\ThemeBuilder\Conditions\Condition_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Template_Resolver
 */
class Template_Resolver {

	/**
	 * Condition_Manager instance.
	 *
	 * @var Condition_Manager
	 */
	private $condition_manager;

	/**
	 * Internal per-request cache of resolved templates.
	 *
	 * @var array<string, \WP_Post|null|false>
	 */
	private $resolved = [];

	/**
	 * Whether the "has any?" check has been performed.
	 *
	 * @var bool|null
	 */
	private $has_any = null;

	/**
	 * Constructor.
	 *
	 * @param Condition_Manager $condition_manager Condition manager instance.
	 */
	public function __construct( Condition_Manager $condition_manager ) {
		$this->condition_manager = $condition_manager;
	}

	/**
	 * Resolve the winning template for a given type.
	 *
	 * Steps:
	 * 1. Early-exit if no published templates exist at all.
	 * 2. Check object cache for previously resolved winner.
	 * 3. Get cached template IDs (transient) or run optimized query.
	 * 4. Evaluate conditions for each candidate (with per-template caching).
	 * 5. Pick the first match (already sorted by priority in query).
	 *
	 * @param string $type Template type slug (header, footer, single, archive, 404, search).
	 * @return \WP_Post|null Winning template post or null.
	 */
	public function resolve( string $type ): ?\WP_Post {
		// Per-request memory cache.
		if ( isset( $this->resolved[ $type ] ) ) {
			$cached = $this->resolved[ $type ];
			return false === $cached ? null : $cached;
		}

		// Early exit: no published templates at all.
		if ( ! $this->any_templates_exist() ) {
			$this->resolved[ $type ] = false;
			return null;
		}

		// Check object cache for resolved winner.
		$cached_id = Template_Cache::get_resolved( $type );

		if ( false !== $cached_id ) {
			if ( -1 === $cached_id ) {
				$this->resolved[ $type ] = false;
				return null;
			}

			$post = get_post( $cached_id );

			if ( $post && BLOCKIVE_TEMPLATE_POST_TYPE === $post->post_type ) {
				$this->resolved[ $type ] = $post;
				return $post;
			}

			// Stale cache — fall through.
		}

		// Get template IDs from cache or query.
		$template_ids = $this->get_candidate_ids( $type );

		if ( empty( $template_ids ) ) {
			$this->resolved[ $type ] = false;
			Template_Cache::set_resolved( $type, -1 );
			return null;
		}

		// Prime post cache for all candidates in a single query.
		_prime_post_caches( $template_ids );

		// Prime meta cache for all candidates.
		update_meta_cache( 'post', $template_ids );

		// Evaluate conditions and find winner.
		$winner = $this->find_winner( $template_ids );

		if ( $winner ) {
			$this->resolved[ $type ] = $winner;
			Template_Cache::set_resolved( $type, $winner->ID );
		} else {
			$this->resolved[ $type ] = false;
			Template_Cache::set_resolved( $type, -1 );
		}

		/**
		 * Filters the resolved template for a given type.
		 *
		 * @since 1.1.0
		 *
		 * @param \WP_Post|null $winner The winning template or null.
		 * @param string        $type   Template type slug.
		 */
		$winner = apply_filters( 'blockive/resolved_template', $winner, $type );

		return $winner;
	}

	/**
	 * Check if a template type has a resolved winner.
	 *
	 * @param string $type Template type slug.
	 * @return bool
	 */
	public function has_template( string $type ): bool {
		return null !== $this->resolve( $type );
	}

	/**
	 * Clear all per-request caches.
	 *
	 * @return void
	 */
	public function clear_cache(): void {
		$this->resolved = [];
		$this->has_any  = null;
	}

	/* ──────────────────────────────────────────────
	 * Early Exit: "Has Any?" Check
	 * ────────────────────────────────────────────── */

	/**
	 * Check if any published templates exist.
	 *
	 * Uses a cached count query. On sites with zero templates,
	 * this prevents ALL template queries from running.
	 *
	 * @return bool
	 */
	private function any_templates_exist(): bool {
		if ( null !== $this->has_any ) {
			return $this->has_any;
		}

		// Check transient cache first.
		$cached = Template_Cache::has_any_templates();

		if ( null !== $cached ) {
			$this->has_any = $cached;
			return $cached;
		}

		// Run a cheap COUNT query.
		global $wpdb;

		$count = (int) $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_type = %s AND post_status = 'publish' LIMIT 1",
				BLOCKIVE_TEMPLATE_POST_TYPE
			)
		);

		$this->has_any = $count > 0;

		Template_Cache::set_has_any_templates( $this->has_any );

		return $this->has_any;
	}

	/* ──────────────────────────────────────────────
	 * Template Query (Cached)
	 * ────────────────────────────────────────────── */

	/**
	 * Get candidate template IDs for a given type.
	 *
	 * Checks the transient cache first, falls back to an
	 * optimized WP_Query that only fetches IDs.
	 *
	 * @param string $type Template type slug.
	 * @return int[] Array of post IDs, sorted by priority ASC.
	 */
	private function get_candidate_ids( string $type ): array {
		// Try cache.
		$cached = Template_Cache::get_template_ids( $type );

		if ( false !== $cached ) {
			return $cached;
		}

		// Optimized query: IDs only, no post content loaded.
		$args = [
			'post_type'      => BLOCKIVE_TEMPLATE_POST_TYPE,
			'posts_per_page' => 50, // Reasonable cap — no site needs 50+ templates of one type.
			'post_status'    => 'publish',
			'fields'         => 'ids', // IDs only — critical for performance.
			'meta_query'     => [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				[
					'key'     => BLOCKIVE_TEMPLATE_META_TYPE,
					'value'   => sanitize_text_field( $type ),
					'compare' => '=',
				],
			],
			'orderby'        => 'meta_value_num',
			'meta_key'       => BLOCKIVE_TEMPLATE_META_PRIORITY, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'order'          => 'ASC',
			'no_found_rows'  => true, // Skip SQL_CALC_FOUND_ROWS.
		];

		$query = new \WP_Query( $args );

		$ids = array_map( 'intval', $query->posts );

		/**
		 * Filters the candidate template IDs for a given type.
		 *
		 * Allows addons to add, remove, or reorder candidates before
		 * condition evaluation. IDs must belong to published
		 * blockive_template posts.
		 *
		 * @since 1.1.0
		 *
		 * @param int[]  $ids  Array of template post IDs.
		 * @param string $type Template type slug.
		 */
		$ids = apply_filters( 'blockive/get_templates', $ids, $type );

		// Cache the result.
		Template_Cache::set_template_ids( $type, $ids );

		return $ids;
	}

	/* ──────────────────────────────────────────────
	 * Condition Evaluation (Cached)
	 * ────────────────────────────────────────────── */

	/**
	 * Find the winning template from a list of candidate IDs.
	 *
	 * Candidates are already sorted by priority (ASC), so the
	 * first condition match wins.
	 *
	 * @param int[] $template_ids Candidate template IDs, priority-sorted.
	 * @return \WP_Post|null
	 */
	private function find_winner( array $template_ids ): ?\WP_Post {
		foreach ( $template_ids as $id ) {
			// Check condition cache first.
			$cached_result = Template_Cache::get_condition_result( $id );

			if ( null !== $cached_result ) {
				if ( $cached_result ) {
					$post = get_post( $id );
					if ( $post ) {
						return $post;
					}
				}
				continue; // Cached as non-matching.
			}

			// Evaluate conditions.
			$match = $this->condition_manager->evaluate( $id );

			// Cache the result.
			Template_Cache::set_condition_result( $id, $match );

			if ( $match ) {
				$post = get_post( $id );
				if ( $post ) {
					return $post;
				}
			}
		}

		return null;
	}
}
