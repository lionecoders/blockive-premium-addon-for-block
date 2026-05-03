/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/progress-bar/edit.js"
/*!**********************************!*\
  !*** ./src/progress-bar/edit.js ***!
  \**********************************/
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
}, {
  name: 'Gradient Mix',
  color: 'linear-gradient(90deg, #4f46e5 0%, #0ea5e9 100%)'
}];
function Edit({
  attributes,
  setAttributes
}) {
  const {
    title,
    percentage,
    displayPercentage,
    layoutStyle,
    barHeight,
    borderRadius,
    isStriped,
    isAnimated,
    animationDuration,
    titleColor,
    percentageColor,
    barColor,
    trackColor,
    innerTextColor,
    alignment
  } = attributes;
  const customStyles = {
    '--bpafb-pb-height': `${barHeight !== undefined ? barHeight : 18}px`,
    '--bpafb-pb-radius': `${borderRadius !== undefined ? borderRadius : 50}px`,
    '--bpafb-pb-title-color': titleColor || '#1e293b',
    '--bpafb-pb-percent-color': percentageColor || '#1e293b',
    '--bpafb-pb-track-bg': trackColor || '#f1f5f9',
    '--bpafb-pb-inner-text': innerTextColor || '#ffffff'
  };
  let barBgStyle = {};
  if (barColor && barColor.includes('gradient')) {
    barBgStyle.backgroundImage = barColor;
  } else {
    barBgStyle.backgroundColor = barColor || '#4f46e5';
  }
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.AlignmentControl, {
        value: alignment,
        onChange: newAlign => setAttributes({
          alignment: newAlign || 'left'
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content Settings', 'blockive-premium-addon-for-block'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Percentage (%)', 'blockive-premium-addon-for-block'),
          value: percentage,
          onChange: val => setAttributes({
            percentage: val
          }),
          min: 0,
          max: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Percentage Label?', 'blockive-premium-addon-for-block'),
          checked: displayPercentage,
          onChange: val => setAttributes({
            displayPercentage: val
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Design Options', 'blockive-premium-addon-for-block'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Layout Style', 'blockive-premium-addon-for-block'),
          value: layoutStyle,
          options: [{
            label: 'Standard (Top Info)',
            value: 'standard'
          }, {
            label: 'Inline Inside Bar',
            value: 'inside'
          }],
          onChange: val => setAttributes({
            layoutStyle: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bar Height (px)', 'blockive-premium-addon-for-block'),
          value: barHeight,
          onChange: val => setAttributes({
            barHeight: val
          }),
          min: 5,
          max: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Radius (px)', 'blockive-premium-addon-for-block'),
          value: borderRadius,
          onChange: val => setAttributes({
            borderRadius: val
          }),
          min: 0,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Striped Bar?', 'blockive-premium-addon-for-block'),
          checked: isStriped,
          onChange: val => setAttributes({
            isStriped: val
          })
        }), isStriped && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animate Stripes? (Scrolling)', 'blockive-premium-addon-for-block'),
          checked: isAnimated,
          onChange: val => setAttributes({
            isAnimated: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Entrance Animation Speed (ms)', 'blockive-premium-addon-for-block'),
          value: animationDuration,
          onChange: val => setAttributes({
            animationDuration: val
          }),
          min: 500,
          max: 5000,
          step: 100,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Controls how long the bar takes to fill up.', 'blockive-premium-addon-for-block')
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      group: "styles",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Colors', 'blockive-premium-addon-for-block'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bar Progress Color', 'blockive-premium-addon-for-block'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: barColor || '#4f46e5',
            onChange: val => setAttributes({
              barColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Track Background', 'blockive-premium-addon-for-block'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: trackColor || '#f1f5f9',
            onChange: val => setAttributes({
              trackColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title Color', 'blockive-premium-addon-for-block'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: titleColor || '#1e293b',
            onChange: val => setAttributes({
              titleColor: val
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Percentage Color', 'blockive-premium-addon-for-block'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: percentageColor || '#1e293b',
            onChange: val => setAttributes({
              percentageColor: val
            })
          })
        }), layoutStyle === 'inside' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Inner Text Color', 'blockive-premium-addon-for-block'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
            colors: themeColors,
            value: innerTextColor || '#ffffff',
            onChange: val => setAttributes({
              innerTextColor: val
            })
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: `bpafb-progress-bar-wrapper bpafb-pb-style-${layoutStyle || 'standard'}`,
        style: {
          ...customStyles,
          textAlign: alignment || 'left'
        },
        children: [layoutStyle === 'standard' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "bpafb-pb-header",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
            tagName: "span",
            className: "bpafb-pb-title",
            value: title,
            onChange: val => setAttributes({
              title: val
            }),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Skill or Metric', 'blockive-premium-addon-for-block')
          }), displayPercentage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
            className: "bpafb-pb-percentage",
            children: [percentage, "%"]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "bpafb-pb-track",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: `bpafb-pb-fill ${isStriped ? 'bpafb-pb-striped' : ''} ${isStriped && isAnimated ? 'bpafb-pb-striped-animated' : ''}`,
            style: {
              width: `${percentage}%`,
              ...barBgStyle
            },
            children: layoutStyle === 'inside' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "bpafb-pb-inner-content",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
                tagName: "span",
                className: "bpafb-pb-inner-title",
                value: title,
                onChange: val => setAttributes({
                  title: val
                }),
                placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Label', 'blockive-premium-addon-for-block')
              }), displayPercentage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                className: "bpafb-pb-inner-percent",
                children: [percentage, "%"]
              })]
            })
          })
        })]
      })
    })]
  });
}

