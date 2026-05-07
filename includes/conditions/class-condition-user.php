<?php
/**
 * User Condition.
 *
 * Matches based on user authentication state and roles:
 * logged in, logged out, specific user role.
 *
 * @package Blockive\ThemeBuilder\Conditions
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Conditions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Condition_User
 */
class Condition_User extends Condition_Base {

	/**
	 * {@inheritDoc}
	 */
	public function get_slug(): string {
		return 'user';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_label(): string {
		return __( 'User', 'blockive-premium-addon-for-block' );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_group(): string {
		return 'user';
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
		$options = [
			'logged_in'  => __( 'Logged In', 'blockive-premium-addon-for-block' ),
			'logged_out' => __( 'Logged Out', 'blockive-premium-addon-for-block' ),
		];

		// Add WordPress roles.
		$editable_roles = wp_roles()->get_names();
		foreach ( $editable_roles as $role_slug => $role_name ) {
			$options[ 'role_' . $role_slug ] = sprintf(
				/* translators: %s: User role name */
				__( 'Role: %s', 'blockive-premium-addon-for-block' ),
				translate_user_role( $role_name )
			);
		}

		return $options;
	}

	/**
	 * {@inheritDoc}
	 */
	public function match( array $rule ): bool {
		$sub_type = $rule['sub_type'] ?? 'logged_in';

		switch ( $sub_type ) {
			case 'logged_in':
				return is_user_logged_in();

			case 'logged_out':
				return ! is_user_logged_in();
		}

		// Role check (sub_type = 'role_<slug>').
		if ( 0 === strpos( $sub_type, 'role_' ) ) {
			if ( ! is_user_logged_in() ) {
				return false;
			}

			$role = substr( $sub_type, 5 );
			$user = wp_get_current_user();

			return in_array( $role, (array) $user->roles, true );
		}

		return false;
	}
}
