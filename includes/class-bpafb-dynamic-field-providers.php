<?php
/**
 * Registry of Dynamic Field providers used by the universal Dynamic Field
 * Template Block.
 *
 * @package Blockive
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Providers resolve a (field key, post id) pair to a value. Built-in
 * providers self-register only when their backing plugin is active. Third
 * parties add more via the `blockive_register_dynamic_provider` action.
 */
class Bpafb_Dynamic_Field_Providers
{
	/**
	 * @var array<string,array{label:string,resolver:callable}>
	 */
	private static $providers = [];

	/**
	 * Registers a provider.
	 *
	 * @param string $id   Unique provider id, e.g. "acf".
	 * @param array  $args {
	 *     @type string   $label    Human readable label shown in the block's Provider dropdown.
	 *     @type callable $resolver function( string $field_key, int $post_id ): mixed
	 * }
	 */
	public static function register($id, $args)
	{
		$args = wp_parse_args($args, [
			'label'    => $id,
			'resolver' => '__return_empty_string',
		]);

		self::$providers[$id] = $args;
	}

	/**
	 * @param string $id Provider id.
	 * @return array|null
	 */
	public static function get($id)
	{
		return isset(self::$providers[$id]) ? self::$providers[$id] : null;
	}

	/**
	 * @return array<string,array>
	 */
	public static function get_all()
	{
		return self::$providers;
	}

	/**
	 * Provider list formatted for the block editor's SelectControl.
	 *
	 * @return array<int,array{value:string,label:string}>
	 */
	public static function get_all_for_js()
	{
		$out = [];
		foreach (self::$providers as $id => $provider) {
			$out[] = [
				'value' => $id,
				'label' => $provider['label'],
			];
		}
		return $out;
	}

	/**
	 * Resolves a field value through the given provider.
	 *
	 * @param string $provider_id Provider id.
	 * @param string $field_key   Field key/name understood by that provider.
	 * @param int    $post_id     Post id to resolve the field against.
	 * @return mixed
	 */
	public static function resolve($provider_id, $field_key, $post_id)
	{
		$provider = self::get($provider_id);
		if (!$provider || $field_key === '') {
			return '';
		}
		return call_user_func($provider['resolver'], $field_key, $post_id);
	}

	/**
	 * Registers every built-in provider whose backing plugin is active, then
	 * fires the extensibility hook for third-party providers.
	 */
	public static function register_builtin_providers()
	{
		self::register('post_meta', [
			'label'    => __('WordPress Meta', 'blockive-premium-addon-for-block'),
			'resolver' => function ($field_key, $post_id) {
				return get_post_meta($post_id, $field_key, true);
			},
		]);

		if (function_exists('get_field')) {
			self::register('acf', [
				'label'    => __('ACF', 'blockive-premium-addon-for-block'),
				'resolver' => function ($field_key, $post_id) {
					return get_field($field_key, $post_id);
				},
			]);
		}

		if (function_exists('rwmb_meta')) {
			self::register('metabox', [
				'label'    => __('Meta Box', 'blockive-premium-addon-for-block'),
				'resolver' => function ($field_key, $post_id) {
					return rwmb_meta($field_key, [], $post_id);
				},
			]);
		}

		if (function_exists('pods')) {
			self::register('pods', [
				'label'    => __('Pods', 'blockive-premium-addon-for-block'),
				'resolver' => function ($field_key, $post_id) {
					$pod = pods(get_post_type($post_id), $post_id);
					return $pod && $pod->exists() ? $pod->field($field_key) : '';
				},
			]);
		}

		if (class_exists('WooCommerce')) {
			self::register('woocommerce', [
				'label'    => __('WooCommerce', 'blockive-premium-addon-for-block'),
				'resolver' => function ($field_key, $post_id) {
					$product = wc_get_product($post_id);
					if (!$product) {
						return '';
					}
					switch ($field_key) {
						case 'price':
							return $product->get_price_html();
						case 'regular_price':
							return $product->get_regular_price();
						case 'sale_price':
							return $product->get_sale_price();
						case 'sku':
							return $product->get_sku();
						case 'stock_status':
							return $product->get_stock_status();
						case 'stock_quantity':
							return $product->get_stock_quantity();
						case 'weight':
							return $product->get_weight();
						case 'rating':
							return $product->get_average_rating();
						default:
							$getter = 'get_' . $field_key;
							return method_exists($product, $getter)
								? $product->$getter()
								: get_post_meta($post_id, $field_key, true);
					}
				},
			]);
		}

		self::register('events', [
			'label'    => __('Event Plugins', 'blockive-premium-addon-for-block'),
			'resolver' => ['Bpafb_Events_Adapter', 'get_field'],
		]);

		/**
		 * Fires after built-in Dynamic Field providers are registered.
		 * Call Bpafb_Dynamic_Field_Providers::register() from a callback
		 * on this hook to add a custom provider.
		 */
		do_action('blockive_register_dynamic_provider');
	}
}
