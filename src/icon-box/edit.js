import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ColorPalette,
	BaseControl,
	TextControl,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		icon,
		title,
		titleTag,
		description,
		url,
		linkTarget,
		iconPosition,
		iconSize,
		iconColor,
		iconBgColor,
		titleColor,
		descColor,
		boxBgColor,
		iconPadding,
		iconBorderRadius,
		boxAlignment,
		iconBorderColor,
		iconBorderWidth,
		iconBorderStyle,
	} = attributes;

	const customStyles = {
		'--bpafb-ib-icon-size': `${iconSize}px`,
		'--bpafb-ib-icon-color': iconColor,
		'--bpafb-ib-icon-bg': iconBgColor,
		'--bpafb-ib-icon-padding': `${iconPadding}px`,
		'--bpafb-ib-icon-radius': `${iconBorderRadius}px`,
		'--bpafb-ib-title-color': titleColor,
		'--bpafb-ib-desc-color': descColor,
		'--bpafb-ib-box-bg': boxBgColor,
		'--bpafb-ib-alignment': boxAlignment,
		'--bpafb-ib-icon-border-color': iconBorderColor,
		'--bpafb-ib-icon-border-width': iconBorderWidth ? `${iconBorderWidth}px` : undefined,
		'--bpafb-ib-icon-border-style': iconBorderStyle,
	};

	const blockProps = useBlockProps({
		className: `bpafb-icon-box-wrapper bpafb-icon-box--${iconPosition}`,
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<TextControl
						label={__('FontAwesome Icon Class', 'blockive-premium-addon-for-block')}
						value={icon}
						onChange={(val) => setAttributes({ icon: val })}
						help="e.g., 'fas fa-star', 'fab fa-facebook'"
					/>
					
					<SelectControl
						label={__('Title HTML Tag', 'blockive-premium-addon-for-block')}
						value={titleTag}
						options={[
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'P', value: 'p' },
							{ label: 'DIV', value: 'div' },
						]}
						onChange={(val) => setAttributes({ titleTag: val })}
					/>

					<TextControl
						label={__('Link URL', 'blockive-premium-addon-for-block')}
						value={url}
						onChange={(val) => setAttributes({ url: val })}
						type="url"
					/>
					
					{url && (
						<ToggleControl
							label={__('Open in new tab', 'blockive-premium-addon-for-block')}
							checked={linkTarget}
							onChange={(val) => setAttributes({ linkTarget: val })}
						/>
					)}

					<SelectControl
						label={__('Icon Position', 'blockive-premium-addon-for-block')}
						value={iconPosition}
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Left', value: 'left' },
							{ label: 'Right', value: 'right' },
						]}
						onChange={(val) => setAttributes({ iconPosition: val })}
					/>

					<SelectControl
						label={__('Text Alignment', 'blockive-premium-addon-for-block')}
						value={boxAlignment}
						options={[
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						]}
						onChange={(val) => setAttributes({ boxAlignment: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Icon Styles', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<RangeControl
						label={__('Icon Size', 'blockive-premium-addon-for-block')}
						value={iconSize}
						onChange={(val) => setAttributes({ iconSize: val })}
						min={10}
						max={200}
					/>
					<RangeControl
						label={__('Icon Padding', 'blockive-premium-addon-for-block')}
						value={iconPadding}
						onChange={(val) => setAttributes({ iconPadding: val })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__('Icon Border Radius', 'blockive-premium-addon-for-block')}
						value={iconBorderRadius}
						onChange={(val) => setAttributes({ iconBorderRadius: val })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__('Icon Border Width (px)', 'blockive-premium-addon-for-block')}
						value={iconBorderWidth}
						onChange={(val) => setAttributes({ iconBorderWidth: val })}
						min={0}
						max={20}
					/>
					<SelectControl
						label={__('Icon Border Style', 'blockive-premium-addon-for-block')}
						value={iconBorderStyle}
						options={[
							{ label: 'Solid', value: 'solid' },
							{ label: 'Dashed', value: 'dashed' },
							{ label: 'Dotted', value: 'dotted' },
							{ label: 'Double', value: 'double' },
							{ label: 'Groove', value: 'groove' },
							{ label: 'Ridge', value: 'ridge' },
							{ label: 'Inset', value: 'inset' },
							{ label: 'Outset', value: 'outset' },
							{ label: 'None', value: 'none' },
						]}
						onChange={(val) => setAttributes({ iconBorderStyle: val })}
					/>
					<BaseControl label={__('Icon Border Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={iconBorderColor} onChange={(val) => setAttributes({ iconBorderColor: val })} />
					</BaseControl>
					<BaseControl label={__('Icon Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={iconColor} onChange={(val) => setAttributes({ iconColor: val })} />
					</BaseControl>
					<BaseControl label={__('Icon Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={iconBgColor} onChange={(val) => setAttributes({ iconBgColor: val })} />
					</BaseControl>
				</PanelBody>

				<PanelBody title={__('Colors', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<BaseControl label={__('Box Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={boxBgColor} onChange={(val) => setAttributes({ boxBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Description Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={descColor} onChange={(val) => setAttributes({ descColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{icon && (
					<div className="bpafb-icon-box-icon-wrapper">
						<i className={`${icon} bpafb-icon-box-icon`}></i>
					</div>
				)}

				<div className="bpafb-icon-box-content">
					<RichText
						tagName={titleTag}
						className="bpafb-icon-box-title"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
						placeholder={__('Enter title...', 'blockive-premium-addon-for-block')}
					/>

					<RichText
						tagName="div"
						className="bpafb-icon-box-description"
						value={description}
						onChange={(val) => setAttributes({ description: val })}
						placeholder={__('Enter description...', 'blockive-premium-addon-for-block')}
					/>
				</div>
			</div>
		</>
	);
}
