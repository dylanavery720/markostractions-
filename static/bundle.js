/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function extend(target, source) { //A simple function to copy properties from one object to another
    if (!target) { //Check if a target was provided, otherwise create a new empty object to return
        target = {};
    }

    if (source) {
        for (var propName in source) {
            if (source.hasOwnProperty(propName)) { //Only look at source properties that are not inherited
                target[propName] = source[propName]; //Copy the property
            }
        }
    }

    return target;
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* jshint newcap:false */
function VNode() {}

VNode.prototype = {
    $__VNode: function(finalChildCount) {
        this.$__finalChildCount = finalChildCount;
        this.$__childCount = 0;
        this.$__firstChild = null;
        this.$__lastChild = null;
        this.$__parentNode = null;
        this.$__nextSibling = null;
    },

    get firstChild() {
        var firstChild = this.$__firstChild;

        if (firstChild && firstChild.$__DocumentFragment) {
            var nestedFirstChild = firstChild.firstChild;
            // The first child is a DocumentFragment node.
            // If the DocumentFragment node has a first child then we will return that.
            // Otherwise, the DocumentFragment node is not *really* the first child and
            // we need to skip to its next sibling
            return nestedFirstChild || firstChild.nextSibling;
        }

        return firstChild;
    },

    get nextSibling() {
        var nextSibling = this.$__nextSibling;

        if (nextSibling) {
            if (nextSibling.$__DocumentFragment) {
                var firstChild = nextSibling.firstChild;
                return firstChild || nextSibling.nextSibling;
            }
        } else {
            var parentNode = this.$__parentNode;
            if (parentNode && parentNode.$__DocumentFragment) {
                return parentNode.nextSibling;
            }
        }

        return nextSibling;
    },

    $__appendChild: function(child) {
        this.$__childCount++;

        if (this.$__isTextArea) {
            if (child.$__Text) {
                var childValue = child.nodeValue;
                this.$__value = (this.$__value || '') + childValue;
            } else {
                throw TypeError();
            }
        } else {
            var lastChild = this.$__lastChild;

            child.$__parentNode = this;

            if (lastChild) {
                lastChild.$__nextSibling = child;
            } else {
                this.$__firstChild = child;
            }

            this.$__lastChild = child;
        }

        return child;
    },

    $__finishChild: function finishChild() {
        if (this.$__childCount == this.$__finalChildCount && this.$__parentNode) {
            return this.$__parentNode.$__finishChild();
        } else {
            return this;
        }
    },

    actualize: function(doc) {
        var actualNode = this.$__actualize(doc);

        var curChild = this.firstChild;

        while(curChild) {
            actualNode.appendChild(curChild.actualize(doc));
            curChild = curChild.nextSibling;
        }

        return actualNode;
    }

    // ,toJSON: function() {
    //     var clone = Object.assign({
    //         nodeType: this.nodeType
    //     }, this);
    //
    //     for (var k in clone) {
    //         if (k.startsWith('_')) {
    //             delete clone[k];
    //         }
    //     }
    //     delete clone._nextSibling;
    //     delete clone._lastChild;
    //     delete clone.parentNode;
    //     return clone;
    // }
};

module.exports = VNode;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var copyProps = __webpack_require__(5);

function inherit(ctor, superCtor, shouldCopyProps) {
    var oldProto = ctor.prototype;
    var newProto = ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            writable: true,
            configurable: true
        }
    });
    if (oldProto && shouldCopyProps !== false) {
        copyProps(oldProto, newProto);
    }
    ctor.$super = superCtor;
    ctor.prototype = newProto;
    return ctor;
}


module.exports = inherit;
inherit._inherit = inherit;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var KEY = Symbol();
var isArray = Array.isArray;

function UniqueId(out) {
    this.prefix = out.global.componentIdPrefix || 's'; // "s" is for server (we use "b" for the browser)
    this.nextId = 0;
}

function nextComponentId(out) {
    var global = out.global;

    var idProvider = global[KEY] ||
        (global[KEY] = new UniqueId(out));

    return idProvider.prefix + (idProvider.nextId++);
}

function attachBubblingEvent(componentDef, handlerMethodName, extraArgs) {
    if (handlerMethodName) {
        if (extraArgs) {
            var bubblingDomEvents = componentDef.$__bubblingDomEvents ||
                ( componentDef.$__bubblingDomEvents = [] );

            var eventIndex = bubblingDomEvents.length;
            if (extraArgs.length === 1) {
                var firstArg = extraArgs[0];
                if (isArray(firstArg)) {
                    bubblingDomEvents.push(extraArgs);
                } else {
                    bubblingDomEvents.push(firstArg);
                }
            } else {
                bubblingDomEvents.push(extraArgs);
            }

            return handlerMethodName + ' ' + componentDef.id + ' ' + eventIndex;
        } else {
            return handlerMethodName + ' ' + componentDef.id;
        }
    }
}

exports.$__nextComponentId = nextComponentId;
exports.$__server = true;
exports.$__attachBubblingEvent = attachBubblingEvent;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function copyProps(from, to) {
    Object.getOwnPropertyNames(from).forEach(function(name) {
        var descriptor = Object.getOwnPropertyDescriptor(from, name);
        Object.defineProperty(to, name, descriptor);
    });
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(7);
// Compiled using marko@4.1.3 - DO NOT EDIT
"use strict";

var marko_template = module.exports = __webpack_require__(4).t(),
    marko_components = __webpack_require__(25),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/fire-sale$0.0.1/components/electron-button/index.marko", function() {
      return module.exports;
    }),
    marko_component = __webpack_require__(19);

