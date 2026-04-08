import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ColorPalette,
	BaseControl,
	RangeControl,
	TextControl,
	Button,
} from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import Chart from 'chart.js/auto';

export default function Edit({ attributes, setAttributes }) {
	const {
		chartData,
		legendPosition,
		cutout,
		borderWidth,
		borderColor,
		animationSpeed,
		alignment,
	} = attributes;

	const chartRef = useRef(null);
	const chartInstance = useRef(null);

	const blockProps = useBlockProps({
		className: `align${alignment}`,
	});

	useEffect(() => {
		if (!chartRef.current) return;

		// Destroy previous instance
		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		const data = {
			labels: chartData.map(item => item.label),
			datasets: [{
				data: chartData.map(item => item.value),
				backgroundColor: chartData.map(item => item.bg),
				borderColor: borderColor || '#ffffff',
				borderWidth: borderWidth !== undefined ? borderWidth : 2,
			}]
		};

		const config = {
			type: cutout > 0 ? 'doughnut' : 'pie',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: true,
				animation: {
					duration: 0 // Disable animation in editor for better perf
				},
				cutout: cutout > 0 ? `${cutout}%` : 0,
				plugins: {
					legend: {
						display: legendPosition !== 'none',
						position: legendPosition === 'none' ? 'top' : legendPosition,
					}
				}
			}
		};

		chartInstance.current = new Chart(chartRef.current, config);

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [chartData, legendPosition, cutout, borderWidth, borderColor]);

	const updateItem = (index, key, value) => {
		const newData = [...chartData];
		newData[index] = { ...newData[index], [key]: key === 'value' ? parseFloat(value) || 0 : value };
		setAttributes({ chartData: newData });
	};

	const addItem = () => {
		setAttributes({
			chartData: [
				...chartData,
				{ id: Date.now().toString(), label: `Item ${chartData.length + 1}`, value: 100, bg: '#cbd5e1' }
			]
		});
	};

	const removeItem = (index) => {
		const newData = chartData.filter((_, i) => i !== index);
		setAttributes({ chartData: newData });
	};

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={alignment}
					onChange={(newAlign) => setAttributes({ alignment: newAlign || 'center' })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Chart Data', 'lc-block-widgets')} initialOpen={true}>
					{chartData.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
							<TextControl
								label={__('Label', 'lc-block-widgets')}
								value={item.label}
								onChange={(val) => updateItem(index, 'label', val)}
							/>
							<TextControl
								label={__('Value', 'lc-block-widgets')}
								type="number"
								value={item.value}
								onChange={(val) => updateItem(index, 'value', val)}
							/>
							<BaseControl label={__('Slice Color', 'lc-block-widgets')}>
								<ColorPalette
									value={item.bg}
									onChange={(val) => updateItem(index, 'bg', val || '#000')}
								/>
							</BaseControl>
							<Button isDestructive onClick={() => removeItem(index)} style={{ marginTop: '10px' }}>
								{__('Remove Item', 'lc-block-widgets')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Slice', 'lc-block-widgets')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Chart Settings', 'lc-block-widgets')} initialOpen={false}>
					<RangeControl
						label={__('Cutout % (Make it a Donut)', 'lc-block-widgets')}
						value={cutout}
						onChange={(val) => setAttributes({ cutout: val })}
						min={0}
						max={90}
						help={__('Set > 0 to create a Donut Chart.', 'lc-block-widgets')}
					/>
					<SelectControl
						label={__('Legend Position', 'lc-block-widgets')}
						value={legendPosition}
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Bottom', value: 'bottom' },
							{ label: 'Left', value: 'left' },
							{ label: 'Right', value: 'right' },
							{ label: 'None', value: 'none' },
						]}
						onChange={(val) => setAttributes({ legendPosition: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Styling', 'lc-block-widgets')} initialOpen={false}>
					<RangeControl
						label={__('Border Width (px)', 'lc-block-widgets')}
						value={borderWidth}
						onChange={(val) => setAttributes({ borderWidth: val })}
						min={0}
						max={10}
					/>
					<BaseControl label={__('Border Color', 'lc-block-widgets')}>
						<ColorPalette value={borderColor} onChange={(val) => setAttributes({ borderColor: val || 'transparent' })} />
					</BaseControl>
					<RangeControl
						label={__('Animation Speed (ms)', 'lc-block-widgets')}
						value={animationSpeed}
						onChange={(val) => setAttributes({ animationSpeed: val })}
						min={0}
						max={5000}
						step={100}
						help={__('Only applies to the live site frontend.', 'lc-block-widgets')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lc-pie-chart-wrapper">
					{chartData && chartData.length > 0 ? (
						<canvas ref={chartRef}></canvas>
					) : (
						<div className="lc-chart-error">{__('Please add data to show the chart.', 'lc-block-widgets')}</div>
					)}
				</div>
			</div>
		</>
	);
}
