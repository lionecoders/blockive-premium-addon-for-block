import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { alignment, chartData, legendPosition, cutout, borderWidth, borderColor, animationSpeed } = attributes;

	const blockProps = useBlockProps.save({
		className: `align${alignment}`,
	});

	// Only the fields view.js actually reads — the rest of `attributes` (container
	// settings, custom CSS, etc.) don't belong in the chart's own config payload.
	const chartConfig = { chartData, legendPosition, cutout, borderWidth, borderColor, animationSpeed };

	const chartSummary = ( chartData || [] ).map( ( item ) => `${ item.label }: ${ item.value }` ).join( ', ' );
	const chartLabel = chartSummary
		? `${ __( 'Pie chart', 'blockive-premium-addon-for-block' ) }: ${ chartSummary }`
		: __( 'Pie chart', 'blockive-premium-addon-for-block' );

	return (
		<div {...blockProps}>
			<div className="bpafb-pie-chart-wrapper">
				<canvas
					className="bpafb-chart-js-canvas"
					data-chart-config={JSON.stringify(chartConfig)}
					role="img"
					aria-label={chartLabel}
				></canvas>
			</div>
		</div>
	);
}