function render(input, out, __component, component, state) {
  var data = input;

  out.e("DIV", {
      "class": "btn-container",
      id: __component.id
    }, 3, 4)
    .e("BUTTON", {
        "class": "minutes-btn",
        "data-_onclick": __component.d("read")
      }, 1, 4)
      .t("Read")
    .e("BUTTON", {
        "class": "hours-btn",
        "data-_onclick": __component.d("watch")
      }, 1, 4)
      .t("Watch")
    .e("BUTTON", {
        "class": "hours-btn",
        "data-_onclick": __component.d("listen")
      }, 1, 4)
      .t("Listen");
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ComponentDef = __webpack_require__(24);
var initComponents = __webpack_require__(26);
var EMPTY_OBJECT = {};

function ComponentsContext(out, root) {
    if (!root) {
        root = new ComponentDef(null, null, out);
    }

    this.$__out = out;
    this.$__componentStack = [root];
    this.$__preserved = EMPTY_OBJECT;
    this.$__componentsById = {};
}

ComponentsContext.prototype = {
    get $__components() {
        return this.$__componentStack[0].$__children;
    },

    $__beginComponent: function(component) {
        var self = this;
        var componentStack = self.$__componentStack;
        var origLength = componentStack.length;
        var parent = componentStack[origLength - 1];

        var componentId = component.id;

        if (!componentId) {
            componentId = component.id = parent.$__nextId();
        }

        var componentDef = new ComponentDef(component, componentId, this.$__out, componentStack, origLength);
        this.$__componentsById[componentId] = componentDef;
        parent.$__addChild(componentDef);
        componentStack.push(componentDef);

        return componentDef;
    },
    $__clearComponents: function () {
        this.$__componentStack = [new ComponentDef(null /* id */, this.$__out)];
    },
    $__initComponents: function (doc) {
        var componentDefs = this.$__components;
        if (componentDefs) {
            initComponents.$__initClientRendered(componentDefs, doc);
            this.$__clearComponents();
        }
    },
    $__nextComponentId: function() {
        var componentStack = this.$__componentStack;
        var parent = componentStack[componentStack.length - 1];
        return parent.$__nextId();
    },
    $__preserveDOMNode: function(elId, bodyOnly) {
        var preserved = this.$__preserved;
        if (preserved == EMPTY_OBJECT) {
            preserved = this.$__preserved = {};
        }
        preserved[elId] = { $__bodyOnly: bodyOnly };
    }
};

ComponentsContext.$__getComponentsContext = function (out) {
    var global = out.global;

    return out.data.components ||
        global.components ||
        (global.components = new ComponentsContext(out));
};

module.exports = ComponentsContext;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var REPEATED_ID_KEY = '$rep';

module.exports = function nextRepeatedId(out, parentId, id) {
    var nextIdLookup = out.global[REPEATED_ID_KEY] || (out.global[REPEATED_ID_KEY] = {});

    var indexLookupKey = parentId + '-' + id;
    var currentIndex = nextIdLookup[indexLookupKey];
    if (currentIndex == null) {
        currentIndex = nextIdLookup[indexLookupKey] = 0;
    } else {
        currentIndex = ++nextIdLookup[indexLookupKey];
    }

    return indexLookupKey.slice(0, -2) + '[' + currentIndex + ']';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const copyProps = __webpack_require__(5);
const SERVER_WIDGET_KEY = Symbol();

function createServerComponentClass(renderingLogic) {

    class ServerComponent {
        constructor(id, input, out, typeName, customEvents, scope) {
            this.id = id;
            this.$__customEvents = customEvents;
            this.$__scope = scope;
            this.$__updatedInput = undefined;
            this.$__input = undefined;
            this.$__state = undefined;
            this.typeName = typeName;

            if (this.onCreate) {
                this.onCreate(input, out);
            }

            if (this.onInput) {
                var updatedInput = this.onInput(input, out) || input;

                if (this.$__input === undefined) {
                    this.$__input = updatedInput;
                }

                this.$__updatedInput = updatedInput;
            } else {
                this.$__input = this.$__updatedInput = input;
            }

            if (this.onRender) {
                this.onRender(out);
            }
        }

        set input(newInput) {
            this.$__input = newInput;
        }

        get input() {
            return this.$__input;
        }

        set state(newState) {
            this.$__state = newState;
        }

        get state() {
            return this.$__state;
        }

        get $__rawState() {
            return this.$__state;
        }
    }

    var renderingLogicProps = typeof renderingLogic === 'function' ?
        renderingLogic.prototype :
        renderingLogic;


    copyProps(renderingLogicProps, ServerComponent.prototype);

    return ServerComponent;
}
function createComponent(renderingLogic, id, input, out, typeName, customEvents, scope) {
    var ServerComponent = renderingLogic[SERVER_WIDGET_KEY];
    if (!ServerComponent) {
        ServerComponent = renderingLogic[SERVER_WIDGET_KEY] = createServerComponentClass(renderingLogic);
    }

    var component = new ServerComponent(id, input, out, typeName, customEvents, scope);
    return component;
}

exports.$__isServer = true;
exports.$__createComponent = createComponent;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var actualCreateOut;

function setCreateOut(createOutFunc) {
    actualCreateOut = createOutFunc;
}

function createOut(globalData) {
    return actualCreateOut(globalData);
}

createOut.$__setCreateOut = setCreateOut;

module.exports = createOut;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var vdom = __webpack_require__(13);
var VElement = vdom.$__VElement;
var VText = vdom.$__VText;

var commonHelpers = __webpack_require__(30);
var extend = __webpack_require__(0);

var classList = commonHelpers.cl;

exports.e = function(tagName, attrs, childCount, constId) {
    return new VElement(tagName, attrs, childCount, constId);
};

exports.t = function(value) {
    return new VText(value);
};

exports.const = function(id) {
    var i=0;
    return function() {
        return id + (i++);
    };
};

/**
 * Internal helper method to handle the "class" attribute. The value can either
 * be a string, an array or an object. For example:
 *
 * ca('foo bar') ==> ' class="foo bar"'
 * ca({foo: true, bar: false, baz: true}) ==> ' class="foo baz"'
 * ca(['foo', 'bar']) ==> ' class="foo bar"'
 */
exports.ca = function(classNames) {
    if (!classNames) {
        return null;
    }

    if (typeof classNames === 'string') {
        return classNames;
    } else {
        return classList(classNames);
    }
};

extend(exports, commonHelpers);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(1);
var VComment = __webpack_require__(33);
var VDocumentFragment = __webpack_require__(34);
var VElement = __webpack_require__(35);
var VText = __webpack_require__(36);
var FLAG_IS_TEXTAREA = 2;

var defaultDocument = typeof document != 'undefined' && document;

var FLAG_IS_TEXTAREA = 2;

var specialHtmlRegexp = /[&<]/;
var xmlnsRegExp = /^xmlns(:|$)/;

function virtualizeChildNodes(node, vdomParent) {
    var curChild = node.firstChild;
    while(curChild) {
        vdomParent.$__appendChild(virtualize(curChild));
        curChild = curChild.nextSibling;
    }
}

function virtualize(node) {
    switch(node.nodeType) {
        case 1:
            var attributes = node.attributes;
            var attrCount = attributes.length;

            var attrs;

            if (attrCount) {
                attrs = {};
                for (var i=0; i<attrCount; i++) {
                    var attr = attributes[i];
                    var attrName = attr.name;
                    if (!xmlnsRegExp.test(attrName)) {
                        attrs[attrName] = attr.value;
                    }
                }
            }

            var flags = 0;

            var tagName = node.nodeName;
            if (tagName === 'TEXTAREA') {
                flags |= FLAG_IS_TEXTAREA;
            }

            var vdomEl = new VElement(tagName, attrs, null, flags);
            vdomEl.$__namespaceURI = node.namespaceURI;

            if (vdomEl.$__isTextArea) {
                vdomEl.$__value = node.value;
            } else {
                virtualizeChildNodes(node, vdomEl);
            }

            return vdomEl;
        case 3:
            return new VText(node.nodeValue);
        case 8:
            return new VComment(node.nodeValue);
        case 11:
            var vdomDocFragment = new VDocumentFragment();
            virtualizeChildNodes(node, vdomDocFragment);
            return vdomDocFragment;
    }
}

function virtualizeHTML(html, doc) {
    if (!specialHtmlRegexp.test(html)) {
        return new VText(html);
    }

    var container = doc.createElement('body');
    container.innerHTML = html;
    var vdomFragment = new VDocumentFragment();

    var curChild = container.firstChild;
    while(curChild) {
        vdomFragment.$__appendChild(virtualize(curChild));
        curChild = curChild.nextSibling;
    }

    return vdomFragment;
}

var Node_prototype = VNode.prototype;

/**
 * Shorthand method for creating and appending a Text node with a given value
 * @param  {String} value The text value for the new Text node
 */
Node_prototype.t = function(value) {
    var type = typeof value;
    var vdomNode;

    if (type !== 'string') {
        if (value == null) {
            value = '';
        } else if (type === 'object') {
            if (value.toHTML) {
                vdomNode = virtualizeHTML(value.toHTML(), document);
            }
        }
    }

    this.$__appendChild(vdomNode || new VText(value.toString()));
    return this.$__finishChild();
};

/**
 * Shorthand method for creating and appending a Comment node with a given value
 * @param  {String} value The value for the new Comment node
 */
Node_prototype.c = function(value) {
    this.$__appendChild(new VComment(value));
    return this.$__finishChild();
};

Node_prototype.$__appendDocumentFragment = function() {
    return this.$__appendChild(new VDocumentFragment());
};

exports.$__VComment = VComment;
exports.$__VDocumentFragment = VDocumentFragment;
exports.$__VElement = VElement;
exports.$__VText = VText;
exports.$__virtualize = virtualize;
exports.$__virtualizeHTML = virtualizeHTML;
exports.$__defaultDocument = defaultDocument;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(38);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var isArray = Array.isArray;

function resolve(object, path, len) {
    var current = object;
    for (var i=0; i<len; i++) {
        current = current[path[i]];
    }

    return current;
}

function resolveType(info) {
    if (info.type === 'Date') {
        return new Date(info.value);
    } else {
        throw new Error('Bad type');
    }
}

module.exports = function finalize(outer) {
    if (!outer) {
        return outer;
    }

    var assignments = outer.$$;
    if (assignments) {
        var object = outer.o;
        var len;

        if (assignments && (len=assignments.length)) {
            for (var i=0; i<len; i++) {
                var assignment = assignments[i];

                var rhs = assignment.r;
                var rhsValue;

                if (isArray(rhs)) {
                    rhsValue = resolve(object, rhs, rhs.length);
                } else {
                    rhsValue = resolveType(rhs);
                }

                var lhs = assignment.l;
                var lhsLast = lhs.length-1;

                if (lhsLast === -1) {
                    object = outer.o = rhsValue;
                    break;
                } else {
                    var lhsParent = resolve(object, lhs, lhsLast);
                    lhsParent[lhs[lhsLast]] = rhsValue;
                }
            }
        }

        assignments.length = 0; // Assignments have been applied, do not reapply

        return object == null ? null : object;
    } else {
        return outer;
    }

};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const markerKey = Symbol('warp10');
const isArray = Array.isArray;

class Marker {
    constructor(path, symbol) {
        this.path = path;
        this.symbol = symbol;
    }
}

function append(array, el) {
    var len = array.length;
    var clone = new Array(len+1);
    for (var i=0; i<len; i++) {
        clone[i] = array[i];
    }
    clone[len] = el;
    return clone;
}

class Assignment {
    constructor(lhs, rhs) {
        this.l = lhs;
        this.r = rhs;
    }
}

function handleProperty(clone, key, value, valuePath, serializationSymbol, assignments) {
    if (value.constructor === Date) {
        assignments.push(new Assignment(valuePath, { type: 'Date', value: value.getTime() }));
    } else if (isArray(value)) {
        const marker = value[markerKey];

        if (marker && marker.symbol === serializationSymbol) {
            assignments.push(new Assignment(valuePath, marker.path));
        } else {
            value[markerKey] = new Marker(valuePath, serializationSymbol);
            clone[key] = pruneArray(value, valuePath, serializationSymbol, assignments);
        }
    } else {
        const marker = value[markerKey];
        if (marker && marker.symbol === serializationSymbol) {
            assignments.push(new Assignment(valuePath, marker.path));
        } else {
            value[markerKey] = new Marker(valuePath, serializationSymbol);
            clone[key] = pruneObject(value, valuePath, serializationSymbol, assignments);
        }
    }
}

function pruneArray(array, path, serializationSymbol, assignments) {
    let len = array.length;

    var clone = new Array(len);

    for (let i=0; i<len; i++) {
        var value = array[i];
        if (value == null) {
            continue;
        }

        if (value && typeof value === 'object') {
            handleProperty(clone, i, value, append(path, i), serializationSymbol, assignments);
        } else {
            clone[i] = value;
        }
    }

    return clone;
}

function pruneObject(obj, path, serializationSymbol, assignments) {
    var clone = {};

    if (obj.toJSON && obj.constructor != Date) {
        obj = obj.toJSON();
        if (!obj.hasOwnProperty || typeof obj !== 'object') {
            return obj;
        }
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            if (value === undefined) {
                continue;
            }

            if (value && typeof value === 'object') {
                handleProperty(clone, key, value, append(path, key), serializationSymbol, assignments);
            } else {
                clone[key] = value;
            }
        }
    }

    return clone;
}

module.exports = function stringifyPrepare(obj) {
    if (!obj) {
        return obj;
    }

    /**
     * Performance notes:
     *
     * - It is faster to use native JSON.stringify instead of a custom stringify
     * - It is faster to first prune and then call JSON.stringify with _no_ replacer
     */
    var pruned;

    const assignments = []; // Used to keep track of code that needs to run to fix up the stringified object

    if (typeof obj === 'object') {
        if (obj.toJSON && obj.constructor != Date) {
            obj = obj.toJSON();
            if (!obj.hasOwnProperty || typeof obj !== 'object') {
                return obj;
            }
        }
        const serializationSymbol = Symbol(); // Used to detect if the marker is associated with _this_ serialization
        const path = [];

        obj[markerKey] = new Marker(path, serializationSymbol);

        if (obj.constructor === Date) {
            pruned = null;
            assignments.push(new Assignment([], { type: 'Date', value: obj.getTime() }));
        } else if (isArray(obj)) {
            pruned = pruneArray(obj, path, serializationSymbol, assignments);
        } else {
            pruned = pruneObject(obj, path, serializationSymbol, assignments);
        }
    } else {
        pruned = obj;
    }

    if (assignments.length) {
        return {
            o: pruned,
            $$: assignments
        };
    } else {
        return pruned;
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Compiled using marko@4.1.3 - DO NOT EDIT


var marko_template = module.exports = __webpack_require__(4).t(),
    electron_header_template = __webpack_require__(23),
    marko_helpers = __webpack_require__(12),
    marko_loadTag = marko_helpers.t,
    electron_header_tag = marko_loadTag(electron_header_template),
    electron_button_template = __webpack_require__(7),
    electron_button_tag = marko_loadTag(electron_button_template);

function render(input, out) {
  var data = input;

  electron_header_tag({}, out);

  electron_button_tag({}, out);
}

marko_template._ = render;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
  read: (e)=> {
    e.preventDefault()
    window.location.href='https://en.wikipedia.org/wiki/Special:Random'
  },
  watch: (e)=> {
    e.preventDefault()
    window.location.href='http://random.accessyoutube.org.uk/'
  },
  listen: (e)=> {
    alerty()
  }
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".btn-container {\n  display: flex;\n}\n\n.minutes-btn, .hours-btn, .days-btn {\n  flex: 1;\n  margin-bottom: 40px;\n  border: none;\n  height: 10vh;\n  font-size: 24px;\n  color: white;\n  background-color: #260C1A;\n}\n\n.minutes-btn:hover, .hours-btn:hover, .days-btn:hover {\n  background-color: #832247;\n}\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".header {\n  text-align: center;\n  font-size: 36px;\n  color: #260C1A;\n}\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/* jshint newcap:false */
var slice = Array.prototype.slice;

function isFunction(arg) {
    return typeof arg === 'function';
}

function checkListener(listener) {
    if (!isFunction(listener)) {
        throw TypeError('Invalid listener');
    }
}

function invokeListener(ee, listener, args) {
    switch (args.length) {
        // fast cases
        case 1:
            listener.call(ee);
            break;
        case 2:
            listener.call(ee, args[1]);
            break;
        case 3:
            listener.call(ee, args[1], args[2]);
            break;
            // slower
        default:
            listener.apply(ee, slice.call(args, 1));
    }
}

function addListener(eventEmitter, type, listener, prepend) {
    checkListener(listener);

    var events = eventEmitter.$e || (eventEmitter.$e = {});

    var listeners = events[type];
    if (listeners) {
        if (isFunction(listeners)) {
            events[type] = prepend ? [listener, listeners] : [listeners, listener];
        } else {
            if (prepend) {
                listeners.unshift(listener);
            } else {
                listeners.push(listener);
            }
        }

    } else {
        events[type] = listener;
    }
    return eventEmitter;
}

function EventEmitter() {
    this.$e = this.$e || {};
}

EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype = {
    $e: null,

    emit: function(type) {
        var args = arguments;

        var events = this.$e;
        if (!events) {
            return;
        }

        var listeners = events && events[type];
        if (!listeners) {
            // If there is no 'error' event listener then throw.
            if (type === 'error') {
                var error = args[1];
                if (!(error instanceof Error)) {
                    var context = error;
                    error = new Error('Error: ' + context);
                    error.context = context;
                }

                throw error; // Unhandled 'error' event
            }

            return false;
        }

        if (isFunction(listeners)) {
            invokeListener(this, listeners, args);
        } else {
            listeners = slice.call(listeners);

            for (var i=0, len=listeners.length; i<len; i++) {
                var listener = listeners[i];
                invokeListener(this, listener, args);
            }
        }

        return true;
    },

    on: function(type, listener) {
        return addListener(this, type, listener, false);
    },

    prependListener: function(type, listener) {
        return addListener(this, type, listener, true);
    },

    once: function(type, listener) {
        checkListener(listener);

        function g() {
            this.removeListener(type, g);

            if (listener) {
                listener.apply(this, arguments);
                listener = null;
            }
        }

        this.on(type, g);

        return this;
    },

    // emits a 'removeListener' event iff the listener was removed
    removeListener: function(type, listener) {
        checkListener(listener);

        var events = this.$e;
        var listeners;

        if (events && (listeners = events[type])) {
            if (isFunction(listeners)) {
                if (listeners === listener) {
                    delete events[type];
                }
            } else {
                for (var i=listeners.length-1; i>=0; i--) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                    }
                }
            }
        }

        return this;
    },

    removeAllListeners: function(type) {
        var events = this.$e;
        if (events) {
            delete events[type];
        }
    },

    listenerCount: function(type) {
        var events = this.$e;
        var listeners = events && events[type];
        return listeners ? (isFunction(listeners) ? 1 : listeners.length) : 0;
    }
};

module.exports = EventEmitter;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
// Compiled using marko@4.1.3 - DO NOT EDIT
"use strict";

var marko_template = module.exports = __webpack_require__(4).t(),
    marko_helpers = __webpack_require__(12),
    marko_createElement = marko_helpers.e,
    marko_const = marko_helpers.const,
    marko_const_nextId = marko_const("9c9bd8"),
    marko_node0 = marko_createElement("H1", {
        "class": "header"
      }, 1, 0, marko_const_nextId())
      .t("What do you want to do to distract yourself?");

function render(input, out) {
  var data = input;

  out.n(marko_node0);
}

marko_template._ = render;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nextRepeatedId = __webpack_require__(9);
var repeatedRegExp = /\[\]$/;
var componentUtil = __webpack_require__(3);
var nextComponentId = componentUtil.$__nextComponentId;
var attachBubblingEvent = componentUtil.$__attachBubblingEvent;

var extend = __webpack_require__(0);
var registry = __webpack_require__(10);

/**
 * A ComponentDef is used to hold the metadata collected at runtime for
 * a single component and this information is used to instantiate the component
 * later (after the rendered HTML has been added to the DOM)
 */
function ComponentDef(component, componentId, out, componentStack, componentStackLen) {
    this.$__out = out; // The AsyncWriter that this component is associated with
    this.$__componentStack = componentStack;
    this.$__componentStackLen = componentStackLen;
    this.$__component = component;
    this.id = componentId;

    this.$__roots =  null;            // IDs of root elements if there are multiple root elements
    this.$__children = null;          // An array of nested ComponentDef instances
    this.$__domEvents = null;         // An array of DOM events that need to be added (in sets of three)
    this.$__bubblingDomEvents = null; // Used to keep track of bubbling DOM events for components rendered on the server

    this.$__isExisting = false;

    this.$__nextIdIndex = 0; // The unique integer to use for the next scoped ID
}

ComponentDef.prototype = {
    $__end: function() {
        this.$__componentStack.length = this.$__componentStackLen;
    },

    /**
     * Register a nested component for this component. We maintain a tree of components
     * so that we can instantiate nested components before their parents.
     */
    $__addChild: function (componentDef) {
        var children = this.$__children;

        if (children) {
            children.push(componentDef);
        } else {
            this.$__children = [componentDef];
        }
    },
    /**
     * This helper method generates a unique and fully qualified DOM element ID
     * that is unique within the scope of the current component. This method prefixes
     * the the nestedId with the ID of the current component. If nestedId ends
     * with `[]` then it is treated as a repeated ID and we will generate
     * an ID with the current index for the current nestedId.
     * (e.g. "myParentId-foo[0]", "myParentId-foo[1]", etc.)
     */
    elId: function (nestedId) {
        var id = this.id;
        if (nestedId == null) {
            return id;
        } else {
            if (typeof nestedId == 'string' && repeatedRegExp.test(nestedId)) {
                return nextRepeatedId(this.$__out, id, nestedId);
            } else {
                return id + '-' + nestedId;
            }
        }
    },
    /**
     * Registers a DOM event for a nested HTML element associated with the
     * component. This is only done for non-bubbling events that require
     * direct event listeners to be added.
     * @param  {String} type The DOM event type ("mouseover", "mousemove", etc.)
     * @param  {String} targetMethod The name of the method to invoke on the scoped component
     * @param  {String} elId The DOM element ID of the DOM element that the event listener needs to be added too
     */
     e: function(type, targetMethod, elId, extraArgs) {
        if (targetMethod) {
            // The event handler method is allowed to be conditional. At render time if the target
            // method is null then we do not attach any direct event listeners.
            (this.$__domEvents || (this.$__domEvents = [])).push([
                type,
                targetMethod,
                elId,
                extraArgs]);
        }
    },
    /**
     * Returns the next auto generated unique ID for a nested DOM element or nested DOM component
     */
    $__nextId: function() {
        var id = this.id;

        return id ?
            id + '-c' + (this.$__nextIdIndex++) :
            nextComponentId(this.$__out);
    },

    d: function(handlerMethodName, extraArgs) {
        return attachBubblingEvent(this, handlerMethodName, extraArgs);
    }
};

ComponentDef.$__deserialize = function(o, types) {
    var id        = o[0];
    var typeName  = types[o[1]];
    var input     = o[2];
    var extra     = o[3];

    var state = extra.s;
    var componentProps = extra.w;

    var component = typeName /* legacy */ && registry.$__createComponent(typeName, id);

    if (extra.b) {
        component.$__bubblingDomEvents = extra.b;
    }

    // Preview newly created component from being queued for update since we area
    // just building it from the server info
    component.$__updateQueued = true;

    if (state) {
        var undefinedPropNames = extra.u;
        if (undefinedPropNames) {
            undefinedPropNames.forEach(function(undefinedPropName) {
                state[undefinedPropName] = undefined;
            });
        }
        // We go through the setter here so that we convert the state object
        // to an instance of `State`
        component.state = state;
    }

    component.$__input = input;

    if (componentProps) {
        extend(component, componentProps);
    }

    var scope = extra.p;
    var customEvents = extra.e;
    component.$__setCustomEvents(customEvents, scope);

    return {
        $__component: component,
        $__roots: extra.r,
        $__domEvents: extra.d
    };
};

module.exports = ComponentDef;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
* Module to manage the lifecycle of components
*
*/

var warp10 = __webpack_require__(41);
var ComponentsContext = __webpack_require__(8);
var escapeEndingScriptTagRegExp = /<\//g;

function flattenHelper(components, flattened, typesArray, typesLookup) {
    for (var i = 0, len = components.length; i < len; i++) {
        var componentDef = components[i];
        var id = componentDef.id;
        var component = componentDef.$__component;
        var state = component.state;
        var input = component.input;
        var typeName = component.typeName;
        var customEvents = component.$__customEvents;
        var scope = component.$__scope;

        component.state = undefined; // We don't use `delete` to avoid V8 deoptimization
        component.input = undefined; // We don't use `delete` to avoid V8 deoptimization
        component.typeName = undefined;
        component.id = undefined;
        component.$__customEvents = undefined;
        component.$__scope = undefined;

        if (!typeName) {
            continue;
        }

        var typeIndex = typesLookup[typeName];
        if (typeIndex === undefined) {
            typeIndex = typesArray.length;
            typesArray.push(typeName);
            typesLookup[typeName] = typeIndex;
        }

        var children = componentDef.$__children;

        if (children) {
            // Depth-first search (children should be initialized before parent)
            flattenHelper(children, flattened, typesArray, typesLookup);
        }


        var hasProps = false;

        for (var key in component) {
            if (component.hasOwnProperty(key) && component[key] !== undefined) {
                hasProps = true;
            }
        }

        var undefinedPropNames;

        if (state) {
            // Update state properties with an `undefined` value to have a `null`
            // value so that the property name will be serialized down to the browser.
            // This ensures that we add the proper getter/setter for the state property.
            for (var k in state) {
                if (state[k] === undefined) {
                    if (undefinedPropNames) {
                        undefinedPropNames.push(k);
                    } else {
                        undefinedPropNames = [k];
                    }
                }
            }
        }

        var extra = {
            p: customEvents && scope, // Only serialize scope if we need to attach custom events
            d: componentDef.$__domEvents,
            b: componentDef.$__bubblingDomEvents,
            e: customEvents,
            w: hasProps ? component : undefined,
            s: state,
            r: componentDef.$__roots,
            u: undefinedPropNames
        };

        flattened.push([
            id,                  // 0 = id
            typeIndex,           // 1 = type
            input,               // 2 = input
            extra                // 3
        ]);
    }
}

function getRenderedComponents(componentsContext) {
    var components = componentsContext.$__components;
    if (!components || !components.length) {
        return;
    }

    var flattened = [];
    var typesLookup = {};
    var typesArray = [];

    flattenHelper(components, flattened, typesArray, typesLookup);
    return {w: flattened, t: typesArray};
}


function writeInitComponentsCode(componentsContext, out) {
    var renderedComponents = getRenderedComponents(componentsContext);
    if (!renderedComponents) {
        return;
    }

    var cspNonce = out.global.cspNonce;
    var nonceAttr = cspNonce ? ' nonce='+JSON.stringify(cspNonce) : '';

    out.write('<script' + nonceAttr + '>' +
        '(function(){var w=window;w.$components=(w.$components||[]).concat(' +
        warp10.stringify(renderedComponents).replace(escapeEndingScriptTagRegExp, '\\u003C/') +
         ')||w.$components})()</script>');

    componentsContext.$__clearComponents();
}

exports.writeInitComponentsCode = writeInitComponentsCode;

/**
 * Returns an object that can be sent to the browser using JSON.stringify. The parsed object should be
 * passed to require('marko-components').initComponents(...);
 *
 * @param  {ComponentsContext|AsyncWriter} componentsContext A ComponentsContext or an AsyncWriter
 * @return {Object} An object with information about the rendered components that can be serialized to JSON. The object should be treated as opaque
 */
exports.getRenderedComponents = function(componentsContext) {
    if (!(componentsContext instanceof ComponentsContext)) {
        // Assume that the provided "componentsContext" argument is
        // actually an AsyncWriter
        var out = componentsContext;
        if (!out.global) {
            throw new Error('Invalid argument: ' + componentsContext);
        }

        componentsContext = ComponentsContext.$__getComponentsContext(out);
    }

    var renderedComponents = getRenderedComponents(componentsContext);
    return warp10.stringifyPrepare(renderedComponents);
};

exports.r = __webpack_require__(27);

exports.c = function() { /* no op for defining a component on teh server */ };

// registerComponent is a no-op on the server.
// Fixes https://github.com/marko-js/marko-components/issues/111
exports.rc = function(typeName) { return typeName; };


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// The server-side implementation of this module is intentionally empty

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var componentsUtil = __webpack_require__(3);
var componentLookup = componentsUtil.$__componentLookup;
var emitLifecycleEvent = componentsUtil.$__emitLifecycleEvent;
var nextRepeatedId = __webpack_require__(9);
var repeatedRegExp = /\[\]$/;
var ComponentsContext = __webpack_require__(8);
var registry = __webpack_require__(10);
var copyProps = __webpack_require__(5);

var COMPONENT_BEGIN_ASYNC_ADDED_KEY = '$wa';

function resolveComponentKey(out, key, scope) {
    if (key[0] == '#') {
        return key.substring(1);
    } else {
        var resolvedId;

        if (repeatedRegExp.test(key)) {
            resolvedId = nextRepeatedId(out, scope, key);
        } else {
            resolvedId = scope + '-' + key;
        }

        return resolvedId;
    }
}

function preserveComponentEls(existingComponent, out, componentsContext) {
    var rootEls = existingComponent.$__getRootEls({});

    for (var elId in rootEls) {
        var el = rootEls[elId];

        // We put a placeholder element in the output stream to ensure that the existing
        // DOM node is matched up correctly when using morphdom.
        out.element(el.tagName, { id: elId });

        componentsContext.$__preserveDOMNode(elId); // Mark the element as being preserved (for morphdom)
    }

    existingComponent.$__reset(); // The component is no longer dirty so reset internal flags
    return true;
}

function handleBeginAsync(event) {
    var parentOut = event.parentOut;
    var asyncOut = event.out;
    var componentsContext = asyncOut.global.components;
    var componentStack;

    if (componentsContext && (componentStack = componentsContext.$__componentStack)) {
        // All of the components in this async block should be
        // initialized after the components in the parent. Therefore,
        // we will create a new ComponentsContext for the nested
        // async block and will create a new component stack where the current
        // component in the parent block is the only component in the nested
        // stack (to begin with). This will result in top-level components
        // of the async block being added as children of the component in the
        // parent block.
        var nestedComponentsContext = new ComponentsContext(asyncOut, componentStack[componentStack.length-1]);
        asyncOut.data.components = nestedComponentsContext;
    }
    asyncOut.$c = parentOut.$c;
}

function createRendererFunc(templateRenderFunc, componentProps, renderingLogic) {
    renderingLogic = renderingLogic || {};
    var onInput = renderingLogic.onInput;
    var typeName = componentProps.type;
    var roots = componentProps.roots;
    var assignedId = componentProps.id;
    var split = componentProps.split;

    return function renderer(input, out) {
        var outGlobal = out.global;

        if (!out.isSync()) {
            if (!outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY]) {
                outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY] = true;
                out.on('beginAsync', handleBeginAsync);
            }
        }

        var component = outGlobal.$w;
        var isRerender = component !== undefined;
        var id = assignedId;
        var isExisting;
        var customEvents;
        var scope;

        if (component) {
            id = component.id;
            isExisting = true;
            outGlobal.$w = null;
        } else {
            var componentArgs = out.$c;

            if (componentArgs) {
                out.$c = null;

                scope = componentArgs[0];

                if (scope) {
                    scope = scope.id;
                }

                var key = componentArgs[1];
                if (key != null) {
                    key = key.toString();
                }
                id = id || resolveComponentKey(out, key, scope);
                customEvents = componentArgs[2];
            }
        }

        var componentsContext = ComponentsContext.$__getComponentsContext(out);
        id = id || componentsContext.$__nextComponentId();

        if (registry.$__isServer) {
            component = registry.$__createComponent(
                renderingLogic,
                id,
                input,
                out,
                typeName,
                customEvents,
                scope);
            input = component.$__updatedInput;
            component.$__updatedInput = undefined; // We don't want $__updatedInput to be serialized to the browser
        } else {
            if (!component) {
                if (isRerender) {
                    // Look in in the DOM to see if a component with the same ID and type already exists.
                    component = componentLookup[id];
                    if (component && component.$__type !== typeName) {
                        component = undefined;
                    }
                }

                if (component) {
                    isExisting = true;
                } else {
                    isExisting = false;
                    // We need to create a new instance of the component
                    component = registry.$__createComponent(typeName, id);

                    if (split) {
                        split = false;

                        var renderingLogicProps = typeof renderingLogic == 'function' ?
                            renderingLogic.prototype :
                            renderingLogic;

                        copyProps(renderingLogicProps, component.constructor.prototype);
                    }
                }

                // Set this flag to prevent the component from being queued for update
                // based on the new input. The component is about to be rerendered
                // so we don't want to queue it up as a result of calling `setInput()`
                component.$__updateQueued = true;

                component.$__setCustomEvents(customEvents, scope);

                if (!isExisting) {
                    emitLifecycleEvent(component, 'create', input, out);
                }

                input = component.$__setInput(input, onInput, out);

                if (isExisting) {
                    if (!component.$__isDirty || !component.shouldUpdate(input, component.$__state)) {
                        preserveComponentEls(component, out, componentsContext);
                        return;
                    }
                }
            }

            emitLifecycleEvent(component, 'render', out);
        }

        var componentDef = componentsContext.$__beginComponent(component);
        componentDef.$__roots = roots;
        componentDef.$__isExisting = isExisting;

        // Render the template associated with the component using the final template
        // data that we constructed
        templateRenderFunc(input, out, componentDef, component, component.$__rawState);

        componentDef.$__end();
    };
}

