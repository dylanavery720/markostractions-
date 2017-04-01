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
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var markoGlobal = window.$MG || (window.$MG = {
    uid: 0
});

var runtimeId = markoGlobal.uid++;

var componentLookup = {};

var defaultDocument = document;
var EMPTY_OBJECT = {};

function getComponentForEl(el, doc) {
    if (el) {
        var node = typeof el == 'string' ? (doc || defaultDocument).getElementById(el) : el;
        if (node) {
            var component = node._w;

            while(component) {
                var rootFor = component.$__rootFor;
                if (rootFor)  {
                    component = rootFor;
                } else {
                    break;
                }
            }

            return component;
        }
    }
}

var lifecycleEventMethods = {};

[
    'create',
    'render',
    'update',
    'mount',
    'destroy',
].forEach(function(eventName) {
    lifecycleEventMethods[eventName] = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
});

/**
 * This method handles invoking a component's event handler method
 * (if present) while also emitting the event through
 * the standard EventEmitter.prototype.emit method.
 *
 * Special events and their corresponding handler methods
 * include the following:
 *
 * beforeDestroy --> onBeforeDestroy
 * destroy       --> onDestroy
 * beforeUpdate  --> onBeforeUpdate
 * update        --> onUpdate
 * render        --> onRender
 */
function emitLifecycleEvent(component, eventType, eventArg1, eventArg2) {
    var listenerMethod = component[lifecycleEventMethods[eventType]];

    if (listenerMethod !== undefined) {
        listenerMethod.call(component, eventArg1, eventArg2);
    }

    component.emit(eventType, eventArg1, eventArg2);
}

function destroyComponentForEl(el) {
    var componentToDestroy = el._w;
    if (componentToDestroy) {
        componentToDestroy.$__destroyShallow();
        el._w = null;

        while ((componentToDestroy = componentToDestroy.$__rootFor)) {
            componentToDestroy.$__rootFor = null;
            componentToDestroy.$__destroyShallow();
        }
    }
}
function destroyElRecursive(el) {
    var curChild = el.firstChild;
    while(curChild) {
        if (curChild.nodeType === 1) {
            destroyComponentForEl(curChild);
            destroyElRecursive(curChild);
        }
        curChild = curChild.nextSibling;
    }
}

function nextComponentId() {
    // Each component will get an ID that is unique across all loaded
    // marko runtimes. This allows multiple instances of marko to be
    // loaded in the same window and they should all place nice
    // together
    return 'b' + ((markoGlobal.uid)++);
}

function getElementById(doc, id) {
    return doc.getElementById(id);
}

function attachBubblingEvent(componentDef, handlerMethodName, extraArgs) {
    if (handlerMethodName) {
        var id = componentDef.id;

        return extraArgs ?
            [handlerMethodName, id, extraArgs] :
            [handlerMethodName, id];
    }
}

function getMarkoPropsFromEl(el) {
    var virtualProps = el._vprops;
    if (virtualProps === undefined) {
        virtualProps = el.getAttribute('data-marko');
        if (virtualProps) {
            virtualProps = JSON.parse(virtualProps);
        }
        el._vprops = virtualProps = virtualProps || EMPTY_OBJECT;
    }

    return virtualProps;
}

