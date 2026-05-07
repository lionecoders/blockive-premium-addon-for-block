<?php
/**
 * Canvas Template.
 *
 * Minimal HTML document used for full-page template overrides
 * (single, archive, 404, search). Renders just the Blockive
 * template content inside a clean HTML shell with wp_head/wp_footer.
 *
 * This file is loaded via the template_include filter when a
 * matching blockive_template is found for the current request.
 *
 * @package Blockive\ThemeBuilder\Rendering
 * @since   1.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$blockive_template = $GLOBALS['blockive_current_template'] ?? null;

if ( ! $blockive_template ) {
	// Fallback: load the theme's index.php.
	locate_template( 'index.php', true );
	return;
}

$renderer = new \Blockive\ThemeBuilder\Rendering\Template_Renderer();

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'blockive-tb-canvas' ); ?>>
<?php
	wp_body_open();
?>

<div class="blockive-tb-canvas__content" data-template-id="<?php echo esc_attr( $blockive_template->ID ); ?>">
	<?php $renderer->render( $blockive_template ); ?>
</div>

<?php wp_footer(); ?>
</body>
</html>