module.exports = createRendererFunc;

// exports used by the legacy renderer
createRendererFunc.$__resolveComponentKey = resolveComponentKey;
createRendererFunc.$__preserveComponentEls = preserveComponentEls;
createRendererFunc.$__handleBeginAsync = handleBeginAsync;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var domInsert = __webpack_require__(29);
var EMPTY_ARRAY = [];


function getComponentDefs(result) {
    var componentDefs = result.$__components;

    if (!componentDefs.length) {
        throw Error('No component');
    }
    return componentDefs;
}

function RenderResult(out) {
   this.out = this.$__out = out;
   this.$__components = undefined;
}

module.exports = RenderResult;

var proto = RenderResult.prototype = {
    getComponent: function() {
        return this.getComponents()[0];
    },
    getComponents: function(selector) {
        if (!this.$__components) {
            throw Error('Not added to DOM');
        }

        var componentDefs = getComponentDefs(this);

        var components = [];

        componentDefs.forEach(function(componentDef) {
            var component = componentDef.$__component;
            if (!selector || selector(component)) {
                components.push(component);
            }
        });

        return components;
    },

    afterInsert: function(doc) {
        var out = this.$__out;
        var componentsContext = out.global.components;
        if (componentsContext) {
            this.$__components = componentsContext.$__components;
            componentsContext.$__initComponents(doc);
        } else {
            this.$__components = EMPTY_ARRAY;
        }

        return this;
    },
    getNode: function(doc) {
        return this.$__out.$__getNode(doc);
    },
    getOutput: function() {
        return this.$__out.$__getOutput();
    },
    toString: function() {
        return this.$__out.toString();
    },
    document: typeof document != 'undefined' && document
};

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(
    proto,
    function getEl(renderResult, referenceEl) {
        return renderResult.getNode(referenceEl.ownerDocument);
    },
    function afterInsert(renderResult, referenceEl) {
        return renderResult.afterInsert(referenceEl.ownerDocument);
    });


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(0);
var componentsUtil = __webpack_require__(3);
var destroyComponentForEl = componentsUtil.$__destroyComponentForEl;
var destroyElRecursive = componentsUtil.$__destroyElRecursive;

