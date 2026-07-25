<?php
/**
 * Plugin Name:           Blockive - Premium Addon For Block
 * Description:           A powerful Blockive addon plugin that offers a wide range of Blocks
 * Plugin URI:            https://lionecoders.com
 * Version:               1.0.0
 * Requires at least:     6.8
 * Requires PHP:          7.4
 * Author:                Lionecoders
 * License:               GPL-2.0-or-later
 * License URI:           https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:           blockive-premium-addon-for-block
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define('BPAFB_PATH', plugin_dir_path(__FILE__));
define('BPAFB_URL', plugin_dir_url(__FILE__));
define('BPAFB_VERSION', '1.0.0');

/**
 * Main Class for Blockive Premium Addon For Block.
 */
class Blockive_Premium_Addon_For_Block
{

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		$this->bpafb_setup_hooks();
	}

	/**
	 * Setup WordPress hooks.
	 */
	public function bpafb_setup_hooks()
	{
		add_filter('block_categories_all', [$this, 'bpafb_register_block_categories'], 10, 2);
		add_action('init', [$this, 'bpafb_register_blocks']);
		add_action('enqueue_block_assets', [$this, 'bpafb_enqueue_global_assets']);
		add_action('enqueue_block_editor_assets', [$this, 'bpafb_enqueue_editor_assets']);
		add_filter('render_block', [$this, 'bpafb_render_block_container'], 10, 2);
	}

	/**
	 * Registers the block categories.
	 *
	 * @param array $categories Array of categories for blocks.
	 * @return array
	 */
	public function bpafb_register_block_categories($categories)
	{
		return array_merge(
			[
				[
					'slug' => 'bpafb-widgets',
					'title' => esc_html__('Blockive', 'blockive-premium-addon-for-block'),
				],
			],
			$categories
		);
	}

	/**
	 * Registers the blocks based on the manifest.
	 */
	public function bpafb_register_blocks()
	{
		if (function_exists('wp_register_block_types_from_metadata_collection')) {
			wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		} else {
			$block_json_files = glob(__DIR__ . '/build/*/block.json');
			foreach ($block_json_files as $file) {
				register_block_type(dirname($file));
			}
		}

		// Unregister blocks that require third-party plugins if those plugins are not active.
		$registry = WP_Block_Type_Registry::get_instance();

		// Contact Form 7
		if (!function_exists('wpcf7') && !defined('WPCF7_PLUGIN')) {
			if ($registry->is_registered('blockive-premium-addon-for-block/contact-form-7')) {
				unregister_block_type('blockive-premium-addon-for-block/contact-form-7');
			}
		}


	}

	/**
	 * Enqueue global assets for blocks.
	 */
	public function bpafb_enqueue_global_assets()
	{
		wp_enqueue_style('bpafb-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', [], '6.5.1');
		wp_enqueue_style('bpafb-container-settings', BPAFB_URL . 'assets/css/container-settings.css', [], BPAFB_VERSION);
		wp_enqueue_script(
			'bpafb-frontend-animations',
			BPAFB_URL . 'assets/js/frontend-animations.js',
			[],
			BPAFB_VERSION,
			true
		);
	}

	/**
	 * Enqueue script for block editor container settings.
	 */
	public function bpafb_enqueue_editor_assets()
	{
		wp_enqueue_style(
			'bpafb-editor-shared-controls',
			BPAFB_URL . 'assets/css/editor-shared-controls.css',
			[ 'wp-components' ],
			BPAFB_VERSION
		);
		wp_enqueue_script(
			'bpafb-editor-container-settings',
			BPAFB_URL . 'assets/js/editor-container-settings.js',
			[
				'wp-element',
				'wp-compose',
				'wp-hooks',
			],
			BPAFB_VERSION,
			true
		);
	}

	/**
	 * Filter block rendering on frontend to apply container styles.
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The block record.
	 * @return string
	 */
	public function bpafb_render_block_container($block_content, $block)
	{
		// Only target blocks from blockive-premium-addon-for-block namespace
		if (empty($block['blockName']) || strpos($block['blockName'], 'blockive-premium-addon-for-block/') !== 0) {
			return $block_content;
		}

		$attrs = isset($block['attrs']) ? $block['attrs'] : [];

		// Check if any Advanced-tab attributes are set at all (see src/components/advanced-tab).
		$has_container_settings = false;
		foreach ($attrs as $key => $value) {
			if (strpos($key, 'bpafb') === 0 && $value !== null && $value !== '' && $value !== false) {
				$has_container_settings = true;
				break;
			}
		}

		if (!$has_container_settings) {
			return $block_content;
		}

		// Build style array
		$styles = [];
		$classes = ['bpafb-has-container-settings'];

		// Width and Alignment logic
		if (isset($attrs['bpafbContainerWidth'])) {
			$unit = isset($attrs['bpafbContainerWidthUnit']) ? $attrs['bpafbContainerWidthUnit'] : 'px';
			$styles[] = 'width: 100%;';
			$styles[] = 'max-width: ' . floatval($attrs['bpafbContainerWidth']) . esc_attr($unit) . ';';

			$align = isset($attrs['bpafbContainerAlign']) ? $attrs['bpafbContainerAlign'] : 'center';
			if ($align === 'left' || $align === 'center' || $align === 'right') {
				$classes[] = 'bpafb-align-' . $align;
			}
		} else {
			// Apply alignment even without custom width if explicitly set
			if (isset($attrs['bpafbContainerAlign'])) {
				$align = $attrs['bpafbContainerAlign'];
				if ($align === 'left' || $align === 'center' || $align === 'right') {
					$classes[] = 'bpafb-align-' . $align;
				}
			} else {
				// Fallback to custom margins left/right
				if (isset($attrs['bpafbContainerMarginLeft'])) {
					$styles[] = 'margin-left: ' . intval($attrs['bpafbContainerMarginLeft']) . 'px;';
				}
				if (isset($attrs['bpafbContainerMarginRight'])) {
					$styles[] = 'margin-right: ' . intval($attrs['bpafbContainerMarginRight']) . 'px;';
				}
			}
		}

		// Margins
		if (isset($attrs['bpafbContainerMarginTop'])) {
			$styles[] = 'margin-top: ' . intval($attrs['bpafbContainerMarginTop']) . 'px;';
		}
		if (isset($attrs['bpafbContainerMarginRight'])) {
			$styles[] = 'margin-right: ' . intval($attrs['bpafbContainerMarginRight']) . 'px;';
		}
		if (isset($attrs['bpafbContainerMarginBottom'])) {
			$styles[] = 'margin-bottom: ' . intval($attrs['bpafbContainerMarginBottom']) . 'px;';
		}
		if (isset($attrs['bpafbContainerMarginLeft'])) {
			$styles[] = 'margin-left: ' . intval($attrs['bpafbContainerMarginLeft']) . 'px;';
		}

		// Background
		$bg_type = isset($attrs['bpafbContainerBgType']) ? $attrs['bpafbContainerBgType'] : 'color';
		if ($bg_type === 'gradient' && !empty($attrs['bpafbContainerBgGradient'])) {
			$styles[] = 'background-image: ' . esc_attr($attrs['bpafbContainerBgGradient']) . ';';
		} elseif ($bg_type === 'image' && !empty($attrs['bpafbContainerBgImageUrl'])) {
			$styles[] = 'background-image: url(' . esc_url($attrs['bpafbContainerBgImageUrl']) . ');';
			$size = isset($attrs['bpafbContainerBgImageSize']) ? $attrs['bpafbContainerBgImageSize'] : 'cover';
			$styles[] = 'background-size: ' . esc_attr($size) . ';';
			$styles[] = 'background-position: center center;';
			if (!empty($attrs['bpafbContainerOverlayColor'])) {
				$classes[] = 'bpafb-has-bg-overlay';
			}
		} elseif (!empty($attrs['bpafbContainerBgColor'])) {
			$styles[] = 'background-color: ' . esc_attr($attrs['bpafbContainerBgColor']) . ';';
		}

		// Padding
		if (isset($attrs['bpafbContainerPaddingTop'])) {
			$styles[] = 'padding-top: ' . intval($attrs['bpafbContainerPaddingTop']) . 'px;';
		}
		if (isset($attrs['bpafbContainerPaddingRight'])) {
			$styles[] = 'padding-right: ' . intval($attrs['bpafbContainerPaddingRight']) . 'px;';
		}
		if (isset($attrs['bpafbContainerPaddingBottom'])) {
			$styles[] = 'padding-bottom: ' . intval($attrs['bpafbContainerPaddingBottom']) . 'px;';
		}
		if (isset($attrs['bpafbContainerPaddingLeft'])) {
			$styles[] = 'padding-left: ' . intval($attrs['bpafbContainerPaddingLeft']) . 'px;';
		}

		// Border
		if (!empty($attrs['bpafbContainerBorderStyle']) && $attrs['bpafbContainerBorderStyle'] !== 'none') {
			$styles[] = 'border-style: ' . esc_attr($attrs['bpafbContainerBorderStyle']) . ';';
			if (!empty($attrs['bpafbContainerBorderColor'])) {
				$styles[] = 'border-color: ' . esc_attr($attrs['bpafbContainerBorderColor']) . ';';
			}
			if (isset($attrs['bpafbContainerBorderWidth'])) {
				$styles[] = 'border-width: ' . intval($attrs['bpafbContainerBorderWidth']) . 'px;';
			}
		}
		if (isset($attrs['bpafbContainerBorderRadius'])) {
			$styles[] = 'border-radius: ' . intval($attrs['bpafbContainerBorderRadius']) . 'px;';
		}

		// Shadow (normal + hover, hover applied via CSS class since PHP can't do :hover)
		if (!empty($attrs['bpafbContainerBoxShadow'])) {
			$color = !empty($attrs['bpafbContainerShadowColor']) ? $attrs['bpafbContainerShadowColor'] : 'rgba(0,0,0,0.1)';
			$blur = isset($attrs['bpafbContainerShadowBlur']) ? intval($attrs['bpafbContainerShadowBlur']) : 10;
			$spread = isset($attrs['bpafbContainerShadowSpread']) ? intval($attrs['bpafbContainerShadowSpread']) : 0;
			$styles[] = 'box-shadow: 0 4px ' . $blur . 'px ' . $spread . 'px ' . esc_attr($color) . ';';
		}
		if (!empty($attrs['bpafbContainerHoverBoxShadow'])) {
			$hcolor = !empty($attrs['bpafbContainerHoverShadowColor']) ? $attrs['bpafbContainerHoverShadowColor'] : 'rgba(0,0,0,0.15)';
			$hblur = isset($attrs['bpafbContainerHoverShadowBlur']) ? intval($attrs['bpafbContainerHoverShadowBlur']) : 15;
			$hspread = isset($attrs['bpafbContainerHoverShadowSpread']) ? intval($attrs['bpafbContainerHoverShadowSpread']) : 0;
			$styles[] = '--bpafb-hover-shadow: 0 4px ' . $hblur . 'px ' . $hspread . 'px ' . esc_attr($hcolor) . ';';
			$classes[] = 'bpafb-has-hover-shadow';
		}

		// Layout
		if (!empty($attrs['bpafbDisplay'])) {
			$styles[] = 'display: ' . esc_attr($attrs['bpafbDisplay']) . ';';
		}
		if (!empty($attrs['bpafbOverflow'])) {
			$styles[] = 'overflow: ' . esc_attr($attrs['bpafbOverflow']) . ';';
		}
		if (!empty($attrs['bpafbPosition'])) {
			$styles[] = 'position: ' . esc_attr($attrs['bpafbPosition']) . ';';
		}
		if (isset($attrs['bpafbContainerMinHeight'])) {
			$styles[] = 'min-height: ' . intval($attrs['bpafbContainerMinHeight']) . 'px;';
		}
		if (isset($attrs['bpafbContainerMaxHeight'])) {
			$styles[] = 'max-height: ' . intval($attrs['bpafbContainerMaxHeight']) . 'px;';
		}
		if (isset($attrs['bpafbZIndex'])) {
			$styles[] = 'z-index: ' . intval($attrs['bpafbZIndex']) . ';';
		}

		// Transform
		$transforms = [];
		if (!empty($attrs['bpafbTransformRotate'])) {
			$transforms[] = 'rotate(' . floatval($attrs['bpafbTransformRotate']) . 'deg)';
		}
		if (isset($attrs['bpafbTransformScale']) && floatval($attrs['bpafbTransformScale']) !== 100.0) {
			$transforms[] = 'scale(' . (floatval($attrs['bpafbTransformScale']) / 100) . ')';
		}
		if (!empty($attrs['bpafbTransformTranslateX'])) {
			$transforms[] = 'translateX(' . intval($attrs['bpafbTransformTranslateX']) . 'px)';
		}
		if (!empty($attrs['bpafbTransformTranslateY'])) {
			$transforms[] = 'translateY(' . intval($attrs['bpafbTransformTranslateY']) . 'px)';
		}
		if (!empty($transforms)) {
			$styles[] = 'transform: ' . implode(' ', $transforms) . ';';
		}

		// Visibility
		if (!empty($attrs['bpafbHideDesktop'])) {
			$classes[] = 'bpafb-hide-desktop';
		}
		if (!empty($attrs['bpafbHideTablet'])) {
			$classes[] = 'bpafb-hide-tablet';
		}
		if (!empty($attrs['bpafbHideMobile'])) {
			$classes[] = 'bpafb-hide-mobile';
		}

		// Motion effects
		if (!empty($attrs['bpafbHoverAnimation']) && $attrs['bpafbHoverAnimation'] !== 'none') {
			$classes[] = 'bpafb-hover-' . sanitize_html_class($attrs['bpafbHoverAnimation']);
		}
		if (!empty($attrs['bpafbFloatingEffect'])) {
			$classes[] = 'bpafb-floating';
		}

		// Scroll-triggered entrance animation
		$data_attrs = [];
		if (!empty($attrs['bpafbAnimationType']) && $attrs['bpafbAnimationType'] !== 'none') {
			$duration = isset($attrs['bpafbAnimationDuration']) ? intval($attrs['bpafbAnimationDuration']) : 800;
			$delay = isset($attrs['bpafbAnimationDelay']) ? intval($attrs['bpafbAnimationDelay']) : 0;
			$easing = !empty($attrs['bpafbAnimationEasing']) ? $attrs['bpafbAnimationEasing'] : 'ease';
			$classes[] = 'bpafb-animate';
			$data_attrs['data-bpafb-animation'] = sanitize_html_class($attrs['bpafbAnimationType']);
			$styles[] = '--bpafb-anim-duration: ' . $duration . 'ms;';
			$styles[] = '--bpafb-anim-delay: ' . $delay . 'ms;';
			$styles[] = '--bpafb-anim-easing: ' . esc_attr($easing) . ';';
		}

		// Unique id used to scope custom CSS / responsive overrides to this block instance.
		$uid = !empty($attrs['bpafbUid']) ? sanitize_html_class($attrs['bpafbUid']) : '';
		$extra_style_tag = '';
		if ($uid) {
			$classes[] = 'bpafb-uid-' . $uid;
			$extra_style_tag .= $this->bpafb_build_responsive_css($attrs, $uid);
			$extra_style_tag .= $this->bpafb_build_custom_css($attrs, $uid);
		}

		// HTML attributes
		$html_id = !empty($attrs['bpafbHtmlId']) ? $attrs['bpafbHtmlId'] : '';
		if (!empty($attrs['bpafbHtmlClasses'])) {
			$classes[] = $attrs['bpafbHtmlClasses'];
		}
		if (!empty($attrs['bpafbContainerOverlayColor']) && $bg_type === 'image') {
			$styles[] = '--bpafb-overlay-color: ' . esc_attr($attrs['bpafbContainerOverlayColor']) . ';';
		}

		if (empty($styles) && count($classes) === 1 && empty($extra_style_tag) && empty($html_id)) {
			return $block_content;
		}

		$style_attr_value = implode(' ', $styles);

		$output = $this->bpafb_inject_styles($block_content, $style_attr_value, implode(' ', $classes), $html_id, $data_attrs);

		return $extra_style_tag . $output;
	}

	/**
	 * Builds a <style> block for tablet/mobile responsive padding & margin overrides.
	 *
	 * @param array  $attrs Block attributes.
	 * @param string $uid   Unique id used to scope the selector.
	 * @return string
	 */
	private function bpafb_build_responsive_css($attrs, $uid)
	{
		$selector = '.bpafb-uid-' . $uid;
		$breakpoints = [
			'Tablet' => '(max-width: 1024px)',
			'Mobile' => '(max-width: 767px)',
		];
		$sides = ['Top', 'Right', 'Bottom', 'Left'];
		$css = '';

		foreach ($breakpoints as $suffix => $media) {
			$rules = '';
			foreach (['Padding', 'Margin'] as $box) {
				foreach ($sides as $side) {
					$key = 'bpafbContainer' . $box . $side . $suffix;
					if (isset($attrs[$key])) {
						$rules .= strtolower($box) . '-' . strtolower($side) . ': ' . intval($attrs[$key]) . 'px !important;';
					}
				}
			}
			if ($rules) {
				$css .= '@media ' . $media . ' { ' . $selector . ' { ' . $rules . ' } }';
			}
		}

		return $css ? '<style>' . $css . '</style>' : '';
	}

	/**
	 * Builds the scoped Custom CSS <style> block for a block instance.
	 * Users write CSS using the literal word "selector" to target the block wrapper.
	 *
	 * @param array  $attrs Block attributes.
	 * @param string $uid   Unique id used to scope the selector.
	 * @return string
	 */
	private function bpafb_build_custom_css($attrs, $uid)
	{
		if (empty($attrs['bpafbCustomCss'])) {
			return '';
		}

		$css = wp_strip_all_tags($attrs['bpafbCustomCss']);
		$css = str_replace('</style', '', $css);
		$css = str_replace('selector', '.bpafb-uid-' . $uid, $css);

		return '<style>' . $css . '</style>';
	}

	/**
	 * Helper function to inject style, class, id and data-* attributes into the first tag of HTML content.
	 *
	 * @param string $html             The original HTML content.
	 * @param string $new_styles_str   The new inline styles to inject.
	 * @param string $classes_to_add   The custom classes to add to the wrapper.
	 * @param string $id               Optional HTML id to set on the wrapper (does not overwrite an existing id).
	 * @param array  $data_attrs       Optional map of data-* attribute name => value.
	 * @return string
	 */
	private function bpafb_inject_styles($html, $new_styles_str, $classes_to_add = '', $id = '', $data_attrs = [])
	{
		if (preg_match('/^\s*<([a-z0-9-]+)([^>]*)>/i', $html, $matches)) {
			$tag = $matches[1];
			$attributes_str = $matches[2];

			// Check if style attribute already exists
			if ($new_styles_str && preg_match('/style=["\']([^"\']*)["\']/i', $attributes_str, $style_matches)) {
				$existing_styles = rtrim(trim($style_matches[1]), ';') . ';';
				$updated_styles = $existing_styles . ' ' . $new_styles_str;
				$new_attributes_str = preg_replace('/style=["\']([^"\']*)["\']/i', 'style="' . esc_attr($updated_styles) . '"', $attributes_str);
			} elseif ($new_styles_str) {
				$new_attributes_str = $attributes_str . ' style="' . esc_attr($new_styles_str) . '"';
			} else {
				$new_attributes_str = $attributes_str;
			}

			// Also add a custom container class
			if ($classes_to_add && preg_match('/class=["\']([^"\']*)["\']/i', $new_attributes_str, $class_matches)) {
				$updated_classes = trim($class_matches[1]) . ' ' . $classes_to_add;
				$new_attributes_str = preg_replace('/class=["\']([^"\']*)["\']/i', 'class="' . esc_attr($updated_classes) . '"', $new_attributes_str);
			} elseif ($classes_to_add) {
				$new_attributes_str = $new_attributes_str . ' class="' . esc_attr($classes_to_add) . '"';
			}

			// Add an id only if the wrapper doesn't already have one.
			if ($id && !preg_match('/\sid=["\']/i', $new_attributes_str)) {
				$new_attributes_str .= ' id="' . esc_attr($id) . '"';
			}

			foreach ($data_attrs as $attr_name => $attr_value) {
				$new_attributes_str .= ' ' . esc_attr($attr_name) . '="' . esc_attr($attr_value) . '"';
			}

			$pos = strpos($html, $matches[0]);
			$replaced = '<' . $tag . $new_attributes_str . '>';
			return substr($html, 0, $pos) . $replaced . substr($html, $pos + strlen($matches[0]));
		}
		return $html;
	}
}

// Initialize the plugin class.
new Blockive_Premium_Addon_For_Block();
