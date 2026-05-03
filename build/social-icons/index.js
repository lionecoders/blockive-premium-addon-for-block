/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/social-icons/edit.js"
/*!**********************************!*\
  !*** ./src/social-icons/edit.js ***!
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




const PREDEFINED_NETWORKS = [{
  label: 'Facebook',
  value: 'facebook',
  icon: 'fab fa-facebook-f',
  color: '#1877F2'
}, {
  label: 'Twitter (X)',
  value: 'twitter',
  icon: 'fab fa-x-twitter',
  color: '#000000'
}, {
  label: 'YouTube',
  value: 'youtube',
  icon: 'fab fa-youtube',
  color: '#FF0000'
}, {
  label: 'Instagram',
  value: 'instagram',
  icon: 'fab fa-instagram',
  color: '#E1306C'
}, {
  label: 'LinkedIn',
  value: 'linkedin',
  icon: 'fab fa-linkedin-in',
  color: '#0077B5'
}, {
  label: 'Pinterest',
  value: 'pinterest',
  icon: 'fab fa-pinterest-p',
  color: '#E60023'
}, {
  label: 'WhatsApp',
  value: 'whatsapp',
  icon: 'fab fa-whatsapp',
  color: '#25D366'
}, {
  label: 'Custom',
  value: 'custom',
  icon: 'fas fa-link',
  color: '#888888'
}];
function Edit({
  attributes,
  setAttributes
}) {
  const {
    items,
    shape,
    alignment,
    iconSize,
    iconPadding,
    iconSpacing,
    colorType,
    customPrimaryColor,
    customSecondaryColor,
    hoverAnimation
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `bpafb-social-icons-wrapper bpafb-align-${alignment} bpafb-social-shape-${shape} bpafb-social-hover-${hoverAnimation}`
  });

  // Handle Repeater Item Add
  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      network: 'facebook',
      icon: 'fab fa-facebook-f',
      link: '#',
      color: '#1877F2'
    };
    setAttributes({
      items: [...items, newItem]
    });
  };

  // Handle Repeater Item Update
  const updateItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;

    // Auto-update icon and color if network changes
    if (key === 'network') {
      const preset = PREDEFINED_NETWORKS.find(n => n.value === value);
      if (preset) {
        newItems[index].icon = preset.icon;
        newItems[index].color = preset.color;
      }
    }
    setAttributes({
      items: newItems
    });
  };

  // Handle Repeater Item Remove
  const removeItem = index => {
    const newItems = items.filter((_, i) => i !== index);
    setAttributes({
      items: newItems
    });
  };

  // Move item up/down
  const moveItem = (index, dir) => {
    if (dir === -1 && index === 0 || dir === 1 && index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + dir];
    newItems[index + dir] = temp;
    setAttributes({
      items: newItems
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
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Social Icons', 'blockive-premium-addon-for-block'),
        initialOpen: true,
        children: [items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          style: {
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("strong", {
              children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icon', 'blockive-premium-addon-for-block'), " ", index + 1]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                isSmall: true,
                onClick: () => moveItem(index, -1),
                disabled: index === 0,
                children: "\u2191"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                isSmall: true,
                onClick: () => moveItem(index, 1),
                disabled: index === items.length - 1,
                children: "\u2193"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                isSmall: true,
                isDestructive: true,
                onClick: () => removeItem(index),
                children: "X"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Network', 'blockive-premium-addon-for-block'),
            value: item.network,
            options: PREDEFINED_NETWORKS,
            onChange: val => updateItem(index, 'network', val)
          }), item.network === 'custom' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Icon Class (FontAwesome)', 'blockive-premium-addon-for-block'),
            value: item.icon,
            onChange: val => updateItem(index, 'icon', val),
            help: "e.g. fab fa-github"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link URL', 'blockive-premium-addon-for-block'),
            value: item.link,
            onChange: val => updateItem(index, 'link', val)
          })]
        }, item.id)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isPrimary: true,
          onClick: addItem,
          style: {
            width: '100%',
            justifyContent: 'center'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add New Icon', 'blockive-premium-addon-for-block')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings', 'blockive-premium-addon-for-block'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shape', 'blockive-premium-addon-for-block'),
          value: shape,
          options: [{
            label: 'Rounded',
            value: 'rounded'
          }, {
            label: 'Square',
            value: 'square'
          }, {
            label: 'Circle',
            value: 'circle'
          }],
          onChange: val => setAttributes({
            shape: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Animation', 'blockive-premium-addon-for-block'),
          value: hoverAnimation,
          options: [{
            label: 'None',
            value: 'none'
          }, {
            label: 'Grow',
            value: 'grow'
          }, {
            label: 'Shrink',
            value: 'shrink'
          }, {
            label: 'Pulse',
            value: 'pulse'
          }],
          onChange: val => setAttributes({
            hoverAnimation: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icon Size', 'blockive-premium-addon-for-block'),
          value: iconSize,
          onChange: val => setAttributes({
            iconSize: val
          }),
          min: 10,
          max: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding', 'blockive-premium-addon-for-block'),
          value: iconPadding,
          onChange: val => setAttributes({
            iconPadding: val
          }),
          min: 0,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Spacing', 'blockive-premium-addon-for-block'),
          value: iconSpacing,
          onChange: val => setAttributes({
            iconSpacing: val
          }),
          min: 0,
          max: 50
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      group: "styles",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Colors', 'blockive-premium-addon-for-block'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color Type', 'blockive-premium-addon-for-block'),
          value: colorType,
          options: [{
            label: 'Official Color',
            value: 'official'
          }, {
            label: 'Custom',
            value: 'custom'
          }],
          onChange: val => setAttributes({
            colorType: val
          })
        }), colorType === 'custom' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Primary Color (Background)', 'blockive-premium-addon-for-block'),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
              value: customPrimaryColor,
              onChange: val => setAttributes({
                customPrimaryColor: val
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Secondary Color (Icon)', 'blockive-premium-addon-for-block'),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
              value: customSecondaryColor,
              onChange: val => setAttributes({
                customSecondaryColor: val
              })
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      ...blockProps,
      children: [items.map((item, index) => {
        // Pre-calculate styles mapping Elementor logic
        const bg = colorType === 'custom' ? customPrimaryColor : item.color;
        const color = colorType === 'custom' ? customSecondaryColor : '#ffffff';
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
          href: item.link || '#',
          className: "bpafb-social-icon-item",
          style: {
            backgroundColor: bg,
            color: color,
            fontSize: `${iconSize}px`,
            padding: `${iconPadding}px`,
            marginRight: `${iconSpacing}px`,
            // spacing between icons
            // Prevent last item from having right margin
            ...(index === items.length - 1 ? {
              marginRight: 0
            } : {}),
            width: `${iconSize + iconPadding * 2}px`,
            height: `${iconSize + iconPadding * 2}px`
          },
          onClick: e => e.preventDefault() // prevent navigation in editor
          ,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
            className: item.icon
          })
        }, item.id);
      }), items.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Click "Add New Icon" in the sidebar to add social links.', 'blockive-premium-addon-for-block')
      })]
    })]
  });
}

/***/ },

