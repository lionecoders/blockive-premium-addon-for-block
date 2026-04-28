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
		'--lcibwc-dc-size': `${size}px`,
		'--lcibwc-dc-space': `${space}px`,
		'--lcibwc-dc-pd': `${dropCapPadding}px`,
		'--lcibwc-dc-color': secondaryColor || 'inherit',
		'--lcibwc-dc-bg': view === 'stacked' ? (primaryColor || '#000') : 'transparent',
		'--lcibwc-dc-borderWidth': view === 'framed' ? `${borderWidth}px` : '0px',
		'--lcibwc-dc-borderColor': primaryColor || '#000',
		'--lcibwc-dc-radius': borderRadius > 0 ? `${borderRadius}px` : (shape === 'circle' ? '50%' : (shape === 'rounded' ? '5px' : '0')),
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
				<PanelBody title={__('Drop Cap Settings', 'lc-immeasurable-block-widgets-collectionblock-widgets-collection')} initialOpen={true}>
					<SelectControl
						label={__('View', 'lc-immeasurable-block-widgets-collection')}
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
							label={__('Shape', 'lc-immeasurable-block-widgets-collection')}
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
						label={__('Size', 'lc-immeasurable-block-widgets-collection')}
						value={size}
						onChange={(val) => setAttributes({ size: val })}
						min={10}
						max={200}
					/>
					<RangeControl
						label={__('Space', 'lc-immeasurable-block-widgets-collection')}
						value={space}
						onChange={(val) => setAttributes({ space: val })}
						min={0}
						max={100}
					/>
					
					{view !== 'default' && (
						<RangeControl
							label={__('Padding', 'lc-immeasurable-block-widgets-collection')}
							value={dropCapPadding}
							onChange={(val) => setAttributes({ dropCapPadding: val })}
							min={0}
							max={100}
						/>
					)}
					
					{view === 'framed' && (
						<RangeControl
							label={__('Border Width', 'lc-immeasurable-block-widgets-collection')}
							value={borderWidth}
							onChange={(val) => setAttributes({ borderWidth: val })}
							min={1}
							max={20}
						/>
					)}

					{view !== 'default' && (
						<RangeControl
							label={__('Border Radius', 'lc-immeasurable-block-widgets-collection')}
							value={borderRadius}
							onChange={(val) => setAttributes({ borderRadius: val })}
							min={0}
							max={100}
							help={__('Leave at 0 to use Shape setting.', 'lc-immeasurable-block-widgets-collection')}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Drop Cap Colors', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					{view !== 'default' && (
						<BaseControl label={__('Primary Color (Background/Border)', 'lc-immeasurable-block-widgets-collection')}>
							<ColorPalette
								value={primaryColor}
								onChange={(val) => setAttributes({ primaryColor: val })}
							/>
						</BaseControl>
					)}
					<BaseControl label={__('Secondary Color (Text)', 'lc-immeasurable-block-widgets-collection')}>
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
				placeholder={__('Enter text here...', 'lc-immeasurable-block-widgets-collection')}
			/>
		</>
	);
}
