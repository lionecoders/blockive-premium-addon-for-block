<?php
/**
 * Template Cache.
 *
 * Centralized caching layer for the Theme Builder module.
 * Supports WordPress transient API (persistent) and wp_cache
 * (object cache) for maximum performance across hosting environments.
 *
 * Cache strategy:
 * - Template query results are stored in transients (survive page loads).
 * - Resolved winners are cached in wp_cache (per-request, fast).
 * - All caches are invalidated on save_post, delete_post, and transition_post_status
 *   for the blockive_template CPT.
 *
 * @package Blockive\ThemeBuilder\Rendering
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Rendering;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Template_Cache
 */
class Template_Cache {

	/**
	 * Cache group for wp_cache calls.
	 */
	public const CACHE_GROUP = 'blockive_tb';

	/**
	 * Transient key prefix.
	 */
	private const TRANSIENT_PREFIX = 'blockive_tb_';

	/**
	 * Transient TTL in seconds (1 hour).
	 * Transients auto-refresh on cache bust events.
	 */
	private const TRANSIENT_TTL = HOUR_IN_SECONDS;

	/**
	 * Internal version stamp — incremented on every cache bust
	 * to handle stale object cache entries.
	 *
	 * @var int|null
	 */
	private static $cache_version = null;

	/**
	 * Constructor — registers invalidation hooks.
	 */
	public function __construct() {
		// Invalidate when a blockive_template is saved.
		add_action( 'save_post_' . BLOCKIVE_TEMPLATE_POST_TYPE, [ $this, 'invalidate_all' ], 10, 0 );

		// Invalidate when a blockive_template is deleted.
		add_action( 'before_delete_post', [ $this, 'invalidate_on_delete' ], 10, 2 );
		add_action( 'trashed_post', [ $this, 'invalidate_on_trash' ] );

		// Invalidate when post status changes.
		add_action( 'transition_post_status', [ $this, 'invalidate_on_status_change' ], 10, 3 );

		// Invalidate when template meta changes.
		add_action( 'updated_post_meta', [ $this, 'invalidate_on_meta_change' ], 10, 4 );
		add_action( 'added_post_meta', [ $this, 'invalidate_on_meta_change' ], 10, 4 );
		add_action( 'deleted_post_meta', [ $this, 'invalidate_on_meta_change' ], 10, 4 );
	}

	/* ──────────────────────────────────────────────
	 * Cache Version
	 * ────────────────────────────────────────────── */

	/**
	 * Get the current cache version.
	 *
	 * The version is stored as a transient. When bumped, all
	 * versioned cache keys become stale automatically.
	 *
	 * @return int
	 */
	private static function get_version(): int {
		if ( null !== self::$cache_version ) {
			return self::$cache_version;
		}

		$version = (int) get_transient( self::TRANSIENT_PREFIX . 'version' );

		if ( 0 === $version ) {
			$version = 1;
			set_transient( self::TRANSIENT_PREFIX . 'version', $version );
		}

		self::$cache_version = $version;

		return $version;
	}

	/**
	 * Bump the cache version, invalidating all versioned entries.
	 *
	 * @return void
	 */
	private static function bump_version(): void {
		$version = self::get_version() + 1;

		set_transient( self::TRANSIENT_PREFIX . 'version', $version );

		self::$cache_version = $version;
	}

	/* ──────────────────────────────────────────────
	 * Cache Key Helpers
	 * ────────────────────────────────────────────── */

	/**
	 * Build a versioned transient key.
	 *
	 * @param string $key Base key identifier.
	 * @return string Full transient key.
	 */
	private static function transient_key( string $key ): string {
		return self::TRANSIENT_PREFIX . self::get_version() . '_' . $key;
	}

	/**
	 * Build a versioned wp_cache key.
	 *
	 * @param string $key Base key identifier.
	 * @return string Full cache key.
	 */
	private static function cache_key( string $key ): string {
		return 'v' . self::get_version() . '_' . $key;
	}

