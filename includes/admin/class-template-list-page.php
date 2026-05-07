<?php
/**
 * Template List Page.
 *
 * Renders the empty Theme Builder template list admin page.
 *
 * @package Blockive\ThemeBuilder\Admin
 * @since   1.1.0
 */

namespace Blockive\ThemeBuilder\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Template_List_Page
 */
class Template_List_Page {

	/**
	 * Render the template list page.
	 *
	 * @return void
	 */
	public function render(): void {
		?>
		<div class="wrap blockive-theme-builder-wrap">
			<div class="blockive-tb-header">
				<h1 class="blockive-tb-title">
					<?php esc_html_e( 'Theme Builder', 'blockive-premium-addon-for-block' ); ?>
				</h1>
				<!-- React mounts the "Add New Template" button + modal here. -->
				<div id="blockive-tb-add-new-wrap"></div>
			</div>

			<div class="blockive-tb-description">
				<p>
					<?php
					esc_html_e(
						'Create and manage custom templates for every part of your site — headers, footers, single posts, archives, and more.',
						'blockive-premium-addon-for-block'
					);
					?>
				</p>
			</div>

			<div id="blockive-theme-builder-root" class="blockive-tb-content">
				<!-- Future React template list will render here. -->
				<div class="blockive-tb-empty-state">
					<div class="blockive-tb-empty-icon">
						<span class="dashicons dashicons-layout"></span>
					</div>
					<h2><?php esc_html_e( 'No templates yet', 'blockive-premium-addon-for-block' ); ?></h2>
					<p>
						<?php
						esc_html_e(
							'Get started by creating your first template. You can build headers, footers, single page layouts, and more.',
							'blockive-premium-addon-for-block'
						);
						?>
					</p>
					<button type="button"
							class="button button-primary button-hero blockive-tb-cta"
							onclick="document.querySelector('.blockive-tb-add-new-btn')?.click()">
						<?php esc_html_e( 'Create Your First Template', 'blockive-premium-addon-for-block' ); ?>
					</button>
				</div>
			</div>
		</div>
		<?php
	}
}