function resolveEl(el) {
    if (typeof el == 'string') {
        var elId = el;
        el = document.getElementById(elId);
        if (!el) {
            throw Error('Not found: ' + elId);
        }
    }
    return el;
}

function beforeRemove(referenceEl) {
    destroyElRecursive(referenceEl);
    destroyComponentForEl(referenceEl);
}

module.exports = function(target, getEl, afterInsert) {
    extend(target, {
        appendTo: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            referenceEl.appendChild(el);
            return afterInsert(this, referenceEl);
        },
        prependTo: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            referenceEl.insertBefore(el, referenceEl.firstChild || null);
            return afterInsert(this, referenceEl);
        },
        replace: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            beforeRemove(referenceEl);
            referenceEl.parentNode.replaceChild(el, referenceEl);
            return afterInsert(this, referenceEl);
        },
        replaceChildrenOf: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);

            var curChild = referenceEl.firstChild;
            while(curChild) {
                var nextSibling = curChild.nextSibling; // Just in case the DOM changes while removing
                if (curChild.nodeType == 1) {
                    beforeRemove(curChild);
                }
                curChild = nextSibling;
            }

            referenceEl.innerHTML = '';
            referenceEl.appendChild(el);
            return afterInsert(this, referenceEl);
        },
        insertBefore: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            referenceEl.parentNode.insertBefore(el, referenceEl);
            return afterInsert(this, referenceEl);
        },
        insertAfter: function(referenceEl) {
            referenceEl = resolveEl(referenceEl);
            var el = getEl(this, referenceEl);
            el = el;
            var nextSibling = referenceEl.nextSibling;
            var parentNode = referenceEl.parentNode;
            if (nextSibling) {
                parentNode.insertBefore(el, nextSibling);
            } else {
                parentNode.appendChild(el);
            }
            return afterInsert(this, referenceEl);
        }
    });
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray = Array.isArray;

