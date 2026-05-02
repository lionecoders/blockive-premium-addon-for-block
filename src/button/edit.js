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
	TabPanel,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		text,
		url,
		linkTarget,
		showIcon,
		icon,
		iconPosition,
		badgeText,
		alignment,
		buttonWidth,
		textColor,
		bgColor,
		textColorHover,
		bgColorHover,
		borderColor,
		borderColorHover,
		badgeTextColor,
		badgeBgColor,
		iconSpacing,
	} = attributes;

	const customStyles = {
		'--lcibwc-btn-text-color': textColor,
		'--lcibwc-btn-bg-color': bgColor,
		'--lcibwc-btn-border-color': borderColor,
		'--lcibwc-btn-text-color-hover': textColorHover,
		'--lcibwc-btn-bg-color-hover': bgColorHover,
		'--lcibwc-btn-border-color-hover': borderColorHover,
		'--lcibwc-btn-badge-text-color': badgeTextColor,
		'--lcibwc-btn-badge-bg-color': badgeBgColor,
		'--lcibwc-btn-icon-spacing': `${iconSpacing}px`,
		'--lcibwc-btn-width': buttonWidth === 'full' ? '100%' : 'auto',
		'--lcibwc-btn-justify': alignment === 'left' ? 'flex-start' : (alignment === 'right' ? 'flex-end' : (alignment === 'justify' ? 'stretch' : 'center')),
	};

	const blockProps = useBlockProps({
		className: `lcibwc-button-wrapper lcibwc-button-align-${alignment}`,
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
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

					<TextControl
						label={__('Badge Text (Optional)', 'lc-immeasurable-block-widgets-collection')}
						value={badgeText}
						onChange={(val) => setAttributes({ badgeText: val })}
						help={__('Leave empty to hide badge', 'lc-immeasurable-block-widgets-collection')}
					/>

					<ToggleControl
						label={__('Show Icon', 'lc-immeasurable-block-widgets-collection')}
						checked={showIcon}
						onChange={(val) => setAttributes({ showIcon: val })}
					/>

					{showIcon && (
						<>
							<TextControl
								label={__('FontAwesome Icon Class', 'lc-immeasurable-block-widgets-collection')}
								value={icon}
								onChange={(val) => setAttributes({ icon: val })}
								help="e.g., 'fas fa-arrow-right'"
							/>
							<SelectControl
								label={__('Icon Position', 'lc-immeasurable-block-widgets-collection')}
								value={iconPosition}
								options={[
									{ label: 'Left (Before Text)', value: 'left' },
									{ label: 'Right (After Text)', value: 'right' },
								]}
								onChange={(val) => setAttributes({ iconPosition: val })}
							/>
							<RangeControl
								label={__('Icon Spacing', 'lc-immeasurable-block-widgets-collection')}
								value={iconSpacing}
								onChange={(val) => setAttributes({ iconSpacing: val })}
								min={0}
								max={50}
							/>
						</>
					)}

					<SelectControl
						label={__('Alignment', 'lc-immeasurable-block-widgets-collection')}
						value={alignment}
						options={[
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
							{ label: 'Justified (Full Width)', value: 'justify' },
						]}
						onChange={(val) => {
							setAttributes({ alignment: val });
							if (val === 'justify') {
								setAttributes({ buttonWidth: 'full' });
							} else {
								setAttributes({ buttonWidth: 'auto' });
							}
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Button Colors', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<TabPanel
						className="lcibwc-color-tabs"
						activeClass="is-active"
						tabs={[
							{
								name: 'normal',
								title: __('Normal', 'lc-immeasurable-block-widgets-collection'),
								className: 'tab-normal',
							},
							{
								name: 'hover',
								title: __('Hover', 'lc-immeasurable-block-widgets-collection'),
								className: 'tab-hover',
							},
						]}
					>
						{(tab) => {
							if (tab.name === 'normal') {
								return (
									<div style={{ marginTop: '15px' }}>
										<BaseControl label={__('Text Color', 'lc-immeasurable-block-widgets-collection')}>
											<ColorPalette value={textColor} onChange={(val) => setAttributes({ textColor: val })} />
										</BaseControl>
										<BaseControl label={__('Background Color', 'lc-immeasurable-block-widgets-collection')}>
											<ColorPalette value={bgColor} onChange={(val) => setAttributes({ bgColor: val })} />
										</BaseControl>
										<BaseControl label={__('Border Color', 'lc-immeasurable-block-widgets-collection')}>
											<ColorPalette value={borderColor} onChange={(val) => setAttributes({ borderColor: val })} />
										</BaseControl>
									</div>
								);
							}
							return (
								<div style={{ marginTop: '15px' }}>
									<BaseControl label={__('Hover Text Color', 'lc-immeasurable-block-widgets-collection')}>
										<ColorPalette value={textColorHover} onChange={(val) => setAttributes({ textColorHover: val })} />
									</BaseControl>
									<BaseControl label={__('Hover Background Color', 'lc-immeasurable-block-widgets-collection')}>
										<ColorPalette value={bgColorHover} onChange={(val) => setAttributes({ bgColorHover: val })} />
									</BaseControl>
									<BaseControl label={__('Hover Border Color', 'lc-immeasurable-block-widgets-collection')}>
										<ColorPalette value={borderColorHover} onChange={(val) => setAttributes({ borderColorHover: val })} />
									</BaseControl>
								</div>
							);
						}}
					</TabPanel>
				</PanelBody>

				{badgeText && (
					<PanelBody title={__('Badge Colors', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
						<BaseControl label={__('Badge Text Color', 'lc-immeasurable-block-widgets-collection')}>
							<ColorPalette value={badgeTextColor} onChange={(val) => setAttributes({ badgeTextColor: val })} />
						</BaseControl>
						<BaseControl label={__('Badge Background', 'lc-immeasurable-block-widgets-collection')}>
							<ColorPalette value={badgeBgColor} onChange={(val) => setAttributes({ badgeBgColor: val })} />
						</BaseControl>
					</PanelBody>
				)}
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-button-inner">
					{badgeText && (
						<span className="lcibwc-button-badge">{badgeText}</span>
					)}
					
					{showIcon && iconPosition === 'left' && icon && (
						<i className={`${icon} lcibwc-button-icon lcibwc-button-icon--left`}></i>
					)}

					<RichText
						tagName="span"
						className="lcibwc-button-text"
						value={text}
						onChange={(val) => setAttributes({ text: val })}
						placeholder={__('Button Text...', 'lc-immeasurable-block-widgets-collection')}
						allowedFormats={['core/bold', 'core/italic']}
					/>

					{showIcon && iconPosition === 'right' && icon && (
						<i className={`${icon} lcibwc-button-icon lcibwc-button-icon--right`}></i>
					)}
				</div>
			</div>
		</>
	);
}