	/* ──────────────────────────────────────────────
	 * Template Query Cache (Transient)
	 * ────────────────────────────────────────────── */

	/**
	 * Get cached template IDs for a given type.
	 *
	 * Returns an array of post IDs ordered by priority,
	 * or false on cache miss.
	 *
	 * @param string $type Template type slug.
	 * @return int[]|false Array of post IDs or false on miss.
	 */
	public static function get_template_ids( string $type ) {
		$key = self::transient_key( 'tpl_' . sanitize_key( $type ) );

		// Try object cache first (faster).
		$cached = wp_cache_get( self::cache_key( 'tpl_' . $type ), self::CACHE_GROUP );

		if ( false !== $cached ) {
			return $cached;
		}

		// Fall back to transient.
		$transient = get_transient( $key );

		if ( false !== $transient && is_array( $transient ) ) {
			// Populate object cache for subsequent calls this request.
			wp_cache_set( self::cache_key( 'tpl_' . $type ), $transient, self::CACHE_GROUP );

			return $transient;
		}

		return false;
	}

	/**
	 * Store template IDs for a given type.
	 *
	 * @param string $type         Template type slug.
	 * @param int[]  $template_ids Array of post IDs.
	 * @return void
	 */
	public static function set_template_ids( string $type, array $template_ids ): void {
		$key = self::transient_key( 'tpl_' . sanitize_key( $type ) );

		set_transient( $key, $template_ids, self::TRANSIENT_TTL );

		wp_cache_set( self::cache_key( 'tpl_' . $type ), $template_ids, self::CACHE_GROUP );
	}

	/* ──────────────────────────────────────────────
	 * Resolved Winner Cache (Object Cache Only)
	 * ────────────────────────────────────────────── */

	/**
	 * Get the cached resolved winner for a template type.
	 *
	 * Returns a post ID on hit, -1 for cached "no match", or false on miss.
	 *
	 * @param string $type Template type slug.
	 * @return int|false Post ID, -1, or false on miss.
	 */
	public static function get_resolved( string $type ) {
		return wp_cache_get( self::cache_key( 'resolved_' . $type ), self::CACHE_GROUP );
	}

	/**
	 * Store the resolved winner for a template type.
	 *
	 * @param string $type        Template type slug.
	 * @param int    $template_id Winning template ID, or -1 for no match.
	 * @return void
	 */
	public static function set_resolved( string $type, int $template_id ): void {
		wp_cache_set( self::cache_key( 'resolved_' . $type ), $template_id, self::CACHE_GROUP );
	}

	/* ──────────────────────────────────────────────
	 * Condition Result Cache (Object Cache Only)
	 * ────────────────────────────────────────────── */

	/**
	 * Get cached condition evaluation result for a template.
	 *
	 * @param int $template_id Template post ID.
	 * @return bool|null True/false for cached result, null for miss.
	 */
	public static function get_condition_result( int $template_id ): ?bool {
		$result = wp_cache_get( self::cache_key( 'cond_' . $template_id ), self::CACHE_GROUP );

		if ( false === $result ) {
			return null; // Cache miss.
		}

		return (bool) $result;
	}

	/**
	 * Store condition evaluation result for a template.
	 *
	 * @param int  $template_id Template post ID.
	 * @param bool $match       Whether conditions matched.
	 * @return void
	 */
	public static function set_condition_result( int $template_id, bool $match ): void {
		// Store as 1/0 since wp_cache can't distinguish false from miss.
		wp_cache_set( self::cache_key( 'cond_' . $template_id ), $match ? 1 : 0, self::CACHE_GROUP );
	}

	/* ──────────────────────────────────────────────
	 * Template Count Cache (Transient)
	 * ────────────────────────────────────────────── */

	/**
	 * Check if any published templates exist at all.
	 *
	 * Uses a cheap COUNT query cached in a transient.
	 * Returns false on cache miss.
	 *
	 * @return bool|null True if templates exist, false if none, null on cache miss.
	 */
	public static function has_any_templates(): ?bool {
		$key    = self::transient_key( 'has_any' );
		$cached = get_transient( $key );

		if ( false === $cached ) {
			return null;
		}

		return '1' === $cached;
	}

