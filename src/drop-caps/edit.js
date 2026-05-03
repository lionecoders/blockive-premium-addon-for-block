import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	BaseControl,
	ColorPalette,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		content,
		view,
		shape,
		primaryColor,
		secondaryColor,
		size,
		space,
		borderWidth,
		borderRadius,
		dropCapPadding,
		alignment,
	} = attributes;

	const customStyles = {
		textAlign: alignment,
		'--bpafb-dc-size': `${size}px`,
		'--bpafb-dc-space': `${space}px`,
		'--bpafb-dc-pd': `${dropCapPadding}px`,
		'--bpafb-dc-color': secondaryColor || 'inherit',
		'--bpafb-dc-bg': view === 'stacked' ? (primaryColor || '#000') : 'transparent',
		'--bpafb-dc-borderWidth': view === 'framed' ? `${borderWidth}px` : '0px',
		'--bpafb-dc-borderColor': primaryColor || '#000',
		'--bpafb-dc-radius': borderRadius > 0 ? `${borderRadius}px` : (shape === 'circle' ? '50%' : (shape === 'rounded' ? '5px' : '0')),
	};

	const blockProps = useBlockProps({
		className: `has-drop-cap is-view-${view} is-shape-${shape}`,
		style: customStyles,
	});

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={alignment}
					onChange={(newAlign) => setAttributes({ alignment: newAlign })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Drop Cap Settings', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<SelectControl
						label={__('View', 'blockive-premium-addon-for-block')}
						value={view}
						options={[
							{ label: 'Default', value: 'default' },
							{ label: 'Stacked', value: 'stacked' },
							{ label: 'Framed', value: 'framed' },
						]}
						onChange={(val) => setAttributes({ view: val })}
					/>
					
					{view !== 'default' && (
						<SelectControl
							label={__('Shape', 'blockive-premium-addon-for-block')}
							value={shape}
							options={[
								{ label: 'Square', value: 'square' },
								{ label: 'Rounded', value: 'rounded' },
								{ label: 'Circle', value: 'circle' },
							]}
							onChange={(val) => setAttributes({ shape: val })}
						/>
					)}

					<RangeControl
						label={__('Size', 'blockive-premium-addon-for-block')}
						value={size}
						onChange={(val) => setAttributes({ size: val })}
						min={10}
						max={200}
					/>
					<RangeControl
						label={__('Space', 'blockive-premium-addon-for-block')}
						value={space}
						onChange={(val) => setAttributes({ space: val })}
						min={0}
						max={100}
					/>
					
					{view !== 'default' && (
						<RangeControl
							label={__('Padding', 'blockive-premium-addon-for-block')}
							value={dropCapPadding}
							onChange={(val) => setAttributes({ dropCapPadding: val })}
							min={0}
							max={100}
						/>
					)}
					
					{view === 'framed' && (
						<RangeControl
							label={__('Border Width', 'blockive-premium-addon-for-block')}
							value={borderWidth}
							onChange={(val) => setAttributes({ borderWidth: val })}
							min={1}
							max={20}
						/>
					)}

					{view !== 'default' && (
						<RangeControl
							label={__('Border Radius', 'blockive-premium-addon-for-block')}
							value={borderRadius}
							onChange={(val) => setAttributes({ borderRadius: val })}
							min={0}
							max={100}
							help={__('Leave at 0 to use Shape setting.', 'blockive-premium-addon-for-block')}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Drop Cap Colors', 'blockive-premium-addon-for-block')} initialOpen={true}>
					{view !== 'default' && (
						<BaseControl label={__('Primary Color (Background/Border)', 'blockive-premium-addon-for-block')}>
							<ColorPalette
								value={primaryColor}
								onChange={(val) => setAttributes({ primaryColor: val })}
							/>
						</BaseControl>
					)}
					<BaseControl label={__('Secondary Color (Text)', 'blockive-premium-addon-for-block')}>
						<ColorPalette
							value={secondaryColor}
							onChange={(val) => setAttributes({ secondaryColor: val })}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<RichText
				{...blockProps}
				tagName="p"
				value={content}
				onChange={(val) => setAttributes({ content: val })}
				placeholder={__('Enter text here...', 'blockive-premium-addon-for-block')}
			/>
		</>
	);
}
