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
		borderWidth,
	} = attributes;

	const customStyles = {
		'--bpafb-btn-text-color': textColor,
		'--bpafb-btn-bg-color': bgColor,
		'--bpafb-btn-border-color': borderColor,
		'--bpafb-btn-text-color-hover': textColorHover,
		'--bpafb-btn-bg-color-hover': bgColorHover,
		'--bpafb-btn-border-color-hover': borderColorHover,
		'--bpafb-btn-badge-text-color': badgeTextColor,
		'--bpafb-btn-badge-bg-color': badgeBgColor,
		'--bpafb-btn-icon-spacing': `${iconSpacing}px`,
		'--bpafb-btn-bw': `${borderWidth}px`,
		'--bpafb-btn-width': buttonWidth === 'full' ? '100%' : 'auto',
		'--bpafb-btn-justify': alignment === 'left' ? 'flex-start' : (alignment === 'right' ? 'flex-end' : (alignment === 'justify' ? 'stretch' : 'center')),
	};

	const blockProps = useBlockProps({
		className: `bpafb-button-wrapper bpafb-button-align-${alignment}`,
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'blockive-premium-addon-for-block')} initialOpen={true}>
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

					<TextControl
						label={__('Badge Text (Optional)', 'blockive-premium-addon-for-block')}
						value={badgeText}
						onChange={(val) => setAttributes({ badgeText: val })}
						help={__('Leave empty to hide badge', 'blockive-premium-addon-for-block')}
					/>

					<ToggleControl
						label={__('Show Icon', 'blockive-premium-addon-for-block')}
						checked={showIcon}
						onChange={(val) => setAttributes({ showIcon: val })}
					/>

					{showIcon && (
						<>
							<TextControl
								label={__('FontAwesome Icon Class', 'blockive-premium-addon-for-block')}
								value={icon}
								onChange={(val) => setAttributes({ icon: val })}
								help="e.g., 'fas fa-arrow-right'"
							/>
							<SelectControl
								label={__('Icon Position', 'blockive-premium-addon-for-block')}
								value={iconPosition}
								options={[
									{ label: 'Left (Before Text)', value: 'left' },
									{ label: 'Right (After Text)', value: 'right' },
								]}
								onChange={(val) => setAttributes({ iconPosition: val })}
							/>
							<RangeControl
								label={__('Icon Spacing', 'blockive-premium-addon-for-block')}
								value={iconSpacing}
								onChange={(val) => setAttributes({ iconSpacing: val })}
								min={0}
								max={50}
							/>
						</>
					)}

					<SelectControl
						label={__('Alignment', 'blockive-premium-addon-for-block')}
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
				<PanelBody title={__('Button Colors', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<TabPanel
						className="bpafb-color-tabs"
						activeClass="is-active"
						tabs={[
							{
								name: 'normal',
								title: __('Normal', 'blockive-premium-addon-for-block'),
								className: 'tab-normal',
							},
							{
								name: 'hover',
								title: __('Hover', 'blockive-premium-addon-for-block'),
								className: 'tab-hover',
							},
						]}
					>
						{(tab) => {
							if (tab.name === 'normal') {
								return (
									<div style={{ marginTop: '15px' }}>
										<BaseControl label={__('Text Color', 'blockive-premium-addon-for-block')}>
											<ColorPalette value={textColor} onChange={(val) => setAttributes({ textColor: val })} />
										</BaseControl>
										<BaseControl label={__('Background Color', 'blockive-premium-addon-for-block')}>
											<ColorPalette value={bgColor} onChange={(val) => setAttributes({ bgColor: val })} />
										</BaseControl>
										<BaseControl label={__('Border Color', 'blockive-premium-addon-for-block')}>
											<ColorPalette value={borderColor} onChange={(val) => setAttributes({ borderColor: val })} />
										</BaseControl>
									</div>
								);
							}
							return (
								<div style={{ marginTop: '15px' }}>
									<BaseControl label={__('Hover Text Color', 'blockive-premium-addon-for-block')}>
										<ColorPalette value={textColorHover} onChange={(val) => setAttributes({ textColorHover: val })} />
									</BaseControl>
									<BaseControl label={__('Hover Background Color', 'blockive-premium-addon-for-block')}>
										<ColorPalette value={bgColorHover} onChange={(val) => setAttributes({ bgColorHover: val })} />
									</BaseControl>
									<BaseControl label={__('Hover Border Color', 'blockive-premium-addon-for-block')}>
										<ColorPalette value={borderColorHover} onChange={(val) => setAttributes({ borderColorHover: val })} />
									</BaseControl>
								</div>
							);
						}}
					</TabPanel>
				</PanelBody>

				{badgeText && (
					<PanelBody title={__('Badge Colors', 'blockive-premium-addon-for-block')} initialOpen={false}>
						<BaseControl label={__('Badge Text Color', 'blockive-premium-addon-for-block')}>
							<ColorPalette value={badgeTextColor} onChange={(val) => setAttributes({ badgeTextColor: val })} />
						</BaseControl>
						<BaseControl label={__('Badge Background', 'blockive-premium-addon-for-block')}>
							<ColorPalette value={badgeBgColor} onChange={(val) => setAttributes({ badgeBgColor: val })} />
						</BaseControl>
					</PanelBody>
				)}

				<PanelBody title={__('Borders', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<RangeControl
						label={__('Border Width (px)', 'blockive-premium-addon-for-block')}
						value={borderWidth}
						onChange={(val) => setAttributes({ borderWidth: val })}
						min={0}
						max={15}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-button-link">
					<div className="bpafb-button-inner">
						{badgeText && (
							<span className="bpafb-button-badge">{badgeText}</span>
						)}
						
						{showIcon && iconPosition === 'left' && icon && (
							<i className={`${icon} bpafb-button-icon bpafb-button-icon--left`}></i>
						)}

						<RichText
							tagName="span"
							className="bpafb-button-text"
							value={text}
							onChange={(val) => setAttributes({ text: val })}
							placeholder={__('Button Text...', 'blockive-premium-addon-for-block')}
							allowedFormats={['core/bold', 'core/italic']}
						/>

						{showIcon && iconPosition === 'right' && icon && (
							<i className={`${icon} bpafb-button-icon bpafb-button-icon--right`}></i>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
