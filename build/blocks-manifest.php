<?php
// This file is generated. Do not modify it manually.
return array(
	'accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/accordion',
		'version' => '0.1.0',
		'title' => 'LC Accordion',
		'category' => 'lcibwc-widgets',
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
			)
		),
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'business-hours' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/business-hours',
		'version' => '0.1.0',
		'title' => 'LC Business Hours',
		'category' => 'lcibwc-widgets',
		'icon' => 'clock',
		'description' => 'Business Hours block to display opening and closing times.',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Business Hours'
			),
			'hours' => array(
				'type' => 'array',
				'default' => array(
					array(
						'day' => 'monday',
						'openTime' => '09:00',
						'closeTime' => '18:00',
						'isClosed' => false,
						'closedText' => 'Closed'
					),
					array(
						'day' => 'tuesday',
						'openTime' => '09:00',
						'closeTime' => '18:00',
						'isClosed' => false,
						'closedText' => 'Closed'
					),
					array(
						'day' => 'wednesday',
						'openTime' => '09:00',
						'closeTime' => '18:00',
						'isClosed' => false,
						'closedText' => 'Closed'
					),
					array(
						'day' => 'thursday',
						'openTime' => '09:00',
						'closeTime' => '18:00',
						'isClosed' => false,
						'closedText' => 'Closed'
					),
					array(
						'day' => 'friday',
						'openTime' => '09:00',
						'closeTime' => '18:00',
						'isClosed' => false,
						'closedText' => 'Closed'
					),
					array(
						'day' => 'saturday',
						'openTime' => '10:00',
						'closeTime' => '16:00',
						'isClosed' => false,
						'closedText' => 'Closed'
					),
					array(
						'day' => 'sunday',
						'openTime' => '',
						'closeTime' => '',
						'isClosed' => true,
						'closedText' => 'Closed'
					)
				)
			),
			'highlightToday' => array(
				'type' => 'boolean',
				'default' => true
			),
			'timeFormat' => array(
				'type' => 'string',
				'default' => '24'
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'containerBgColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'itemBgColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'itemTextColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'todayBgColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'todayTextColor' => array(
				'type' => 'string',
				'default' => ''
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
			'color' => array(
				'background' => true,
				'text' => true,
				'gradients' => true
			),
			'borders' => array(
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/button',
		'version' => '0.1.0',
		'title' => 'LC Button',
		'category' => 'lcibwc-widgets',
		'icon' => 'button',
		'description' => 'A highly customizable button with icon and badge support.',
		'attributes' => array(
			'text' => array(
				'type' => 'string',
				'default' => 'Click Here'
			),
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'linkTarget' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showIcon' => array(
				'type' => 'boolean',
				'default' => false
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'fas fa-arrow-right'
			),
			'iconPosition' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'badgeText' => array(
				'type' => 'string',
				'default' => ''
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'buttonWidth' => array(
				'type' => 'string',
				'default' => 'auto'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'bgColor' => array(
				'type' => 'string',
				'default' => '#3b82f6'
			),
			'textColorHover' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'bgColorHover' => array(
				'type' => 'string',
				'default' => '#2563eb'
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => 'transparent'
			),
			'borderColorHover' => array(
				'type' => 'string',
				'default' => 'transparent'
			),
			'badgeTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'badgeBgColor' => array(
				'type' => 'string',
				'default' => '#ef4444'
			),
			'iconSpacing' => array(
				'type' => 'number',
				'default' => 8
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
			'borders' => array(
				'radius' => true,
				'color' => false,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'width' => true,
					'style' => true
				)
			)
		),
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'category-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/category-list',
		'version' => '0.1.0',
		'title' => 'LC Category List',
		'category' => 'lcibwc-widgets',
		'icon' => 'list-view',
		'description' => 'WordPress category browser/list block.',
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 3
			),
			'showCount' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDescription' => array(
				'type' => 'boolean',
				'default' => false
			),
			'hideEmpty' => array(
				'type' => 'boolean',
				'default' => true
			),
			'limit' => array(
				'type' => 'number',
				'default' => 10
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css'
	),
	'contact-form-7' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/contact-form-7',
		'version' => '0.1.0',
		'title' => 'LC Contact Form 7',
		'category' => 'lcibwc-widgets',
		'icon' => 'email-alt',
		'description' => 'Contact Form 7 integration block.',
		'attributes' => array(
			'formId' => array(
				'type' => 'string',
				'default' => ''
			),
			'showTitle' => array(
				'type' => 'boolean',
				'default' => true
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Contact Us'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Send us a message'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css'
	),
	'countdown-timer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/countdown-timer',
		'version' => '0.1.0',
		'title' => 'LC Countdown Timer',
		'category' => 'lcibwc-widgetsgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'drop-caps' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collectionblock-widgets-collection/drop-caps',
		'version' => '0.1.0',
		'title' => 'LC Drop Caps',
		'category' => 'lcibwc-widgetsgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'faq' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collectionblock-widgets-collection/faq',
		'version' => '0.1.0',
		'title' => 'LC FAQ',
		'category' => 'lcibwc-widgets',
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
			)
		),
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'funfact' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/funfact',
		'version' => '0.1.0',
		'title' => 'LC Fun Fact',
		'category' => 'lcibwc-widgets',
		'icon' => 'chart-bar',
		'description' => 'Animated statistics/counter block.',
		'attributes' => array(
			'number' => array(
				'type' => 'string',
				'default' => '1000'
			),
			'suffix' => array(
				'type' => 'string',
				'default' => '+'
			),
			'prefix' => array(
				'type' => 'string',
				'default' => ''
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Happy Clients'
			),
			'icon' => array(
				'type' => 'string',
				'default' => ''
			),
			'numberColor' => array(
				'type' => 'string',
				'default' => '#4f46e5'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'duration' => array(
				'type' => 'number',
				'default' => 1000
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'heading' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/heading',
		'version' => '0.1.0',
		'title' => 'LC Heading',
		'category' => 'lcibwc-widgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'icon-box' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/icon-box',
		'version' => '0.1.0',
		'title' => 'LC Icon Box',
		'category' => 'lcibwc-widgets',
		'icon' => 'info',
		'description' => 'An icon box that displays an icon, title, description, and link.',
		'attributes' => array(
			'icon' => array(
				'type' => 'string',
				'default' => 'fas fa-star'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Icon Box Title'
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			),
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'linkTarget' => array(
				'type' => 'boolean',
				'default' => false
			),
			'iconPosition' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'iconSize' => array(
				'type' => 'number',
				'default' => 40
			),
			'iconColor' => array(
				'type' => 'string',
				'default' => '#3b82f6'
			),
			'iconBgColor' => array(
				'type' => 'string',
				'default' => 'rgba(59, 130, 246, 0.1)'
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'descColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'boxBgColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'iconPadding' => array(
				'type' => 'number',
				'default' => 20
			),
			'iconBorderRadius' => array(
				'type' => 'number',
				'default' => 20
			),
			'boxAlignment' => array(
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
			'color' => array(
				'background' => true,
				'text' => true,
				'gradients' => true
			),
			'borders' => array(
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'image-accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/image-accordion',
		'version' => '0.1.0',
		'title' => 'LC Image Accordion',
		'category' => 'lcibwc-widgets',
		'icon' => 'image',
		'description' => 'Image accordion block with advanced styling options.',
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'title' => 'Image Accordion Item 1',
						'imageUrl' => '',
						'content' => 'Content goes here...'
					),
					array(
						'id' => '2',
						'title' => 'Image Accordion Item 2',
						'imageUrl' => '',
						'content' => 'Content goes here...'
					)
				)
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'contentColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'overlayOpacity' => array(
				'type' => 'number',
				'default' => 0.7
			),
			'animationDuration' => array(
				'type' => 'string',
				'default' => '0.3s'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'image-box' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/image-box',
		'version' => '0.1.0',
		'title' => 'LC Image Box',
		'category' => 'lcibwc-widgets',
		'icon' => 'format-image',
		'description' => 'An image box that displays an image, title, description, and link.',
		'attributes' => array(
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageId' => array(
				'type' => 'number',
				'default' => 0
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Image Box Title'
			),
			'titleTag' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			),
			'linkUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'linkText' => array(
				'type' => 'string',
				'default' => 'Read More'
			),
			'linkTarget' => array(
				'type' => 'boolean',
				'default' => false
			),
			'imagePosition' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'contentAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'verticalAlign' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'imageSize' => array(
				'type' => 'string',
				'default' => '100%'
			),
			'imageRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'titleColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'descColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'linkColor' => array(
				'type' => 'string',
				'default' => '#3b82f6'
			),
			'boxBgColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageSpacing' => array(
				'type' => 'number',
				'default' => 20
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
			'color' => array(
				'background' => true,
				'text' => true,
				'gradients' => true
			),
			'borders' => array(
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'image-comparison' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/image-comparison',
		'version' => '0.1.0',
		'title' => 'LC Image Comparison',
		'category' => 'lcibwc-widgets',
		'icon' => 'format-image',
		'description' => 'Before/after image comparison slider block.',
		'attributes' => array(
			'beforeImage' => array(
				'type' => 'string',
				'default' => ''
			),
			'afterImage' => array(
				'type' => 'string',
				'default' => ''
			),
			'beforeLabel' => array(
				'type' => 'string',
				'default' => 'Before'
			),
			'afterLabel' => array(
				'type' => 'string',
				'default' => 'After'
			),
			'showLabels' => array(
				'type' => 'boolean',
				'default' => true
			),
			'sliderPosition' => array(
				'type' => 'number',
				'default' => 50
			),
			'height' => array(
				'type' => 'string',
				'default' => '400px'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'lottie' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/lottie',
		'version' => '0.1.0',
		'title' => 'LC Lottie',
		'category' => 'lcibwc-widgets',
		'icon' => 'format-image',
		'description' => 'Lottie animation player block.',
		'attributes' => array(
			'animationUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'width' => array(
				'type' => 'string',
				'default' => '200px'
			),
			'height' => array(
				'type' => 'string',
				'default' => '200px'
			),
			'loop' => array(
				'type' => 'boolean',
				'default' => true
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => true
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'mailchimp' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/mailchimp',
		'version' => '0.1.0',
		'title' => 'LC MailChimp',
		'category' => 'lcibwc-widgets',
		'icon' => 'email',
		'description' => 'MailChimp newsletter subscription block.',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Subscribe to Our Newsletter'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Get the latest updates delivered to your inbox'
			),
			'placeholderText' => array(
				'type' => 'string',
				'default' => 'Enter your email'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Subscribe'
			),
			'bgColor' => array(
				'type' => 'string',
				'default' => '#4f46e5'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css'
	),
	'pie-chart' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/pie-chart',
		'version' => '0.1.0',
		'title' => 'LC Pie Chart',
		'category' => 'lcibwc-widgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'post-grid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/post-grid',
		'version' => '0.1.0',
		'title' => 'LC Post Grid',
		'category' => 'lcibwc-widgets',
		'icon' => 'grid-view',
		'description' => 'Dynamic post grid/listing block.',
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 3
			),
			'postsPerPage' => array(
				'type' => 'number',
				'default' => 9
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date'
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'showImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDate' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showAuthor' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css'
	),
	'pricing-table' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collectionblock-widgets-collection/pricing-table',
		'version' => '0.1.0',
		'title' => 'LC Pricing Table',
		'category' => 'lcibwc-widgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'progress-bar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/progress-bar',
		'version' => '0.1.0',
		'title' => 'LC Progress Bar',
		'category' => 'lcibwc-widgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./view.js',
		'style' => 'file:./index.css'
	),
	'social-icons' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/social-icons',
		'version' => '0.1.0',
		'title' => 'LC Social Icons',
		'category' => 'lcibwc-widgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css'
	),
	'tabs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/tabs',
		'version' => '0.1.0',
		'title' => 'LC Tabs',
		'category' => 'lcibwc-widgets',
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
		'textdomain' => 'lc-immeasurable-block-widgets-collection',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./index.css',
		'viewScript' => 'file:./view.js'
	),
	'team' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/team',
		'version' => '0.1.0',
		'title' => 'LC Team',
		'category' => 'lcibwc-widgets',
		'icon' => 'groups',
		'description' => 'Team members showcase block.',
		'attributes' => array(
			'members' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'name' => 'John Smith',
						'role' => 'Team Lead',
						'image' => '',
						'bio' => 'Experienced team lead with expertise in project management.',
						'socialLinks' => array(
							
						)
					)
				)
			),
			'columns' => array(
				'type' => 'number',
				'default' => 3
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'bgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css'
	),
	'testimonial' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/testimonial',
		'version' => '0.1.0',
		'title' => 'LC Testimonial',
		'category' => 'lcibwc-widgets',
		'icon' => 'format-quote',
		'description' => 'Customer testimonials slider block.',
		'attributes' => array(
			'testimonials' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => '1',
						'name' => 'John Doe',
						'designation' => 'CEO',
						'image' => '',
						'content' => 'This is an amazing product! Highly recommended.',
						'rating' => 5
					)
				)
			),
			'style' => array(
				'type' => 'string',
				'default' => 'style1'
			),
			'showRating' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDots' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showArrows' => array(
				'type' => 'boolean',
				'default' => true
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'bgColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'video' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'lc-immeasurable-block-widgets-collection/video',
		'version' => '0.1.0',
		'title' => 'LC Video',
		'category' => 'lcibwc-widgets',
		'icon' => 'video-alt',
		'description' => 'Video embedding block with customization options.',
		'attributes' => array(
			'videoUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'width' => array(
				'type' => 'string',
				'default' => '100%'
			),
			'height' => array(
				'type' => 'string',
				'default' => '400px'
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'controls' => array(
				'type' => 'boolean',
				'default' => true
			),
			'loop' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./style-index.css',
		'style' => 'file:./style-index.css'
	)
);
