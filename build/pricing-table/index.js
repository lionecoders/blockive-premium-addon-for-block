/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pricing-table/edit.js"
/*!***********************************!*\
  !*** ./src/pricing-table/edit.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const themeColors = [{
  name: 'Indigo',
  color: '#4f46e5'
}, {
  name: 'Blue',
  color: '#2563eb'
}, {
  name: 'Dark Slate',
  color: '#0f172a'
}, {
  name: 'Gray Element',
  color: '#f1f5f9'
}, {
  name: 'Slate Gray',
  color: '#475569'
}, {
  name: 'White',
  color: '#ffffff'
}, {
  name: 'Red',
  color: '#ef4444'
}, {
  name: 'Green',
  color: '#22c55e'
}];
function Edit({
  attributes,
  setAttributes
}) {
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
    boxShadow
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
    '--lc-pt-border-radius': `${borderRadius !== undefined ? borderRadius : 16}px`
  };
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `align${alignment || 'center'}`
  });
  const updateFeature = (index, key, value) => {
    const newFeatures = [...features];
    newFeatures[index] = {
      ...newFeatures[index],
      [key]: value
    };
    setAttributes({
      features: newFeatures
    });
  };
  const addFeature = () => {
    setAttributes({
      features: [...(features || []), {
        id: Date.now().toString(),
        text: 'New Feature',
        active: true,
        icon: 'fas fa-check'
      }]
    });
  };
  const removeFeature = index => {
    const newFeatures = features.filter((_, i) => i !== index);
    setAttributes({
      features: newFeatures
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.AlignmentControl, {
        value: alignment,
        onChange: newAlign => setAttributes({
          alignment: newAlign || 'center'
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Header & Price', 'lc-block-widgets'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Highlight as Featured?', 'lc-block-widgets'),
          checked: isFeatured,
          onChange: val => setAttributes({
            isFeatured: val
          })
        }), isFeatured && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Featured Badge Text', 'lc-block-widgets'),
          value: featuredBadge,
          onChange: val => setAttributes({
            featuredBadge: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Currency Symbol', 'lc-block-widgets'),
          value: currency,
          onChange: val => setAttributes({
            currency: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Period Prefix/Suffix', 'lc-block-widgets'),
          value: period,
          onChange: val => setAttributes({
            period: val
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Features List', 'lc-block-widgets'),
        initialOpen: false,
        children: [features && features.map((feature, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          style: {
            marginBottom: '15px',
            padding: '10px',
            border: '1px solid #e2e8f0',
            borderRadius: '4px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Feature Text', 'lc-block-widgets'),
            value: feature.text,
            onChange: val => updateFeature(index, 'text', val)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is Active?', 'lc-block-widgets'),
            checked: feature.active,
            onChange: val => updateFeature(index, 'active', val)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('FontAwesome Class', 'lc-block-widgets'),
            value: feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times'),
            onChange: val => updateFeature(index, 'icon', val)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            isDestructive: true,
            onClick: () => removeFeature(index),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove', 'lc-block-widgets')
          })]
        }, feature.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isPrimary: true,
          onClick: addFeature,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Feature', 'lc-block-widgets')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Settings', 'lc-block-widgets'),
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button URL', 'lc-block-widgets'),
          value: buttonUrl,
          onChange: val => setAttributes({
            buttonUrl: val
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      group: "styles",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Layout Style', 'lc-block-widgets'),
        initialOpen: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Design Preset', 'lc-block-widgets'),
          value: layoutStyle,
          options: [{
            label: 'Style 1: Standard Card',
            value: 'style1'
          }, {
            label: 'Style 2: Clean Line (Transparent Header)',
            value: 'style2'
          }, {
            label: 'Style 3: Floating Gradient Header',
            value: 'style3'
          }],
          onChange: val => setAttributes({
            layoutStyle: val
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Style Settings', 'lc-block-widgets'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Width (px)', 'lc-block-widgets'),
          value: borderWidth !== undefined ? borderWidth : 1,
          onChange: val => setAttributes({
            borderWidth: val
          }),
          min: 0,
          max: 10
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Radius (px)', 'lc-block-widgets'),
          value: borderRadius !== undefined ? borderRadius : 16,
          onChange: val => setAttributes({
            borderRadius: val
          }),
          min: 0,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable Box Shadow', 'lc-block-widgets'),
          checked: boxShadow !== undefined ? boxShadow : true,
          onChange: val => setAttributes({
            boxShadow: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Header Background Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: headerBgColor || '#4f46e5',
            onChange: val => setAttributes({
              headerBgColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Header Text Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: headerTextColor || '#ffffff',
            onChange: val => setAttributes({
              headerTextColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Table Background Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: boxBgColor || '#ffffff',
            onChange: val => setAttributes({
              boxBgColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Price Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: priceColor || '#0f172a',
            onChange: val => setAttributes({
              priceColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Feature Text Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: featureTextColor || '#475569',
            onChange: val => setAttributes({
              featureTextColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: borderColor || '#f1f5f9',
            onChange: val => setAttributes({
              borderColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Background Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: buttonBgColor || '#4f46e5',
            onChange: val => setAttributes({
              buttonBgColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Text Color', 'lc-block-widgets'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: buttonTextColor || '#ffffff',
            onChange: val => setAttributes({
              buttonTextColor: val
            })
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: `lc-pricing-table lc-pricing-${layoutStyle || 'style1'} ${isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`,
        style: {
          ...customStyles,
          textAlign: alignment || 'center'
        },
        children: [isFeatured && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "lc-pricing-badge",
          children: featuredBadge
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "lc-pricing-header",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
            tagName: "h3",
            className: "lc-pricing-title",
            value: title,
            onChange: val => setAttributes({
              title: val
            }),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plan Title', 'lc-block-widgets')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
            tagName: "p",
            className: "lc-pricing-subtitle",
            value: subtitle,
            onChange: val => setAttributes({
              subtitle: val
            }),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plan description...', 'lc-block-widgets')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "lc-pricing-price-area",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "lc-pricing-currency",
            children: currency
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
            tagName: "span",
            className: "lc-pricing-amount",
            value: price,
            onChange: val => setAttributes({
              price: val
            }),
            placeholder: "99"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "lc-pricing-period",
            children: period
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("ul", {
          className: "lc-pricing-features",
          children: features && features.map(feature => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("li", {
            className: feature.active ? 'active' : 'inactive',
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
              className: feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              children: feature.text
            })]
          }, feature.id))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "lc-pricing-footer",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
            tagName: "a",
            className: "lc-pricing-button",
            value: buttonText,
            onChange: val => setAttributes({
              buttonText: val
            }),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Text', 'lc-block-widgets'),
            onClick: e => e.preventDefault()
          })
        })]
      })
    })]
  });
}

/***/ },

