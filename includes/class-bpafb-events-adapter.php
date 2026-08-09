<?php
/**
 * Adapter that normalizes event field access across event plugins.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Every Event Template Block, plus the Dynamic Field "Event Plugins"
 * provider, reads event data through this one adapter instead of talking to
 * a specific plugin's API directly. It tries The Events Calendar first,
 * falls back to Modern Events Calendar, and finally falls back to generic
 * post meta keys so Event blocks still work with any events setup (or none)
 * that populates those keys itself.
 */
class Bpafb_Events_Adapter
{
	/**
	 * Detects which event data source is available.
	 *
	 * @return string "tec", "mec", or "generic".
	 */
	public static function get_source()
	{
		if (class_exists('Tribe__Events__Main')) {
			return 'tec';
		}
		if (defined('MEC_VERSION') || class_exists('MEC_main') || class_exists('MEC_events')) {
			return 'mec';
		}
		return 'generic';
	}

	/**
	 * The event post type for the active source.
	 *
	 * @return string
	 */
	public static function get_event_post_type()
	{
		switch (self::get_source()) {
			case 'tec':
				return 'tribe_events';
			case 'mec':
				return 'mec-events';
			default:
				return 'event';
		}
	}

	/**
	 * Resolves a normalized event field.
	 *
	 * Supported field keys: start_date, end_date, start_time, end_time,
	 * venue, address, organizer, organizer_url, cost, map_url.
	 * Unknown keys fall through to raw post meta with the same key.
	 *
	 * @param string   $field   Normalized field key.
	 * @param int|null $post_id Event post id, defaults to the current post.
	 * @return string
	 */
	public static function get_field($field, $post_id = null)
	{
		$post_id = $post_id ? (int) $post_id : get_the_ID();
		if (!$post_id) {
			return '';
		}

		switch (self::get_source()) {
			case 'tec':
				return self::tec_field($field, $post_id);
			case 'mec':
				return self::mec_field($field, $post_id);
			default:
				return self::generic_field($field, $post_id);
		}
	}

	/**
	 * The Events Calendar field resolution.
	 *
	 * @param string $field   Field key.
	 * @param int    $post_id Post id.
	 * @return string
	 */
	private static function tec_field($field, $post_id)
	{
		switch ($field) {
			case 'start_date':
				return function_exists('tribe_get_start_date') ? tribe_get_start_date($post_id, false) : '';
			case 'end_date':
				return function_exists('tribe_get_end_date') ? tribe_get_end_date($post_id, false) : '';
			case 'start_time':
				return function_exists('tribe_get_start_time') ? tribe_get_start_time($post_id) : '';
			case 'end_time':
				return function_exists('tribe_get_end_time') ? tribe_get_end_time($post_id) : '';
			case 'venue':
				return function_exists('tribe_get_venue') ? tribe_get_venue($post_id) : '';
			case 'address':
				return function_exists('tribe_get_full_address') ? tribe_get_full_address($post_id) : '';
			case 'organizer':
				return function_exists('tribe_get_organizer') ? tribe_get_organizer($post_id) : '';
			case 'organizer_url':
				return function_exists('tribe_get_organizer_website_link') ? tribe_get_organizer_website_link($post_id) : '';
			case 'cost':
				return function_exists('tribe_get_cost') ? tribe_get_cost($post_id, true) : '';
			case 'map_url':
				return function_exists('tribe_get_map_link_url') ? tribe_get_map_link_url($post_id) : '';
			default:
				return (string) get_post_meta($post_id, $field, true);
		}
	}

	/**
	 * Modern Events Calendar field resolution. MEC's schema stores most
	 * details as post meta on the `mec-events` CPT; this is a best-effort
	 * mapping of MEC's documented meta keys.
	 *
	 * @param string $field   Field key.
	 * @param int    $post_id Post id.
	 * @return string
	 */
	private static function mec_field($field, $post_id)
	{
		$meta_map = [
			'start_date'    => 'mec_start_date',
			'end_date'      => 'mec_end_date',
			'start_time'    => 'mec_start_time_hour',
			'end_time'      => 'mec_end_time_hour',
			'cost'          => 'mec_fees',
			'organizer_url' => 'mec_organizer_url',
		];

		if ($field === 'venue' || $field === 'address') {
			$location_id = get_post_meta($post_id, 'mec_location_id', true);
			if ($location_id) {
				return $field === 'venue'
					? get_the_title($location_id)
					: (string) get_post_meta($location_id, 'mec_address', true);
			}
			return '';
		}

		if ($field === 'organizer') {
			$organizer_id = get_post_meta($post_id, 'mec_organizer_id', true);
			return $organizer_id ? get_the_title($organizer_id) : '';
		}

		$meta_key = isset($meta_map[$field]) ? $meta_map[$field] : $field;
		return (string) get_post_meta($post_id, $meta_key, true);
	}

	/**
	 * Generic post-meta fallback used when no supported events plugin is
	 * active, so Event blocks still work against any custom-fields setup.
	 *
	 * @param string $field   Field key.
	 * @param int    $post_id Post id.
	 * @return string
	 */
	private static function generic_field($field, $post_id)
	{
		$meta_map = [
			'start_date'    => '_event_start_date',
			'end_date'      => '_event_end_date',
			'start_time'    => '_event_start_time',
			'end_time'      => '_event_end_time',
			'venue'         => '_event_venue',
			'address'       => '_event_address',
			'organizer'     => '_event_organizer',
			'organizer_url' => '_event_organizer_url',
			'cost'          => '_event_cost',
			'map_url'       => '_event_map_url',
		];

		$meta_key = isset($meta_map[$field]) ? $meta_map[$field] : $field;
		return (string) get_post_meta($post_id, $meta_key, true);
	}
}
