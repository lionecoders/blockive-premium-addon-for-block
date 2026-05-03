import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ColorPalette,
	BaseControl,
	RangeControl,
	ToggleControl,
	Button,
	SelectControl,
} from '@wordpress/components';

const themeColors = [
	{ name: 'Indigo', color: '#4f46e5' },
	{ name: 'Blue', color: '#2563eb' },
	{ name: 'Dark Slate', color: '#0f172a' },
	{ name: 'Gray Element', color: '#f1f5f9' },
	{ name: 'Slate Gray', color: '#475569' },
	{ name: 'White', color: '#ffffff' },
	{ name: 'Red', color: '#ef4444' },
	{ name: 'Green', color: '#22c55e' },
];

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		subtitle,
		isFeatured,
		featuredBadge,
		currency,
		price,
		period,
		features,
		buttonText,
		buttonUrl,
		layoutStyle,
		alignment,
		headerBgColor,
		headerTextColor,
		priceColor,
		featureTextColor,
		buttonBgColor,
		buttonTextColor,
		boxBgColor,
		borderColor,
		borderWidth,
		borderRadius,
		boxShadow,
	} = attributes;

	const customStyles = {
		'--bpafb-pt-header-bg': headerBgColor || '#4f46e5',
		'--bpafb-pt-header-text': headerTextColor || '#ffffff',
		'--bpafb-pt-price-color': priceColor || '#0f172a',
		'--bpafb-pt-feature-text': featureTextColor || '#475569',
		'--bpafb-pt-button-bg': buttonBgColor || '#4f46e5',
		'--bpafb-pt-button-text': buttonTextColor || '#ffffff',
		'--bpafb-pt-box-bg': boxBgColor || '#ffffff',
		'--bpafb-pt-borderColor': borderColor || '#f1f5f9',
		'--bpafb-pt-borderWidth': `${borderWidth !== undefined ? borderWidth : 1}px`,
		'--bpafb-pt-borderRadius': `${borderRadius !== undefined ? borderRadius : 16}px`,
	};

	const blockProps = useBlockProps({
		className: `align${alignment || 'center'}`,
	});

	const updateFeature = (index, key, value) => {
		const newFeatures = [...features];
		newFeatures[index] = { ...newFeatures[index], [key]: value };
		setAttributes({ features: newFeatures });
	};

	const addFeature = () => {
		setAttributes({
			features: [
				...(features || []),
				{ id: Date.now().toString(), text: 'New Feature', active: true, icon: 'fas fa-check' },
			],
		});
	};

	const removeFeature = (index) => {
		const newFeatures = features.filter((_, i) => i !== index);
		setAttributes({ features: newFeatures });
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
				<PanelBody title={__('Header & Price', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<ToggleControl
						label={__('Highlight as Featured?', 'blockive-premium-addon-for-block')}
						checked={isFeatured}
						onChange={(val) => setAttributes({ isFeatured: val })}
					/>
					{isFeatured && (
						<TextControl
							label={__('Featured Badge Text', 'blockive-premium-addon-for-block')}
							value={featuredBadge}
							onChange={(val) => setAttributes({ featuredBadge: val })}
						/>
					)}
					<TextControl
						label={__('Currency Symbol', 'blockive-premium-addon-for-block')}
						value={currency}
						onChange={(val) => setAttributes({ currency: val })}
					/>
					<TextControl
						label={__('Period Prefix/Suffix', 'blockive-premium-addon-for-block')}
						value={period}
						onChange={(val) => setAttributes({ period: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Features List', 'blockive-premium-addon-for-block')} initialOpen={false}>
					{features && features.map((feature, index) => (
						<div key={feature.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
							<TextControl
								label={__('Feature Text', 'blockive-premium-addon-for-block')}
								value={feature.text}
								onChange={(val) => updateFeature(index, 'text', val)}
							/>
							<ToggleControl
								label={__('Is Active?', 'blockive-premium-addon-for-block')}
								checked={feature.active}
								onChange={(val) => updateFeature(index, 'active', val)}
							/>
							<TextControl
								label={__('FontAwesome Class', 'blockive-premium-addon-for-block')}
								value={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}
								onChange={(val) => updateFeature(index, 'icon', val)}
							/>
							<Button isDestructive onClick={() => removeFeature(index)}>
								{__('Remove', 'blockive-premium-addon-for-block')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addFeature}>
						{__('Add Feature', 'blockive-premium-addon-for-block')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Button Settings', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<TextControl
						label={__('Button URL', 'blockive-premium-addon-for-block')}
						value={buttonUrl}
						onChange={(val) => setAttributes({ buttonUrl: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Layout Style', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<SelectControl
						label={__('Design Preset', 'blockive-premium-addon-for-block')}
						value={layoutStyle}
						options={[
							{ label: 'Style 1: Standard Card', value: 'style1' },
							{ label: 'Style 2: Clean Line (Transparent Header)', value: 'style2' },
							{ label: 'Style 3: Floating Gradient Header', value: 'style3' },
						]}
						onChange={(val) => setAttributes({ layoutStyle: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Style Settings', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<RangeControl
						label={__('Border Width (px)', 'blockive-premium-addon-for-block')}
						value={borderWidth !== undefined ? borderWidth : 1}
						onChange={(val) => setAttributes({ borderWidth: val })}
						min={0}
						max={10}
					/>
					<RangeControl
						label={__('Border Radius (px)', 'blockive-premium-addon-for-block')}
						value={borderRadius !== undefined ? borderRadius : 16}
						onChange={(val) => setAttributes({ borderRadius: val })}
						min={0}
						max={50}
					/>
					<ToggleControl
						label={__('Enable Box Shadow', 'blockive-premium-addon-for-block')}
						checked={boxShadow !== undefined ? boxShadow : true}
						onChange={(val) => setAttributes({ boxShadow: val })}
					/>

					<BaseControl label={__('Header Background Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={headerBgColor || '#4f46e5'} onChange={(val) => setAttributes({ headerBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Header Text Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={headerTextColor || '#ffffff'} onChange={(val) => setAttributes({ headerTextColor: val })} />
					</BaseControl>
					<BaseControl label={__('Table Background Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={boxBgColor || '#ffffff'} onChange={(val) => setAttributes({ boxBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Price Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={priceColor || '#0f172a'} onChange={(val) => setAttributes({ priceColor: val })} />
					</BaseControl>
					<BaseControl label={__('Feature Text Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={featureTextColor || '#475569'} onChange={(val) => setAttributes({ featureTextColor: val })} />
					</BaseControl>
					<BaseControl label={__('Border Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={borderColor || '#f1f5f9'} onChange={(val) => setAttributes({ borderColor: val })} />
					</BaseControl>
					<BaseControl label={__('Button Background Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={buttonBgColor || '#4f46e5'} onChange={(val) => setAttributes({ buttonBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Button Text Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette colors={themeColors} value={buttonTextColor || '#ffffff'} onChange={(val) => setAttributes({ buttonTextColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div
					className={`bpafb-pricing-table bpafb-pricing-${layoutStyle || 'style1'} ${isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`}
					style={{ ...customStyles, textAlign: alignment || 'center' }}
				>
					{isFeatured && (
						<div className="bpafb-pricing-badge">{featuredBadge}</div>
					)}

					<div className="bpafb-pricing-header">
						<RichText
							tagName="h3"
							className="bpafb-pricing-title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder={__('Plan Title', 'blockive-premium-addon-for-block')}
						/>
						<RichText
							tagName="p"
							className="bpafb-pricing-subtitle"
							value={subtitle}
							onChange={(val) => setAttributes({ subtitle: val })}
							placeholder={__('Plan description...', 'blockive-premium-addon-for-block')}
						/>
					</div>

					<div className="bpafb-pricing-price-area">
						<span className="bpafb-pricing-currency">{currency}</span>
						<RichText
							tagName="span"
							className="bpafb-pricing-amount"
							value={price}
							onChange={(val) => setAttributes({ price: val })}
							placeholder="99"
						/>
						<span className="bpafb-pricing-period">{period}</span>
					</div>

					<ul className="bpafb-pricing-features">
						{features && features.map((feature) => (
							<li key={feature.id} className={feature.active ? 'active' : 'inactive'}>
								<i className={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}></i>
								<span>{feature.text}</span>
							</li>
						))}
					</ul>

					<div className="bpafb-pricing-footer">
						<RichText
							tagName="a"
							className="bpafb-pricing-button"
							value={buttonText}
							onChange={(val) => setAttributes({ buttonText: val })}
							placeholder={__('Button Text', 'blockive-premium-addon-for-block')}
							onClick={(e) => e.preventDefault()}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