function isFunction(arg) {
    return typeof arg == 'function';
}

function classList(arg, classNames) {
    var len;

    if (arg) {
        if (typeof arg == 'string') {
            if (arg) {
                classNames.push(arg);
            }
        } else if (typeof (len = arg.length) == 'number') {
            for (var i=0; i<len; i++) {
                classList(arg[i], classNames);
            }
        } else if (typeof arg == 'object') {
            for (var name in arg) {
                if (arg.hasOwnProperty(name)) {
                    var value = arg[name];
                    if (value) {
                        classNames.push(name);
                    }
                }
            }
        }
    }
}

function createDeferredRenderer(handler) {
    function deferredRenderer(input, out) {
        deferredRenderer.renderer(input, out);
    }

    // This is the initial function that will do the rendering. We replace
    // the renderer with the actual renderer func on the first render
    deferredRenderer.renderer = function(input, out) {
        var rendererFunc = handler.renderer || handler._ || handler.render;
        if (!isFunction(rendererFunc)) {
            throw Error('Invalid renderer');
        }
        // Use the actual renderer from now on
        deferredRenderer.renderer = rendererFunc;
        rendererFunc(input, out);
    };

    return deferredRenderer;
}

function resolveRenderer(handler) {
    var renderer = handler.renderer || handler._;

    if (renderer) {
        return renderer;
    }

    if (isFunction(handler)) {
        return handler;
    }

    // If the user code has a circular function then the renderer function
    // may not be available on the module. Since we can't get a reference
    // to the actual renderer(input, out) function right now we lazily
    // try to get access to it later.
    return createDeferredRenderer(handler);
}

/**
 * Internal helper method to prevent null/undefined from being written out
 * when writing text that resolves to null/undefined
 * @private
 */
exports.s = function strHelper(str) {
    return (str == null) ? '' : str.toString();
};

/**
 * Internal helper method to handle loops without a status variable
 * @private
 */
exports.f = function forEachHelper(array, callback) {
    if (isArray(array)) {
        for (var i=0; i<array.length; i++) {
            callback(array[i]);
        }
    } else if (isFunction(array)) {
        // Also allow the first argument to be a custom iterator function
        array(callback);
    }
};

/**
 * Helper to load a custom tag
 */
exports.t = function loadTagHelper(renderer, targetProperty, isRepeated) {
    if (renderer) {
        renderer = resolveRenderer(renderer);
    }

    return renderer;
};

/**
 * classList(a, b, c, ...)
 * Joines a list of class names with spaces. Empty class names are omitted.
 *
 * classList('a', undefined, 'b') --> 'a b'
 *
 */
