<?php
/**
 * Output formatting for the universal Dynamic Field Template Block.
 *
 * Deliberately kept out of the block's render.php: render.php is `include`-d
 * fresh on every render (not `include_once`), so declaring a top-level
 * function/class there would fatal ("cannot redeclare") the moment a second
 * Dynamic Field block renders on the same page/request.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Formats a resolved provider value into escaped HTML for the block's chosen
 * output type (text/html/image/link/date/number), applying prefix/suffix and
 * the configured fallback.
 */
class Bpafb_Dynamic_Field_Output
{
	/**
	 * Renders the fully-escaped inner HTML for a resolved field value.
	 *
	 * @param mixed $value      Value returned by Bpafb_Dynamic_Field_Providers::resolve().
	 * @param array $attributes Block attributes (outputType, prefix, suffix, fallback, linkText, dateFormat, fieldKey).
	 * @return string
	 */
	public static function render($value, $attributes)
	{
		$output_type = isset($attributes['outputType']) ? $attributes['outputType'] : 'text';
		$prefix      = isset($attributes['prefix']) ? (string) $attributes['prefix'] : '';
		$suffix      = isset($attributes['suffix']) ? (string) $attributes['suffix'] : '';
		$fallback    = isset($attributes['fallback']) ? (string) $attributes['fallback'] : '';
		$field_key   = isset($attributes['fieldKey']) ? (string) $attributes['fieldKey'] : '';

		switch ($output_type) {
			case 'html':
				return self::render_html($value, $fallback);

			case 'image':
				return self::render_image($value, $fallback);

			case 'link':
				return self::render_link($value, $attributes, $fallback, $field_key);

			case 'date':
				return self::render_date($value, $attributes, $prefix, $suffix, $fallback);

			case 'number':
				return self::render_number($value, $prefix, $suffix, $fallback);

			case 'text':
			default:
				return self::render_text($value, $prefix, $suffix, $fallback);
		}
	}

	/**
	 * Whether a resolved provider value should be treated as "no value".
	 *
	 * @param mixed $value Resolved value.
	 * @return bool
	 */
	private static function is_empty_value($value)
	{
		if (is_array($value)) {
			return empty($value);
		}
		return $value === '' || $value === null || $value === false;
	}

	/**
	 * Wraps a fallback string in the prefix/suffix and escapes it, or
	 * returns an empty string when no fallback is configured.
	 *
	 * @param string $prefix   Prefix text.
	 * @param string $suffix   Suffix text.
	 * @param string $fallback Fallback text.
	 * @return string
	 */
	private static function fallback_html($prefix, $suffix, $fallback)
	{
		if ($fallback === '') {
			return '';
		}
		return esc_html($prefix . $fallback . $suffix);
	}

	/**
	 * outputType: text.
	 *
	 * @param mixed  $value    Resolved value.
	 * @param string $prefix   Prefix text.
	 * @param string $suffix   Suffix text.
	 * @param string $fallback Fallback text.
	 * @return string
	 */
	private static function render_text($value, $prefix, $suffix, $fallback)
	{
		if (self::is_empty_value($value) || !is_scalar($value)) {
			return self::fallback_html($prefix, $suffix, $fallback);
		}
		return esc_html($prefix . (string) $value . $suffix);
	}

	/**
	 * outputType: html. Rendered as-is (wp_kses_post()), no prefix/suffix.
	 *
	 * @param mixed  $value    Resolved value.
	 * @param string $fallback Fallback text.
	 * @return string
	 */
	private static function render_html($value, $fallback)
	{
		if (self::is_empty_value($value) || !is_scalar($value)) {
			return $fallback !== '' ? esc_html($fallback) : '';
		}
		return wp_kses_post((string) $value);
	}

	/**
	 * outputType: image. Treats the resolved value as an attachment ID, a
	 * URL string, or an ACF-style image array, no prefix/suffix.
	 *
	 * @param mixed  $value    Resolved value.
	 * @param string $fallback Fallback text.
	 * @return string
	 */
	private static function render_image($value, $fallback)
	{
		$url = '';
		$alt = '';

		if (is_numeric($value)) {
			$src = wp_get_attachment_image_src((int) $value, 'full');
			if ($src) {
				$url = $src[0];
				$alt = get_post_meta((int) $value, '_wp_attachment_image_alt', true);
			}
		} elseif (is_array($value)) {
			if (!empty($value['url'])) {
				$url = $value['url'];
				$alt = isset($value['alt']) ? $value['alt'] : '';
			} elseif (!empty($value['ID'])) {
				$src = wp_get_attachment_image_src((int) $value['ID'], 'full');
				if ($src) {
					$url = $src[0];
				}
			}
		} elseif (is_string($value) && $value !== '') {
			$url = $value;
		}

		if ($url === '') {
			return $fallback !== '' ? esc_html($fallback) : '';
		}

		return '<img src="' . esc_url($url) . '" alt="' . esc_attr($alt) . '" />';
	}

	/**
	 * outputType: link. Treats the resolved value as a URL (or an
	 * ACF-style link array), no prefix/suffix.
	 *
	 * @param mixed  $value      Resolved value.
	 * @param array  $attributes Block attributes (linkText).
	 * @param string $fallback   Fallback text.
	 * @param string $field_key  Field key, used as the link text default.
	 * @return string
	 */
	private static function render_link($value, $attributes, $fallback, $field_key)
	{
		$url = '';
		if (is_array($value)) {
			if (!empty($value['url'])) {
				$url = $value['url'];
			}
		} elseif (is_scalar($value)) {
			$url = (string) $value;
		}

		if ($url === '') {
			return $fallback !== '' ? esc_html($fallback) : '';
		}

		$link_text = isset($attributes['linkText']) && $attributes['linkText'] !== ''
			? $attributes['linkText']
			: ($field_key !== '' ? $field_key : $url);

		return '<a href="' . esc_url($url) . '">' . esc_html($link_text) . '</a>';
	}

	/**
	 * outputType: date. Formatted via Bpafb_Template_Block_Render::format_date().
	 *
	 * @param mixed  $value      Resolved value.
	 * @param array  $attributes Block attributes (dateFormat).
	 * @param string $prefix     Prefix text.
	 * @param string $suffix     Suffix text.
	 * @param string $fallback   Fallback text.
	 * @return string
	 */
	private static function render_date($value, $attributes, $prefix, $suffix, $fallback)
	{
		if (self::is_empty_value($value) || !is_scalar($value)) {
			return self::fallback_html($prefix, $suffix, $fallback);
		}

		$format    = isset($attributes['dateFormat']) ? $attributes['dateFormat'] : '';
		$formatted = Bpafb_Template_Block_Render::format_date((string) $value, $format);

		if ($formatted === '') {
			return self::fallback_html($prefix, $suffix, $fallback);
		}

		return esc_html($prefix . $formatted . $suffix);
	}

	/**
	 * outputType: number. Formatted via number_format_i18n().
	 *
	 * @param mixed  $value    Resolved value.
	 * @param string $prefix   Prefix text.
	 * @param string $suffix   Suffix text.
	 * @param string $fallback Fallback text.
	 * @return string
	 */
	private static function render_number($value, $prefix, $suffix, $fallback)
	{
		if (self::is_empty_value($value) || !is_numeric($value)) {
			return self::fallback_html($prefix, $suffix, $fallback);
		}

		$formatted = number_format_i18n((float) $value);
		return esc_html($prefix . $formatted . $suffix);
	}
}
