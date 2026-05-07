<?php
/**
 * Admin Menu Registration.
 *
 * Registers the "Blockive → Theme Builder" admin menu item,
 * enqueues the React-based admin app, and delegates rendering
 * to Template_List_Page.
 *
 * @package Blockive\ThemeBuilder\Admin
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Admin_Menu
 */
class Admin_Menu {

	/**
	 * Top-level menu slug.
	 */
	public const PARENT_SLUG = 'blockive';

	/**
	 * Theme Builder submenu slug.
	 */
	public const MENU_SLUG = 'blockive-theme-builder';

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'register_menus' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
	}

	/**
	 * Register the top-level and submenu pages.
	 *
	 * @return void
	 */
	public function register_menus(): void {
		global $menu;

		$menu_exists = false;
		if ( is_array( $menu ) ) {
			foreach ( $menu as $item ) {
				if ( isset( $item[2] ) && self::PARENT_SLUG === $item[2] ) {
					$menu_exists = true;
					break;
				}
			}
		}

		if ( ! $menu_exists ) {
			add_menu_page(
				__( 'Blockive', 'blockive-premium-addon-for-block' ),
				__( 'Blockive', 'blockive-premium-addon-for-block' ),
				'manage_options',
				self::PARENT_SLUG,
				'__return_empty_string',
				'dashicons-screenoptions',
				59
			);
		}

		add_submenu_page(
			self::PARENT_SLUG,
			__( 'Theme Builder', 'blockive-premium-addon-for-block' ),
			__( 'Theme Builder', 'blockive-premium-addon-for-block' ),
			'manage_options',
			self::MENU_SLUG,
			[ $this, 'render_page' ]
		);

		remove_submenu_page( self::PARENT_SLUG, self::PARENT_SLUG );
	}

	/**
	 * Enqueue admin styles and the React app on the Theme Builder page.
	 *
	 * @param string $hook_suffix Current admin page hook suffix.
	 * @return void
	 */
	public function enqueue_admin_assets( string $hook_suffix ): void {
		if ( false === strpos( $hook_suffix, self::MENU_SLUG ) ) {
			return;
		}

		// Static admin CSS.
		wp_enqueue_style(
			'blockive-theme-builder-admin',
			BPAFB_URL . 'includes/admin/css/theme-builder-admin.css',
			[],
			BPAFB_VERSION
		);

		// React app — built by wp-scripts into build/admin/.
		$asset_file = BPAFB_PATH . 'build/admin/theme-builder.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			'blockive-theme-builder-app',
			BPAFB_URL . 'build/admin/theme-builder.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// Extracted CSS from the React build.
		$css_file = BPAFB_PATH . 'build/admin/style-theme-builder.css';
		if ( file_exists( $css_file ) ) {
			wp_enqueue_style(
				'blockive-theme-builder-app',
				BPAFB_URL . 'build/admin/style-theme-builder.css',
				[ 'wp-components' ],
				$asset['version']
			);
		}

		wp_localize_script(
			'blockive-theme-builder-app',
			'blockiveThemeBuilder',
			[
				'newPostUrl' => admin_url( 'post-new.php?post_type=' . BLOCKIVE_TEMPLATE_POST_TYPE ),
			]
		);
	}

	/**
	 * Render the Theme Builder page.
	 *
	 * @return void
	 */
	public function render_page(): void {
		$list_page = new Template_List_Page();
		$list_page->render();
	}
}
