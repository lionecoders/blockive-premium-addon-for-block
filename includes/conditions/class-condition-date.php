<?php
/**
 * Date Condition.
 *
 * Matches based on the current date/time context:
 * weekday, weekend, specific day, time ranges.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_Date
 */
class Condition_Date extends Condition_Base {

	/**
	 * {@inheritDoc}
	 */
	public function get_slug(): string {
		return 'date';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_label(): string {
		return __( 'Date & Time', 'blockive-premium-addon-for-block' );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_group(): string {
		return 'date';
	}

	/**
	 * {@inheritDoc}
	 */
	public function supports_sub_selection(): bool {
		return true;
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_sub_options(): array {
		return [
			'weekday'  => __( 'Weekday (Mon–Fri)', 'blockive-premium-addon-for-block' ),
			'weekend'  => __( 'Weekend (Sat–Sun)', 'blockive-premium-addon-for-block' ),
			'monday'   => __( 'Monday', 'blockive-premium-addon-for-block' ),
			'tuesday'  => __( 'Tuesday', 'blockive-premium-addon-for-block' ),
			'wednesday' => __( 'Wednesday', 'blockive-premium-addon-for-block' ),
			'thursday' => __( 'Thursday', 'blockive-premium-addon-for-block' ),
			'friday'   => __( 'Friday', 'blockive-premium-addon-for-block' ),
			'saturday' => __( 'Saturday', 'blockive-premium-addon-for-block' ),
			'sunday'   => __( 'Sunday', 'blockive-premium-addon-for-block' ),
		];
	}

	/**
	 * {@inheritDoc}
	 */
	public function match( array $rule ): bool {
		$sub_type = $rule['sub_type'] ?? 'weekday';

		// Use WordPress timezone.
		$now     = current_datetime();
		$day_num = (int) $now->format( 'N' ); // 1 = Monday, 7 = Sunday.
		$day_map = [
			1 => 'monday',
			2 => 'tuesday',
			3 => 'wednesday',
			4 => 'thursday',
			5 => 'friday',
			6 => 'saturday',
			7 => 'sunday',
		];

		switch ( $sub_type ) {
			case 'weekday':
				return $day_num >= 1 && $day_num <= 5;

			case 'weekend':
				return $day_num >= 6;
		}

		// Specific day name.
		$current_day = $day_map[ $day_num ] ?? '';

		return $sub_type === $current_day;
	}
}