/***/ "./src/social-icons/save.js"
/*!**********************************!*\
  !*** ./src/social-icons/save.js ***!
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
    items,
    shape,
    alignment,
    iconSize,
    iconPadding,
    iconSpacing,
    colorType,
    customPrimaryColor,
    customSecondaryColor,
    hoverAnimation
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: `bpafb-social-icons-wrapper bpafb-align-${alignment} bpafb-social-shape-${shape} bpafb-social-hover-${hoverAnimation}`
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: items.map((item, index) => {
      const bg = colorType === 'custom' ? customPrimaryColor : item.color;
      const color = colorType === 'custom' ? customSecondaryColor : '#ffffff';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
        href: item.link || '#',
        className: "bpafb-social-icon-item",
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          backgroundColor: bg,
          color: color,
          fontSize: `${iconSize}px`,
          padding: `${iconPadding}px`,
          marginRight: index === items.length - 1 ? 0 : `${iconSpacing}px`,
          width: `${iconSize + iconPadding * 2}px`,
          height: `${iconSize + iconPadding * 2}px`
        },
        "aria-label": `Visit our ${item.network}`,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
          className: item.icon
        })
      }, item.id);
    })
  });
}

/***/ },

/***/ "./src/social-icons/style-index.css"
/*!******************************************!*\
  !*** ./src/social-icons/style-index.css ***!
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

/***/ "./src/social-icons/block.json"
/*!*************************************!*\
  !*** ./src/social-icons/block.json ***!
  \*************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"blockive-premium-addon-for-block/social-icons","version":"0.1.0","title":"Blockive Social Icons","category":"bpafb-widgets","icon":"share","description":"A premium social icons block with Elementor-like controls.","attributes":{"items":{"type":"array","default":[{"id":"1","network":"facebook","icon":"fab fa-facebook-f","link":"#","color":"#1877F2"},{"id":"2","network":"twitter","icon":"fab fa-twitter","link":"#","color":"#1DA1F2"},{"id":"3","network":"youtube","icon":"fab fa-youtube","link":"#","color":"#FF0000"}]},"shape":{"type":"string","default":"rounded"},"alignment":{"type":"string","default":"center"},"iconSize":{"type":"number","default":18},"iconPadding":{"type":"number","default":10},"iconSpacing":{"type":"number","default":10},"colorType":{"type":"string","default":"official"},"customPrimaryColor":{"type":"string","default":"#000000"},"customSecondaryColor":{"type":"string","default":"#ffffff"},"hoverAnimation":{"type":"string","default":"none"}},"supports":{"align":["wide","full"],"html":false,"spacing":{"margin":true,"padding":true}},"textdomain":"blockive-premium-addon-for-block","editorScript":"file:./index.js","style":"file:./index.css"}');

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
  !*** ./src/social-icons/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-index.css */ "./src/social-icons/style-index.css");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/social-icons/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/social-icons/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/social-icons/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map