<?php
// This file is generated. Do not modify it manually.
return array(
	'accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/accordion',
		'version' => '0.1.0',
		'title' => 'LC Accordion',
		'category' => 'lc-widgets',
		'icon' => 'list-view',
		'description' => 'Accordion block with advanced Elementor/Divi style settings.',
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'title' => 'Accordion Item 1',
						'content' => 'Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					),
					array(
						'id' => '2',
						'title' => 'Accordion Item 2',
						'content' => 'Click edit button to change this text. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
					)
				)
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'plus-minus'
			),
			'iconAlign' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => '#0f172a'
			),
			'titleActiveColor' => array(
				'type' => 'string',
				'default' => '#4f46e5'
			),
			'titleBgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'contentColor' => array(
				'type' => 'string',
				'default' => '#334155'
			),
			'contentBgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#e2e8f0'
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'animationType' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'animationDuration' => array(
				'type' => 'string',
				'default' => '1s'
			),
			'animationDelay' => array(
				'type' => 'string',
				'default' => '0s'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'padding' => true
				)
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'countdown-timer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/countdown-timer',
		'version' => '0.1.0',
		'title' => 'LC Countdown Timer',
		'category' => 'lc-widgets',
		'icon' => 'clock',
		'description' => 'A customizable countdown timer block with rich styling settings.',
		'attributes' => array(
			'targetDate' => array(
				'type' => 'string',
				'default' => ''
			),
			'showDays' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showHours' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showMinutes' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showSeconds' => array(
				'type' => 'boolean',
				'default' => true
			),
			'labelDays' => array(
				'type' => 'string',
				'default' => 'Days'
			),
			'labelHours' => array(
				'type' => 'string',
				'default' => 'Hours'
			),
			'labelMinutes' => array(
				'type' => 'string',
				'default' => 'Minutes'
			),
			'labelSeconds' => array(
				'type' => 'string',
				'default' => 'Seconds'
			),
			'styleType' => array(
				'type' => 'string',
				'default' => 'block'
			),
			'boxBgColor' => array(
				'type' => 'string',
				'default' => '#f1f5f9'
			),
			'boxBorderColor' => array(
				'type' => 'string',
				'default' => '#e2e8f0'
			),
			'boxBorderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'boxBorderRadius' => array(
				'type' => 'number',
				'default' => 8
			),
			'numberColor' => array(
				'type' => 'string',
				'default' => '#0f172a'
			),
			'labelColor' => array(
				'type' => 'string',
				'default' => '#64748b'
			),
			'gap' => array(
				'type' => 'number',
				'default' => 20
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'animationType' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'animationDuration' => array(
				'type' => 'string',
				'default' => '1s'
			),
			'animationDelay' => array(
				'type' => 'string',
				'default' => '0s'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'padding' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'drop-caps' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/drop-caps',
		'version' => '0.1.0',
		'title' => 'LC Drop Caps',
		'category' => 'lc-widgets',
		'icon' => 'editor-textcolor',
		'description' => 'Advanced drop caps block with customizable view, shape, and styling.',
		'attributes' => array(
			'content' => array(
				'type' => 'string',
				'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
			),
			'view' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'shape' => array(
				'type' => 'string',
				'default' => 'square'
			),
			'primaryColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'secondaryColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'size' => array(
				'type' => 'number',
				'default' => 50
			),
			'space' => array(
				'type' => 'number',
				'default' => 10
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'borderRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'dropCapPadding' => array(
				'type' => 'number',
				'default' => 10
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'left'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'padding' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'faq' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/faq',
		'version' => '0.1.0',
		'title' => 'LC FAQ',
		'category' => 'lc-widgets',
		'icon' => 'editor-help',
		'description' => 'FAQ block with rich schema.org markup for SEO, based on accordion behavior.',
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'title' => 'Frequently Asked Question 1',
						'content' => 'Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					),
					array(
						'id' => '2',
						'title' => 'Frequently Asked Question 2',
						'content' => 'Click edit button to change this text. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
					)
				)
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'plus-minus'
			),
			'iconAlign' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => '#0f172a'
			),
			'titleActiveColor' => array(
				'type' => 'string',
				'default' => '#4f46e5'
			),
			'titleBgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'contentColor' => array(
				'type' => 'string',
				'default' => '#334155'
			),
			'contentBgColor' => array(
				'type' => 'string',
				'default' => '#f8fafc'
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#e2e8f0'
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'animationType' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'animationDuration' => array(
				'type' => 'string',
				'default' => '1s'
			),
			'animationDelay' => array(
				'type' => 'string',
				'default' => '0s'
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'span'
			),
			'headingText' => array(
				'type' => 'string',
				'default' => 'Ask you question'
			),
			'headingTag' => array(
				'type' => 'string',
				'default' => 'h2'
			),
			'headingAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'headingColor' => array(
				'type' => 'string',
				'default' => '#0f172a'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'padding' => true
				)
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'heading' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/heading',
		'version' => '0.1.0',
		'title' => 'LC Heading',
		'category' => 'lc-widgets',
		'icon' => 'heading',
		'description' => 'Advanced heading block with Elementor and Divi like settings.',
		'attributes' => array(
			'content' => array(
				'type' => 'string',
				'default' => 'Stunning Default Heading'
			),
			'level' => array(
				'type' => 'number',
				'default' => 2
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'link' => array(
				'type' => 'string',
				'default' => ''
			),
			'linkTarget' => array(
				'type' => 'string',
				'default' => '_self'
			),
			'textStrokeColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'textStrokeWidth' => array(
				'type' => 'number',
				'default' => 0
			),
			'textShadowColor' => array(
				'type' => 'string',
				'default' => 'rgba(0,0,0,0.2)'
			),
			'textShadowBlur' => array(
				'type' => 'number',
				'default' => 15
			),
			'textShadowX' => array(
				'type' => 'number',
				'default' => 0
			),
			'textShadowY' => array(
				'type' => 'number',
				'default' => 10
			),
			'blendMode' => array(
				'type' => 'string',
				'default' => 'normal'
			),
			'animationType' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'animationDuration' => array(
				'type' => 'string',
				'default' => '1s'
			),
			'animationDelay' => array(
				'type' => 'string',
				'default' => '0s'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'color' => array(
				'text' => true,
				'background' => true,
				'gradients' => true,
				'link' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'padding' => true
				)
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'color' => true,
					'width' => true,
					'style' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'lc-block-widgets' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lc-block-widgets',
		'version' => '0.1.0',
		'title' => 'Lc Block Widgets',
		'category' => 'lc-widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'pie-chart' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/pie-chart',
		'version' => '0.1.0',
		'title' => 'LC Pie Chart',
		'category' => 'lc-widgets',
		'icon' => 'chart-pie',
		'description' => 'A dynamic pie and donut chart block using Chart.js.',
		'attributes' => array(
			'chartData' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'label' => 'Red',
						'value' => 300,
						'bg' => '#ff6384'
					),
					array(
						'id' => '2',
						'label' => 'Blue',
						'value' => 50,
						'bg' => '#36a2eb'
					),
					array(
						'id' => '3',
						'label' => 'Yellow',
						'value' => 100,
						'bg' => '#ffce56'
					)
				)
			),
			'legendPosition' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'cutout' => array(
				'type' => 'number',
				'default' => 0
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 2
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'animationSpeed' => array(
				'type' => 'number',
				'default' => 1000
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'padding' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'pricing-table' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/pricing-table',
		'version' => '0.1.0',
		'title' => 'LC Pricing Table',
		'category' => 'lc-widgets',
		'icon' => 'money-alt',
		'description' => 'A fully customizable pricing table block with features list and button.',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Pro Plan'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Best for growing businesses'
			),
			'isFeatured' => array(
				'type' => 'boolean',
				'default' => false
			),
			'featuredBadge' => array(
				'type' => 'string',
				'default' => 'Most Popular'
			),
			'currency' => array(
				'type' => 'string',
				'default' => '$'
			),
			'price' => array(
				'type' => 'string',
				'default' => '99'
			),
			'period' => array(
				'type' => 'string',
				'default' => '/ month'
			),
			'features' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'text' => '50 Users',
						'active' => true,
						'icon' => 'fas fa-check'
					),
					array(
						'id' => '2',
						'text' => '100GB Storage',
						'active' => true,
						'icon' => 'fas fa-check'
					),
					array(
						'id' => '3',
						'text' => '24/7 Support',
						'active' => true,
						'icon' => 'fas fa-check'
					),
					array(
						'id' => '4',
						'text' => 'Custom Domain',
						'active' => false,
						'icon' => 'fas fa-times'
					)
				)
			),
			'layoutStyle' => array(
				'type' => 'string',
				'default' => 'style1'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Get Started'
			),
			'buttonUrl' => array(
				'type' => 'string',
				'default' => '#'
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'headerBgColor' => array(
				'type' => 'string',
				'default' => '#2563eb'
			),
			'headerTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'priceColor' => array(
				'type' => 'string',
				'default' => '#1e293b'
			),
			'featureTextColor' => array(
				'type' => 'string',
				'default' => '#475569'
			),
			'buttonBgColor' => array(
				'type' => 'string',
				'default' => '#2563eb'
			),
			'buttonTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'boxBgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#e2e8f0'
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'borderRadius' => array(
				'type' => 'number',
				'default' => 12
			),
			'boxShadow' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'progress-bar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/progress-bar',
		'version' => '0.1.0',
		'title' => 'LC Progress Bar',
		'category' => 'lc-widgets',
		'icon' => 'performance',
		'description' => 'A premium animated progress bar widget.',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Web Development'
			),
			'percentage' => array(
				'type' => 'number',
				'default' => 85
			),
			'displayPercentage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'layoutStyle' => array(
				'type' => 'string',
				'default' => 'standard'
			),
			'barHeight' => array(
				'type' => 'number',
				'default' => 18
			),
			'borderRadius' => array(
				'type' => 'number',
				'default' => 50
			),
			'isStriped' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isAnimated' => array(
				'type' => 'boolean',
				'default' => true
			),
			'animationDuration' => array(
				'type' => 'number',
				'default' => 1500
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => '#1e293b'
			),
			'percentageColor' => array(
				'type' => 'string',
				'default' => '#1e293b'
			),
			'barColor' => array(
				'type' => 'string',
				'default' => '#4f46e5'
			),
			'trackColor' => array(
				'type' => 'string',
				'default' => '#f1f5f9'
			),
			'innerTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'left'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontWeight' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./index.css'
	),
	'social-icons' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/social-icons',
		'version' => '0.1.0',
		'title' => 'LC Social Icons',
		'category' => 'lc-widgets',
		'icon' => 'share',
		'description' => 'A premium social icons block with Elementor-like controls.',
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'network' => 'facebook',
						'icon' => 'fab fa-facebook-f',
						'link' => '#',
						'color' => '#1877F2'
					),
					array(
						'id' => '2',
						'network' => 'twitter',
						'icon' => 'fab fa-twitter',
						'link' => '#',
						'color' => '#1DA1F2'
					),
					array(
						'id' => '3',
						'network' => 'youtube',
						'icon' => 'fab fa-youtube',
						'link' => '#',
						'color' => '#FF0000'
					)
				)
			),
			'shape' => array(
				'type' => 'string',
				'default' => 'rounded'
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'iconSize' => array(
				'type' => 'number',
				'default' => 18
			),
			'iconPadding' => array(
				'type' => 'number',
				'default' => 10
			),
			'iconSpacing' => array(
				'type' => 'number',
				'default' => 10
			),
			'colorType' => array(
				'type' => 'string',
				'default' => 'official'
			),
			'customPrimaryColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'customSecondaryColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'hoverAnimation' => array(
				'type' => 'string',
				'default' => 'none'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-block-widgets/tabs',
		'version' => '0.1.0',
		'title' => 'LC Tabs',
		'category' => 'lc-widgets',
		'icon' => 'index-card',
		'description' => 'A modern Tab block with premium segmented control styling.',
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'title' => 'First Tab',
						'content' => 'This is the content for the first tab.'
					),
					array(
						'id' => '2',
						'title' => 'Second Tab',
						'content' => 'This is the content for the second tab.'
					),
					array(
						'id' => '3',
						'title' => 'Third Tab',
						'content' => 'This is the content for the third tab.'
					)
				)
			),
			'tabBgColor' => array(
				'type' => 'string',
				'default' => '#f1f5f9'
			),
			'tabActiveColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#64748b'
			),
			'textActiveColor' => array(
				'type' => 'string',
				'default' => '#0f172a'
			),
			'contentBgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'contentTextColor' => array(
				'type' => 'string',
				'default' => '#334155'
			),
			'tabBorderRadius' => array(
				'type' => 'number',
				'default' => 12
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => true,
					'padding' => true
				)
			)
		),
		'textdomain' => 'lc-block-widgets',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	)
);