exports.cl = function classListHelper() {
    var classNames = [];
    classList(arguments, classNames);
    return classNames.join(' ');
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var defaultCreateOut = __webpack_require__(11);
var extend = __webpack_require__(0);

function safeRender(renderFunc, finalData, finalOut, shouldEnd) {
    try {
        renderFunc(finalData, finalOut);
        if (shouldEnd) {
            finalOut.end();
        }
    } catch(err) {
        setTimeout(function() {
            finalOut.error(err);
        }, 0);
    }
    return finalOut;
}

module.exports = function(target, renderer) {
    var renderFunc = renderer && (renderer.renderer || renderer.render || renderer);
    var createOut = target.createOut || renderer.createOut || defaultCreateOut;

    return extend(target, {
        createOut: createOut,

        renderToString: function(data, callback) {
            var localData = data || {};
            var render = renderFunc || this._;
            var globalData = localData.$global;
            var out = createOut(globalData);

            out.global.template = this;

            if (globalData) {
                localData.$global = undefined;
            }

            if (callback) {
                out.on('finish', function() {
                       callback(null, out.toString(), out);
                   })
                   .once('error', callback);

                return safeRender(render, localData, out, true);
            } else {
                out.sync();
                render(localData, out);
                return out.toString();
            }
        },

        renderSync: function(data) {
            var localData = data || {};
            var render = renderFunc || this._;
            var globalData = localData.$global;
            var out = createOut(globalData);
            out.sync();

            out.global.template = this;

            if (globalData) {
                localData.$global = undefined;
            }

            render(localData, out);
            return out.$__getResult();
        },

        /**
         * Renders a template to either a stream (if the last
         * argument is a Stream instance) or
         * provides the output to a callback function (if the last
         * argument is a Function).
         *
         * Supported signatures:
         *
         * render(data)
         * render(data, out)
         * render(data, stream)
         * render(data, callback)
         *
         * @param  {Object} data The view model data for the template
         * @param  {AsyncStream/AsyncVDOMBuilder} out A Stream, an AsyncStream/AsyncVDOMBuilder instance, or a callback function
         * @return {AsyncStream/AsyncVDOMBuilder} Returns the AsyncStream/AsyncVDOMBuilder instance that the template is rendered to
         */
        render: function(data, out) {
            var callback;
            var finalOut;
            var finalData;
            var globalData;
            var render = renderFunc || this._;
            var shouldBuffer = this.$__shouldBuffer;
            var shouldEnd = true;

            if (data) {
                finalData = data;
                if ((globalData = data.$global)) {
                    finalData.$global = undefined;
                }
            } else {
                finalData = {};
            }

            if (out && out.$__isOut) {
                finalOut = out;
                shouldEnd = false;
                extend(out.global, globalData);
            } else if (typeof out == 'function') {
                finalOut = createOut(globalData);
                callback = out;
            } else {
                finalOut = createOut(
                    globalData, // global
                    out, // writer(AsyncStream) or parentNode(AsyncVDOMBuilder)
                    null, // state
                    shouldBuffer // ignored by AsyncVDOMBuilder
                );
            }

            if (callback) {
                finalOut
                    .on('finish', function() {
                        callback(null, finalOut.$__getResult());
                    })
                    .once('error', callback);
            }

            globalData = finalOut.global;

            globalData.template = globalData.template || this;

            return safeRender(render, finalData, finalOut, shouldEnd);
        }
    });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(22);
var vdom = __webpack_require__(13);
var VElement = vdom.$__VElement;
var VDocumentFragment = vdom.$__VDocumentFragment;
var VComment = vdom.$__VComment;
var VText = vdom.$__VText;
var virtualizeHTML = vdom.$__virtualizeHTML;
var RenderResult = __webpack_require__(28);
var defaultDocument = vdom.$__defaultDocument;

var FLAG_FINISHED = 1;
var FLAG_LAST_FIRED = 2;

var EVENT_UPDATE = 'update';
var EVENT_FINISH = 'finish';

function State(tree) {
    this.$__remaining = 1;
    this.$__events = new EventEmitter();
    this.$__tree = tree;
    this.$__last = null;
    this.$__lastCount = 0;
    this.$__flags = 0;
}

function AsyncVDOMBuilder(globalData, parentNode, state) {
    if (!parentNode) {
        parentNode = new VDocumentFragment();
    }

    if (state) {
        state.$__remaining++;
    } else {
        state = new State(parentNode);
    }

    this.data = {};
    this.$__state = state;
    this.$__parent = parentNode;
    this.global = globalData || {};
    this.$__stack = [parentNode];
    this.$__sync = false;
    this.$c = null; // Component args
}

var proto = AsyncVDOMBuilder.prototype = {
    $__isOut: true,
    $__document: defaultDocument,

    element: function(name, attrs, childCount, flags, constId) {
        var element = new VElement(name, attrs, childCount, flags, constId);

        var parent = this.$__parent;

        if(parent) {
            parent.$__appendChild(element);
        }

        return childCount === 0 ? this : element;
    },

    n: function(node) {
        // NOTE: We do a shallow clone since we assume the node is being reused
        //       and a node can only have one parent node.
        return this.node(node.$__cloneNode());
    },

    node: function(node) {
        var parent = this.$__parent;
        if (parent) {
            parent.$__appendChild(node);
        }
        return this;
    },

    text: function(text) {
        var type = typeof text;

        if (type != 'string') {
            if (text == null) {
                return;
            } else if (type == 'object') {
                if (text.toHTML) {
                    return this.h(text.toHTML());
                }
            }

            text = text.toString();
        }

        var parent = this.$__parent;
        if (parent) {
            var lastChild = parent.lastChild;
            if (lastChild && lastChild.$__Text) {
                lastChild.nodeValue += text;
            } else {
                parent.$__appendChild(new VText(text));
            }
        }
        return this;
    },

    comment: function(comment) {
        return this.node(new VComment(comment));
    },

    html: function(html) {
        if (html != null) {
            var vdomNode = virtualizeHTML(html, this.$__document);
            this.node(vdomNode);
        }

        return this;
    },

    beginElement: function(name, attrs, childCount, flags, constId) {
        var element = new VElement(name, attrs, childCount, flags, constId);
        var parent = this.$__parent;
        if (parent) {
            parent.$__appendChild(element);
            this.$__stack.push(element);
            this.$__parent = element;
        }
        return this;
    },

    endElement: function() {
        var stack = this.$__stack;
        stack.pop();
        this.$__parent = stack[stack.length-1];
    },

    end: function() {
        var state = this.$__state;

        this.$__parent = null;

        var remaining = --state.$__remaining;

        if (!(state.$__flags & FLAG_LAST_FIRED) && (remaining - state.$__lastCount === 0)) {
            state.$__flags |= FLAG_LAST_FIRED;
            state.$__lastCount = 0;
            state.$__events.emit('last');
        }

        if (!remaining) {
            state.$__flags |= FLAG_FINISHED;
            state.$__events.emit(EVENT_FINISH, this.$__getResult());
        }

        return this;
    },

    error: function(e) {
        try {
            this.emit('error', e);
        } finally {
            // If there is no listener for the error event then it will
            // throw a new Error here. In order to ensure that the async fragment
            // is still properly ended we need to put the end() in a `finally`
            // block
            this.end();
        }

        return this;
    },

    beginAsync: function(options) {
        if (this.$__sync) {
            throw Error('Not allowed');
        }

        var state = this.$__state;

        if (options) {
            if (options.last) {
                state.$__lastCount++;
            }
        }

        var documentFragment = this.$__parent.$__appendDocumentFragment();
        var asyncOut = new AsyncVDOMBuilder(this.global, documentFragment, state);

        state.$__events.emit('beginAsync', {
           out: asyncOut,
           parentOut: this
       });

       return asyncOut;
    },

    createOut: function(callback) {
        return new AsyncVDOMBuilder(this.global);
    },

    flush: function() {
        var events = this.$__state.$__events;

        if (events.listenerCount(EVENT_UPDATE)) {
            events.emit(EVENT_UPDATE, new RenderResult(this));
        }
    },

    $__getOutput: function() {
        return this.$__state.$__tree;
    },

    $__getResult: function() {
        return this.$__result || (this.$__result = new RenderResult(this));
    },

    on: function(event, callback) {
        var state = this.$__state;

        if (event === EVENT_FINISH && (state.$__flags & FLAG_FINISHED)) {
            callback(this.$__getResult());
        } else {
            state.$__events.on(event, callback);
        }

        return this;
    },

    once: function(event, callback) {
        var state = this.$__state;

        if (event === EVENT_FINISH && (state.$__flags & FLAG_FINISHED)) {
            callback(this.$__getResult());
            return this;
        }

        state.$__events.once(event, callback);
        return this;
    },

    emit: function(type, arg) {
        var events = this.$__state.$__events;
        switch(arguments.length) {
            case 1:
                events.emit(type);
                break;
            case 2:
                events.emit(type, arg);
                break;
            default:
                events.emit.apply(events, arguments);
                break;
        }
        return this;
    },

    removeListener: function() {
        var events = this.$__state.$__events;
        events.removeListener.apply(events, arguments);
        return this;
    },

    sync: function() {
        this.$__sync = true;
    },

    isSync: function() {
        return this.$__sync;
    },

    onLast: function(callback) {
        var state = this.$__state;

        var lastArray = state.$__last;

        if (!lastArray) {
            lastArray = state.$__last = [];
            var i = 0;
            var next = function() {
                if (i === lastArray.length) {
                    return;
                }
                var _next = lastArray[i++];
                _next(next);
            };

            this.once('last', function() {
                next();
            });
        }

        lastArray.push(callback);
        return this;
    },

    $__getNode: function(doc) {
        var node = this.$__VNode;
        if (!node) {
            var vdomTree = this.$__getOutput();

            if (!doc) {
                doc = this.$__document;
            }

            node = this.$__VNode = vdomTree.actualize(doc);
        }
        return node;
    },

    toString: function() {
        return this.$__getNode().outerHTML;
    },

    then: function(fn, fnErr) {
        var out = this;
        var promise = new Promise(function(resolve, reject) {
            out.on('error', reject)
                .on(EVENT_FINISH, function(result) {
                    resolve(result);
                });
        });

        return Promise.resolve(promise).then(fn, fnErr);
    },

    catch: function(fnErr) {
        return this.then(undefined, fnErr);
    },

    isVDOM: true
};

proto.e = proto.element;
proto.be = proto.beginElement;
proto.ee = proto.endElement;
proto.t = proto.text;
proto.h = proto.w = proto.write = proto.html;

module.exports = AsyncVDOMBuilder;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(1);
var inherit = __webpack_require__(2);

function VComment(value) {
    this.$__VNode(-1 /* no children */);
    this.nodeValue = value;
}

VComment.prototype = {
    nodeType: 8,

    $__actualize: function(doc) {
        return doc.createComment(this.nodeValue);
    },

    $__cloneNode: function() {
        return new VComment(this.nodeValue);
    }
};

inherit(VComment, VNode);

module.exports = VComment;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(1);
var inherit = __webpack_require__(2);
var extend = __webpack_require__(0);

function VDocumentFragmentClone(other) {
    extend(this, other);
    this.$__parentNode = null;
    this.$__nextSibling = null;
}

function VDocumentFragment(documentFragment) {
    this.$__VNode(null /* childCount */);
    this.namespaceURI = null;
}

VDocumentFragment.prototype = {
    nodeType: 11,

    $__DocumentFragment: true,

    $__cloneNode: function() {
        return new VDocumentFragmentClone(this);
    },

    $__actualize: function(doc) {
        return doc.createDocumentFragment();
    }
};

inherit(VDocumentFragment, VNode);

VDocumentFragmentClone.prototype = VDocumentFragment.prototype;

module.exports = VDocumentFragment;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(1);
var inherit = __webpack_require__(2);
var extend = __webpack_require__(0);

var NS_XLINK = 'http://www.w3.org/1999/xlink';
var ATTR_XLINK_HREF = 'xlink:href';
var toString = String;

var FLAG_IS_SVG = 1;
var FLAG_IS_TEXTAREA = 2;
var FLAG_SIMPLE_ATTRS = 4;

var defineProperty = Object.defineProperty;


var ATTR_HREF = 'href';
var EMPTY_OBJECT = Object.freeze({});
var ATTR_MARKO_CONST = 'data-_mc';

var specialAttrRegexp = /^data-_/;


function convertAttrValue(type, value) {
    if (value === true) {
        return '';
    } else if (type == 'object') {
        return JSON.stringify(value);
    } else {
        return toString(value);
    }
}

function VElementClone(other) {
    extend(this, other);
    this.$__parentNode = null;
    this.$__nextSibling = null;
}

function VElement(tagName, attrs, childCount, flags, constId) {
    this.$__VNode(childCount);

    if (constId) {
        if (!attrs) {
            attrs = {};
        }
        attrs[ATTR_MARKO_CONST] = constId;
    }

    var namespaceURI;

    if ((this.$__flags = flags || 0)) {
        if (flags & FLAG_IS_SVG) {
            namespaceURI = 'http://www.w3.org/2000/svg';
        }
    }

    this.$__attributes = attrs || EMPTY_OBJECT;
    this.$__namespaceURI = namespaceURI;
    this.nodeName = tagName;
    this.$__value = null;
    this.$__constId = constId;
}

VElement.prototype = {
    $__VElement: true,

    nodeType: 1,

    $__cloneNode: function() {
        return new VElementClone(this);
    },

    /**
     * Shorthand method for creating and appending an HTML element
     *
     * @param  {String} tagName    The tag name (e.g. "div")
     * @param  {int|null} attrCount  The number of attributes (or `null` if not known)
     * @param  {int|null} childCount The number of child nodes (or `null` if not known)
     */
    e: function(tagName, attrs, childCount, flags, constId) {
        var child = this.$__appendChild(new VElement(tagName, attrs, childCount, flags, constId));

        if (childCount === 0) {
            return this.$__finishChild();
        } else {
            return child;
        }
    },



    /**
     * Shorthand method for creating and appending a static node. The provided node is automatically cloned
     * using a shallow clone since it will be mutated as a result of setting `nextSibling` and `parentNode`.
     *
     * @param  {String} value The value for the new Comment node
     */
    n: function(node) {
        this.$__appendChild(node.$__cloneNode());
        return this.$__finishChild();
    },

    $__actualize: function(doc) {
        var namespaceURI = this.$__namespaceURI;
        var tagName = this.nodeName;

        var el = namespaceURI ?
            doc.createElementNS(namespaceURI, tagName) :
            doc.createElement(tagName);


        var attributes = this.$__attributes;
        for (var attrName in attributes) {
            var attrValue = attributes[attrName];

            if (attrName[5] == '_' && specialAttrRegexp.test(attrName)) {
                continue;
            }

            if (attrValue !== false && attrValue != null) {
                var type = typeof attrValue;

                if (type != 'string') {
                    // Special attributes aren't copied to the real DOM. They are only
                    // kept in the virtual attributes map
                    attrValue = convertAttrValue(type, attrValue);
                }

                namespaceURI = null;

                if (attrName == ATTR_XLINK_HREF) {
                    namespaceURI = NS_XLINK;
                    attrName = ATTR_HREF;
                }

                el.setAttributeNS(namespaceURI, attrName, attrValue);
            }
        }

        var flags = this.$__flags;

        if (flags & FLAG_IS_TEXTAREA) {
            el.value = this.$__value;
        }

        el._vattrs = attributes;
        el._vflags = flags;

        return el;
    },

    $__hasAttribute: function(name) {
        // We don't care about the namespaces since the there
        // is no chance that attributes with the same name will have
        // different namespaces
        var value = this.$__attributes[name];
        return value != null && value !== false;
    },

    $__isSameNode: function(otherNode) {
        if (otherNode.nodeType == 1) {
            var constId = this.$__constId;
            if (constId) {
                var otherVirtualAttrs;

                var otherConstId = otherNode.$__VNode ?
                    otherNode.$__constId :
                    (otherVirtualAttrs = otherNode._vattrs) && otherVirtualAttrs[ATTR_MARKO_CONST];
                return constId === otherConstId;
            }
        }

        return false;
    }
};

inherit(VElement, VNode);

var proto = VElementClone.prototype = VElement.prototype;

['checked', 'selected', 'disabled'].forEach(function(name) {
    defineProperty(proto, name, {
        get: function () {
            var value = this.$__attributes[name];
            return value !== false && value != null;
        }
    });
});

defineProperty(proto, 'id', {
    get: function () {
        return this.$__attributes.id;
    }
});

defineProperty(proto, 'value', {
    get: function () {
        var value = this.$__value;
        if (value == null) {
            value = this.$__attributes.value;
        }
        return value != null ? toString(value) : '';
    }
});

defineProperty(proto, '$__isTextArea', {
    get: function () {
        return this.$__flags & FLAG_IS_TEXTAREA;
    }
});

VElement.$__removePreservedAttributes = function(attrs) {
    // By default this static method is a no-op, but if there are any
    // compiled components that have "no-update" attributes then
    // `preserve-attrs.js` will be imported and this method will be replaced
    // with a method that actually does something
    return attrs;
};

VElement.$__morphAttrs = function(fromEl, toEl) {

    var removePreservedAttributes = VElement.$__removePreservedAttributes;

    var attrs = toEl.$__attributes || toEl._vattrs;
    var attrName;
    var i;

    // We use expando properties to associate the previous HTML
    // attributes provided as part of the VDOM node with the
    // real VElement DOM node. When diffing attributes,
    // we only use our internal representation of the attributes.
    // When diffing for the first time it's possible that the
    // real VElement node will not have the expando property
    // so we build the attribute map from the expando property

    var oldAttrs = fromEl._vattrs;
    if (oldAttrs) {
        if (oldAttrs == attrs) {
            // For constant attributes the same object will be provided
            // every render and we can use that to our advantage to
            // not waste time diffing a constant, immutable attribute
            // map.
            return;
        } else {
            oldAttrs = removePreservedAttributes(oldAttrs, true);
        }
    } else {
        // We need to build the attribute map from the real attributes
        oldAttrs = {};

        var oldAttributesList = fromEl.attributes;
        for (i = oldAttributesList.length - 1; i >= 0; --i) {
            var attr = oldAttributesList[i];

            if (attr.specified !== false) {
                attrName = attr.name;
                var attrNamespaceURI = attr.namespaceURI;
                if (attrNamespaceURI === NS_XLINK) {
                    oldAttrs[ATTR_XLINK_HREF] = attr.value;
                } else {
                    oldAttrs[attrName] = attr.value;
                }
            }
        }

        // We don't want preserved attributes to show up in either the old
        // or new attribute map.
        removePreservedAttributes(oldAttrs, false);
    }

    fromEl._vattrs = attrs;

    var attrValue;

    var flags = toEl.$__flags;
    var oldFlags;

    if (flags & FLAG_SIMPLE_ATTRS && ((oldFlags = fromEl._vflags) & FLAG_SIMPLE_ATTRS)) {
        if (oldAttrs['class'] != (attrValue = attrs['class'])) {
            fromEl.className = attrValue;
        }
        if (oldAttrs.id != (attrValue = attrs.id)) {
            fromEl.id = attrValue;
        }
        if (oldAttrs.style != (attrValue = attrs.style)) {
            fromEl.style.cssText = attrValue;
        }
        return;
    }

    // In some cases we only want to set an attribute value for the first
    // render or we don't want certain attributes to be touched. To support
    // that use case we delete out all of the preserved attributes
    // so it's as if they never existed.
    attrs = removePreservedAttributes(attrs, true);

    var namespaceURI;

    // Loop over all of the attributes in the attribute map and compare
    // them to the value in the old map. However, if the value is
    // null/undefined/false then we want to remove the attribute
    for (attrName in attrs) {
        attrValue = attrs[attrName];
        namespaceURI = null;

        if (attrName == ATTR_XLINK_HREF) {
            namespaceURI = NS_XLINK;
            attrName = ATTR_HREF;
        }

        if (attrValue == null || attrValue === false) {
            fromEl.removeAttributeNS(namespaceURI, attrName);
        } else if (oldAttrs[attrName] !== attrValue) {

            if (attrName[5] == '_' && specialAttrRegexp.test(attrName)) {
                // Special attributes aren't copied to the real DOM. They are only
                // kept in the virtual attributes map
                continue;
            }

            var type = typeof attrValue;

            if (type != 'string') {
                attrValue = convertAttrValue(type, attrValue);
            }

            fromEl.setAttributeNS(namespaceURI, attrName, attrValue);
        }
    }

    // If there are any old attributes that are not in the new set of attributes
    // then we need to remove those attributes from the target node
    for (attrName in oldAttrs) {
        if (!(attrName in attrs)) {

            if (attrName == ATTR_XLINK_HREF) {
                namespaceURI = ATTR_XLINK_HREF;
                attrName = ATTR_HREF;
            }

            fromEl.removeAttributeNS(namespaceURI, attrName);
        }
    }
};

module.exports = VElement;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(1);
var inherit = __webpack_require__(2);

function VText(value) {
    this.$__VNode(-1 /* no children */);
    this.nodeValue = value;
}

VText.prototype = {
    $__Text: true,

    nodeType: 3,

    $__actualize: function(doc) {
        return doc.createTextNode(this.nodeValue);
    },

    $__cloneNode: function() {
        return new VText(this.nodeValue);
    }
};

inherit(VText, VNode);

module.exports = VText;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// helpers provide a core set of various utility methods
// that are available in every template
var AsyncVDOMBuilder = __webpack_require__(32);
var makeRenderable = __webpack_require__(31);

/**
 * Method is for internal usage only. This method
 * is invoked by code in a compiled Marko template and
 * it is used to create a new Template instance.
 * @private
 */
exports.t = function createTemplate(path) {
     return new Template(path);
};

function Template(path, func) {
    this.path = path;
    this._ = func;
    this.meta = undefined;
}

function createOut(globalData, parent, state) {
    return new AsyncVDOMBuilder(globalData, parent, state);
}

var Template_prototype = Template.prototype = {
    createOut: createOut
};

makeRenderable(Template_prototype);

exports.Template = Template;
exports.$__createOut = createOut;

__webpack_require__(11).$__setCreateOut(createOut);


/***/ }),
/* 38 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(14)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(14)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.serialize = __webpack_require__(43);
exports.stringify = __webpack_require__(44);
exports.parse = __webpack_require__(42);
exports.finalize = __webpack_require__(15);
exports.stringifyPrepare = __webpack_require__(16);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var finalize = __webpack_require__(15);

module.exports = function parse(json) {
    if (json === undefined) {
        return undefined;
    }

    var outer = JSON.parse(json);
    return finalize(outer);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const markerKey = Symbol('warp10');
const safePropName = /^[$A-Z_][0-9A-Z_$]*$/i;
const escapeEndingScriptTagRegExp = /<\//g;
const isArray = Array.isArray;

class Marker {
    constructor(path, symbol) {
        this.path = path;
        this.symbol = symbol;
    }
}

function handleProperty(clone, key, value, valuePath, serializationSymbol, assignments) {
    if (value.constructor === Date) {
        assignments.push(valuePath + '=new Date(' + value.getTime() + ')');
    } else if (isArray(value)) {
        const marker = value[markerKey];

        if (marker && marker.symbol === serializationSymbol) {
            assignments.push(valuePath + '=' + marker.path);
        } else {
            value[markerKey] = new Marker(valuePath, serializationSymbol);
            clone[key] = pruneArray(value, valuePath, serializationSymbol, assignments);
        }
    } else {
        const marker = value[markerKey];
        if (marker && marker.symbol === serializationSymbol) {
            assignments.push(valuePath + '=' + marker.path);
        } else {
            value[markerKey] = new Marker(valuePath, serializationSymbol);
            clone[key] = pruneObject(value, valuePath, serializationSymbol, assignments);
        }
    }
}

function pruneArray(array, path, serializationSymbol, assignments) {
    let len = array.length;

    var clone = new Array(len);

    for (let i=0; i<len; i++) {
        var value = array[i];
        if (value == null) {
            continue;
        }

        if (value && typeof value === 'object') {
            let valuePath = path + '[' + i + ']';
            handleProperty(clone, i, value, valuePath, serializationSymbol, assignments);
        } else {
            clone[i] = value;
        }
    }

    return clone;
}

function pruneObject(obj, path, serializationSymbol, assignments) {
    var clone = {};

    for (var key in obj) {
        var value = obj[key];
        if (value === undefined) {
            continue;
        }

        if (value && typeof value === 'object') {
            let valuePath = path + (safePropName.test(key) ? '.' + key : '[' + JSON.stringify(key) + ']');
            handleProperty(clone, key, value, valuePath, serializationSymbol, assignments);
        } else {
            clone[key] = value;
        }
    }

    return clone;
}

function serializeHelper(obj, safe, varName, additive) {
    /**
     * Performance notes:
     *
     * - It is faster to use native JSON.stringify instead of a custom stringify
     * - It is faster to first prune and then call JSON.stringify with _no_ replacer
     */
    var pruned;

    const assignments = []; // Used to keep track of code that needs to run to fix up the stringified object

    if (typeof obj === 'object') {
        const serializationSymbol = Symbol(); // Used to detect if the marker is associated with _this_ serialization
        const path = '$';

        obj[markerKey] = new Marker(path, serializationSymbol);

        if (obj.constructor === Date) {
            return '(new Date(' + obj.getTime() + '))';
        } else if (isArray(obj)) {
            pruned = pruneArray(obj, path, serializationSymbol, assignments);
        } else {
            pruned = pruneObject(obj, path, serializationSymbol, assignments);
        }
    } else {
        pruned = obj;
    }

    let json = JSON.stringify(pruned);
    if (safe) {
        json = json.replace(escapeEndingScriptTagRegExp, '\\u003C/');
    }

    if (varName) {
        if (additive) {
            let innerCode = 'var $=' + json + '\n';

            if (assignments.length) {
                innerCode += assignments.join('\n') + '\n';
            }

            let code = '(function() {var t=window.' + varName + '||(window.' + varName + '={})\n' + innerCode;

            for (let key in obj) {
                var prop;

                if (safePropName.test(key)) {
                    prop = '.' + key;
                } else {
                    prop = '[' + JSON.stringify(key) + ']';
                }
                code += 't' + prop + '=$' + prop + '\n';
            }

            return code + '}())';
        } else {
            if (assignments.length) {
                return '(function() {var $=' +
                    json + '\n' +
                    assignments.join('\n') +
                    '\nwindow.' + varName + '=$}())';
            } else {
                return 'window.' + varName + '=' + json;
            }
        }
    } else {
        if (assignments.length) {
            return '(function() {var $=' +
                json + '\n' +
                assignments.join('\n') +
                '\nreturn $}())';
        } else {
            return '(' + json + ')';
        }

    }
}

module.exports = function serialize(obj, options) {
    if (obj == null) {
        return 'null';
    }

    var safe;
    var varName;
    var additive;

    if (options) {
        safe = options.safe !== false;
        varName = options.var;
        additive = options.additive === true;
    } else {
        safe = true;
        additive = false;
    }

    return serializeHelper(obj, safe, varName, additive);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const stringifyPrepare = __webpack_require__(16);
const escapeEndingScriptTagRegExp = /<\//g;

module.exports = function stringify(obj, options) {
    var safe;

    if (options) {
        safe = options.safe === true;
    } else {
        safe = false;
    }

    var final = stringifyPrepare(obj);

    let json = JSON.stringify(final);
    if (safe) {
        json = json.replace(escapeEndingScriptTagRegExp, '\\u003C/');
    }

    return json;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// require('marko/node-require').install();
const electron = __webpack_require__(18)
const remote = electron.remote
const mainProcess = remote.require('./main')
const template = __webpack_require__(17);

template.renderSync()
    .appendTo(document.body);


/***/ })
/******/ ]);