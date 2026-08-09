import { dateI18n, humanTimeDiff } from '@wordpress/date';

/**
 * Formats an ISO date string the same way every date-related Template Block
 * (Publish Date, Modified Date, Event Date/Time) formats its editor preview,
 * so behavior matches the PHP render.php side (which uses date_i18n()/
 * human_time_diff()).
 *
 * @param {string} dateString ISO 8601 date.
 * @param {Object} options
 * @param {string} [options.format]   PHP date() format string. Falls back to the site's default date format.
 * @param {boolean} [options.relative] When true, returns a "2 days ago" style relative string instead.
 * @return {string}
 */
export function formatPreviewDate( dateString, { format, relative = false } = {} ) {
	if ( ! dateString ) {
		return '';
	}
	if ( relative ) {
		return humanTimeDiff( dateString );
	}
	return dateI18n( format || 'F j, Y', dateString );
}
