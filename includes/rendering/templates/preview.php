<?php
/**
 * Preview Template.
 *
 * Renders a template preview with a lightweight admin bar
 * showing template info and action buttons. This is NOT an
 * iframe — it's a full standalone page.
 *
 * @package Blockive\ThemeBuilder\Rendering
 * @since   1.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$blockive_tpl = $GLOBALS['blockive_preview_template'] ?? null;

if ( ! $blockive_tpl ) {
	wp_die( esc_html__( 'No template to preview.', 'blockive-premium-addon-for-block' ) );
}

$renderer      = new \Blockive\ThemeBuilder\Rendering\Template_Renderer();
$template_type = get_post_meta( $blockive_tpl->ID, BLOCKIVE_TEMPLATE_META_TYPE, true );
$edit_url      = get_edit_post_link( $blockive_tpl->ID, 'raw' );
$type_label    = ucfirst( $template_type ?: __( 'Unknown', 'blockive-premium-addon-for-block' ) );

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="noindex, nofollow">
	<title><?php echo esc_html( $blockive_tpl->post_title . ' — ' . __( 'Preview', 'blockive-premium-addon-for-block' ) ); ?></title>
	<?php wp_head(); ?>
	<style>
		/* ── Preview Bar ─────────────────────────── */
		.blockive-preview-bar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 999999;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			height: 48px;
			padding: 0 20px;
			background: #1e1e1e;
			color: #f0f0f0;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
			font-size: 13px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
		}
		.blockive-preview-bar__info {
			display: flex;
			align-items: center;
			gap: 12px;
		}
		.blockive-preview-bar__badge {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			padding: 3px 10px;
			background: rgba(34, 113, 177, 0.2);
			color: #72aee6;
			border-radius: 3px;
			font-size: 11px;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
		.blockive-preview-bar__badge .dashicons {
			font-size: 14px;
			width: 14px;
			height: 14px;
		}
		.blockive-preview-bar__title {
			font-weight: 500;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 300px;
		}
		.blockive-preview-bar__status {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			padding: 2px 8px;
			border-radius: 3px;
			font-size: 11px;
			font-weight: 600;
		}
		.blockive-preview-bar__status--publish {
			background: rgba(0, 163, 42, 0.15);
			color: #68de7c;
		}
		.blockive-preview-bar__status--draft {
			background: rgba(204, 150, 0, 0.15);
			color: #f0c33c;
		}
		.blockive-preview-bar__actions {
			display: flex;
			align-items: center;
			gap: 8px;
		}
		.blockive-preview-bar__btn {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			padding: 6px 14px;
			border: 1px solid rgba(255, 255, 255, 0.15);
			border-radius: 4px;
			background: transparent;
			color: #f0f0f0;
			font-size: 12px;
			font-weight: 500;
			text-decoration: none;
			cursor: pointer;
			transition: background 0.15s, border-color 0.15s;
		}
		.blockive-preview-bar__btn:hover {
			background: rgba(255, 255, 255, 0.08);
			border-color: rgba(255, 255, 255, 0.3);
			color: #fff;
		}
		.blockive-preview-bar__btn--primary {
			background: #2271b1;
			border-color: #2271b1;
		}
		.blockive-preview-bar__btn--primary:hover {
			background: #135e96;
			border-color: #135e96;
		}
		.blockive-preview-bar__btn .dashicons {
			font-size: 14px;
			width: 14px;
			height: 14px;
		}

		/* Push page content below the bar */
		.blockive-preview-body {
			padding-top: 48px;
		}
	</style>
</head>
<body class="blockive-preview-body" <?php body_class( 'blockive-tb-preview' ); ?>>

	<!-- Preview Admin Bar -->
	<div class="blockive-preview-bar" role="banner">
		<div class="blockive-preview-bar__info">
			<span class="blockive-preview-bar__badge">
				<span class="dashicons dashicons-visibility"></span>
				<?php esc_html_e( 'Preview', 'blockive-premium-addon-for-block' ); ?>
			</span>
			<span class="blockive-preview-bar__title">
				<?php echo esc_html( $blockive_tpl->post_title ); ?>
			</span>
			<span class="blockive-preview-bar__badge">
				<?php echo esc_html( $type_label ); ?>
			</span>
			<?php
			$status_class = 'publish' === $blockive_tpl->post_status ? 'publish' : 'draft';
			$status_label = 'publish' === $blockive_tpl->post_status
				? __( 'Published', 'blockive-premium-addon-for-block' )
				: ucfirst( $blockive_tpl->post_status );
			?>
			<span class="blockive-preview-bar__status blockive-preview-bar__status--<?php echo esc_attr( $status_class ); ?>">
				<?php echo esc_html( $status_label ); ?>
			</span>
		</div>
		<div class="blockive-preview-bar__actions">
			<?php if ( $edit_url ) : ?>
				<a href="<?php echo esc_url( $edit_url ); ?>" class="blockive-preview-bar__btn blockive-preview-bar__btn--primary">
					<span class="dashicons dashicons-edit"></span>
					<?php esc_html_e( 'Edit Template', 'blockive-premium-addon-for-block' ); ?>
				</a>
			<?php endif; ?>
			<button type="button" class="blockive-preview-bar__btn" onclick="window.close()">
				<span class="dashicons dashicons-no-alt"></span>
				<?php esc_html_e( 'Close', 'blockive-premium-addon-for-block' ); ?>
			</button>
		</div>
	</div>

	<!-- Template Content -->
	<div class="blockive-tb-preview__content" data-template-id="<?php echo esc_attr( $blockive_tpl->ID ); ?>">
		<?php $renderer->render( $blockive_tpl ); ?>
	</div>

	<?php wp_footer(); ?>
</body>
</html>