/***/ "./src/pricing-table/save.js"
/*!***********************************!*\
  !*** ./src/pricing-table/save.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
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
    boxShadow
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
    '--lc-pt-border-radius': `${borderRadius !== undefined ? borderRadius : 16}px`
  };
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: `align${alignment || 'center'}`
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `lc-pricing-table lc-pricing-${layoutStyle || 'style1'} ${isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`,
      style: {
        ...customStyles,
        textAlign: alignment || 'center'
      },
      children: [isFeatured && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "lc-pricing-badge",
        children: featuredBadge
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "lc-pricing-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText.Content, {
          tagName: "h3",
          className: "lc-pricing-title",
          value: title
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText.Content, {
          tagName: "p",
          className: "lc-pricing-subtitle",
          value: subtitle
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "lc-pricing-price-area",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "lc-pricing-currency",
          children: currency
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText.Content, {
          tagName: "span",
          className: "lc-pricing-amount",
          value: price
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "lc-pricing-period",
          children: period
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
        className: "lc-pricing-features",
        children: features && features.map(feature => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
          className: feature.active ? 'active' : 'inactive',
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
            className: feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
            children: feature.text
          })]
        }, feature.id))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "lc-pricing-footer",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          href: buttonUrl || '#',
          className: "lc-pricing-button",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText.Content, {
            value: buttonText
          })
        })
      })]
    })
  });
}

/***/ },

/***/ "./src/pricing-table/style-index.css"
/*!*******************************************!*\
  !*** ./src/pricing-table/style-index.css ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/pricing-table/block.json"
/*!**************************************!*\
  !*** ./src/pricing-table/block.json ***!
  \**************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"lc-block-widgets/pricing-table","version":"0.1.0","title":"LC Pricing Table","category":"lc-widgets","icon":"money-alt","description":"A fully customizable pricing table block with features list and button.","attributes":{"title":{"type":"string","default":"Pro Plan"},"subtitle":{"type":"string","default":"Best for growing businesses"},"isFeatured":{"type":"boolean","default":false},"featuredBadge":{"type":"string","default":"Most Popular"},"currency":{"type":"string","default":"$"},"price":{"type":"string","default":"99"},"period":{"type":"string","default":"/ month"},"features":{"type":"array","default":[{"id":"1","text":"50 Users","active":true,"icon":"fas fa-check"},{"id":"2","text":"100GB Storage","active":true,"icon":"fas fa-check"},{"id":"3","text":"24/7 Support","active":true,"icon":"fas fa-check"},{"id":"4","text":"Custom Domain","active":false,"icon":"fas fa-times"}]},"layoutStyle":{"type":"string","default":"style1"},"buttonText":{"type":"string","default":"Get Started"},"buttonUrl":{"type":"string","default":"#"},"alignment":{"type":"string","default":"center"},"headerBgColor":{"type":"string","default":"#2563eb"},"headerTextColor":{"type":"string","default":"#ffffff"},"priceColor":{"type":"string","default":"#1e293b"},"featureTextColor":{"type":"string","default":"#475569"},"buttonBgColor":{"type":"string","default":"#2563eb"},"buttonTextColor":{"type":"string","default":"#ffffff"},"boxBgColor":{"type":"string","default":"#ffffff"},"borderColor":{"type":"string","default":"#e2e8f0"},"borderWidth":{"type":"number","default":1},"borderRadius":{"type":"number","default":12},"boxShadow":{"type":"boolean","default":true}},"supports":{"align":["wide","full"],"html":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalDefaultControls":{"fontSize":true}},"spacing":{"margin":true,"padding":true,"__experimentalDefaultControls":{"margin":true}}},"textdomain":"lc-block-widgets","editorScript":"file:./index.js","style":"file:./style-index.css"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/pricing-table/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-index.css */ "./src/pricing-table/style-index.css");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/pricing-table/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/pricing-table/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/pricing-table/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map