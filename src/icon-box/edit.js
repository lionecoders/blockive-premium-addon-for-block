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
	} = attributes;

	const customStyles = {
		'--lcibwc-ib-icon-size': `${iconSize}px`,
		'--lcibwc-ib-icon-color': iconColor,
		'--lcibwc-ib-icon-bg': iconBgColor,
		'--lcibwc-ib-icon-padding': `${iconPadding}px`,
		'--lcibwc-ib-icon-radius': `${iconBorderRadius}px`,
		'--lcibwc-ib-title-color': titleColor,
		'--lcibwc-ib-desc-color': descColor,
		'--lcibwc-ib-box-bg': boxBgColor,
		'--lcibwc-ib-alignment': boxAlignment,
	};

	const blockProps = useBlockProps({
		className: `lcibwc-icon-box-wrapper lcibwc-icon-box--${iconPosition}`,
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<TextControl
						label={__('FontAwesome Icon Class', 'lc-immeasurable-block-widgets-collection')}
						value={icon}
						onChange={(val) => setAttributes({ icon: val })}
						help="e.g., 'fas fa-star', 'fab fa-facebook'"
					/>
					
					<SelectControl
						label={__('Title HTML Tag', 'lc-immeasurable-block-widgets-collection')}
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
						label={__('Link URL', 'lc-immeasurable-block-widgets-collection')}
						value={url}
						onChange={(val) => setAttributes({ url: val })}
						type="url"
					/>
					
					{url && (
						<ToggleControl
							label={__('Open in new tab', 'lc-immeasurable-block-widgets-collection')}
							checked={linkTarget}
							onChange={(val) => setAttributes({ linkTarget: val })}
						/>
					)}

					<SelectControl
						label={__('Icon Position', 'lc-immeasurable-block-widgets-collection')}
						value={iconPosition}
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Left', value: 'left' },
							{ label: 'Right', value: 'right' },
						]}
						onChange={(val) => setAttributes({ iconPosition: val })}
					/>

					<SelectControl
						label={__('Text Alignment', 'lc-immeasurable-block-widgets-collection')}
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
				<PanelBody title={__('Icon Styles', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<RangeControl
						label={__('Icon Size', 'lc-immeasurable-block-widgets-collection')}
						value={iconSize}
						onChange={(val) => setAttributes({ iconSize: val })}
						min={10}
						max={200}
					/>
					<RangeControl
						label={__('Icon Padding', 'lc-immeasurable-block-widgets-collection')}
						value={iconPadding}
						onChange={(val) => setAttributes({ iconPadding: val })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__('Icon Border Radius', 'lc-immeasurable-block-widgets-collection')}
						value={iconBorderRadius}
						onChange={(val) => setAttributes({ iconBorderRadius: val })}
						min={0}
						max={100}
					/>
					<BaseControl label={__('Icon Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={iconColor} onChange={(val) => setAttributes({ iconColor: val })} />
					</BaseControl>
					<BaseControl label={__('Icon Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={iconBgColor} onChange={(val) => setAttributes({ iconBgColor: val })} />
					</BaseControl>
				</PanelBody>

				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<BaseControl label={__('Box Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={boxBgColor} onChange={(val) => setAttributes({ boxBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Description Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={descColor} onChange={(val) => setAttributes({ descColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{icon && (
					<div className="lcibwc-icon-box-icon-wrapper">
						<i className={`${icon} lcibwc-icon-box-icon`}></i>
					</div>
				)}

				<div className="lcibwc-icon-box-content">
					<RichText
						tagName={titleTag}
						className="lcibwc-icon-box-title"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
						placeholder={__('Enter title...', 'lc-immeasurable-block-widgets-collection')}
					/>

					<RichText
						tagName="div"
						className="lcibwc-icon-box-description"
						value={description}
						onChange={(val) => setAttributes({ description: val })}
						placeholder={__('Enter description...', 'lc-immeasurable-block-widgets-collection')}
					/>
				</div>
			</div>
		</>
	);
}
