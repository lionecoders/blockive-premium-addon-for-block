<?php
/**
 * Theme Builder Constants.
 *
 * Defines all constants used by the Theme Builder module.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Custom post type slug for theme builder templates.
 *
 * @var string
 */
if ( ! defined( 'BLOCKIVE_TEMPLATE_POST_TYPE' ) ) {
	define( 'BLOCKIVE_TEMPLATE_POST_TYPE', 'blockive_template' );
}

/**
 * Meta key for template type (e.g., header, footer, single, archive).
 *
 * @var string
 */
if ( ! defined( 'BLOCKIVE_TEMPLATE_META_TYPE' ) ) {
	define( 'BLOCKIVE_TEMPLATE_META_TYPE', '_blockive_template_type' );
}

/**
 * Meta key for template display conditions.
 *
 * @var string
 */
if ( ! defined( 'BLOCKIVE_TEMPLATE_META_CONDITIONS' ) ) {
	define( 'BLOCKIVE_TEMPLATE_META_CONDITIONS', '_blockive_conditions' );
}

/**
 * Meta key for template display priority (lower = higher priority).
 *
 * @var string
 */
if ( ! defined( 'BLOCKIVE_TEMPLATE_META_PRIORITY' ) ) {
	define( 'BLOCKIVE_TEMPLATE_META_PRIORITY', '_blockive_priority' );
}
