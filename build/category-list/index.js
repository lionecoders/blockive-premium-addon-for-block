/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/category-list/edit.js"
/*!***********************************!*\
  !*** ./src/category-list/edit.js ***!
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
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function buildCategoryTree(categories) {
  const map = {};
  const tree = [];
  categories.forEach(cat => {
    map[cat.id] = {
      ...cat,
      children: []
    };
  });
  categories.forEach(cat => {
    if (cat.parent && map[cat.parent]) {
      map[cat.parent].children.push(map[cat.id]);
    } else {
      tree.push(map[cat.id]);
    }
  });
  return tree;
}
function Edit({
  attributes,
  setAttributes
}) {
  const {
    showCount,
    showDescription,
    hideEmpty,
    limit,
    orderBy,
    order,
    exclude,
    layoutType,
    showHierarchy,
    gap,
    enableLink,
    itemBgColor,
    itemBorderColor,
    itemBorderWidth,
    itemBorderRadius,
    columns,
    itemPadding,
    textAlign,
    enableBoxShadow,
    removeChildBorder,
    taxonomy
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `bpafb-category-list-wrapper bpafb-layout-${layoutType}`
  });
  const {
    categories,
    isResolving,
    taxonomies
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const parsedExclude = exclude ? exclude.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id)) : [];
    const query = {
      per_page: limit,
      hide_empty: hideEmpty,
      orderby: orderBy === 'id' ? 'id' : orderBy === 'count' ? 'count' : 'name',
      order: order,
      exclude: parsedExclude
    };
    return {
      categories: select('core').getEntityRecords('taxonomy', taxonomy, query),
      isResolving: select('core').isResolving('getEntityRecords', ['taxonomy', taxonomy, query]),
      taxonomies: select('core').getTaxonomies({
        per_page: -1
      })
    };
  }, [limit, hideEmpty, orderBy, order, exclude, taxonomy]);
  const taxonomyOptions = taxonomies ? taxonomies.map(tax => ({
    label: tax.labels && tax.labels.singular_name ? tax.labels.singular_name : tax.name,
    value: tax.slug
  })) : [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Category', 'blockive-premium-addon-for-block'),
    value: 'category'
  }];
  const selectedTaxonomy = taxonomies ? taxonomies.find(tax => tax.slug === taxonomy) : null;
  const taxonomyLabel = selectedTaxonomy ? selectedTaxonomy.labels && selectedTaxonomy.labels.singular_name ? selectedTaxonomy.labels.singular_name : selectedTaxonomy.name : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('category', 'blockive-premium-addon-for-block');
  const tree = categories && showHierarchy ? buildCategoryTree(categories) : categories || [];
  const itemStyle = {
    backgroundColor: itemBgColor || undefined,
    borderColor: itemBorderColor || undefined,
    borderWidth: itemBorderWidth !== undefined ? `${itemBorderWidth}px` : undefined,
    borderStyle: itemBorderWidth > 0 ? 'solid' : undefined,
    borderRadius: itemBorderRadius !== undefined ? `${itemBorderRadius}px` : undefined,
    padding: itemPadding !== undefined ? `${itemPadding}px` : '10px',
    textAlign: textAlign,
    boxShadow: enableBoxShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : undefined
  };
  const renderCategoryItem = (category, depth = 0) => {
    const currentItemStyle = {
      ...itemStyle
    };
    if (depth > 0 && removeChildBorder) {
      currentItemStyle.borderWidth = '0px';
      currentItemStyle.borderStyle = 'none';
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: `bpafb-category-item bpafb-depth-${depth}`,
      style: currentItemStyle,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("h3", {
        className: "bpafb-category-name",
        children: [enableLink ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: category.link,
          onClick: e => e.preventDefault(),
          children: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__.decodeEntities)(category.name)
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          children: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__.decodeEntities)(category.name)
        }), showCount && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
          className: "bpafb-category-count",
          children: [" (", category.count, ")"]
        })]
      }), showDescription && category.description && layoutType !== 'horizontal' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
        className: "bpafb-category-description",
        children: category.description
      }), category.children && category.children.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "bpafb-category-children",
        children: category.children.map(child => renderCategoryItem(child, depth + 1))
      })]
    }, category.id);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings', 'blockive-premium-addon-for-block'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Taxonomy', 'blockive-premium-addon-for-block'),
          value: taxonomy,
          options: taxonomyOptions,
          onChange: val => setAttributes({
            taxonomy: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Layout Type', 'blockive-premium-addon-for-block'),
          value: layoutType,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical', 'blockive-premium-addon-for-block'),
            value: 'vertical'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Horizontal', 'blockive-premium-addon-for-block'),
            value: 'horizontal'
          }],
          onChange: val => setAttributes({
            layoutType: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Limit', 'blockive-premium-addon-for-block'),
          value: limit,
          onChange: val => setAttributes({
            limit: val
          }),
          min: 1,
          max: 50
        }), layoutType === 'horizontal' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Columns', 'blockive-premium-addon-for-block'),
          value: columns,
          onChange: val => setAttributes({
            columns: val
          }),
          min: 1,
          max: 6
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gap Between Items (px)', 'blockive-premium-addon-for-block'),
          value: gap,
          onChange: val => setAttributes({
            gap: val
          }),
          min: 0,
          max: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Text Alignment', 'blockive-premium-addon-for-block'),
          value: textAlign,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Left', 'blockive-premium-addon-for-block'),
            value: 'left'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Center', 'blockive-premium-addon-for-block'),
            value: 'center'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Right', 'blockive-premium-addon-for-block'),
            value: 'right'
          }],
          onChange: val => setAttributes({
            textAlign: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Order By', 'blockive-premium-addon-for-block'),
          value: orderBy,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Name', 'blockive-premium-addon-for-block'),
            value: 'name'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Count', 'blockive-premium-addon-for-block'),
            value: 'count'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Term ID', 'blockive-premium-addon-for-block'),
            value: 'id'
          }],
          onChange: val => setAttributes({
            orderBy: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Order Direction', 'blockive-premium-addon-for-block'),
          value: order,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ascending', 'blockive-premium-addon-for-block'),
            value: 'asc'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Descending', 'blockive-premium-addon-for-block'),
            value: 'desc'
          }],
          onChange: val => setAttributes({
            order: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Exclude Categories (IDs)', 'blockive-premium-addon-for-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comma separated term IDs.', 'blockive-premium-addon-for-block'),
          value: exclude,
          onChange: val => setAttributes({
            exclude: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Count', 'blockive-premium-addon-for-block'),
          checked: showCount,
          onChange: val => setAttributes({
            showCount: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Description', 'blockive-premium-addon-for-block'),
          checked: showDescription,
          onChange: val => setAttributes({
            showDescription: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable Link', 'blockive-premium-addon-for-block'),
          checked: enableLink,
          onChange: val => setAttributes({
            enableLink: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide Empty Categories', 'blockive-premium-addon-for-block'),
          checked: hideEmpty,
          onChange: val => setAttributes({
            hideEmpty: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Hierarchy', 'blockive-premium-addon-for-block'),
          checked: showHierarchy,
          onChange: val => setAttributes({
            showHierarchy: val
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Item Colors', 'blockive-premium-addon-for-block'),
        initialOpen: false,
        colorSettings: [{
          value: itemBgColor,
          onChange: val => setAttributes({
            itemBgColor: val
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background Color', 'blockive-premium-addon-for-block')
        }, {
          value: itemBorderColor,
          onChange: val => setAttributes({
            itemBorderColor: val
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Color', 'blockive-premium-addon-for-block')
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Item Appearance', 'blockive-premium-addon-for-block'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding (px)', 'blockive-premium-addon-for-block'),
          value: itemPadding,
          onChange: val => setAttributes({
            itemPadding: val
          }),
          min: 0,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Width (px)', 'blockive-premium-addon-for-block'),
          value: itemBorderWidth,
          onChange: val => setAttributes({
            itemBorderWidth: val
          }),
          min: 0,
          max: 20
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border Radius (px)', 'blockive-premium-addon-for-block'),
          value: itemBorderRadius,
          onChange: val => setAttributes({
            itemBorderRadius: val
          }),
          min: 0,
          max: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable Box Shadow', 'blockive-premium-addon-for-block'),
          checked: enableBoxShadow,
          onChange: val => setAttributes({
            enableBoxShadow: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove Border from Child Items', 'blockive-premium-addon-for-block'),
          checked: removeChildBorder,
          onChange: val => setAttributes({
            removeChildBorder: val
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: isResolving && !categories ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}) : categories && categories.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "bpafb-category-grid",
        style: {
          gap: gap !== undefined ? `${gap}px` : '20px',
          gridTemplateColumns: layoutType === 'horizontal' ? `repeat(${columns}, 1fr)` : undefined
        },
        children: tree.map(cat => renderCategoryItem(cat))
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No %s found.', 'blockive-premium-addon-for-block'), taxonomyLabel.toLowerCase())
      })
    })]
  });
}

/***/ },