	/**
	 * Store whether any published templates exist.
	 *
	 * @param bool $exists Whether templates exist.
	 * @return void
	 */
	public static function set_has_any_templates( bool $exists ): void {
		$key = self::transient_key( 'has_any' );

		set_transient( $key, $exists ? '1' : '0', self::TRANSIENT_TTL );
	}

	/* ──────────────────────────────────────────────
	 * Invalidation
	 * ────────────────────────────────────────────── */

	/**
	 * Invalidate all template caches.
	 *
	 * Bumps the version so all versioned transients and
	 * object cache entries become stale.
	 *
	 * @return void
	 */
	public function invalidate_all(): void {
		self::flush();
	}

	/**
	 * Invalidate on post deletion (only for our CPT).
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post    Post object.
	 * @return void
	 */
	public function invalidate_on_delete( int $post_id, $post ): void {
		if ( ! $post instanceof \WP_Post ) {
			return;
		}

		if ( BLOCKIVE_TEMPLATE_POST_TYPE === $post->post_type ) {
			self::flush();
		}
	}

	/**
	 * Invalidate on post trash (only for our CPT).
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	public function invalidate_on_trash( int $post_id ): void {
		$post_type = get_post_type( $post_id );

		if ( BLOCKIVE_TEMPLATE_POST_TYPE === $post_type ) {
			self::flush();
		}
	}

	/**
	 * Invalidate when a post status changes (only for our CPT).
	 *
	 * This catches publish → draft, draft → publish, etc.
	 *
	 * @param string   $new_status New status.
	 * @param string   $old_status Old status.
	 * @param \WP_Post $post       Post object.
	 * @return void
	 */
	public function invalidate_on_status_change( string $new_status, string $old_status, \WP_Post $post ): void {
		if ( BLOCKIVE_TEMPLATE_POST_TYPE !== $post->post_type ) {
			return;
		}

		// Only flush if status actually changed.
		if ( $new_status !== $old_status ) {
			self::flush();
		}
	}

	/**
	 * Invalidate when template-related meta changes.
	 *
	 * Only flushes for our meta keys to avoid unnecessary invalidation.
	 *
	 * @param int    $meta_id    Meta ID.
	 * @param int    $object_id  Post ID.
	 * @param string $meta_key   Meta key.
	 * @param mixed  $meta_value Meta value.
	 * @return void
	 */
	public function invalidate_on_meta_change( $meta_id, int $object_id, string $meta_key, $meta_value ): void {
		$watched_keys = [
			BLOCKIVE_TEMPLATE_META_TYPE,
			BLOCKIVE_TEMPLATE_META_CONDITIONS,
			BLOCKIVE_TEMPLATE_META_PRIORITY,
		];

		if ( ! in_array( $meta_key, $watched_keys, true ) ) {
			return;
		}

		// Confirm it's our CPT.
		$post_type = get_post_type( $object_id );

		if ( BLOCKIVE_TEMPLATE_POST_TYPE !== $post_type ) {
			return;
		}

		self::flush();
	}

	/* ──────────────────────────────────────────────
	 * Static Flush
	 * ────────────────────────────────────────────── */

	/**
	 * Flush all template caches.
	 *
	 * Bumps the version counter, making all versioned keys stale.
	 * Also flushes the entire wp_cache group if supported.
	 *
	 * @return void
	 */
	public static function flush(): void {
		self::bump_version();

		// Try to flush the entire cache group (works with Redis, Memcached, etc.).
		if ( function_exists( 'wp_cache_flush_group' ) ) {
			wp_cache_flush_group( self::CACHE_GROUP );
		}

		/**
		 * Fires after all Theme Builder caches have been flushed.
		 *
		 * @since 1.1.0
		 */
		do_action( 'blockive/cache_flushed' );
	}
}