/***/ },

/***/ "./src/progress-bar/save.js"
/*!**********************************!*\
  !*** ./src/progress-bar/save.js ***!
  \**********************************/
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
    percentage,
    displayPercentage,
    layoutStyle,
    barHeight,
    borderRadius,
    isStriped,
    isAnimated,
    animationDuration,
    titleColor,
    percentageColor,
    barColor,
    trackColor,
    innerTextColor,
    alignment
  } = attributes;
  const customStyles = {
    '--bpafb-pb-height': `${barHeight !== undefined ? barHeight : 18}px`,
    '--bpafb-pb-radius': `${borderRadius !== undefined ? borderRadius : 50}px`,
    '--bpafb-pb-title-color': titleColor || '#1e293b',
    '--bpafb-pb-percent-color': percentageColor || '#1e293b',
    '--bpafb-pb-track-bg': trackColor || '#f1f5f9',
    '--bpafb-pb-inner-text': innerTextColor || '#ffffff'
  };
  let barBgStyle = {};
  if (barColor && barColor.includes('gradient')) {
    barBgStyle.backgroundImage = barColor;
  } else {
    barBgStyle.backgroundColor = barColor || '#4f46e5';
  }
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `bpafb-progress-bar-wrapper bpafb-pb-style-${layoutStyle || 'standard'}`,
      style: {
        ...customStyles,
        textAlign: alignment || 'left'
      },
      "data-blockive-progress": true,
      "data-percentage": percentage,
      "data-duration": animationDuration || 1500,
      children: [layoutStyle === 'standard' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "bpafb-pb-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText.Content, {
          tagName: "span",
          className: "bpafb-pb-title",
          value: title
        }), displayPercentage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
          className: "bpafb-pb-percentage",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
            className: "bpafb-pb-number",
            children: "0"
          }), "%"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "bpafb-pb-track",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `bpafb-pb-fill ${isStriped ? 'bpafb-pb-striped' : ''} ${isStriped && isAnimated ? 'bpafb-pb-striped-animated' : ''}`,
          style: {
            width: '0%',
            // Initially 0% for frontend animation!
            ...barBgStyle
          },
          children: layoutStyle === 'inside' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "bpafb-pb-inner-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText.Content, {
              tagName: "span",
              className: "bpafb-pb-inner-title",
              value: title
            }), displayPercentage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
              className: "bpafb-pb-inner-percent",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "bpafb-pb-number",
                style: {
                  opacity: isAnimated ? 0 : 1
                },
                children: percentage
              }), "%"]
            })]
          })
        })
      })]
    })
  });
}

/***/ },

/***/ "./src/progress-bar/style-index.css"
/*!******************************************!*\
  !*** ./src/progress-bar/style-index.css ***!
  \******************************************/
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

/***/ "./src/progress-bar/block.json"
/*!*************************************!*\
  !*** ./src/progress-bar/block.json ***!
  \*************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"blockive-premium-addon-for-block/progress-bar","version":"0.1.0","title":"Blockive Progress Bar","category":"bpafb-widgets","icon":"performance","description":"A premium animated progress bar widget.","attributes":{"title":{"type":"string","default":"Web Development"},"percentage":{"type":"number","default":85},"displayPercentage":{"type":"boolean","default":true},"layoutStyle":{"type":"string","default":"standard"},"barHeight":{"type":"number","default":18},"borderRadius":{"type":"number","default":50},"isStriped":{"type":"boolean","default":false},"isAnimated":{"type":"boolean","default":true},"animationDuration":{"type":"number","default":1500},"titleColor":{"type":"string","default":"#1e293b"},"percentageColor":{"type":"string","default":"#1e293b"},"barColor":{"type":"string","default":"#4f46e5"},"trackColor":{"type":"string","default":"#f1f5f9"},"innerTextColor":{"type":"string","default":"#ffffff"},"alignment":{"type":"string","default":"left"}},"supports":{"align":["wide","full"],"html":false,"typography":{"fontSize":true,"__experimentalFontWeight":true},"spacing":{"margin":true,"padding":true}},"textdomain":"blockive-premium-addon-for-block","editorScript":"file:./index.js","viewScript":"file:./view.js","style":"file:./index.css"}');

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
/*!***********************************!*\
  !*** ./src/progress-bar/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-index.css */ "./src/progress-bar/style-index.css");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/progress-bar/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/progress-bar/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/progress-bar/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map