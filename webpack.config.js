/**
 * Custom Webpack Configuration.
 *
 * Extends the default @wordpress/scripts config to add
 * the Theme Builder admin and editor entry points alongside
 * the auto-discovered block entries.
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: async () => {
		const defaultEntry = typeof defaultConfig.entry === 'function' 
			? await defaultConfig.entry() 
			: defaultConfig.entry;

		return {
			...defaultEntry,
			'admin/theme-builder': path.resolve(
				process.cwd(),
				'src/admin/theme-builder/index.js'
			),
			'editor/theme-builder': path.resolve(
				process.cwd(),
				'src/editor/theme-builder/index.js'
			),
		};
	},
};
