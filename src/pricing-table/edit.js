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
		'--lc-pt-header-bg': headerBgColor || '#4f46e5',
		'--lc-pt-header-text': headerTextColor || '#ffffff',
		'--lc-pt-price-color': priceColor || '#0f172a',
		'--lc-pt-feature-text': featureTextColor || '#475569',
		'--lc-pt-button-bg': buttonBgColor || '#4f46e5',
		'--lc-pt-button-text': buttonTextColor || '#ffffff',
		'--lc-pt-box-bg': boxBgColor || '#ffffff',
		'--lc-pt-border-color': borderColor || '#f1f5f9',
		'--lc-pt-border-width': `${borderWidth !== undefined ? borderWidth : 1}px`,
		'--lc-pt-border-radius': `${borderRadius !== undefined ? borderRadius : 16}px`,
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
				<PanelBody title={__('Header & Price', 'lc-block-widgets')} initialOpen={true}>
					<ToggleControl
						label={__('Highlight as Featured?', 'lc-block-widgets')}
						checked={isFeatured}
						onChange={(val) => setAttributes({ isFeatured: val })}
					/>
					{isFeatured && (
						<TextControl
							label={__('Featured Badge Text', 'lc-block-widgets')}
							value={featuredBadge}
							onChange={(val) => setAttributes({ featuredBadge: val })}
						/>
					)}
					<TextControl
						label={__('Currency Symbol', 'lc-block-widgets')}
						value={currency}
						onChange={(val) => setAttributes({ currency: val })}
					/>
					<TextControl
						label={__('Period Prefix/Suffix', 'lc-block-widgets')}
						value={period}
						onChange={(val) => setAttributes({ period: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Features List', 'lc-block-widgets')} initialOpen={false}>
					{features && features.map((feature, index) => (
						<div key={feature.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
							<TextControl
								label={__('Feature Text', 'lc-block-widgets')}
								value={feature.text}
								onChange={(val) => updateFeature(index, 'text', val)}
							/>
							<ToggleControl
								label={__('Is Active?', 'lc-block-widgets')}
								checked={feature.active}
								onChange={(val) => updateFeature(index, 'active', val)}
							/>
							<TextControl
								label={__('FontAwesome Class', 'lc-block-widgets')}
								value={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}
								onChange={(val) => updateFeature(index, 'icon', val)}
							/>
							<Button isDestructive onClick={() => removeFeature(index)}>
								{__('Remove', 'lc-block-widgets')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addFeature}>
						{__('Add Feature', 'lc-block-widgets')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Button Settings', 'lc-block-widgets')} initialOpen={false}>
					<TextControl
						label={__('Button URL', 'lc-block-widgets')}
						value={buttonUrl}
						onChange={(val) => setAttributes({ buttonUrl: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Layout Style', 'lc-block-widgets')} initialOpen={true}>
					<SelectControl
						label={__('Design Preset', 'lc-block-widgets')}
						value={layoutStyle}
						options={[
							{ label: 'Style 1: Standard Card', value: 'style1' },
							{ label: 'Style 2: Clean Line (Transparent Header)', value: 'style2' },
							{ label: 'Style 3: Floating Gradient Header', value: 'style3' },
						]}
						onChange={(val) => setAttributes({ layoutStyle: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Style Settings', 'lc-block-widgets')} initialOpen={false}>
					<RangeControl
						label={__('Border Width (px)', 'lc-block-widgets')}
						value={borderWidth !== undefined ? borderWidth : 1}
						onChange={(val) => setAttributes({ borderWidth: val })}
						min={0}
						max={10}
					/>
					<RangeControl
						label={__('Border Radius (px)', 'lc-block-widgets')}
						value={borderRadius !== undefined ? borderRadius : 16}
						onChange={(val) => setAttributes({ borderRadius: val })}
						min={0}
						max={50}
					/>
					<ToggleControl
						label={__('Enable Box Shadow', 'lc-block-widgets')}
						checked={boxShadow !== undefined ? boxShadow : true}
						onChange={(val) => setAttributes({ boxShadow: val })}
					/>
					
					<BaseControl label={__('Header Background Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={headerBgColor || '#4f46e5'} onChange={(val) => setAttributes({ headerBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Header Text Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={headerTextColor || '#ffffff'} onChange={(val) => setAttributes({ headerTextColor: val })} />
					</BaseControl>
					<BaseControl label={__('Table Background Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={boxBgColor || '#ffffff'} onChange={(val) => setAttributes({ boxBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Price Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={priceColor || '#0f172a'} onChange={(val) => setAttributes({ priceColor: val })} />
					</BaseControl>
					<BaseControl label={__('Feature Text Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={featureTextColor || '#475569'} onChange={(val) => setAttributes({ featureTextColor: val })} />
					</BaseControl>
					<BaseControl label={__('Border Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={borderColor || '#f1f5f9'} onChange={(val) => setAttributes({ borderColor: val })} />
					</BaseControl>
					<BaseControl label={__('Button Background Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={buttonBgColor || '#4f46e5'} onChange={(val) => setAttributes({ buttonBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Button Text Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={buttonTextColor || '#ffffff'} onChange={(val) => setAttributes({ buttonTextColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div 
					className={`lc-pricing-table lc-pricing-${layoutStyle || 'style1'} ${isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`}
					style={{ ...customStyles, textAlign: alignment || 'center' }}
				>
					{isFeatured && (
						<div className="lc-pricing-badge">{featuredBadge}</div>
					)}
					
					<div className="lc-pricing-header">
						<RichText
							tagName="h3"
							className="lc-pricing-title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder={__('Plan Title', 'lc-block-widgets')}
						/>
						<RichText
							tagName="p"
							className="lc-pricing-subtitle"
							value={subtitle}
							onChange={(val) => setAttributes({ subtitle: val })}
							placeholder={__('Plan description...', 'lc-block-widgets')}
						/>
					</div>

					<div className="lc-pricing-price-area">
						<span className="lc-pricing-currency">{currency}</span>
						<RichText
							tagName="span"
							className="lc-pricing-amount"
							value={price}
							onChange={(val) => setAttributes({ price: val })}
							placeholder="99"
						/>
						<span className="lc-pricing-period">{period}</span>
					</div>

					<ul className="lc-pricing-features">
						{features && features.map((feature) => (
							<li key={feature.id} className={feature.active ? 'active' : 'inactive'}>
								<i className={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}></i>
								<span>{feature.text}</span>
							</li>
						))}
					</ul>

					<div className="lc-pricing-footer">
						<RichText
							tagName="a"
							className="lc-pricing-button"
							value={buttonText}
							onChange={(val) => setAttributes({ buttonText: val })}
							placeholder={__('Button Text', 'lc-block-widgets')}
							onClick={(e) => e.preventDefault()}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