exports.$__runtimeId = runtimeId;
exports.$__componentLookup = componentLookup;
exports.$__getComponentForEl = getComponentForEl;
exports.$__emitLifecycleEvent = emitLifecycleEvent;
exports.$__destroyComponentForEl = destroyComponentForEl;
exports.$__destroyElRecursive = destroyElRecursive;
exports.$__nextComponentId = nextComponentId;
exports.$__getElementById = getElementById;
exports.$__attachBubblingEvent = attachBubblingEvent;
exports.$__getMarkoPropsFromEl = getMarkoPropsFromEl;


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var copyProps = __webpack_require__(24);

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
/***/ (function(module, exports, __webpack_require__) {

/* jshint newcap:false */
var specialElHandlers = __webpack_require__(18);

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

        if (this.$__nodeType === 1) {
            var elHandler = specialElHandlers[this.$__nodeName];
            if (elHandler !== undefined) {
                elHandler(actualNode, this);
            }
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var loadComponent = __webpack_require__(35);
var defineComponent = __webpack_require__(14);

var registered = {};
var loaded = {};
var componentTypes = {};

function register(typeName, def) {
    // We do this to kick off registering of nested components
    // but we don't use the return value just yet since there
    // is a good chance that it resulted in a circular dependency
    def();

    registered[typeName] = def;
    delete loaded[typeName];
    delete componentTypes[typeName];
    return typeName;
}

function load(typeName) {
    var target = loaded[typeName];
    if (!target) {
        target = registered[typeName];

        if (target) {
            target = target();
        } else {
            target = loadComponent(typeName); // Assume the typeName has been fully resolved already
        }

        if (!target) {
            throw Error('Not found: ' + typeName);
        }

        loaded[typeName] = target;
    }

    return target;
}

function getComponentClass(typeName) {
    var ComponentClass = componentTypes[typeName];

    if (ComponentClass) {
        return ComponentClass;
    }

    ComponentClass = load(typeName);

    ComponentClass = ComponentClass.Component || ComponentClass;

    if (!ComponentClass.$__isComponent) {
        ComponentClass = defineComponent(ComponentClass, ComponentClass.renderer);
    }

    // Make the component "type" accessible on each component instance
    ComponentClass.prototype.$__type = typeName;

    componentTypes[typeName] = ComponentClass;

    return ComponentClass;
}

function createComponent(typeName, id) {
    var ComponentClass = getComponentClass(typeName);
    return new ComponentClass(id);
}

exports.$__register = register;
exports.$__createComponent = createComponent;


/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(4);
module.exports = new EventEmitter();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(47);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(11);
// Compiled using marko@4.2.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = __webpack_require__(8).t(),
    marko_component = ({
    onCreate: function () {
        this.state = { clicked: true };
    },
    onMount: function () {
        ipcRenderer.on('clicked', () => {
            this.setState({ clicked: true });
        });
    },
    distract: function (url, e) {
        e.preventDefault();
        mainProcess.createWindow(url);
    },
    tedTalks: function (e) {
        e.preventDefault();
        mainProcess.createWindow('http://random.accessyoutube.org.uk/');
    },
    beatMaker: function (e) {
        e.preventDefault();
        mainProcess.createWindow('https://splice.com/sounds/beatmaker');
    },
    musicVideo: function (e) {
        e.preventDefault();
        mainProcess.createWindow('http://www.randomvideogenerator.com/');
    },
    trash: function (e) {
        e.preventDefault();
        mainProcess.createWindow('http://www.trashloop.com/');
    },
    hustle: function (e) {
        e.preventDefault();
        mainProcess.createWindow('http://www.everydayim.com/');
    },
    pointer: function (e) {
        e.preventDefault();
        mainProcess.createWindow('http://www.pointerpointer.com/');
    },
    gif: function (e) {
        e.preventDefault();
        mainProcess.createWindow('http://www.gifff.in/centered/');
    },
    staggeringBeaut: function (e) {
        e.preventDefault();
        mainProcess.createWindow('http://www.staggeringbeauty.com/');
    }
}),
    marko_components = __webpack_require__(34),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/fire-sale$0.0.1/components/electron-grid/index.marko", function() {
      return module.exports;
    }),
    marko_attrs0 = {
        "class": "cell"
      },
    marko_attrs1 = {
        "class": "cell"
      },
    marko_attrs2 = {
        "class": "cell"
      },
    marko_attrs3 = {
        "class": "cell"
      },
    marko_attrs4 = {
        "class": "cell"
      },
    marko_attrs5 = {
        "class": "cell"
      },
    marko_attrs6 = {
        "class": "cell"
      },
    marko_attrs7 = {
        "class": "cell"
      },
    marko_attrs8 = {
        "class": "cell"
      };


const { ipcRenderer, app, shell, remote } = __webpack_require__(9)
const mainProcess = remote.require('./main')
const currentWindow = remote.getCurrentWindow()

function render(input, out, __component, component, state) {
  var data = input;

  out.e("DIV", {
      "class": "grid",
      id: __component.id
    }, 9, 4)
    .e("DIV", marko_attrs0, 1, 0, {
        onclick: __component.d("distract", [
            "https://en.wikipedia.org/wiki/Special:Random"
          ])
      })
      .t("Wikipedia")
    .e("DIV", marko_attrs1, 1, 0, {
        onclick: __component.d("distract", [
            "http://random.accessyoutube.org.uk/"
          ])
      })
      .t("TED Talk")
    .e("DIV", marko_attrs2, 1, 0, {
        onclick: __component.d("distract", [
            "https://splice.com/sounds/beatmaker"
          ])
      })
      .t("Beat Maker")
    .e("DIV", marko_attrs3, 1, 0, {
        onclick: __component.d("distract", [
            "http://www.randomvideogenerator.com/"
          ])
      })
      .t("Music Videos")
    .e("DIV", marko_attrs4, 1, 0, {
        onclick: __component.d("distract", [
            "http://www.trashloop.com/"
          ])
      })
      .t("Throw Your Trash Away")
    .e("DIV", marko_attrs5, 1, 0, {
        onclick: __component.d("distract", [
            "http://www.everydayim.com/"
          ])
      })
      .t("Hustlin'")
    .e("DIV", marko_attrs6, 1, 0, {
        onclick: __component.d("distract", [
            "http://www.pointerpointer.com/"
          ])
      })
      .t("Pointer")
    .e("DIV", marko_attrs7, 1, 0, {
        onclick: __component.d("gif")
      })
      .t("Gif")
    .e("DIV", marko_attrs8, 1, 0, {
        onclick: __component.d("staggeringBeaut")
      })
      .t("Staggering Beauty");
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* jshint newcap:false */

var domInsert = __webpack_require__(20);
var marko = __webpack_require__(40);
var componentsUtil = __webpack_require__(0);
var componentLookup = componentsUtil.$__componentLookup;
var emitLifecycleEvent = componentsUtil.$__emitLifecycleEvent;
var destroyComponentForEl = componentsUtil.$__destroyComponentForEl;
var destroyElRecursive = componentsUtil.$__destroyElRecursive;
var getElementById = componentsUtil.$__getElementById;
var EventEmitter = __webpack_require__(4);
var RenderResult = __webpack_require__(19);
var SubscriptionTracker = __webpack_require__(29);
var inherit = __webpack_require__(2);
var updateManager = __webpack_require__(37);
var morphdom = __webpack_require__(38);
var eventDelegation = __webpack_require__(15);

var slice = Array.prototype.slice;

var MORPHDOM_SKIP = true;

var COMPONENT_SUBSCRIBE_TO_OPTIONS;
var NON_COMPONENT_SUBSCRIBE_TO_OPTIONS = {
    addDestroyListener: false
};

var emit = EventEmitter.prototype.emit;

function removeListener(removeEventListenerHandle) {
    removeEventListenerHandle();
}

function checkCompatibleComponent(componentsContext, el) {
    var component = el._w;
    while(component) {
        var id = component.id;
        var newComponentDef = componentsContext.$__componentsById[id];
        if (newComponentDef && component.$__type == newComponentDef.$__component.$__type) {
            break;
        }

        var rootFor = component.$__rootFor;
        if (rootFor)  {
            component = rootFor;
        } else {
            component.$__destroyShallow();
            break;
        }
    }
}

function handleCustomEventWithMethodListener(component, targetMethodName, args, extraArgs) {
    // Remove the "eventType" argument
    args.push(component);

    if (extraArgs) {
        args = extraArgs.concat(args);
    }


    var targetComponent = componentLookup[component.$__scope];
    var targetMethod = targetComponent[targetMethodName];
    if (!targetMethod) {
        throw Error('Method not found: ' + targetMethodName);
    }

    targetMethod.apply(targetComponent, args);
}

function getElIdHelper(component, componentElId, index) {
    var id = component.id;

    var elId = componentElId != null ? id + '-' + componentElId : id;

    if (index != null) {
        elId += '[' + index + ']';
    }

    return elId;
}

/**
 * This method is used to process "update_<stateName>" handler functions.
 * If all of the modified state properties have a user provided update handler
 * then a rerender will be bypassed and, instead, the DOM will be updated
 * looping over and invoking the custom update handlers.
 * @return {boolean} Returns true if if the DOM was updated. False, otherwise.
 */
function processUpdateHandlers(component, stateChanges, oldState) {
    var handlerMethod;
    var handlers;

    for (var propName in stateChanges) {
        if (stateChanges.hasOwnProperty(propName)) {
            var handlerMethodName = 'update_' + propName;

            handlerMethod = component[handlerMethodName];
            if (handlerMethod) {
                (handlers || (handlers=[])).push([propName, handlerMethod]);
            } else {
                // This state change does not have a state handler so return false
                // to force a rerender
                return;
            }
        }
    }

    // If we got here then all of the changed state properties have
    // an update handler or there are no state properties that actually
    // changed.
    if (handlers) {
        // Otherwise, there are handlers for all of the changed properties
        // so apply the updates using those handlers

        handlers.forEach(function(handler, i) {
            var propertyName = handler[0];
            handlerMethod = handler[1];

            var newValue = stateChanges[propertyName];
            var oldValue = oldState[propertyName];
            handlerMethod.call(component, newValue, oldValue);
        });

        emitLifecycleEvent(component, 'update');

        component.$__reset();
    }

    return true;
}

function checkInputChanged(existingComponent, oldInput, newInput) {
    if (oldInput != newInput) {
        if (oldInput == null || newInput == null) {
            return true;
        }

        var oldKeys = Object.keys(oldInput);
        var newKeys = Object.keys(newInput);
        var len = oldKeys.length;
        if (len !== newKeys.length) {
            return true;
        }

        for (var i=0; i<len; i++) {
            var key = oldKeys[i];
            if (oldInput[key] !== newInput[key]) {
                return true;
            }
        }
    }

    return false;
}

function onNodeDiscarded(node) {
    if (node.nodeType === 1) {
        destroyComponentForEl(node);
    }
}

function onBeforeNodeDiscarded(node) {
    return eventDelegation.$__handleNodeDetach(node);
}

function onBeforeElUpdated(fromEl, key, componentsContext) {
    if (componentsContext && key) {
        var preserved = componentsContext.$__preserved[key];

        if (preserved === true) {
            // Don't morph elements that are associated with components that are being
            // reused or elements that are being preserved. For components being reused,
            // the morphing will take place when the reused component updates.
            return MORPHDOM_SKIP;
        } else {
            // We may need to destroy a Component associated with the current element
            // if a new UI component was rendered to the same element and the types
            // do not match
            checkCompatibleComponent(componentsContext, fromEl);
        }
    }
}

function onBeforeElChildrenUpdated(el, key, componentsContext) {
    if (componentsContext && key) {
        var preserved = componentsContext.$__preservedBodies[key];
        if (preserved === true) {
            // Don't morph the children since they are preserved
            return MORPHDOM_SKIP;
        }
    }
}

function onNodeAdded(node, componentsContext) {
    eventDelegation.$__handleNodeAttach(node, componentsContext.$__out);
}

var componentProto;

/**
 * Base component type.
 *
 * NOTE: Any methods that are prefixed with an underscore should be considered private!
 */
function Component(id) {
    EventEmitter.call(this);
    this.id = id;
    this.el = null;
    this.$__state = null;
    this.$__roots = null;
    this.$__subscriptions = null;
    this.$__domEventListenerHandles = null;
    this.$__bubblingDomEvents = null;
    this.$__customEvents = null;
    this.$__scope = null;
    this.$__renderInput = null;
    this.$__input = undefined;

    this.$__destroyed = false;
    this.$__updateQueued = false;
    this.$__dirty = false;
    this.$__settingInput = false;

    this.$__document = undefined;
}

Component.prototype = componentProto = {
    $__isComponent: true,

    subscribeTo: function(target) {
        if (!target) {
            throw TypeError();
        }

        var subscriptions = this.$__subscriptions || (this.$__subscriptions = new SubscriptionTracker());

        var subscribeToOptions = target.$__isComponent ?
            COMPONENT_SUBSCRIBE_TO_OPTIONS :
            NON_COMPONENT_SUBSCRIBE_TO_OPTIONS;

        return subscriptions.subscribeTo(target, subscribeToOptions);
    },

    emit: function(eventType) {
        var customEvents = this.$__customEvents;
        var target;

        if (customEvents && (target = customEvents[eventType])) {
            var targetMethodName = target[0];
            var extraArgs = target[1];
            var args = slice.call(arguments, 1);

            handleCustomEventWithMethodListener(this, targetMethodName, args, extraArgs);
        }

        if (this.listenerCount(eventType)) {
            return emit.apply(this, arguments);
        }
    },
    getElId: function (componentElId, index) {
        return getElIdHelper(this, componentElId, index);
    },
    getEl: function (componentElId, index) {
        var doc = this.$__document;

        if (componentElId != null) {
            return getElementById(doc, getElIdHelper(this, componentElId, index));
        } else {
            return this.el || getElementById(doc, getElIdHelper(this));
        }
    },
    getEls: function(id) {
        var els = [];
        var i = 0;
        var el;
        while((el = this.getEl(id, i))) {
            els.push(el);
            i++;
        }
        return els;
    },
    getComponent: function(id, index) {
        return componentLookup[getElIdHelper(this, id, index)];
    },
    getComponents: function(id) {
        var components = [];
        var i = 0;
        var component;
        while((component = componentLookup[getElIdHelper(this, id, i)])) {
            components.push(component);
            i++;
        }
        return components;
    },
    destroy: function() {
        if (this.$__destroyed) {
            return;
        }

        var els = this.els;

        this.$__destroyShallow();

        var rootComponents = this.$__rootComponents;
        if (rootComponents) {
            rootComponents.forEach(function(rootComponent) {
                rootComponent.$__destroy();
            });
        }

        els.forEach(function(el) {
            destroyElRecursive(el);

            var parentNode = el.parentNode;
            if (parentNode) {
                parentNode.removeChild(el);
            }
        });
    },

    $__destroyShallow: function() {
        if (this.$__destroyed) {
            return;
        }

        emitLifecycleEvent(this, 'destroy');
        this.$__destroyed = true;

        this.el = null;

        // Unsubscribe from all DOM events
        this.$__removeDOMEventListeners();

        var subscriptions = this.$__subscriptions;
        if (subscriptions) {
            subscriptions.removeAllListeners();
            this.$__subscriptions = null;
        }

        delete componentLookup[this.id];
    },

    isDestroyed: function() {
        return this.$__destroyed;
    },
    get state() {
        return this.$__state;
    },
    set state(newState) {
        var state = this.$__state;
        if (!state && !newState) {
            return;
        }

        if (!state) {
            state = this.$__state = new this.$__State(this);
        }

        state.$__replace(newState || {});

        if (state.$__dirty) {
            this.$__queueUpdate();
        }

        if (!newState) {
            this.$__state = null;
        }
    },
    setState: function(name, value) {
        var state = this.$__state;

        if (typeof name == 'object') {
            // Merge in the new state with the old state
            var newState = name;
            for (var k in newState) {
                if (newState.hasOwnProperty(k)) {
                    state.$__set(k, newState[k], true /* ensure:true */);
                }
            }
        } else {
            state.$__set(name, value, true /* ensure:true */);
        }
    },

    setStateDirty: function(name, value) {
        var state = this.$__state;

        if (arguments.length == 1) {
            value = state[name];
        }

        state.$__set(name, value, true /* ensure:true */, true /* forceDirty:true */);
    },

    replaceState: function(newState) {
        this.$__state.$__replace(newState);
    },

    get input() {
        return this.$__input;
    },
    set input(newInput) {
        if (this.$__settingInput) {
            this.$__input = newInput;
        } else {
            this.$__setInput(newInput);
        }
    },

    $__setInput: function(newInput, onInput, out) {
        onInput = onInput || this.onInput;
        var updatedInput;

        var oldInput = this.$__input;
        this.$__input = undefined;

        if (onInput) {
            // We need to set a flag to preview `this.input = foo` inside
            // onInput causing infinite recursion
            this.$__settingInput = true;
            updatedInput = onInput.call(this, newInput || {}, out);
            this.$__settingInput = false;
        }

        newInput = this.$__renderInput = updatedInput || newInput;

        if ((this.$__dirty = checkInputChanged(this, oldInput, newInput))) {
            this.$__queueUpdate();
        }

        if (this.$__input === undefined) {
            this.$__input = newInput;
        }

        return newInput;
    },

    forceUpdate: function() {
        this.$__dirty = true;
        this.$__queueUpdate();
    },

    $__queueUpdate: function() {
        if (!this.$__updateQueued) {
            updateManager.$__queueComponentUpdate(this);
        }
    },

    update: function() {
        if (this.$__destroyed === true || this.$__isDirty === false) {
            return;
        }

        var input = this.$__input;
        var state = this.$__state;

        if (this.$__dirty === false && state !== null && state.$__dirty === true) {
            if (processUpdateHandlers(this, state.$__changes, state.$__old, state)) {
                state.$__dirty = false;
            }
        }

        if (this.$__isDirty === true) {
            // The UI component is still dirty after process state handlers
            // then we should rerender

            if (this.shouldUpdate(input, state) !== false) {
                this.$__rerender();
            }
        }

        this.$__reset();
    },


    get $__isDirty() {
        return this.$__dirty === true || (this.$__state !== null && this.$__state.$__dirty === true);
    },

    $__reset: function() {
        this.$__dirty = false;
        this.$__updateQueued = false;
        this.$__renderInput = null;
        var state = this.$__state;
        if (state) {
            state.$__reset();
        }
    },

    shouldUpdate: function(newState, newProps) {
        return true;
    },

    $__emitLifecycleEvent: function(eventType, eventArg1, eventArg2) {
        emitLifecycleEvent(this, eventType, eventArg1, eventArg2);
    },

    $__rerender: function(input) {
        if (input) {
            this.input = input;
        }

        var self = this;
        var renderer = self.$__renderer;

        if (!renderer) {
            throw TypeError();
        }

        var globalData = {
            $w: self
        };

        var fromEls = self.$__getRootEls({});
        var doc = self.$__document;
        input = this.$__renderInput || this.$__input;

        updateManager.$__batchUpdate(function() {
            var createOut = renderer.createOut || marko.createOut;
            var out = createOut(globalData);
            out.sync();
            out.$__document = self.$__document;
            renderer(input, out);
            var result = new RenderResult(out);
            var targetNode = out.$__getOutput();

            var componentsContext = out.global.components;

            var fromEl;

            var targetEl = targetNode.firstChild;
            while(targetEl) {
                var id = targetEl.id;

                if (id) {
                    fromEl = fromEls[id];
                    if (fromEl) {
                        morphdom(
                            fromEl,
                            targetEl,
                            componentsContext,
                            onNodeAdded,
                            onBeforeElUpdated,
                            onBeforeNodeDiscarded,
                            onNodeDiscarded,
                            onBeforeElChildrenUpdated);
                    }
                }

                targetEl = targetEl.nextSibling;
            }

            result.afterInsert(doc);

            out.emit('$__componentsInitialized');
        });

        this.$__reset();
    },

    $__getRootEls: function(rootEls) {
        var i, len;

        var componentEls = this.els;

        for (i=0, len=componentEls.length; i<len; i++) {
            var componentEl = componentEls[i];
            rootEls[componentEl.id] = componentEl;
        }

        var rootComponents = this.$__rootComponents;
        if (rootComponents) {
            for (i=0, len=rootComponents.length; i<len; i++) {
                var rootComponent = rootComponents[i];
                rootComponent.$__getRootEls(rootEls);
            }
        }

        return rootEls;
    },

    $__removeDOMEventListeners: function() {
        var eventListenerHandles = this.$__domEventListenerHandles;
        if (eventListenerHandles) {
            eventListenerHandles.forEach(removeListener);
            this.$__domEventListenerHandles = null;
        }
    },

    get $__rawState() {
        var state = this.$__state;
        return state && state.$__raw;
    },

    $__setCustomEvents: function(customEvents, scope) {
        var finalCustomEvents = this.$__customEvents = {};
        this.$__scope = scope;

        customEvents.forEach(function(customEvent) {
            var eventType = customEvent[0];
            var targetMethodName = customEvent[1];
            var extraArgs = customEvent[2];

            finalCustomEvents[eventType] = [targetMethodName, extraArgs];
        });
    }
};

componentProto.elId = componentProto.getElId;
componentProto.$__update = componentProto.update;
componentProto.$__destroy = componentProto.destroy;

// Add all of the following DOM methods to Component.prototype:
// - appendTo(referenceEl)
// - replace(referenceEl)
// - replaceChildrenOf(referenceEl)
// - insertBefore(referenceEl)
// - insertAfter(referenceEl)
// - prependTo(referenceEl)
domInsert(
    componentProto,
    function getEl(component) {
        var els = this.els;
        var elCount = els.length;
        if (elCount > 1) {
            var fragment = component.$__document.createDocumentFragment();
            els.forEach(function(el) {
                fragment.appendChild(el);
            });
            return fragment;
        } else {
            return els[0];
        }
    },
    function afterInsert(component) {
        return component;
    });

inherit(Component, EventEmitter);

module.exports = Component;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nextRepeatedId = __webpack_require__(17);
var repeatedRegExp = /\[\]$/;
var componentUtil = __webpack_require__(0);
var nextComponentId = componentUtil.$__nextComponentId;
var attachBubblingEvent = componentUtil.$__attachBubblingEvent;

var extend = __webpack_require__(1);
var registry = __webpack_require__(5);

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
    if (customEvents) {
        component.$__setCustomEvents(customEvents, scope);
    }

    return {
        $__component: component,
        $__roots: extra.r,
        $__domEvents: extra.d
    };
};

module.exports = ComponentDef;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* jshint newcap:false */

var BaseState = __webpack_require__(32);
var BaseComponent = __webpack_require__(12);
var inherit = __webpack_require__(2);

module.exports = function defineComponent(def, renderer) {
    if (def.$__isComponent) {
        return def;
    }

    var ComponentClass;
    var proto;

    var type = typeof def;

    if (type == 'function') {
        ComponentClass = def;
        proto = ComponentClass.prototype;
    } else if (type == 'object') {
        ComponentClass = function() {};
        proto = ComponentClass.prototype = def;
    } else {
        throw TypeError();
    }

    // We don't use the constructor provided by the user
    // since we don't invoke their constructor until
    // we have had a chance to do our own initialization.
    // Instead, we store their constructor in the "initComponent"
    // property and that method gets called later inside
    // init-components-browser.js
    function Component(id) {
        BaseComponent.call(this, id);
    }

    if (!proto.$__isComponent) {
        // Inherit from Component if they didn't already
        inherit(ComponentClass, BaseComponent);
    }

    // The same prototype will be used by our constructor after
    // we he have set up the prototype chain using the inherit function
    proto = Component.prototype = ComponentClass.prototype;

    // proto.constructor = def.constructor = Component;

    // Set a flag on the constructor function to make it clear this is
    // a component so that we can short-circuit this work later
    Component.$__isComponent = true;

    function State(component) { BaseState.call(this, component); }
    inherit(State, BaseState);
    proto.$__State = State;
    proto.$__renderer = renderer;

    return Component;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var componentsUtil = __webpack_require__(0);
var runtimeId = componentsUtil.$__runtimeId;
var componentLookup = componentsUtil.$__componentLookup;
var getMarkoPropsFromEl = componentsUtil.$__getMarkoPropsFromEl;

var isArray = Array.isArray;

// We make our best effort to allow multiple marko runtimes to be loaded in the
// same window. Each marko runtime will get its own unique runtime ID.
var listenersAttachedKey = '$MED' + runtimeId;

function getEventFromEl(el, eventName) {
    var virtualProps = getMarkoPropsFromEl(el);
    var eventInfo = virtualProps[eventName];
    if (typeof eventInfo === 'string') {
        eventInfo = eventInfo.split(' ');
        if (eventInfo.length == 3) {
            eventInfo[2] = parseInt(eventInfo[2], 10);
        }
    }

    return eventInfo;
}

function delegateEvent(node, target, event) {
    var targetMethod = target[0];
    var targetComponentId = target[1];
    var extraArgs = target[2];

    var targetComponent = componentLookup[targetComponentId];

    if (!targetComponent) {
        return;
    }

    var targetFunc = targetComponent[targetMethod];
    if (!targetFunc) {
        throw Error('Method not found: ' + targetMethod);
    }

    if (extraArgs != null) {
        if (typeof extraArgs === 'number') {
            extraArgs = targetComponent.$__bubblingDomEvents[extraArgs];
            if (!isArray(extraArgs)) {
                extraArgs = [extraArgs];
            }
        }
    }

    // Invoke the component method
    if (extraArgs) {
        targetFunc.apply(targetComponent, extraArgs.concat(event, node));
    } else {
        targetFunc.call(targetComponent, event, node);
    }
}

function attachBubbleEventListeners(doc) {
    var body = doc.body;
    // Here's where we handle event delegation using our own mechanism
    // for delegating events. For each event that we have white-listed
    // as supporting bubble, we will attach a listener to the root
    // document.body element. When we get notified of a triggered event,
    // we again walk up the tree starting at the target associated
    // with the event to find any mappings for event. Each mapping
    // is from a DOM event type to a method of a component.
    __webpack_require__(33).forEach(function addBubbleHandler(eventType) {
        body.addEventListener(eventType, function(event) {
            var propagationStopped = false;

            // Monkey-patch to fix #97
            var oldStopPropagation = event.stopPropagation;

            event.stopPropagation = function() {
                oldStopPropagation.call(event);
                propagationStopped = true;
            };

            var curNode = event.target;
            if (!curNode) {
                return;
            }

            // Search up the tree looking DOM events mapped to target
            // component methods
            var propName = 'on' + eventType;
            var target;

            // Attributes will have the following form:
            // on<event_type>("<target_method>|<component_id>")

            do {
                if ((target = getEventFromEl(curNode, propName))) {
                    delegateEvent(curNode, target, event);

                    if (propagationStopped) {
                        break;
                    }
                }
            } while((curNode = curNode.parentNode) && curNode.getAttribute);
        });
    });
}

function noop() {}

exports.$__handleNodeAttach = noop;
exports.$__handleNodeDetach = noop;
exports.$__delegateEvent = delegateEvent;
exports.$__getEventFromEl = getEventFromEl;

exports.$__init = function(doc) {
    if (!doc[listenersAttachedKey]) {
        doc[listenersAttachedKey] = true;
        attachBubbleEventListeners(doc);
    }
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var warp10Finalize = __webpack_require__(51);
var eventDelegation = __webpack_require__(15);
var win = window;
var defaultDocument = document;
var events = __webpack_require__(7);
var componentsUtil = __webpack_require__(0);
var componentLookup = componentsUtil.$__componentLookup;
var getElementById = componentsUtil.$__getElementById;
var ComponentDef = __webpack_require__(13);
// var extend = require('raptor-util/extend');
// var registry = require('./registry');

function invokeComponentEventHandler(component, targetMethodName, args) {
    var method = component[targetMethodName];
    if (!method) {
        throw Error('Method not found: ' + targetMethodName);
    }

    method.apply(component, args);
}

function addEventListenerHelper(el, eventType, listener) {
    el.addEventListener(eventType, listener, false);
    return function remove() {
        el.removeEventListener(eventType, listener);
    };
}

function addDOMEventListeners(component, el, eventType, targetMethodName, extraArgs, handles) {
    var removeListener = addEventListenerHelper(el, eventType, function(event) {
        var args = [event, el];
        if (extraArgs) {
            args = extraArgs.concat(args);
        }

        invokeComponentEventHandler(component, targetMethodName, args);
    });
    handles.push(removeListener);
}

function initComponent(componentDef, doc) {
    var component = componentDef.$__component;

    if (!component || !component.$__isComponent) {
        return; // legacy
    }

    var domEvents = componentDef.$__domEvents;

    component.$__reset();
    component.$__document = doc;

    var isExisting = componentDef.$__isExisting;
    var id = component.id;

    var rootIds = componentDef.$__roots;

    if (rootIds) {
        var rootComponents;

        var els = [];

        rootIds.forEach(function(rootId) {
            var nestedId = id + '-' + rootId;
            var rootComponent = componentLookup[nestedId];
            if (rootComponent) {
                rootComponent.$__rootFor = component;
                if (rootComponents) {
                    rootComponents.push(rootComponent);
                } else {
                    rootComponents = component.$__rootComponents = [rootComponent];
                }
            } else {
                var rootEl = getElementById(doc, nestedId);
                if (rootEl) {
                    rootEl._w = component;
                    els.push(rootEl);
                }
            }
        });

        component.el = els[0];
        component.els = els;
        componentLookup[id] = component;
    } else if (!isExisting) {
        var el = getElementById(doc, id);
        el._w = component;
        component.el = el;
        component.els = [el];
        componentLookup[id] = component;
    }

    if (isExisting) {
        component.$__removeDOMEventListeners();
    }

    if (domEvents) {
        var eventListenerHandles = [];

        domEvents.forEach(function(domEventArgs) {
            // The event mapping is for a direct DOM event (not a custom event and not for bubblign dom events)

            var eventType = domEventArgs[0];
            var targetMethodName = domEventArgs[1];
            var eventEl = getElementById(doc, domEventArgs[2]);
            var extraArgs = domEventArgs[3];

            addDOMEventListeners(component, eventEl, eventType, targetMethodName, extraArgs, eventListenerHandles);
        });

        if (eventListenerHandles.length) {
            component.$__domEventListenerHandles = eventListenerHandles;
        }
    }

    if (isExisting) {
        component.$__emitLifecycleEvent('update');
    } else {
        events.emit('mountComponent', component);
        component.$__emitLifecycleEvent('mount');
    }
}

/**
 * This method is used to initialized components associated with UI components
 * rendered in the browser. While rendering UI components a "components context"
 * is added to the rendering context to keep up with which components are rendered.
 * When ready, the components can then be initialized by walking the component tree
 * in the components context (nested components are initialized before ancestor components).
 * @param  {Array<marko-components/lib/ComponentDef>} componentDefs An array of ComponentDef instances
 */
function initClientRendered(componentDefs, doc) {
    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    eventDelegation.$__init(doc);

    doc = doc || defaultDocument;
    for (var i=0,len=componentDefs.length; i<len; i++) {
        var componentDef = componentDefs[i];

        if (componentDef.$__children) {
            initClientRendered(componentDef.$__children, doc);
        }

        initComponent(
            componentDef,
            doc);
    }
}

/**
 * This method initializes all components that were rendered on the server by iterating over all
 * of the component IDs.
 */
function initServerRendered(renderedComponents, doc) {
    if (!renderedComponents) {
        renderedComponents = win.$components;

        if (renderedComponents) {
            if (renderedComponents.forEach) {
                renderedComponents.forEach(function(renderedComponent) {
                    initServerRendered(renderedComponent, doc);
                });
            }
        } else {
            win.$components = {
                concat: initServerRendered
            };
        }
        return;
    }
    // Ensure that event handlers to handle delegating events are
    // always attached before initializing any components
    eventDelegation.$__init(doc || defaultDocument);

    renderedComponents = warp10Finalize(renderedComponents);

    var componentDefs = renderedComponents.w;
    var typesArray = renderedComponents.t;

    componentDefs.forEach(function(componentDef) {
        componentDef = ComponentDef.$__deserialize(componentDef, typesArray);
        initComponent(componentDef, doc || defaultDocument);
    });
}

exports.$__initClientRendered = initClientRendered;
exports.$__initServerRendered = initServerRendered;

/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

module.exports = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value != toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!toEl.$__hasAttribute('value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value != newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!toEl.$__hasAttribute('multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                if (curChild.$__nodeName == 'OPTION') {
                    if (curChild.$__hasAttribute('selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var domInsert = __webpack_require__(20);
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(1);
var componentsUtil = __webpack_require__(0);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(3);
var inherit = __webpack_require__(2);

var NS_XLINK = 'http://www.w3.org/1999/xlink';
var ATTR_XLINK_HREF = 'xlink:href';
var toString = String;

var FLAG_IS_SVG = 1;
var FLAG_IS_TEXTAREA = 2;
var FLAG_SIMPLE_ATTRS = 4;

var defineProperty = Object.defineProperty;

var ATTR_HREF = 'href';
var EMPTY_OBJECT = Object.freeze({});

function convertAttrValue(type, value) {
    if (value === true) {
        return '';
    } else if (type == 'object') {
        return JSON.stringify(value);
    } else {
        return toString(value);
    }
}

function setAttribute(el, namespaceURI, name, value) {
    if (namespaceURI === null) {
        el.setAttribute(name, value);
    } else {
        el.setAttributeNS(namespaceURI, name, value);
    }
}

function removeAttribute(el, namespaceURI, name) {
    if (namespaceURI === null) {
        el.removeAttribute(name);
    } else {
        el.removeAttributeNS(namespaceURI, name);
    }
}

function VElementClone(other) {
    this.$__firstChild = other.$__firstChild;
    this.$__parentNode = null;
    this.$__nextSibling = null;

    this.$__attributes = other.$__attributes;
    this.$__properties = other.$__properties;
    this.$__namespaceURI = other.$__namespaceURI;
    this.$__nodeName = other.$__nodeName;
    this.$__flags = other.$__flags;
    this.$__value = other.$__value;
    this.$__constId = other.$__constId;
}

function VElement(tagName, attrs, childCount, flags, props) {
    this.$__VNode(childCount);

    var constId;

    if (props) {
        constId = props.c;
    }

    var namespaceURI;

    if ((this.$__flags = flags || 0)) {
        if (flags & FLAG_IS_SVG) {
            namespaceURI = 'http://www.w3.org/2000/svg';
        }
    }

    this.$__attributes = attrs || EMPTY_OBJECT;
    this.$__properties = props || EMPTY_OBJECT;
    this.$__namespaceURI = namespaceURI;
    this.$__nodeName = tagName;
    this.$__value = null;
    this.$__constId = constId;
}

VElement.prototype = {
    $__VElement: true,

    $__nodeType: 1,

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
    e: function(tagName, attrs, childCount, flags, props) {
        var child = this.$__appendChild(new VElement(tagName, attrs, childCount, flags, props));

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
        var tagName = this.$__nodeName;

        var attributes = this.$__attributes;
        var flags = this.$__flags;

        var el = namespaceURI !== undefined ?
            doc.createElementNS(namespaceURI, tagName) :
            doc.createElement(tagName);

        for (var attrName in attributes) {
            var attrValue = attributes[attrName];

            if (attrValue !== false && attrValue != null) {
                var type = typeof attrValue;

                if (type !== 'string') {
                    // Special attributes aren't copied to the real DOM. They are only
                    // kept in the virtual attributes map
                    attrValue = convertAttrValue(type, attrValue);
                }

                if (attrName == ATTR_XLINK_HREF) {
                    setAttribute(el, NS_XLINK, ATTR_HREF, attrValue);
                } else {
                    el.setAttribute(attrName, attrValue);
                }
            }
        }

        if (flags & FLAG_IS_TEXTAREA) {
            el.value = this.$__value;
        }

        el._vattrs = attributes;
        el._vprops = this.$__properties;
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

    var attrs = toEl.$__attributes;
    var props = toEl.$__properties;

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
            oldAttrs = removePreservedAttributes(oldAttrs, props, true);
        }
    } else {
        // We need to build the attribute map from the real attributes
        oldAttrs = {};

        var oldAttributesList = fromEl.attributes;
        for (i = oldAttributesList.length - 1; i >= 0; --i) {
            var attr = oldAttributesList[i];

            if (attr.specified !== false) {
                attrName = attr.name;
                if (attrName !== 'data-marko') {
                    var attrNamespaceURI = attr.namespaceURI;
                    if (attrNamespaceURI === NS_XLINK) {
                        oldAttrs[ATTR_XLINK_HREF] = attr.value;
                    } else {
                        oldAttrs[attrName] = attr.value;
                    }
                }
            }
        }

        // We don't want preserved attributes to show up in either the old
        // or new attribute map.
        removePreservedAttributes(oldAttrs, props, false);
    }

    fromEl._vattrs = attrs;
    fromEl._vprops = props;

    var attrValue;

    var flags = toEl.$__flags;
    var oldFlags;

    if (flags & FLAG_SIMPLE_ATTRS && ((oldFlags = fromEl._vflags) & FLAG_SIMPLE_ATTRS)) {
        if (oldAttrs['class'] !== (attrValue = attrs['class'])) {
            fromEl.className = attrValue;
        }
        if (oldAttrs.id !== (attrValue = attrs.id)) {
            fromEl.id = attrValue;
        }
        if (oldAttrs.style !== (attrValue = attrs.style)) {
            fromEl.style.cssText = attrValue;
        }
        return;
    }

    // In some cases we only want to set an attribute value for the first
    // render or we don't want certain attributes to be touched. To support
    // that use case we delete out all of the preserved attributes
    // so it's as if they never existed.
    attrs = removePreservedAttributes(attrs, props, true);

    var namespaceURI;

    // Loop over all of the attributes in the attribute map and compare
    // them to the value in the old map. However, if the value is
    // null/undefined/false then we want to remove the attribute
    for (attrName in attrs) {
        attrValue = attrs[attrName];
        namespaceURI = null;

        if (attrName === ATTR_XLINK_HREF) {
            namespaceURI = NS_XLINK;
            attrName = ATTR_HREF;
        }

        if (attrValue == null || attrValue === false) {
            removeAttribute(fromEl, namespaceURI, attrName);
        } else if (oldAttrs[attrName] !== attrValue) {
            var type = typeof attrValue;

            if (type !== 'string') {
                attrValue = convertAttrValue(type, attrValue);
            }

            setAttribute(fromEl, namespaceURI, attrName, attrValue);
        }
    }

    // If there are any old attributes that are not in the new set of attributes
    // then we need to remove those attributes from the target node
    for (attrName in oldAttrs) {
        if (!(attrName in attrs)) {
            if (attrName === ATTR_XLINK_HREF) {
                fromEl.removeAttributeNS(ATTR_XLINK_HREF, ATTR_HREF);
            } else {
                fromEl.removeAttribute(attrName);
            }
        }
    }
};

module.exports = VElement;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var vdom = __webpack_require__(23);
var VElement = vdom.$__VElement;
var VText = vdom.$__VText;

var commonHelpers = __webpack_require__(39);
var extend = __webpack_require__(1);

var classList = commonHelpers.cl;

exports.e = function(tagName, attrs, childCount, flags, props) {
    return new VElement(tagName, attrs, childCount, flags, props);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(3);
var VComment = __webpack_require__(44);
var VDocumentFragment = __webpack_require__(45);
var VElement = __webpack_require__(21);
var VText = __webpack_require__(46);

var FLAG_IS_TEXTAREA = 2;
var defaultDocument = typeof document != 'undefined' && document;
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
            if (node.namespaceURI !== 'http://www.w3.org/1999/xhtml') {
                vdomEl.$__namespaceURI = node.namespaceURI;
            }

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
/* 24 */
/***/ (function(module, exports) {

module.exports = function copyProps(from, to) {
    Object.getOwnPropertyNames(from).forEach(function(name) {
        var descriptor = Object.getOwnPropertyDescriptor(from, name);
        Object.defineProperty(to, name, descriptor);
    });
};

/***/ }),
/* 25 */
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
	fixUrls = __webpack_require__(48);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Compiled using marko@4.2.0 - DO NOT EDIT


var marko_template = module.exports = __webpack_require__(8).t(),
    electron_header_template = __webpack_require__(30),
    marko_helpers = __webpack_require__(22),
    marko_loadTag = marko_helpers.t,
    electron_header_tag = marko_loadTag(electron_header_template),
    electron_grid_template = __webpack_require__(11),
    electron_grid_tag = marko_loadTag(electron_grid_template);

function render(input, out) {
  var data = input;

  electron_header_tag({}, out);

  electron_grid_tag({}, out);
}

marko_template._ = render;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, ".cell {\n  flex: 30%;\n  height: 150px;\n  background-color: blue;\n  /*margin-bottom: 5px;*/\n  color: white;\n  font-size: 20px;\n  text-align: center;\n  cursor: pointer;\n  font-style: fantasy;\n}\n\n.cell:nth-child(2) {\n  background-color: red;\n}\n\n.cell:nth-child(3) {\n  background-color: green;\n}\n\n.cell:nth-child(4) {\n  background-color: purple;\n}\n\n.cell:nth-child(5) {\n  background-color: yellow;\n  color: black;\n}\n\n.cell:nth-child(6) {\n  background-color: brown;\n}\n\n.cell:nth-child(7) {\n  background-color: beige;\n  color: black;\n}\n\n.cell:nth-child(8) {\n  background-color: darkgrey;\n}\n\n.cell:nth-child(9) {\n  background-color: pink;\n}\n\n.grid {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, ".header {\n  text-align: center;\n  font-size: 36px;\n  color: white;\n  text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;\n}\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var INDEX_EVENT = 0;
var INDEX_USER_LISTENER = 1;
var INDEX_WRAPPED_LISTENER = 2;
var DESTROY = "destroy";

function isNonEventEmitter(target) {
  return !target.once;
}

function EventEmitterWrapper(target) {
    this.$__target = target;
    this.$__listeners = [];
    this.$__subscribeTo = null;
}

EventEmitterWrapper.prototype = {
    $__remove: function(test, testWrapped) {
        var target = this.$__target;
        var listeners = this.$__listeners;

        this.$__listeners = listeners.filter(function(curListener) {
            var curEvent = curListener[INDEX_EVENT];
            var curListenerFunc = curListener[INDEX_USER_LISTENER];
            var curWrappedListenerFunc = curListener[INDEX_WRAPPED_LISTENER];

            if (testWrapped) {
                // If the user used `once` to attach an event listener then we had to
                // wrap their listener function with a new function that does some extra
                // cleanup to avoid a memory leak. If the `testWrapped` flag is set to true
                // then we are attempting to remove based on a function that we had to
                // wrap (not the user listener function)
                if (curWrappedListenerFunc && test(curEvent, curWrappedListenerFunc)) {
                    target.removeListener(curEvent, curWrappedListenerFunc);

                    return false;
                }
            } else if (test(curEvent, curListenerFunc)) {
                // If the listener function was wrapped due to it being a `once` listener
                // then we should remove from the target EventEmitter using wrapped
                // listener function. Otherwise, we remove the listener using the user-provided
                // listener function.
                target.removeListener(curEvent, curWrappedListenerFunc || curListenerFunc);

                return false;
            }

            return true;
        });

        // Fixes https://github.com/raptorjs/listener-tracker/issues/2
        // If all of the listeners stored with a wrapped EventEmitter
        // have been removed then we should unregister the wrapped
        // EventEmitter in the parent SubscriptionTracker
        var subscribeTo = this.$__subscribeTo;

        if (!this.$__listeners.length && subscribeTo) {
            var self = this;
            var subscribeToList = subscribeTo.$__subscribeToList;
            subscribeTo.$__subscribeToList = subscribeToList.filter(function(cur) {
                return cur !== self;
            });
        }
    },

    on: function(event, listener) {
        this.$__target.on(event, listener);
        this.$__listeners.push([event, listener]);
        return this;
    },

    once: function(event, listener) {
        var self = this;

        // Handling a `once` event listener is a little tricky since we need to also
        // do our own cleanup if the `once` event is emitted. Therefore, we need
        // to wrap the user's listener function with our own listener function.
        var wrappedListener = function() {
            self.$__remove(function(event, listenerFunc) {
                return wrappedListener === listenerFunc;
            }, true /* We are removing the wrapped listener */);

            listener.apply(this, arguments);
        };

        this.$__target.once(event, wrappedListener);
        this.$__listeners.push([event, listener, wrappedListener]);
        return this;
    },

    removeListener: function(event, listener) {
        if (typeof event === 'function') {
            listener = event;
            event = null;
        }

        if (listener && event) {
            this.$__remove(function(curEvent, curListener) {
                return event === curEvent && listener === curListener;
            });
        } else if (listener) {
            this.$__remove(function(curEvent, curListener) {
                return listener === curListener;
            });
        } else if (event) {
            this.removeAllListeners(event);
        }

        return this;
    },

    removeAllListeners: function(event) {

        var listeners = this.$__listeners;
        var target = this.$__target;

        if (event) {
            this.$__remove(function(curEvent, curListener) {
                return event === curEvent;
            });
        } else {
            for (var i = listeners.length - 1; i >= 0; i--) {
                var cur = listeners[i];
                target.removeListener(cur[INDEX_EVENT], cur[INDEX_USER_LISTENER]);
            }
            this.$__listeners.length = 0;
        }

        return this;
    }
};

function EventEmitterAdapter(target) {
    this.$__target = target;
}

EventEmitterAdapter.prototype = {
    on: function(event, listener) {
        this.$__target.addEventListener(event, listener);
        return this;
    },

    once: function(event, listener) {
        var self = this;

        // need to save this so we can remove it below
        var onceListener = function() {
          self.$__target.removeEventListener(event, onceListener);
          listener();
        };
        this.$__target.addEventListener(event, onceListener);
        return this;
    },

    removeListener: function(event, listener) {
        this.$__target.removeEventListener(event, listener);
        return this;
    }
};

function SubscriptionTracker() {
    this.$__subscribeToList = [];
}

SubscriptionTracker.prototype = {

    subscribeTo: function(target, options) {
        var addDestroyListener = !options || options.addDestroyListener !== false;
        var wrapper;
        var nonEE;
        var subscribeToList = this.$__subscribeToList;

        for (var i=0, len=subscribeToList.length; i<len; i++) {
            var cur = subscribeToList[i];
            if (cur.$__target === target) {
                wrapper = cur;
                break;
            }
        }

        if (!wrapper) {
            if (isNonEventEmitter(target)) {
              nonEE = new EventEmitterAdapter(target);
            }

            wrapper = new EventEmitterWrapper(nonEE || target);
            if (addDestroyListener && !nonEE) {
                wrapper.once(DESTROY, function() {
                    wrapper.removeAllListeners();

                    for (var i = subscribeToList.length - 1; i >= 0; i--) {
                        if (subscribeToList[i].$__target === target) {
                            subscribeToList.splice(i, 1);
                            break;
                        }
                    }
                });
            }

            // Store a reference to the parent SubscriptionTracker so that we can do cleanup
            // if the EventEmitterWrapper instance becomes empty (i.e., no active listeners)
            wrapper.$__subscribeTo = this;
            subscribeToList.push(wrapper);
        }

        return wrapper;
    },

    removeAllListeners: function(target, event) {
        var subscribeToList = this.$__subscribeToList;
        var i;

        if (target) {
            for (i = subscribeToList.length - 1; i >= 0; i--) {
                var cur = subscribeToList[i];
                if (cur.$__target === target) {
                    cur.removeAllListeners(event);

                    if (!cur.$__listeners.length) {
                        // Do some cleanup if we removed all
                        // listeners for the target event emitter
                        subscribeToList.splice(i, 1);
                    }

                    break;
                }
            }
        } else {
            for (i = subscribeToList.length - 1; i >= 0; i--) {
                subscribeToList[i].removeAllListeners();
            }
            subscribeToList.length = 0;
        }
    }
};

exports = module.exports = SubscriptionTracker;

exports.wrap = function(targetEventEmitter) {
    var nonEE;
    var wrapper;

    if (isNonEventEmitter(targetEventEmitter)) {
      nonEE = new EventEmitterAdapter(targetEventEmitter);
    }

    wrapper = new EventEmitterWrapper(nonEE || targetEventEmitter);
    if (!nonEE) {
      // we don't set this for non EE types
      targetEventEmitter.once(DESTROY, function() {
          wrapper.$__listeners.length = 0;
      });
    }

    return wrapper;
};

exports.createTracker = function() {
    return new SubscriptionTracker();
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
// Compiled using marko@4.2.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = __webpack_require__(8).t(),
    marko_helpers = __webpack_require__(22),
    marko_createElement = marko_helpers.e,
    marko_const = marko_helpers.const,
    marko_const_nextId = marko_const("ae6269"),
    marko_node0 = marko_createElement("H1", {
        "class": "header"
      }, 1, 0, {
        c: marko_const_nextId()
      })
      .t("What do you want to do to distract yourself?");

function render(input, out) {
  var data = input;

  out.n(marko_node0);
}

marko_template._ = render;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ComponentDef = __webpack_require__(13);
var initComponents = __webpack_require__(16);
var EMPTY_OBJECT = {};

function ComponentsContext(out, root) {
    if (!root) {
        root = new ComponentDef(null, null, out);
    }

    this.$__out = out;
    this.$__componentStack = [root];
    this.$__preserved = EMPTY_OBJECT;
    this.$__preservedBodies = EMPTY_OBJECT;
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
        var preserved = bodyOnly === true ? this.$__preservedBodies : this.$__preserved;
        if (preserved === EMPTY_OBJECT) {
            if (bodyOnly === true) {
                preserved = this.$__preservedBodies = {};
            } else {
                preserved = this.$__preserved = {};
            }
        }
        preserved[elId] = true;
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var extend = __webpack_require__(1);

function ensure(state, propertyName) {
    var proto = state.constructor.prototype;
    if (!(propertyName in proto)) {
        Object.defineProperty(proto, propertyName, {
            get: function() {
                return this.$__raw[propertyName];
            },
            set: function(value) {
                this.$__set(propertyName, value, false /* ensure:false */);
            }
        });
    }
}

function State(component) {
    this.$__component = component;
    this.$__raw = {};

    this.$__dirty = false;
    this.$__old = null;
    this.$__changes = null;
    this.$__forced = null; // An object that we use to keep tracking of state properties that were forced to be dirty

    Object.seal(this);
}

State.prototype = {
    $__reset: function() {
        var self = this;

        self.$__dirty = false;
        self.$__old = null;
        self.$__changes = null;
        self.$__forced = null;
    },

    $__replace: function(newState) {
        var state = this;
        var key;

        var rawState = this.$__raw;

        for (key in rawState) {
            if (!(key in newState)) {
                state.$__set(key, undefined, false /* ensure:false */, false /* forceDirty:false */);
            }
        }

        for (key in newState) {
            state.$__set(key, newState[key], true /* ensure:true */, false /* forceDirty:false */);
        }
    },
    $__set: function(name, value, shouldEnsure, forceDirty) {
        var rawState = this.$__raw;

        if (shouldEnsure) {
            ensure(this, name);
        }

        if (forceDirty) {
            var forcedDirtyState = this.$__forced || (this.$__forced = {});
            forcedDirtyState[name] = true;
        } else if (rawState[name] === value) {
            return;
        }

        if (!this.$__dirty) {
            // This is the first time we are modifying the component state
            // so introduce some properties to do some tracking of
            // changes to the state
            this.$__dirty = true; // Mark the component state as dirty (i.e. modified)
            this.$__old = rawState;
            this.$__raw = rawState = extend({}, rawState);
            this.$__changes = {};
            this.$__component.$__queueUpdate();
        }

        this.$__changes[name] = value;

        if (value === undefined) {
            // Don't store state properties with an undefined or null value
            delete rawState[name];
        } else {
            // Otherwise, store the new value in the component state
            rawState[name] = value;
        }
    },
    toJSON: function() {
        return this.$__raw;
    }
};

module.exports = State;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = [
    /* Mouse Events */
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    // 'mouseover',
    // 'mousemove',
    // 'mouseout',
    'dragstart',
    'drag',
    // 'dragenter',
    // 'dragleave',
    // 'dragover',
    'drop',
    'dragend',

    /* Keyboard Events */
    'keydown',
    'keypress',
    'keyup',

    /* Form Events */
    'select',
    'change',
    'submit',
    'reset',
    'input',

    'attach', // Pseudo event supported by Marko
    'detach'  // Pseudo event supported by Marko

    // 'focus', <-- Does not bubble
    // 'blur', <-- Does not bubble
    // 'focusin', <-- Not supported in all browsers
    // 'focusout' <-- Not supported in all browsers
];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var events = __webpack_require__(7);
var Component = __webpack_require__(12);
var componentsUtil = __webpack_require__(0);

function onInitComponent(listener) {
    events.on('initComponent', listener);
}

exports.onInitComponent = onInitComponent;
exports.Component = Component;
exports.getComponentForEl = componentsUtil.$__getComponentForEl;
exports.init = __webpack_require__(16).$__initServerRendered;

exports.c = __webpack_require__(14); // Referenced by compiled templates
exports.r = __webpack_require__(36); // Referenced by compiled templates
exports.rc = __webpack_require__(5).$__register;  // Referenced by compiled templates

window.$__MARKO_COMPONENTS = exports; // Helpful when debugging... WARNING: DO NOT USE IN REAL CODE!

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function load(typeName) {
    throw new Error('Not found: ' + typeName);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var componentsUtil = __webpack_require__(0);
var componentLookup = componentsUtil.$__componentLookup;
var emitLifecycleEvent = componentsUtil.$__emitLifecycleEvent;
var nextRepeatedId = __webpack_require__(17);
var repeatedRegExp = /\[\]$/;
var ComponentsContext = __webpack_require__(31);
var registry = __webpack_require__(5);
var copyProps = __webpack_require__(24);

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

                if (customEvents !== undefined) {
                    component.$__setCustomEvents(customEvents, scope);
                }


                if (isExisting === false) {
                    emitLifecycleEvent(component, 'create', input, out);
                }

                input = component.$__setInput(input, onInput, out);

                if (isExisting === true) {
                    if (component.$__isDirty === false || component.shouldUpdate(input, component.$__state) === false) {
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var updatesScheduled = false;
var batchStack = []; // A stack of batched updates
var unbatchedQueue = []; // Used for scheduled batched updates

var win = window;
var setImmediate = win.setImmediate;

if (!setImmediate) {
    if (win.postMessage) {
        var queue = [];
        var messageName = 'si';
        win.addEventListener('message', function (event) {
            var source = event.source;
            if (source == win || !source && event.data === messageName) {
                event.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        setImmediate = function(fn) {
            queue.push(fn);
            win.postMessage(messageName, '*');
        };
    } else {
        setImmediate = setTimeout;
    }
}

/**
 * This function is called when we schedule the update of "unbatched"
 * updates to components.
 */
function updateUnbatchedComponents() {
    if (unbatchedQueue.length) {
        try {
            updateComponents(unbatchedQueue);
        } finally {
            // Reset the flag now that this scheduled batch update
            // is complete so that we can later schedule another
            // batched update if needed
            updatesScheduled = false;
        }
    }
}

function scheduleUpdates() {
    if (updatesScheduled) {
        // We have already scheduled a batched update for the
        // process.nextTick so nothing to do
        return;
    }

    updatesScheduled = true;

    setImmediate(updateUnbatchedComponents);
}

function updateComponents(queue) {
    // Loop over the components in the queue and update them.
    // NOTE: It is okay if the queue grows during the iteration
    //       since we will still get to them at the end
    for (var i=0; i<queue.length; i++) {
        var component = queue[i];
        component.$__update(); // Do the actual component update
    }

    // Clear out the queue by setting the length to zero
    queue.length = 0;
}

function batchUpdate(func) {
    // If the batched update stack is empty then this
    // is the outer batched update. After the outer
    // batched update completes we invoke the "afterUpdate"
    // event listeners.
    var batch = {
        $__queue: null
    };

    batchStack.push(batch);

    try {
        func();
    } finally {
        try {
            // Update all of the components that where queued up
            // in this batch (if any)
            if (batch.$__queue) {
                updateComponents(batch.$__queue);
            }
        } finally {
            // Now that we have completed the update of all the components
            // in this batch we need to remove it off the top of the stack
            batchStack.length--;
        }
    }
}

function queueComponentUpdate(component) {
    var batchStackLen = batchStack.length;

    if (batchStackLen) {
        // When a batch update is started we push a new batch on to a stack.
        // If the stack has a non-zero length then we know that a batch has
        // been started so we can just queue the component on the top batch. When
        // the batch is ended this component will be updated.
        var batch = batchStack[batchStackLen-1];

        // We default the batch queue to null to avoid creating an Array instance
        // unnecessarily. If it is null then we create a new Array, otherwise
        // we push it onto the existing Array queue
        if (batch.$__queue) {
            batch.$__queue.push(component);
        } else {
            batch.$__queue = [component];
        }
    } else {
        // We are not within a batched update. We need to schedule a batch update
        // for the process.nextTick (if that hasn't been done already) and we will
        // add the component to the unbatched queued
        scheduleUpdates();
        unbatchedQueue.push(component);
    }
}

exports.$__queueComponentUpdate = queueComponentUpdate;
exports.$__batchUpdate = batchUpdate;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defaultDoc = typeof document == 'undefined' ? undefined : document;
var specialElHandlers = __webpack_require__(18);

var morphAttrs = __webpack_require__(21).$__morphAttrs;

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function compareNodeNames(fromEl, toEl) {
    return fromEl.nodeName === toEl.$__nodeName;
}


function getElementById(doc, id) {
    return doc.getElementById(id);
}

function morphdom(
        fromNode,
        toNode,
        context,
        onNodeAdded,
        onBeforeElUpdated,
        onBeforeNodeDiscarded,
        onNodeDiscarded,
        onBeforeElChildrenUpdated
    ) {

    var doc = fromNode.ownerDocument || defaultDoc;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var removalList = [];
    var foundKeys = {};

    function walkDiscardedChildNodes(node) {
        onNodeDiscarded(node);
        var curChild = node.firstChild;

        while (curChild) {
            walkDiscardedChildNodes(curChild);
            curChild = curChild.nextSibling;
        }
    }


    function addVirtualNode(vEl, parentEl) {
        var realEl = vEl.$__actualize(doc);

        if (parentEl) {
            parentEl.appendChild(realEl);
        }

        onNodeAdded(realEl, context);

        var vCurChild = vEl.firstChild;
        while (vCurChild) {
            var realCurChild = null;

            var key = vCurChild.id;
            if (key) {
                var unmatchedFromEl = getElementById(doc, key);
                if (unmatchedFromEl && compareNodeNames(vCurChild, unmatchedFromEl)) {
                    morphEl(unmatchedFromEl, vCurChild, false);
                    realEl.appendChild(realCurChild = unmatchedFromEl);
                }
            }

            if (!realCurChild) {
                addVirtualNode(vCurChild, realEl);
            }

            vCurChild = vCurChild.nextSibling;
        }

        if (vEl.$__nodeType === 1) {
            var elHandler = specialElHandlers[vEl.nodeName];
            if (elHandler !== undefined) {
                elHandler(realEl, vEl);
            }
        }

        return realEl;
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = toEl.id;
        var nodeName = toEl.$__nodeName;

        if (childrenOnly === false) {
            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                foundKeys[toElKey] = true;
            }

            var constId = toEl.$__constId;
            if (constId !== undefined) {
                var otherProps = fromEl._vprops;
                if (otherProps !== undefined && constId === otherProps.c) {
                    return;
                }
            }

            if (onBeforeElUpdated(fromEl, toElKey, context) === true) {
                return;
            }

            morphAttrs(fromEl, toEl);
        }


        if (onBeforeElChildrenUpdated(fromEl, toElKey, context) === true) {
            return;
        }

        if (nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;
            var curFromNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = curToNodeChild.id;

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    curFromNodeKey = curFromNodeChild.id;

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.$__nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = getElementById(doc, curToNodeKey))) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked


                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            var curToNodeChildNextSibling = curToNodeChild.nextSibling;
                                            if (curToNodeChildNextSibling && curToNodeChildNextSibling.id === curFromNodeKey) {
                                                fromNextSibling = curFromNodeChild;
                                            } else {
                                                fromNextSibling = curFromNodeChild.nextSibling;
                                                removalList.push(curFromNodeChild);
                                            }

                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild) === true;

                            if (isCompatible === true) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild, false);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType === COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible === true) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    removalList.push(curFromNodeChild);

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = getElementById(doc, curToNodeKey)) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild, false);
                } else {
                    addVirtualNode(curToNodeChild, fromEl);
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                removalList.push(curFromNodeChild);
                curFromNodeChild = curFromNodeChild.nextSibling;
            }
        }

        var specialElHandler = specialElHandlers[nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var fromNodeType = morphedNode.nodeType;
    var toNodeType = toNode.$__nodeType;
    var morphChildrenOnly = false;
    var shouldMorphEl = true;
    var newNode;

    // Handle the case where we are given two DOM nodes that are not
    // compatible (e.g. <div> --> <span> or <div> --> TEXT)
    if (fromNodeType == ELEMENT_NODE) {
        if (toNodeType == ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
                newNode = toNode.$__actualize(doc);
                morphChildrenOnly = true;
                removalList.push(fromNode);
            }
        } else {
            // Going from an element node to a text or comment node
            removalList.push(fromNode);
            newNode = toNode.$__actualize(doc);
            shouldMorphEl = false;
        }
    } else if (fromNodeType == TEXT_NODE || fromNodeType == COMMENT_NODE) { // Text or comment node
        if (toNodeType == fromNodeType) {
            morphedNode.nodeValue = toNode.nodeValue;
            return morphedNode;
        } else {
            // Text node to something else
            removalList.push(fromNode);
            newNode = addVirtualNode(toNode);
            shouldMorphEl = false;
        }
    }

    if (shouldMorphEl === true) {
        morphEl(newNode || morphedNode, toNode, morphChildrenOnly);
    }

    if (newNode) {
        if (fromNode.parentNode) {
            fromNode.parentNode.replaceChild(newNode, fromNode);
        }
    }

    // We now need to loop over any keyed nodes that might need to be
    // removed. We only do the removal if we know that the keyed node
    // never found a match. When a keyed node is matched up we remove
    // it out of fromNodesLookup and we use fromNodesLookup to determine
    // if a keyed node has been matched up or not
    for (var i=0, len=removalList.length; i<len; i++) {
        var node = removalList[i];
        var key = node.id;
        if (!key || foundKeys[key] === undefined) {
            if (onBeforeNodeDiscarded(node) == false) {
                continue;
            }

            var parentNode = node.parentNode;
            if (parentNode) {
                parentNode.removeChild(node);
            }

            walkDiscardedChildNodes(node);
        }
    }

    return newNode || morphedNode;
}

module.exports = morphdom;


/***/ }),
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(54); // no-op in the browser, but enables extra features on the server

exports.createOut = __webpack_require__(6);
exports.load = __webpack_require__(41);
exports.events = __webpack_require__(7);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function load(templatePath) {
    throw Error('Not found: ' + templatePath);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var defaultCreateOut = __webpack_require__(6);
var extend = __webpack_require__(1);

function safeRender(renderFunc, finalData, finalOut, shouldEnd) {
    try {
        renderFunc(finalData, finalOut);

        if (shouldEnd) {
            finalOut.end();
        }
    } catch(err) {
        var actualEnd = finalOut.end;
        finalOut.end = function() {};

        setTimeout(function() {
            finalOut.end = actualEnd;
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(4);
var vdom = __webpack_require__(23);
var VElement = vdom.$__VElement;
var VDocumentFragment = vdom.$__VDocumentFragment;
var VComment = vdom.$__VComment;
var VText = vdom.$__VText;
var virtualizeHTML = vdom.$__virtualizeHTML;
var RenderResult = __webpack_require__(19);
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
    this.$__vnode = undefined;
    this.$c = null; // Component args
}

var proto = AsyncVDOMBuilder.prototype = {
    $__isOut: true,
    $__document: defaultDocument,

    element: function(name, attrs, childCount, flags, constId) {
        var element = new VElement(name, attrs, childCount, flags, constId);

        var parent = this.$__parent;

        if (parent !== undefined) {
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
        if (parent !== undefined) {
            parent.$__appendChild(node);
        }
        return this;
    },

    text: function(text) {
        var type = typeof text;

        if (type != 'string') {
            if (text == null) {
                return;
            } else if (type === 'object') {
                if (text.toHTML) {
                    return this.h(text.toHTML());
                }
            }

            text = text.toString();
        }

        var parent = this.$__parent;
        if (parent !== undefined) {
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
        if (parent !== undefined) {
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

        this.$__parent = undefined;

        var remaining = --state.$__remaining;

        if (!(state.$__flags & FLAG_LAST_FIRED) && (remaining - state.$__lastCount === 0)) {
            state.$__flags |= FLAG_LAST_FIRED;
            state.$__lastCount = 0;
            state.$__events.emit('last');
        }

        if (remaining === 0) {
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
        var node = this.$__vnode;
        if (!node) {
            var vdomTree = this.$__getOutput();

            node = this.$__vnode = vdomTree.actualize(doc || this.$__document);
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(3);
var inherit = __webpack_require__(2);

function VComment(value) {
    this.$__VNode(-1 /* no children */);
    this.nodeValue = value;
}

VComment.prototype = {
    $__nodeType: 8,

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(3);
var inherit = __webpack_require__(2);
var extend = __webpack_require__(1);

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
    $__nodeType: 11,

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(3);
var inherit = __webpack_require__(2);

function VText(value) {
    this.$__VNode(-1 /* no children */);
    this.nodeValue = value;
}

VText.prototype = {
    $__Text: true,

    $__nodeType: 3,

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// helpers provide a core set of various utility methods
// that are available in every template
var AsyncVDOMBuilder = __webpack_require__(43);
var makeRenderable = __webpack_require__(42);

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

__webpack_require__(6).$__setCreateOut(createOut);


/***/ }),
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(25)(content, {});
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(25)(content, {});
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(52);

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

const electron = __webpack_require__(9)
const remote = electron.remote
const mainProcess = remote.require('./main')
const template = __webpack_require__(26)

template.renderSync()
    .appendTo(document.body);


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);