/***/ "./src/category-list/save.js"
/*!***********************************!*\
  !*** ./src/category-list/save.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
function Save() {
  return null;
}

/***/ },

/***/ "./src/category-list/style-index.css"
/*!*******************************************!*\
  !*** ./src/category-list/style-index.css ***!
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

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/html-entities"
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
(module) {

module.exports = window["wp"]["htmlEntities"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/category-list/block.json"
/*!**************************************!*\
  !*** ./src/category-list/block.json ***!
  \**************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"blockive-premium-addon-for-block/category-list","version":"0.1.0","title":"Blockive Category List","category":"bpafb-widgets","icon":"list-view","description":"WordPress category browser/list block.","supports":{"color":{"text":true,"background":false,"link":true},"typography":{"fontSize":true,"lineHeight":true},"spacing":{"margin":true,"padding":true}},"attributes":{"showCount":{"type":"boolean","default":true},"showDescription":{"type":"boolean","default":false},"hideEmpty":{"type":"boolean","default":true},"limit":{"type":"number","default":10},"orderBy":{"type":"string","default":"name"},"order":{"type":"string","default":"asc"},"exclude":{"type":"string","default":""},"layoutType":{"type":"string","default":"vertical"},"showHierarchy":{"type":"boolean","default":false},"gap":{"type":"number","default":20},"enableLink":{"type":"boolean","default":true},"itemBgColor":{"type":"string","default":""},"itemBorderColor":{"type":"string","default":""},"itemBorderWidth":{"type":"number","default":0},"itemBorderRadius":{"type":"number","default":0},"columns":{"type":"number","default":3},"itemPadding":{"type":"number","default":10},"textAlign":{"type":"string","default":"left"},"enableBoxShadow":{"type":"boolean","default":false},"removeChildBorder":{"type":"boolean","default":false},"taxonomy":{"type":"string","default":"category"}},"render":"file:./render.php","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./index.css"}');

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
  !*** ./src/category-list/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style-index.css */ "./src/category-list/style-index.css");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/category-list/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/category-list/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/category-list/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_4__,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map