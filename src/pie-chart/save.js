import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { alignment } = attributes;

	const blockProps = useBlockProps.save({
		className: `align${alignment}`,
	});

	return (
		<div {...blockProps}>
			<div className="lc-pie-chart-wrapper">
				<canvas className="lc-chart-js-canvas" data-chart-config={JSON.stringify(attributes)}></canvas>
			</div>
		</div>
	);
}
