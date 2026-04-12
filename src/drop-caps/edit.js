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
		'--lc-dc-size': `${size}px`,
		'--lc-dc-space': `${space}px`,
		'--lc-dc-pd': `${dropCapPadding}px`,
		'--lc-dc-color': secondaryColor || 'inherit',
		'--lc-dc-bg': view === 'stacked' ? (primaryColor || '#000') : 'transparent',
		'--lc-dc-borderWidth': view === 'framed' ? `${borderWidth}px` : '0px',
		'--lc-dc-borderColor': primaryColor || '#000',
		'--lc-dc-radius': borderRadius > 0 ? `${borderRadius}px` : (shape === 'circle' ? '50%' : (shape === 'rounded' ? '5px' : '0')),
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
				<PanelBody title={__('Drop Cap Settings', 'lc-block-widgets')} initialOpen={true}>
					<SelectControl
						label={__('View', 'lc-block-widgets')}
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
							label={__('Shape', 'lc-block-widgets')}
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
						label={__('Size', 'lc-block-widgets')}
						value={size}
						onChange={(val) => setAttributes({ size: val })}
						min={10}
						max={200}
					/>
					<RangeControl
						label={__('Space', 'lc-block-widgets')}
						value={space}
						onChange={(val) => setAttributes({ space: val })}
						min={0}
						max={100}
					/>
					
					{view !== 'default' && (
						<RangeControl
							label={__('Padding', 'lc-block-widgets')}
							value={dropCapPadding}
							onChange={(val) => setAttributes({ dropCapPadding: val })}
							min={0}
							max={100}
						/>
					)}
					
					{view === 'framed' && (
						<RangeControl
							label={__('Border Width', 'lc-block-widgets')}
							value={borderWidth}
							onChange={(val) => setAttributes({ borderWidth: val })}
							min={1}
							max={20}
						/>
					)}

					{view !== 'default' && (
						<RangeControl
							label={__('Border Radius', 'lc-block-widgets')}
							value={borderRadius}
							onChange={(val) => setAttributes({ borderRadius: val })}
							min={0}
							max={100}
							help={__('Leave at 0 to use Shape setting.', 'lc-block-widgets')}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Drop Cap Colors', 'lc-block-widgets')} initialOpen={true}>
					{view !== 'default' && (
						<BaseControl label={__('Primary Color (Background/Border)', 'lc-block-widgets')}>
							<ColorPalette
								value={primaryColor}
								onChange={(val) => setAttributes({ primaryColor: val })}
							/>
						</BaseControl>
					)}
					<BaseControl label={__('Secondary Color (Text)', 'lc-block-widgets')}>
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
				placeholder={__('Enter text here...', 'lc-block-widgets')}
			/>
		</>
	);
}
