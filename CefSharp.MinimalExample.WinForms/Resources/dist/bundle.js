/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(riot) {/* Riot v3.6.0, @license MIT */
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.riot = global.riot || {})));
}(this, (function (exports) { 'use strict';

var __TAGS_CACHE = [];
var __TAG_IMPL = {};
var GLOBAL_MIXIN = '__global_mixin';
var ATTRS_PREFIX = 'riot-';
var REF_DIRECTIVES = ['ref', 'data-ref'];
var IS_DIRECTIVE = 'data-is';
var CONDITIONAL_DIRECTIVE = 'if';
var LOOP_DIRECTIVE = 'each';
var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
var SHOW_DIRECTIVE = 'show';
var HIDE_DIRECTIVE = 'hide';
var RIOT_EVENTS_KEY = '__riot-events__';
var T_STRING = 'string';
var T_OBJECT = 'object';
var T_UNDEF  = 'undefined';
var T_FUNCTION = 'function';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_REGEX = /^xlink:(\w+)/;
var WIN = typeof window === T_UNDEF ? undefined : window;
var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
var RE_EVENTS_PREFIX = /^on/;
var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

/**
 * Check Check if the passed argument is undefined
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return RE_BOOL_ATTRS.test(value)
}

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return typeof value === T_FUNCTION
}

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && typeof value === T_OBJECT // typeof null is 'object'
}

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return typeof value === T_UNDEF
}

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return typeof value === T_STRING
}

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return isUndefined(value) || value === null || value === ''
}

/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array
}

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } -
 */
function isWritable(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable
}

/**
 * Check if passed argument is a reserved name
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isReservedName(value) {
  return RE_RESERVED_NAMES.test(value)
}

var check = Object.freeze({
	isBoolAttr: isBoolAttr,
	isFunction: isFunction,
	isObject: isObject,
	isUndefined: isUndefined,
	isString: isString,
	isBlank: isBlank,
	isArray: isArray,
	isWritable: isWritable,
	isReservedName: isReservedName
});

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFrag() {
  return document.createDocumentFragment()
}

/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('')
}

/**
 * Check if a DOM node is an svg tag
 * @param   { HTMLElement }  el - node we want to test
 * @returns {Boolean} true if it's an svg node
 */
function isSvg(el) {
  return !!el.ownerSVGElement
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @param   { Boolean } isSvg - true if we need to use an svg node
 * @returns { Object } DOM node just created
 */
function mkEl(name) {
  return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name)
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 */
/* istanbul ignore next */
function setInnerHTML(container, html) {
  if (!isUndefined(container.innerHTML))
    { container.innerHTML = html; }
    // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml');
    var node = container.ownerDocument.importNode(doc.documentElement, true);
    container.appendChild(node);
  }
}

/**
 * Toggle the visibility of any DOM node
 * @param   { Object }  dom - DOM node we want to hide
 * @param   { Boolean } show - do we want to show it?
 */

function toggleVisibility(dom, show) {
  dom.style.display = show ? '' : 'none';
  dom['hidden'] = show ? false : true;
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name);
}

/**
 * Convert a style object to a string
 * @param   { Object } style - style object we need to parse
 * @returns { String } resulting css string
 * @example
 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
 */
function styleObjectToString(style) {
  return Object.keys(style).reduce(function (acc, prop) {
    return (acc + " " + prop + ": " + (style[prop]) + ";")
  }, '')
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name);
  if (xlink && xlink[1])
    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
  else
    { dom.setAttribute(name, val); }
}

/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttrs(html, fn) {
  if (!html)
    { return }
  var m;
  while (m = RE_HTML_ATTRS.exec(html))
    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    var res = fn(dom, context);
    var next;
    // stop the recursion
    if (res === false) { return }

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}

var dom = Object.freeze({
	$$: $$,
	$: $,
	createFrag: createFrag,
	createDOMPlaceholder: createDOMPlaceholder,
	isSvg: isSvg,
	mkEl: mkEl,
	setInnerHTML: setInnerHTML,
	toggleVisibility: toggleVisibility,
	remAttr: remAttr,
	styleObjectToString: styleObjectToString,
	getAttr: getAttr,
	setAttr: setAttr,
	safeInsert: safeInsert,
	walkAttrs: walkAttrs,
	walkNodes: walkNodes
});

var styleNode;
var cssTextProp;
var byName = {};
var remainder = [];
var needsInject = false;

// skip the following code on the server
if (WIN) {
  styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style');
    setAttr(newNode, 'type', 'text/css');

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]');
    /* istanbul ignore next */
    if (userNode) {
      if (userNode.id) { newNode.id = userNode.id; }
      userNode.parentNode.replaceChild(newNode, userNode);
    }
    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

    return newNode
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function add(css, name) {
    if (name) { byName[name] = css; }
    else { remainder.push(css); }
    needsInject = true;
  },
  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function inject() {
    if (!WIN || !needsInject) { return }
    needsInject = false;
    var style = Object.keys(byName)
      .map(function(k) { return byName[k] })
      .concat(remainder).join('\n');
    /* istanbul ignore next */
    if (cssTextProp) { cssTextProp.cssText = style; }
    else { styleNode.innerHTML = style; }
  }
};

/**
 * The riot template engine
 * @version v3.0.8
 */

var skipRegex = (function () { //eslint-disable-line no-unused-vars

  var beforeReChars = '[{(,;:?=|&!^~>%*/';

  var beforeReWords = [
    'case',
    'default',
    'do',
    'else',
    'in',
    'instanceof',
    'prefix',
    'return',
    'typeof',
    'void',
    'yield'
  ];

  var wordsLastChar = beforeReWords.reduce(function (s, w) {
    return s + w.slice(-1)
  }, '');

  var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
  var RE_VN_CHAR = /[$\w]/;

  function prev (code, pos) {
    while (--pos >= 0 && /\s/.test(code[pos])){  }
    return pos
  }

  function _skipRegex (code, start) {

    var re = /.*/g;
    var pos = re.lastIndex = start++;
    var match = re.exec(code)[0].match(RE_REGEX);

    if (match) {
      var next = pos + match[0].length;

      pos = prev(code, pos);
      var c = code[pos];

      if (pos < 0 || ~beforeReChars.indexOf(c)) {
        return next
      }

      if (c === '.') {

        if (code[pos - 1] === '.') {
          start = next;
        }

      } else if (c === '+' || c === '-') {

        if (code[--pos] !== c ||
            (pos = prev(code, pos)) < 0 ||
            !RE_VN_CHAR.test(code[pos])) {
          start = next;
        }

      } else if (~wordsLastChar.indexOf(c)) {

        var end = pos + 1;

        while (--pos >= 0 && RE_VN_CHAR.test(code[pos])){  }
        if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
          start = next;
        }
      }
    }

    return start
  }

  return _skipRegex

})();

/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

/* istanbul ignore next */
var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCK2, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCK2, REGLOB)
    },

    DEFAULT = '{ }';

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ];

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings;

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) { bp = _cache; }
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) { return _pairs }

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
    arr[8] = pair;
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) { _bp = _cache; }

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6];

    var qblocks = [];
    var prevStr = '';
    var mark, lastIndex;

    isexpr = start = re.lastIndex = 0;

    while ((match = re.exec(str))) {

      lastIndex = re.lastIndex;
      pos = match.index;

      if (isexpr) {

        if (match[2]) {

          var ch = match[2];
          var rech = FINDBRACES[ch];
          var ix = 1;

          rech.lastIndex = lastIndex;
          while ((match = rech.exec(str))) {
            if (match[1]) {
              if (match[1] === ch) { ++ix; }
              else if (!--ix) { break }
            } else {
              rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
            }
          }
          re.lastIndex = ix ? str.length : rech.lastIndex;
          continue
        }

        if (!match[3]) {
          re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    parts.qblocks = qblocks;

    return parts

    function unescapeStr (s) {
      if (prevStr) {
        s = prevStr + s;
        prevStr = '';
      }
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function pushQBlock(_pos, _lastIndex, slash) { //eslint-disable-line
      if (slash) {
        _lastIndex = skipRegex(str, _pos);
      }

      if (tmpl && _lastIndex > _pos + 2) {
        mark = '\u2057' + qblocks.length + '~';
        qblocks.push(str.slice(_pos, _lastIndex));
        prevStr += str.slice(start, _pos) + mark;
        start = _lastIndex;
      }
      return _lastIndex
    }
  };

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  };

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9]);

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  };

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  };

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings (o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;
  _brackets.skipRegex = skipRegex;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;
  _brackets.S_QBLOCK2 = S_QBLOCK2;

  return _brackets

})();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

/* istanbul ignore next */
var tmpl = (function () {

  var _cache = {};

  function _tmpl (str, data) {
    if (!str) { return str }

    return (_cache[str] || (_cache[str] = _create(str))).call(
      data, _logErr.bind({
        data: data,
        tmpl: str
      })
    )
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {}; };

  _tmpl.errorHandler = null;

  function _logErr (err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.__ && ctx.__.tagName,
      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
    else if (
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      console.error(err.message);
      console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
      console.log(this.data); // eslint-disable-line
    }
  }

  function _create (str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var RE_DQUOTE = /\u2057/g;
  var RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl (str) {
    var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
    var qstr = parts.qblocks;
    var expr;

    if (parts.length > 2 || parts[0]) {
      var i, j, list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) { list[j++] = expr; }

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")';

    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr.length) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      });
    }
    return expr
  }

  var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

  function _parseExpr (expr, asText, qstr) {

    expr = expr
      .replace(/\s+/g, ' ').trim()
      .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var
        list = [],
        cnt = 0,
        match;

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

        jsb  = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) { ++lv; }
        else if (!--lv) { break }
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr (expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""';

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)';
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v3.0.8';

  return _tmpl

})();

/* istanbul ignore next */
var observable$1 = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  var len = list ? list.length : 0;
  var i = 0;
  for (; i < len; ++i) {
    fn(list[i], i);
  }
  return list
}

/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return array.indexOf(item) !== -1
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
}

/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments;
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

var misc = Object.freeze({
	each: each,
	contains: contains,
	toCamel: toCamel,
	startsWith: startsWith,
	defineProperty: defineProperty,
	extend: extend
});

var settings$1 = extend(Object.create(brackets.settings), {
  skipAnonymousTags: true,
  // handle the auto updates on any DOM event
  autoUpdate: true
});

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  var ptag = this.__.parent,
    item = this.__.item;

  if (!item)
    { while (ptag && !item) {
      item = ptag.__.item;
      ptag = ptag.__.parent;
    } }

  // override the event properties
  /* istanbul ignore next */
  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
  /* istanbul ignore next */
  if (isWritable(e, 'target')) { e.target = e.srcElement; }
  /* istanbul ignore next */
  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

  e.item = item;

  handler.call(this, e);

  // avoid auto updates
  if (!settings$1.autoUpdate) { return }

  if (!e.preventUpdate) {
    var p = getImmediateCustomParentTag(this);
    // fixes #2083
    if (p.isMounted) { p.update(); }
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  var eventName,
    cb = handleEvent.bind(tag, dom, handler);

  // avoid to bind twice the same event
  // possible fix for #2332
  dom[name] = null;

  // normalize event name
  eventName = name.replace(RE_EVENTS_PREFIX, '');

  // cache the listener into the listeners array
  if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
  if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
  if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

  dom[RIOT_EVENTS_KEY][name] = cb;
  dom.addEventListener(eventName, cb, false);
}

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag }    parent - parent for tag creation
 * @param { String } tagName - tag implementation we want to use
 */
function updateDataIs(expr, parent, tagName) {
  var conf, isVirtual, head, ref;

  if (expr.tag && expr.tagName === tagName) {
    expr.tag.update();
    return
  }

  isVirtual = expr.dom.tagName === 'VIRTUAL';
  // sync _parent to accommodate changing tagnames
  if (expr.tag) {
    // need placeholder before unmount
    if(isVirtual) {
      head = expr.tag.__.head;
      ref = createDOMPlaceholder();
      head.parentNode.insertBefore(ref, head);
    }

    expr.tag.unmount(true);
  }

  if (!isString(tagName)) { return }

  expr.impl = __TAG_IMPL[tagName];
  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
  expr.tagName = tagName;
  expr.tag.mount();
  if (isVirtual)
    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.__.onUnmount = function() {
    var delName = expr.tag.opts.dataIs,
      tags = expr.tag.parent.tags,
      _tags = expr.tag.__.parent.tags;
    arrayishRemove(tags, delName, expr.tag);
    arrayishRemove(_tags, delName, expr.tag);
    expr.tag.unmount();
  };
}

/**
 * Nomalize any attribute removing the "riot-" prefix
 * @param   { String } attrName - original attribute name
 * @returns { String } valid html attribute name
 */
function normalizeAttrName(attrName) {
  if (!attrName) { return null }
  attrName = attrName.replace(ATTRS_PREFIX, '');
  if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
  return attrName
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  if (this.root && getAttr(this.root,'virtualized')) { return }

  var dom = expr.dom,
    // remove the riot- prefix
    attrName = normalizeAttrName(expr.attr),
    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
    parent = dom && (expr.parent || dom.parentNode),
    // detect the style attributes
    isStyleAttr = attrName === 'style',
    isClassAttr = attrName === 'class',
    hasValue,
    isObj,
    value;

  // if it's a tag we could totally skip the rest
  if (expr._riot_id) {
    if (expr.isMounted) {
      expr.update();
    // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();
      if (isVirtual) {
        makeReplaceVirtual(expr, expr.root);
      }
    }
    return
  }
  // if this expression has the update method it means it can handle the DOM changes by itself
  if (expr.update) { return expr.update() }

  // ...it seems to be a simple expression so we try to calculat its value
  value = tmpl(expr.expr, isToggle ? extend({}, Object.create(this.parent), this) : this);
  hasValue = !isBlank(value);
  isObj = isObject(value);

  // convert the style/class objects to strings
  if (isObj) {
    isObj = !isClassAttr && !isStyleAttr;
    if (isClassAttr) {
      value = tmpl(JSON.stringify(value), this);
    } else if (isStyleAttr) {
      value = styleObjectToString(value);
    }
  }

  // remove original attribute
  if (expr.attr && (!expr.isAttrRemoved || !hasValue || value === false)) {
    remAttr(dom, expr.attr);
    expr.isAttrRemoved = true;
  }

  // for the boolean attributes we don't need the value
  // we can convert it to checked=true to checked=checked
  if (expr.bool) { value = value ? attrName : false; }
  if (expr.isRtag) { return updateDataIs(expr, this, value) }
  if (expr.wasParsedOnce && expr.value === value) { return }

  // update the expression value
  expr.value = value;
  expr.wasParsedOnce = true;

  // if the value is an object we can not do much more with it
  if (isObj && !isToggle) { return }
  // avoid to render undefined/null values
  if (isBlank(value)) { value = ''; }

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value;                    // #1113
        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
      }                                         // will be available on 'updated'
      else { dom.nodeValue = value; }
    }
    return
  }


  // event handler
  if (isFunction(value)) {
    setEventHandler(attrName, value, dom, this);
  // show / hide
  } else if (isToggle) {
    toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
  // handle attributes
  } else {
    if (expr.bool) {
      dom[attrName] = value;
    }

    if (attrName === 'value' && dom.value !== value) {
      dom.value = value;
    }

    if (hasValue && value !== false) {
      setAttr(dom, attrName, value);
    }

    // make sure that in case of style changes
    // the element stays hidden
    if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function updateAllExpressions(expressions) {
  each(expressions, updateExpression.bind(this));
}

var IfExpr = {
  init: function init(dom, tag, expr) {
    remAttr(dom, CONDITIONAL_DIRECTIVE);
    this.tag = tag;
    this.expr = expr;
    this.stub = createDOMPlaceholder();
    this.pristine = dom;

    var p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this
  },
  update: function update() {
    this.value = tmpl(this.expr, this.tag);

    if (this.value && !this.current) { // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);
      this.expressions = [];
      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
    } else if (!this.value && this.current) { // remove
      unmountAll(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode) {
        this.current.parentNode.removeChild(this.current);
      }
      this.current = null;
      this.expressions = [];
    }

    if (this.value) { updateAllExpressions.call(this.tag, this.expressions); }
  },
  unmount: function unmount() {
    unmountAll(this.expressions || []);
  }
};

var RefExpr = {
  init: function init(dom, parent, attrName, attrValue) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = tmpl.hasExpr(attrValue);
    return this
  },
  update: function update() {
    var old = this.value;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    var tagOrDom = this.dom.__ref || this.tag || this.dom;

    this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

    // the name changed, so we need to remove it from the old key (if present)
    if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
    if (!isBlank(this.value) && isString(this.value)) {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) { arrayishAdd(
        customParent.refs,
        this.value,
        tagOrDom,
        // use an array if it's a looped node and the ref is not an expression
        null,
        this.parent.__.index
      ); }

      if (this.value !== old) {
        setAttr(this.dom, this.attr, this.value);
      }
    } else {
      remAttr(this.dom, this.attr);
    }

    // cache the ref bound to this dom node
    // to reuse it in future (see also #2329)
    if (!this.dom.__ref) { this.dom.__ref = tagOrDom; }
  },
  unmount: function unmount() {
    var tagOrDom = this.tag || this.dom;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
  }
};

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @param   { Object } base - prototype object for the new item
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val, base) {
  var item = base ? Object.create(base) : {};
  item[expr.key] = key;
  if (expr.pos) { item[expr.pos] = val; }
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags) {
  var i = tags.length,
    j = items.length;

  while (i > j) {
    i--;
    remove.apply(tags[i], [tags, i]);
  }
}


/**
 * Remove a child tag
 * @this Tag
 * @param   { Array } tags - tags collection
 * @param   { Number } i - index of the tag to remove
 */
function remove(tags, i) {
  tags.splice(i, 1);
  this.unmount();
  arrayishRemove(this.parent, this, this.__.tagName, true);
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  var this$1 = this;

  each(Object.keys(this.tags), function (tagName) {
    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual)
    { moveVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual)
    { makeVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual)
    { makeVirtual.call(this, root); }
  else
    { root.appendChild(this.root); }
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, LOOP_DIRECTIVE);

  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
    tagName = getTagName(dom),
    impl = __TAG_IMPL[tagName],
    parentNode = dom.parentNode,
    placeholder = createDOMPlaceholder(),
    child = getTag(dom),
    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
    tags = [],
    oldItems = [],
    hasKeys,
    isLoop = true,
    isAnonymous = !__TAG_IMPL[tagName],
    isVirtual = dom.tagName === 'VIRTUAL';

  // parse the each expression
  expr = tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

  // insert a marked where the loop tags will be injected
  parentNode.insertBefore(placeholder, dom);
  parentNode.removeChild(dom);

  expr.update = function updateEach() {
    // get the new items collection
    expr.value = tmpl(expr.val, parent);

    var frag = createFrag(),
      items = expr.value,
      isObject$$1 = !isArray(items) && !isString(items),
      root = placeholder.parentNode;

    // if this DOM was removed the update here is useless
    // this condition fixes also a weird async issue on IE in our unit test
    if (!root) { return }

    // object loop. any changes cause full redraw
    if (isObject$$1) {
      hasKeys = items || false;
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key)
        }) : [];
    } else {
      hasKeys = false;
    }

    if (ifExpr) {
      items = items.filter(function(item, i) {
        if (expr.key && !isObject$$1)
          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

        return !!tmpl(ifExpr, extend(Object.create(parent), item))
      });
    }

    // loop all the new items
    each(items, function(item, i) {
      // reorder only if the items are objects
      var
        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        isNew = oldPos === -1,
        pos = !isNew && doReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos],
        mustAppend = i >= oldItems.length,
        mustCreate =  doReorder && isNew || !doReorder && !tag;

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

      // new tag
      if (mustCreate) {
        tag = new Tag$1(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          tagName: tagName,
          root: dom.cloneNode(isAnonymous),
          item: item,
          index: i,
        }, dom.innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend)
          { append.apply(tag, [frag || root, isVirtual]); }
        else
          { insert.apply(tag, [root, tags[i], isVirtual]); }

        if (!mustAppend) { oldItems.splice(i, 0, item); }
        tags.splice(i, 0, tag);
        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
      } else if (pos !== i && doReorder) {
        // move
        if (contains(items, oldItems[pos])) {
          move.apply(tag, [root, tags[i], isVirtual]);
          // move the old tag instance
          tags.splice(i, 0, tags.splice(pos, 1)[0]);
          // move the old item
          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        }

        // update the position attribute if it exists
        if (expr.pos) { tag[expr.pos] = i; }

        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag.__.item = item;
      tag.__.index = i;
      tag.__.parent = parent;

      if (!mustCreate) { tag.update(item); }
    });

    // remove the redundant tags
    unmountRedundant(items, tags);

    // clone the items array
    oldItems = items.slice();

    // this condition is weird u
    root.insertBefore(frag, placeholder);
  };

  expr.unmount = function() {
    each(tags, function(t) { t.unmount(); });
  };

  return expr
}

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Array } expressions - empty array where the expressions will be added
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Object } an object containing the root noode and the dom tree
 */
function parseExpressions(root, expressions, mustIncludeRoot) {
  var this$1 = this;

  var tree = {parent: {children: expressions}};

  walkNodes(root, function (dom, ctx) {
    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

    if (type !== 1) { return ctx } // not an element

    var isVirtual = dom.tagName === 'VIRTUAL';

    // loop. each does it's own thing (for now)
    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
      parent.children.push(_each(dom, this$1, attr));
      return false
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
      return false
    }

    if (expr = getAttr(dom, IS_DIRECTIVE)) {
      if (tmpl.hasExpr(expr)) {
        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
        return false
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = getTag(dom);
    if(isVirtual) {
      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
        { tagImpl = { tmpl: dom.outerHTML }; }
    }

    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
        // can not remove attribute like directives
        // so flag for removal after creation to prevent maximum stack error
        setAttr(dom, 'virtualized', true);

        var tag = new Tag$1({ tmpl: dom.outerHTML },
          {root: dom, parent: this$1},
          dom.innerHTML);
        parent.children.push(tag); // no return, anonymous tag, keep parsing
      } else {
        var conf = {root: dom, parent: this$1, hasImpl: true};
        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
        return false
      }
    }

    // attribute expressions
    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
      if (!expr) { return }
      parent.children.push(expr);
    }]);

    // whatever the parent is, all child elements get the same parent.
    // If this element had an if-attr, that's the parent for all child elements
    return {parent: parent}
  }, tree);
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  var this$1 = this;

  each(attrs, function (attr) {
    if (!attr) { return false }

    var name = attr.name, bool = isBoolAttr(name), expr;

    if (contains(REF_DIRECTIVES, name)) {
      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
    } else if (tmpl.hasExpr(attr.value)) {
      expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
    }

    fn(attr, expr);
  });
}

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

var reHasYield  = /<yield\b/i;
var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
var GENERIC = 'div';
var SVG = 'svg';


/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  var
    select = tagName[0] === 'o',
    parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  /* istanbul ignore next */
  if (select) {
    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    var tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
  }
  return parent
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) { return tmpl }

  // be careful with #1343 - string on the source having `$1`
  var src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text;   // preserve first definition
    return ''
  }).trim();

  return tmpl
    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
      return src[ref] || def || ''
    })
    .replace(reYieldAll, function (_, def) {        // yield without any "from"
      return html || def || ''
    })
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @param   { Boolean } isSvg - true if the root node is an svg
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html, isSvg$$1) {
  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
    tagName = match && match[1].toLowerCase(),
    el = mkEl(isSvg$$1 ? SVG : GENERIC);

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName))
    { el = specialTags(el, tmpl, tagName); }
  else
    { setInnerHTML(el, tmpl); }

  return el
}

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag$2(el, opts) {
  // get the tag properties from the class constructor
  var ref = this;
  var name = ref.name;
  var tmpl = ref.tmpl;
  var css = ref.css;
  var attrs = ref.attrs;
  var onCreate = ref.onCreate;
  // register a new tag and cache the class prototype
  if (!__TAG_IMPL[name]) {
    tag$1(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    __TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  mountTo(el, name, opts, this);
  // inject the component css
  if (css) { styleManager.inject(); }

  return this
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag$1(name, tmpl, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs;

    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else
      { attrs = ''; }
  }

  if (css) {
    if (isFunction(css))
      { fn = css; }
    else
      { styleManager.add(css); }
  }

  name = name.toLowerCase();
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2$1(name, tmpl, css, attrs, fn) {
  if (css) { styleManager.add(css, name); }

  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount$1(selector, tagName, opts) {
  var tags = [];
  var elem, allTags;

  function pushTagsTo(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, IS_DIRECTIVE), tag;

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        setAttr(root, IS_DIRECTIVE, tagName);
      }

      tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag)
        { tags.push(tag); }
    } else if (root.length)
      { each(root, pushTagsTo); } // assume nodeList
  }

  // inject styles into DOM
  styleManager.inject();

  if (isObject(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  // crawl the DOM to find the tag
  if (isString(selector)) {
    selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? $$(selector) : [];
  }
  else
    // probably you have passed already a tag or a NodeList
    { elem = selector; }

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectTags();
    // if the root els it's just a single tag
    if (elem.tagName)
      { elem = $$(tagName, elem); }
    else {
      // select all the children for all the different root elements
      var nodeList = [];

      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags
}

// Create a mixin that could be globally shared across all the tags
var mixins = {};
var globals = mixins[GLOBAL_MIXIN] = {};
var mixins_id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin$1(name, mix, g) {
  // Unnamed global
  if (isObject(name)) {
    mixin$1(("__" + (mixins_id++) + "__"), name, true);
    return
  }

  var store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if (isUndefined(store[name]))
      { throw new Error(("Unregistered mixin: " + name)) }

    return store[name]
  }

  // Setter
  store[name] = isFunction(mix) ?
    extend(mix.prototype, store[name] || {}) && mix :
    extend(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update$1() {
  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
}

function unregister$1(name) {
  __TAG_IMPL[name] = null;
}

var version$1 = 'v3.6.0';


var core = Object.freeze({
	Tag: Tag$2,
	tag: tag$1,
	tag2: tag2$1,
	mount: mount$1,
	mixin: mixin$1,
	update: update$1,
	unregister: unregister$1,
	version: version$1
});

// counter to give a unique id to all the Tag instances
var __uid = 0;

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) { return }

  var ctx = !isAnonymous && isLoop ? this : parent || this;
  each(instAttrs, function (attr) {
    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
    // normalize the attribute names
    opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
  });
}


/**
 * Tag class
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function Tag$1(impl, conf, innerHTML) {
  if ( impl === void 0 ) impl = {};
  if ( conf === void 0 ) conf = {};

  var opts = extend({}, conf.opts),
    parent = conf.parent,
    isLoop = conf.isLoop,
    isAnonymous = !!conf.isAnonymous,
    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
    item = cleanUpData(conf.item),
    index = conf.index, // available only for the looped nodes
    instAttrs = [], // All attributes on the Tag when it's first parsed
    implAttrs = [], // expressions on this type of Tag
    expressions = [],
    root = conf.root,
    tagName = conf.tagName || getTagName(root),
    isVirtual = tagName === 'virtual',
    isInline = !isVirtual && !impl.tmpl,
    propsInSyncWithParent = [],
    dom;

  // make this tag observable
  if (!skipAnonymous) { observable$1(this); }
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) { root._tag.unmount(true); }

  // not yet mounted
  this.isMounted = false;

  defineProperty(this, '__', {
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    tagName: tagName,
    index: index,
    isLoop: isLoop,
    isInline: isInline,
    // tags having event listeners
    // it would be better to use weak maps here but we can not introduce breaking changes now
    listeners: [],
    // these vars will be needed only for the virtual tags
    virts: [],
    tail: null,
    head: null,
    parent: null,
    item: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
  defineProperty(this, 'root', root);
  extend(this, { opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  defineProperty(this, 'parent', parent || null);
  defineProperty(this, 'tags', {});
  defineProperty(this, 'refs', {});

  if (isInline || isLoop && isAnonymous) {
    dom = root;
  } else {
    if (!isVirtual) { root.innerHTML = ''; }
    dom = mkdom(impl.tmpl, innerHTML, isSvg(root));
  }

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'update', function tagUpdate(data) {
    var nextOpts = {},
      canTrigger = this.isMounted && !skipAnonymous;

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data);
    extend(this, data);
    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

    if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
      return this
    }

    // inherit properties from the parent, but only for isAnonymous tags
    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
    extend(opts, nextOpts);
    if (canTrigger) { this.trigger('update', data); }
    updateAllExpressions.call(this, expressions);
    if (canTrigger) { this.trigger('updated'); }

    return this

  }.bind(this));

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mixin', function tagMixin() {
    var this$1 = this;

    each(arguments, function (mix) {
      var instance, obj;
      var props = [];

      // properties blacklisted and will not be bound to the tag instance
      var propsBlacklist = ['init', '__proto__'];

      mix = isString(mix) ? mixin$1(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to this
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(this$1, key, descriptor);
          } else {
            this$1[key] = isFunction(instance[key]) ?
              instance[key].bind(this$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(this$1)(); }
    });
    return this
  }.bind(this));

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mount', function tagMount() {
    var this$1 = this;

    root._tag = this; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
      attr.expr = expr;
      instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    implAttrs = [];
    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttr(root, attr.name, attr.value); }
    }]);

    // initialiation
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

    // add global mixins
    var globalMixin = mixin$1(GLOBAL_MIXIN);

    if (globalMixin && !skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          this$1.mixin(globalMixin[i]);
        }
      }
    }

    if (impl.fn) { impl.fn.call(this, opts); }

    if (!skipAnonymous) { this.trigger('before-mount'); }

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

    this.update(item);

    if (!isAnonymous && !isInline) {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
    }

    defineProperty(this, 'root', root);
    defineProperty(this, 'isMounted', true);

    if (skipAnonymous) { return }

    // if it's not a child tag we can trigger its mount event
    if (!this.parent) {
      this.trigger('mount');
    }
    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
    else {
      var p = getImmediateCustomParentTag(this.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        this$1.trigger('mount');
      });
    }

    return this

  }.bind(this));

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
    var this$1 = this;

    var el = this.root,
      p = el.parentNode,
      ptag,
      tagIndex = __TAGS_CACHE.indexOf(this);

    if (!skipAnonymous) { this.trigger('before-unmount'); }

    // clear all attributes coming from the mounted tag
    walkAttrs(impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX))
        { name = name.slice(ATTRS_PREFIX.length); }

      remAttr(root, name);
    });

    // remove all the event listeners
    this.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    });

    // remove this tag instance from the global virtualDom variable
    if (tagIndex !== -1)
      { __TAGS_CACHE.splice(tagIndex, 1); }

    if (p || isVirtual) {
      if (parent) {
        ptag = getImmediateCustomParentTag(parent);

        if (isVirtual) {
          Object.keys(this.tags).forEach(function (tagName) {
            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
          });
        } else {
          arrayishRemove(ptag.tags, tagName, this);
          // remove from _parent too
          if(parent !== ptag) {
            arrayishRemove(parent.tags, tagName, this);
          }
        }
      } else {
        // remove the tag contents
        setInnerHTML(el, '');
      }

      if (p && !mustKeepRoot) { p.removeChild(el); }
    }

    if (this.__.virts) {
      each(this.__.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    // custom internal unmount function to avoid relying on the observable
    if (this.__.onUnmount) { this.__.onUnmount(); }

    if (!skipAnonymous) {
      this.trigger('unmount');
      this.off('*');
    }

    defineProperty(this, 'isMounted', false);

    delete this.root._tag;

    return this

  }.bind(this));
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
}

/**
 * Inherit properties from a target tag instance
 * @this Tag
 * @param   { Tag } target - tag where we will inherit properties
 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
 */
function inheritFrom(target, propsInSyncWithParent) {
  var this$1 = this;

  each(Object.keys(target), function (k) {
    // some properties must be always in sync with the parent tag
    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

    if (isUndefined(this$1[k]) || mustSync) {
      // track the property to keep in sync
      // so we can keep it updated
      if (!mustSync) { propsInSyncWithParent.push(k); }
      this$1[k] = target[k];
    }
  });
}

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tagName, newPos) {
  var parent = this.parent,
    tags;
  // no parent no move
  if (!parent) { return }

  tags = parent.tags[tagName];

  if (isArray(tags))
    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
  else { arrayishAdd(parent.tags, tagName, this); }
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag$1(child, opts, innerHTML),
    tagName = opts.tagName || getTagName(opts.root, true),
    ptag = getImmediateCustomParentTag(parent);
  // fix for the parent attribute in the looped elements
  defineProperty(tag, 'parent', ptag);
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag.__.parent = parent;

  // add this tag to the custom parent tag
  arrayishAdd(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent)
    { arrayishAdd(parent.tags, tagName, tag); }

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag;
  while (ptag.__.isAnonymous) {
    if (!ptag.parent) { break }
    ptag = ptag.parent;
  }
  return ptag
}

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  each(expressions, function(expr) {
    if (expr instanceof Tag$1) { expr.unmount(true); }
    else if (expr.tagName) { expr.tag.unmount(true); }
    else if (expr.unmount) { expr.unmount(); }
  });
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom, skipDataIs) {
  var child = getTag(dom),
    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
  return namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()
}

/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
    { return data }

  var o = {};
  for (var key in data) {
    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
  }
  return o
}

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 * @param { Number } index - add the new item in a certain array position
 */
function arrayishAdd(obj, key, value, ensureArray, index) {
  var dest = obj[key];
  var isArr = isArray(dest);
  var hasIndex = !isUndefined(index);

  if (dest && dest === value) { return }

  // if the key was never set, set it once
  if (!dest && ensureArray) { obj[key] = [value]; }
  else if (!dest) { obj[key] = value; }
  // if it was an array and not yet set
  else {
    if (isArr) {
      var oldIndex = dest.indexOf(value);
      // this item never changed its position
      if (oldIndex === index) { return }
      // remove the item from its old position
      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
      // move or add the item
      if (hasIndex) {
        dest.splice(index, 0, value);
      } else {
        dest.push(value);
      }
    } else { obj[key] = [dest, value]; }
  }
}

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if (isArray(obj[key])) {
    var index = obj[key].indexOf(value);
    if (index !== -1) { obj[key].splice(index, 1); }
    if (!obj[key].length) { delete obj[key]; }
    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
  } else
    { delete obj[key]; } // otherwise just delete the key
}

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts, ctx) {
  var impl = __TAG_IMPL[tagName],
    implClass = __TAG_IMPL[tagName].class,
    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
  }

  return tag
}

/**
 * makes a tag virtual and replaces a reference in the dom
 * @this Tag
 * @param { tag } the tag to make virtual
 * @param { ref } the dom reference location
 */
function makeReplaceVirtual(tag, ref) {
  var frag = createFrag();
  makeVirtual.call(tag, frag);
  ref.parentNode.replaceChild(frag, ref);
}

/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  var this$1 = this;

  var head = createDOMPlaceholder(),
    tail = createDOMPlaceholder(),
    frag = createFrag(),
    sib, el;

  this.root.insertBefore(head, this.root.firstChild);
  this.root.appendChild(tail);

  this.__.head = el = head;
  this.__.tail = tail;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this$1.__.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target)
    { src.insertBefore(frag, target.__.head); }
  else
    { src.appendChild(frag); }
}

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  var this$1 = this;

  var el = this.__.head,
    frag = createFrag(),
    sib;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this$1.__.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target.__.head);
      break
    }
  }
}

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function selectTags(tags) {
  // select all tags
  if (!tags) {
    var keys = Object.keys(__TAG_IMPL);
    return keys + selectTags(keys)
  }

  return tags
    .filter(function (t) { return !/[^-\w]/.test(t); })
    .reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
    }, '')
}


var tags = Object.freeze({
	getTag: getTag,
	inheritFrom: inheritFrom,
	moveChildTag: moveChildTag,
	initChildTag: initChildTag,
	getImmediateCustomParentTag: getImmediateCustomParentTag,
	unmountAll: unmountAll,
	getTagName: getTagName,
	cleanUpData: cleanUpData,
	arrayishAdd: arrayishAdd,
	arrayishRemove: arrayishRemove,
	mountTo: mountTo,
	makeReplaceVirtual: makeReplaceVirtual,
	makeVirtual: makeVirtual,
	moveVirtual: moveVirtual,
	selectTags: selectTags
});

/**
 * Riot public api
 */
var settings = settings$1;
var util = {
  tmpl: tmpl,
  brackets: brackets,
  styleManager: styleManager,
  vdom: __TAGS_CACHE,
  styleNode: styleManager.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags
};

// export the core props/methods
var Tag$$1 = Tag$2;
var tag$$1 = tag$1;
var tag2$$1 = tag2$1;
var mount$$1 = mount$1;
var mixin$$1 = mixin$1;
var update$$1 = update$1;
var unregister$$1 = unregister$1;
var version$$1 = version$1;
var observable = observable$1;

var riot$1 = extend({}, core, {
  observable: observable$1,
  settings: settings,
  util: util,
});

exports.settings = settings;
exports.util = util;
exports.Tag = Tag$$1;
exports.tag = tag$$1;
exports.tag2 = tag2$$1;
exports.mount = mount$$1;
exports.mixin = mixin$$1;
exports.update = update$$1;
exports.unregister = unregister$$1;
exports.version = version$$1;
exports.observable = observable;
exports['default'] = riot$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory(__webpack_require__(0), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["P7HostCore"] = factory(require("riot"), require("js-cookie"), require("riot-route"), require("riotcontrol"), require("whatwg-fetch"));else root["P7HostCore"] = factory(root["riot"], root["js-cookie"], root["riot-route"], root["riotcontrol"], root["whatwg-fetch"]);
})(undefined, function (__WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_27__) {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 21);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      // https://github.com/substack/deep-freeze

      var DeepFreeze = function () {
        function DeepFreeze() {
          _classCallCheck(this, DeepFreeze);
        }

        DeepFreeze.freeze = function freeze(o) {
          Object.freeze(o);
          Object.getOwnPropertyNames(o).forEach(function (prop) {
            if (o.hasOwnProperty(prop) && o[prop] !== null && (_typeof(o[prop]) === 'object' || typeof o[prop] === 'function') && !Object.isFrozen(o[prop])) {
              DeepFreeze.freeze(o[prop]);
            }
          });
          return o;
        };

        return DeepFreeze;
      }();

      exports.default = DeepFreeze;
      module.exports = exports['default'];

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var StoreBase = function () {
        function StoreBase() {
          _classCallCheck(this, StoreBase);

          this._bound = false;
          this.riotHandlers = [];
        }

        StoreBase.bindHandler = function bindHandler(element, index, array) {
          this.on(element.event, element.handler);
        };

        StoreBase.unbindHandler = function unbindHandler(element, index, array) {
          this.off(element.event, element.handler);
        };

        StoreBase.prototype.bindEvents = function bindEvents() {
          if (this._bound === false) {
            this.riotHandlers.forEach(StoreBase.bindHandler, this);
            this._bound = !this._bound;
          }
        };

        StoreBase.prototype.unbindEvents = function unbindEvents() {
          if (this._bound === true) {
            this.riotHandlers.forEach(StoreBase.unbindHandler, this);
            this._bound = !this._bound;
          }
        };

        return StoreBase;
      }();

      exports.default = StoreBase;
      module.exports = exports["default"];

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'route-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          routeDispatch: 'riot-route-dispatch',
          riotRouteLoadView: 'riot-route-load-view'
        },
        out: {
          riotRouteDispatchAck: 'riot-route-dispatch-ack'
        }
      };
      _deepFreeze2.default.freeze(Constants);

      var RouteStore = function (_StoreBase) {
        _inherits(RouteStore, _StoreBase);

        _createClass(RouteStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function RouteStore() {
          _classCallCheck(this, RouteStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          riot.observable(_this);

          _this.postResetRoute = null;
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.routeDispatch, handler: _this._onRouteDispatch }, { event: Constants.WELLKNOWN_EVENTS.in.riotRouteLoadView, handler: _this._onRiotRouteLoadView }];
          _this.bindEvents();
          return _this;
        }

        RouteStore.prototype._onRouteDispatch = function _onRouteDispatch(route, force) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.routeDispatch, route);
          var current = riot.route.currentPath();

          var same = current === route;

          if (!same) {
            same = '/' + current === route;
          }
          if (!same) {
            riot.route(route);
          } else {
            if (force) {
              riot.route.exec();
            }
          }

          riot.routeState.route = route;
          this.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatchAck, route);
        };

        RouteStore.prototype._onRiotRouteLoadView = function _onRiotRouteLoadView(view) {
          console.log(Constants.NAME, 'riot-route-load-view', view);
          riot.router.loadView(view);
        };

        return RouteStore;
      }(_storeBase2.default);

      exports.default = RouteStore;
      module.exports = exports['default'];

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Validator = function () {
        function Validator() {
          _classCallCheck(this, Validator);
        }

        Validator.validateType = function validateType(obj, type, name) {
          if (!obj) {
            throw new Error(name + ': is NULL');
          }
          if (!(obj instanceof type)) {
            throw new Error(name + ': is NOT of type:' + type.name);
          }
        };

        return Validator;
      }();

      exports.default = Validator;
      module.exports = exports['default'];

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      } // http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml

      /*
      component:{
      		key:'typicode-component',
      		path:'/partial/bundle.js',
      		type:'js'
      	}
      	or when unloading
      component:{
      		key:'typicode-component'
      	}
      
      events:{
      	out:[
      		{
      			event:'load-external-jscss-ack',
      			type:'riotcontrol'
      			data:[
      				{
      			    	state:true,
      			    	component:component
      				},
      				{
      			    	state:false,
      			    	component:component,
      			    	error:"component already added!"
      				}
      			]
      		},
      		{
      			event:'unload-external-jscss-ack',
      			type:'riotcontrol'
      			data:[
      				{
      			    	state:true,
      			    	component:component
      				},
      				{
      			    	state:false,
      			    	component:component,
      			    	error:"no entry found to remove!"
      				}
      			]
      		}
      
      	]
      
      }
      
      	*/

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'dynamic-jscss-loader';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {},
        out: {}
      };
      _deepFreeze2.default.freeze(Constants);

      var DynamicJsCssLoader = function () {
        _createClass(DynamicJsCssLoader, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function DynamicJsCssLoader() {
          _classCallCheck(this, DynamicJsCssLoader);

          riot.observable(this);
          this._componentsAddedSet = new Set();
          this._bound = false;
        }

        DynamicJsCssLoader.prototype._addComponent = function _addComponent(component) {
          if (this._findComponent(component) == null) {
            var mySet = this._componentsAddedSet;

            mySet.add(component);
          }
        };

        DynamicJsCssLoader.prototype._findComponent = function _findComponent(component) {
          var mySet = this._componentsAddedSet;

          for (var _iterator = mySet, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var item = _ref;

            if (item.key === component.key) {
              return item;
            }
          }
          return null;
        };

        DynamicJsCssLoader.prototype._deleteComponent = function _deleteComponent(component) {
          var mySet = this._componentsAddedSet;

          for (var _iterator2 = mySet, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var item = _ref2;

            if (item.key === component.key) {
              mySet.delete(item);
              break;
            }
          }
        };

        DynamicJsCssLoader.prototype.loadExternalJsCss = function loadExternalJsCss(component) {
          var addedCompoment = this._findComponent(component);

          if (addedCompoment == null) {
            this._loadExternalJsCss(component);
            this._addComponent(component);
            console.log('load-external-jscss', component);
          } else {
            console.error('file already added!', component);
          }
        };

        DynamicJsCssLoader.prototype._removeExternalByFile = function _removeExternalByFile(filename, filetype) {
          // determine element type to create nodelist from
          var targetelement = filetype === 'js' ? 'script' : filetype === 'css' ? 'link' : 'none';
          // determine corresponding attribute to test for
          var targetattr = filetype === 'js' ? 'src' : filetype === 'css' ? 'href' : 'none';
          var allsuspects = document.getElementsByTagName(targetelement);

          for (var i = allsuspects.length; i >= 0; i--) {
            // search backwards within nodelist for matching elements to remove
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
              allsuspects[i].parentNode.removeChild(allsuspects[i]); // remove element by calling parentNode.removeChild()
              break;
            }
          }
        };

        DynamicJsCssLoader.prototype.unloadExternalJsCss = function unloadExternalJsCss(component) {
          var addedCompoment = this._findComponent(component);

          if (addedCompoment != null) {
            var jsBundle = component.jsBundle;
            var cssBundle = component.cssBundle;

            if (jsBundle && jsBundle.path) {
              this._removeExternalByFile(jsBundle.path, 'js');
            }
            if (cssBundle && cssBundle.path) {
              this._removeExternalByFile(cssBundle.path, 'css');
            }
            this._deleteComponent(component);
          }
        };

        DynamicJsCssLoader.prototype._preFetchExternalJsCss = function _preFetchExternalJsCss(component) {
          var jsBundle = component.jsBundle;
          var cssBundle = component.cssBundle;

          if (jsBundle && jsBundle.path) {
            var fileref = document.createElement('link');

            fileref.setAttribute('rel', 'prefetch');
            fileref.setAttribute('href', jsBundle.path);
            if (typeof fileref !== 'undefined') {
              document.getElementsByTagName('head')[0].appendChild(fileref);
            }
          }
          if (cssBundle && cssBundle.path) {
            var _fileref = document.createElement('link');

            _fileref.setAttribute('rel', 'prefetch');
            _fileref.setAttribute('href', cssBundle.path);
            if (typeof _fileref !== 'undefined') {
              document.getElementsByTagName('head')[0].appendChild(_fileref);
            }
          }
        };

        DynamicJsCssLoader.prototype._loadExternalJsCss = function _loadExternalJsCss(component) {
          var jsBundle = component.jsBundle;
          var cssBundle = component.cssBundle;

          if (jsBundle && jsBundle.path) {
            var fileref = document.createElement('script');

            fileref.setAttribute('type', 'text/javascript');
            fileref.setAttribute('src', jsBundle.path);
            if (typeof fileref !== 'undefined') {
              document.getElementsByTagName('head')[0].appendChild(fileref);
            }
          }
          if (cssBundle && cssBundle.path) {
            var _fileref2 = document.createElement('link');

            _fileref2.setAttribute('rel', 'stylesheet');
            _fileref2.setAttribute('type', 'text/css');
            _fileref2.setAttribute('href', cssBundle.path);
            if (typeof _fileref2 !== 'undefined') {
              document.getElementsByTagName('head')[0].appendChild(_fileref2);
            }
          }
        };

        return DynamicJsCssLoader;
      }();

      exports.default = DynamicJsCssLoader;
      module.exports = exports['default'];

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'router';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {},
        out: {}
      };

      _deepFreeze2.default.freeze(Constants);

      var Router = function () {
        _createClass(Router, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function Router() {
          _classCallCheck(this, Router);

          // we need this to easily check the current route from every component
          riot.routeState.view = '';
          this.r = riot.route.create();
          this.resetCatchAll();
        }

        Router.prototype.resetCatchAll = function resetCatchAll() {
          this.r.stop();
          var mySet = riot.state.registeredPlugins;

          for (var _iterator = mySet, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var item = _ref;

            if (item.registrants && item.registrants.routeContributer) {
              item.registrants.routeContributer.contributeRoutes(this.r);
            }
          }
          this._contributeCatchAllRoute(this.r);
        };

        Router.prototype._contributeCatchAllRoute = function _contributeCatchAllRoute(r) {
          var _this = this;

          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.contributeCatchAllRoute, r);
          if (riot.state.componentLoaderState && riot.state.componentLoaderState.components) {
            var _loop = function _loop() {
              if (_isArray2) {
                if (_i2 >= _iterator2.length) return 'break';
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) return 'break';
                _ref2 = _i2.value;
              }

              var item = _ref2;

              var component = item[1];

              if (component.state.loaded === false) {
                r(component.routeLoad.route, function () {
                  console.log('catchall route handler of:', component.routeLoad.route);

                  var path = riot.route.currentPath();

                  _this.postResetRoute = path;
                  riot.control.trigger(riot.EVT.componentLoaderStore.in.loadDynamicComponent, component.key);
                });
              }
            };

            for (var _iterator2 = riot.state.componentLoaderState.components, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              var _ret = _loop();

              if (_ret === 'break') break;
            }
          }

          r('/..', function () {
            console.log('route handler of /  ');
            riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, riot.state.route.defaultRoute);
          });
          if (this.postResetRoute != null) {
            var postResetRoute = this.postResetRoute;

            this.postResetRoute = null;
            riot.control.trigger('riot-route-dispatch', postResetRoute, true);
          }
        };

        Router.prototype.loadView = function loadView(view) {
          if (this._currentView) {
            this._currentView.unmount(true);
          }
          riot.routeState.view = view;
          this._currentView = riot.mount('#riot-app', view)[0];
        };

        return Router;
      }();

      exports.default = Router;
      module.exports = exports['default'];

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _validators = __webpack_require__(3);

      var _validators2 = _interopRequireDefault(_validators);

      var _dynamicJscssLoader = __webpack_require__(4);

      var _dynamicJscssLoader2 = _interopRequireDefault(_dynamicJscssLoader);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      } /*
        
        var testComponent = {
          "components": [{
            "key": "typicode-component",
            "jsBundle": {
              "path": "/partial/typicode_component/bundle.js"
            },
            "cssBundle": {
              "path": "/partial/typicode_component/styles.css"
            },
        
            "trigger": {
              "onLoad": [{
                "event": "SidebarStore:sidebar-add-item",
                "data": {
                  "title": "My Components Page",
                  "route": "my-component-page/home"
                }
              }],
              "onUnload": [{
                "event": "SidebarStore:sidebar-remove-item",
                "data": {
                  "title": "My Components Page"
                }
              }, {
                "event": "plugin-unregistration",
                "data": {
                  "name": "typicode-component"
                }
              }]
            },
            "routeLoad": {
              "route": "/my-component-page.."
            },
            "state": {
              "loaded": false
            }
          }]
        };
        
        riot.control.trigger('init-component-loader-store');
        riot.control.trigger('add-dynamic-component',testComponent);
        
        */

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'component-loader-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          addDynamicComponent: 'add-dynamic-component',
          addDynamicComponents: 'add-dynamic-components',
          loadDynamicComponent: 'load-dynamic-component',
          unloadDynamicComponent: 'unload-dynamic-component',

          pluginRegistered: 'plugin-registered',
          pluginUnregistered: 'plugin-unregistered'

        },
        out: {
          allComponentsLoadComplete: 'all-components-load-complete',
          componentLoaderStoreStateUpdated: 'component-loader-store-state-updated'
        }
      };

      _deepFreeze2.default.freeze(Constants);

      var ComponentLoaderStore = function (_StoreBase) {
        _inherits(ComponentLoaderStore, _StoreBase);

        _createClass(ComponentLoaderStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function ComponentLoaderStore(dynamicJsCssLoader) {
          _classCallCheck(this, ComponentLoaderStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          _validators2.default.validateType(dynamicJsCssLoader, _dynamicJscssLoader2.default, 'dynamicJsCssLoader');
          _this.dynamicJsCssLoader = dynamicJsCssLoader;

          riot.observable(_this);
          _this._components = new Set();
          riot.state.componentLoaderState = {};
          _this.state = riot.state.componentLoaderState;

          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, handler: _this._onLoadDynamicComponent }, { event: Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, handler: _this._onUnloadDymanicComponent }, { event: Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, handler: _this._onAddDynamicComponent }, { event: Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, handler: _this._onAddDynamicComponents }, { event: Constants.WELLKNOWN_EVENTS.in.pluginRegistered, handler: _this._onPluginRegistered }, { event: Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, handler: _this._onPluginUnregistered }];
          _this.bindEvents();
          return _this;
        }

        ComponentLoaderStore.prototype._commitToState = function _commitToState() {

          var componentsArray = Array.from(this._components);

          this.state.components = new Map(componentsArray.map(function (i) {
            return [i.key, i];
          }));
          this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
        };

        ComponentLoaderStore.prototype._addComponent = function _addComponent(component) {

          if (this._findComponent(component.key) == null) {
            this._components.add(component);
            this.dynamicJsCssLoader._preFetchExternalJsCss(component);
            this._commitToState();
          }
        };

        ComponentLoaderStore.prototype._findComponent = function _findComponent(key) {

          for (var _iterator = this._components, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var item = _ref;

            if (item.key === key) {
              return item;
            }
          }
          return null;
        };

        ComponentLoaderStore.prototype._onPluginRegistered = function _onPluginRegistered(registration) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.pluginRegistered, registration);
          var component = this._findComponent(registration.name);

          if (component) {
            for (var _iterator2 = component.trigger.onLoad, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var triggerItem = _ref2;

              riot.control.trigger(triggerItem.event, triggerItem.data);
            }
            component.state.loaded = true;
            this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
          }
        };

        ComponentLoaderStore.prototype._onPluginUnregistered = function _onPluginUnregistered(registration) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.pluginUnregistered, registration);
          var component = this._findComponent(registration.name);

          if (component) {
            for (var _iterator3 = component.trigger.onUnload, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
              var _ref3;

              if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
              } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
              }

              var triggerItem = _ref3;

              riot.control.trigger(triggerItem.event, triggerItem.data);
            }
            component.state.loaded = false;
            this.trigger(Constants.WELLKNOWN_EVENTS.out.componentLoaderStoreStateUpdated);
          }
        };

        ComponentLoaderStore.prototype._onAddDynamicComponent = function _onAddDynamicComponent(component) {

          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponent, component);
          var comp = this._findComponent(component.key);

          if (comp == null) {
            this._addComponent(component);

            if (this._allLoadedCompleteCheck() === true) {
              // need to trigger a load complete just on a simple add so that auto route loading can work
              riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.allComponentsLoadComplete);
            }
          }
        };

        ComponentLoaderStore.prototype._onAddDynamicComponents = function _onAddDynamicComponents(components, ack) {

          if (components) {
            console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.addDynamicComponents, components);
            for (var _iterator4 = components, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
              var _ref4;

              if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
              } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
              }

              var component = _ref4;

              var comp = this._findComponent(component.key);

              if (comp === null) {
                this._addComponent(component);
              }
            }
          }
          riot.control.trigger(ack.evt, ack);
        };

        ComponentLoaderStore.prototype._onLoadDynamicComponent = function _onLoadDynamicComponent(key) {

          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.loadDynamicComponent, key);
          var component = this._findComponent(key);

          if (component != null && component.state.loaded !== true) {
            this.dynamicJsCssLoader.loadExternalJsCss(component);
          }
        };

        ComponentLoaderStore.prototype._onUnloadDymanicComponent = function _onUnloadDymanicComponent(key) {

          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.unloadDynamicComponent, key);
          var component = this._findComponent(key);

          if (component != null && component.state.loaded === true) {
            // need to cleanup the routes and stores before we can unload the JS.
            // 1. plugin-registration-store first.

            riot.control.trigger(riot.EVT.pluginRegistrationStore.in.pluginUnregistration, {
              'name': key
            });
          }
        };

        ComponentLoaderStore.prototype._allLoadedCompleteCheck = function _allLoadedCompleteCheck() {

          var result = true;

          for (var _iterator5 = this._components, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray5) {
              if (_i5 >= _iterator5.length) break;
              _ref5 = _iterator5[_i5++];
            } else {
              _i5 = _iterator5.next();
              if (_i5.done) break;
              _ref5 = _i5.value;
            }

            var item = _ref5;

            if (item.state.loaded === true && item.state.loadedComplete === false) {
              result = false;
              break;
            }
          }
          return result;
        };

        return ComponentLoaderStore;
      }(_storeBase2.default);

      exports.default = ComponentLoaderStore;
      module.exports = exports['default'];

      /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      } /**
         * Created by Herb on 9/27/2016.
         */

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'progress-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          inprogressDone: Constants.NAMESPACE + 'inprogress-done',
          inprogressStart: Constants.NAMESPACE + 'inprogress-start'
        },
        out: {
          progressStart: Constants.NAMESPACE + 'progress-start',
          progressCount: Constants.NAMESPACE + 'progress-count',
          progressDone: Constants.NAMESPACE + 'progress-done'
        }
      };
      _deepFreeze2.default.freeze(Constants);

      var ProgressStore = function (_StoreBase) {
        _inherits(ProgressStore, _StoreBase);

        _createClass(ProgressStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function ProgressStore() {
          _classCallCheck(this, ProgressStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          riot.observable(_this);
          _this._count = 0;
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.inprogressStart, handler: _this._onInProgressStart }, { event: Constants.WELLKNOWN_EVENTS.in.inprogressDone, handler: _this._onInProgressDone }];
          _this.bindEvents();
          return _this;
        }

        ProgressStore.prototype._onInProgressStart = function _onInProgressStart() {
          if (this._count === 0) {
            this.trigger(Constants.WELLKNOWN_EVENTS.out.progressStart);
          }
          ++this._count;
          this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount, this._count);
        };

        ProgressStore.prototype._onInProgressDone = function _onInProgressDone() {
          if (this.count === 0) {
            // very bad.
            console.error(Constants.WELLKNOWN_EVENTS.in.inprogressDone, 'someone has their inprogress_done mismatched with thier inprogress_start');
          }
          if (this._count > 0) {
            --this._count;
          }
          this.trigger(Constants.WELLKNOWN_EVENTS.out.progressCount, this._count);
          if (this._count === 0) {
            this.trigger(Constants.WELLKNOWN_EVENTS.out.progressDone);
          }
        };

        return ProgressStore;
      }(_storeBase2.default);

      exports.default = ProgressStore;
      module.exports = exports['default'];

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var RandomString = function RandomString() {
        _classCallCheck(this, RandomString);

        var self = this;

        self.name = 'RandomString';
        self.namespace = self.name + ':';
        self.generateRandomString = function (length) {
          if (length && length > 16) {
            length = 16;
          } else {
            length = 16;
          }

          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        };
        self.hashString = function (str) {
          var hash = 5381;
          var i = str.length;

          while (i) {
            hash = hash * 33 ^ str.charCodeAt(--i);
          }
          /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
          * integers. Since we want the results to be always positive, convert the
          * signed int to an unsigned by doing an unsigned bitshift. */
          return hash >>> 0;
        };
        self.randomHash = function (length) {
          return self.hashString(self.generateRandomString(length));
        };
      };

      exports.default = RandomString;
      module.exports = exports['default'];

      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'riotcontrol-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {},
        out: {}
      };
      _deepFreeze2.default.freeze(Constants);

      var RiotControlExt = function () {
        _createClass(RiotControlExt, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function RiotControlExt() {
          _classCallCheck(this, RiotControlExt);

          riot.observable(this);
          this._bound = false;
          this._stores = {};
        }

        RiotControlExt.prototype.add = function add(name, store) {
          this._stores[name] = store;
          riot.control.addStore(store);
        };

        RiotControlExt.prototype.remove = function remove(name) {
          var store = this._stores[name];

          while (riot.control._stores.indexOf(store) !== -1) {
            riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
          }
        };

        return RiotControlExt;
      }();

      exports.default = RiotControlExt;
      module.exports = exports['default'];

      /***/
    },
    /* 10 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _routeStore = __webpack_require__(2);

      var _routeStore2 = _interopRequireDefault(_routeStore);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var RSWKE = _routeStore2.default.constants.WELLKNOWN_EVENTS;

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'error-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          errorCatchAll: Constants.NAMESPACE + 'catch-all:'
        },
        out: {
          routeDispatch: RSWKE.in.routeDispatch
        }
      };
      _deepFreeze2.default.freeze(Constants);

      var ErrorStore = function (_StoreBase) {
        _inherits(ErrorStore, _StoreBase);

        _createClass(ErrorStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function ErrorStore() {
          _classCallCheck(this, ErrorStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          riot.observable(_this);
          _this._bound = false;
          _this._error = {};
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.errorCatchAll, handler: _this._onError }];
          _this.bindEvents();
          return _this;
        }

        ErrorStore.prototype._onError = function _onError(error) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.errorCatchAll, error);
          this._error = error;
          riot.state.error = error;
          riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatch, '/error');
        };

        return ErrorStore;
      }(_storeBase2.default);

      exports.default = ErrorStore;
      module.exports = exports['default'];

      /***/
    },
    /* 11 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      __webpack_require__(27);

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _progressStore = __webpack_require__(7);

      var _progressStore2 = _interopRequireDefault(_progressStore);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      } /**
         * Created by Herb on 9/27/2016.
         */

      var PSWKE = _progressStore2.default.constants.WELLKNOWN_EVENTS;

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'fetch-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          fetch: Constants.NAMESPACE + 'fetch'
        },
        out: {
          inprogressDone: PSWKE.in.inprogressDone,
          inprogressStart: PSWKE.in.inprogressStart
        }
      };
      _deepFreeze2.default.freeze(Constants);

      var FetchStore = function (_StoreBase) {
        _inherits(FetchStore, _StoreBase);

        _createClass(FetchStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function FetchStore() {
          _classCallCheck(this, FetchStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          riot.observable(_this);
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.fetch, handler: _this._onFetch }];
          _this.bindEvents();
          return _this;
        }

        FetchStore.prototype._onLocalFolderFetch = function _onLocalFolderFetch(input, ack) {
          console.log(Constants.WELLKNOWN_EVENTS.in.fetch, '_onLocalFolderFetch', input, ack, window.boundAsync);
          if (window.boundAsync) {
            var result = { response: {} };

            var url = window.location.origin;
            var frontPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

            url += frontPath;
            url += input;

            window.boundAsync.fetchLocal(url).then(function (data) {
              result.json = JSON.parse(data);
              console.log(result.json);
              result.error = null;
              result.response.ok = true;
              riot.control.trigger(ack.evt, result, ack);
            });
          }
        };

        FetchStore.prototype._onLocalFetch = function _onLocalFetch(input, body, ack) {
          console.log(Constants.WELLKNOWN_EVENTS.in.fetch, '_onLocalFetch', input, ack, window.boundAsync);
          if (window.boundAsync) {
            var result = { response: {} };

            var bodyInput = JSON.stringify(body);

            window.boundAsync.fetch(input, bodyInput).then(function (data) {
              result.json = JSON.parse(data);
              console.log(data, result.json);
              result.error = null;
              result.response.ok = true;
              riot.control.trigger(ack.evt, result, ack);
            });
          }
        };

        FetchStore.prototype._onFetch = function _onFetch(input, init, ack) {
          var antiforgery = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          var jsonFixup = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

          console.log(Constants.WELLKNOWN_EVENTS.in.fetch, input, init, ack, jsonFixup);

          if (input.startsWith('local://')) {
            this._onLocalFetch(input, init, ack);
            return;
          }

          if (window.location.protocol === 'localfolder:' && !input.startsWith('http')) {
            this._onLocalFolderFetch(input, ack);
            return;
          }

          riot.control.trigger(riot.EVT.fetchStore.out.inprogressStart);
          if (jsonFixup === true) {
            if (!antiforgery) {
              antiforgery = {
                cookieName: 'XSRF-TOKEN',
                headerName: 'X-XSRF-TOKEN'
              };
            }
            var token = riot.Cookies.get(antiforgery.cookieName);

            if (!init) {
              init = {};
            }
            if (!init.headers) {
              init.headers = {};
            }

            if (token) {
              init.headers[antiforgery.headerName] = token;
            }

            if (!init.credentials) {
              init.credentials = 'include';
            }
            // we are a json shop
            if (!init.headers['Content-Type']) {
              init.headers['Content-Type'] = 'application/json';
            }

            if (!init.headers['Accept']) {
              init.headers['Accept'] = 'application/json';
            }

            if (init.body) {
              var type = _typeof(init.body);

              if (type === 'object') {
                init.body = JSON.stringify(init.body);
              }
            }
          }

          //   let myTrigger = JSON.parse(JSON.stringify(ack));

          fetch(input, init).then(function (response) {
            riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
            var result = { response: response };

            if (response.status === 204) {
              result.error = 'Fire the person that returns this 204 garbage!';
              riot.control.trigger(ack.evt, result, ack);
            }
            if (response.ok) {
              if (init.method === 'HEAD') {
                riot.control.trigger(ack.evt, result, ack);
              } else {
                response.json().then(function (data) {
                  console.log(data);
                  result.json = data;
                  result.error = null;
                  riot.control.trigger(ack.evt, result, ack);
                });
              }
            } else {
              riot.control.trigger(ack.evt, result, ack);
            }
          }).catch(function (ex) {
            console.log('fetch failed', ex);
            self.error = ex;
            // todo: event out error to ack
            riot.control.trigger(riot.EVT.fetchStore.out.inprogressDone);
          });
        };

        return FetchStore;
      }(_storeBase2.default);

      exports.default = FetchStore;
      module.exports = exports['default'];

      /***/
    },
    /* 12 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      var _routeStore = __webpack_require__(2);

      var _routeStore2 = _interopRequireDefault(_routeStore);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var RSWKE = _routeStore2.default.constants.WELLKNOWN_EVENTS;

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'history-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          errorCatchAll: Constants.NAMESPACE + 'catch-all:'
        },
        out: {
          routeDispatch: RSWKE.in.routeDispatch
        }
      };
      _deepFreeze2.default.freeze(Constants);

      var HistoryStore = function (_StoreBase) {
        _inherits(HistoryStore, _StoreBase);

        _createClass(HistoryStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function HistoryStore() {
          _classCallCheck(this, HistoryStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          var self = _this;

          riot.observable(_this);
          _this._bound = false;
          _this._error = {};
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.errorCatchAll, handler: _this._onError }];
          _this.bindEvents();
          window.onpopstate = function (event) {
            self._onPopState(event);
          };
          return _this;
        }

        HistoryStore.prototype._onError = function _onError(error) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.errorCatchAll, error);
          this._error = error;
          riot.state.error = error;
          riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.routeDispatch, '/error');
        };

        HistoryStore.prototype._onPopState = function _onPopState(event) {
          console.log(Constants.NAME, 'location: ' + document.location + ', state: ', event.state);
        };

        return HistoryStore;
      }(_storeBase2.default);

      exports.default = HistoryStore;
      module.exports = exports['default'];

      /***/
    },
    /* 13 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'keep-alive-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          fetchHeadResult: Constants.NAMESPACE + 'fetch-head-result',
          enable: Constants.NAMESPACE + 'enable',
          disable: Constants.NAMESPACE + 'disable'
        },
        out: {
          keptAlive: Constants.NAMESPACE + 'kept-alive'
        }
      };
      _deepFreeze2.default.freeze(Constants);

      var KeepAliveStore = function (_StoreBase) {
        _inherits(KeepAliveStore, _StoreBase);

        _createClass(KeepAliveStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function KeepAliveStore() {
          _classCallCheck(this, KeepAliveStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          var self = _this;

          riot.observable(_this);
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.fetchHeadResult, handler: _this._onFetchHeadResult }, { event: Constants.WELLKNOWN_EVENTS.in.enable, handler: _this._onEnable }, { event: Constants.WELLKNOWN_EVENTS.in.disable, handler: _this._onDisable }];
          self.bindEvents();
          self._keepAlive = false;
          return _this;
        }

        KeepAliveStore.prototype._onEnable = function _onEnable() {
          var _this2 = this,
              _arguments = arguments;

          var self = this;
          var w = riot.global.window;

          w._oldOpen = XMLHttpRequest.prototype.open;
          var onStateChange = function onStateChange(event) {
            if (event.currentTarget.readyState === 4) {
              self._onHttpMonitor(event.currentTarget.responseURL, event.currentTarget.status);
            }
          };

          XMLHttpRequest.prototype.open = function () {
            // when an XHR object is opened, add a listener for its readystatechange events
            _this2.addEventListener('readystatechange', onStateChange);
            // run the real `open`
            w._oldOpen.apply(_this2, _arguments);
          };

          if (!w.fetch.polyfill) {
            w._oldFetch = w.fetch;

            w.fetch = function (input, init) {
              return w._oldFetch(input, init).then(function (response) {
                self._onHttpMonitor(response.url, response.status);
                return response;
              });
            };
          }

          self.timer = setInterval(function () {
            self._onTimer();
          }, 5000);
        };

        KeepAliveStore.prototype._onDisable = function _onDisable() {
          var self = this;
          var w = riot.global.window;

          if (self.timer) {
            clearInterval(this.timer);
          }

          if (w._oldFetch) {
            w.fetch = w._oldFetch;
            w._oldFetch = null;
          }
          if (w._oldOpen) {
            XMLHttpRequest.prototype.open = w._oldOpen;
            w._oldOpen = null;
          }
        };

        KeepAliveStore.prototype._onHttpMonitor = function _onHttpMonitor(url, status) {
          var n = url.startsWith(window.location.origin);

          if (n === false) {
            this._keepAlive = true;
          }
        };

        KeepAliveStore.prototype._onTimer = function _onTimer() {
          if (this._keepAlive) {
            this._keepAlive = false;
            var myAck = {
              evt: Constants.WELLKNOWN_EVENTS.in.fetchHeadResult
            };

            riot.control.trigger(riot.EVT.fetchStore.in.fetch, riot.state.keepAlive.url, { method: 'HEAD' }, myAck);
          }
        };

        KeepAliveStore.prototype._onFetchHeadResult = function _onFetchHeadResult(result, ack) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchHeadResult, result, ack);
          this.trigger(Constants.WELLKNOWN_EVENTS.out.keptAlive);
        };

        return KeepAliveStore;
      }(_storeBase2.default);

      exports.default = KeepAliveStore;
      module.exports = exports['default'];

      /***/
    },
    /* 14 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      } /**
         * Created by Herb on 9/27/2016.
         */

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'localstorage-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          localstorageSet: Constants.NAMESPACE + 'set',
          localstorageGet: Constants.NAMESPACE + 'get',
          localstorageRemove: Constants.NAMESPACE + 'remove',
          localstorageClear: Constants.NAMESPACE + 'clear'
        },
        out: {}
      };
      _deepFreeze2.default.freeze(Constants);

      var LocalStorageStore = function (_StoreBase) {
        _inherits(LocalStorageStore, _StoreBase);

        _createClass(LocalStorageStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function LocalStorageStore() {
          _classCallCheck(this, LocalStorageStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          riot.observable(_this);
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.localstorageSet, handler: _this._onSet }, { event: Constants.WELLKNOWN_EVENTS.in.localstorageGet, handler: _this._onGet }, { event: Constants.WELLKNOWN_EVENTS.in.localstorageRemove, handler: _this._onRemove }, { event: Constants.WELLKNOWN_EVENTS.in.localstorageClear, handler: _this._onClear }];
          _this.bindEvents();
          return _this;
        }

        /*
        {
            key:[string:required],
            data: [Object],
            trigger:[optional]{
                event:[string],
                riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
            }
        }
        */

        LocalStorageStore.prototype._onSet = function _onSet(query) {
          console.log(Constants.WELLKNOWN_EVENTS.in.localstorageSet, query);
          localStorage.setItem(query.key, JSON.stringify(query.data));
          if (query.trigger) {
            this.trigger(query.trigger); // in case you want an ack
          }
        };
        /*
           {
               key:'myKey',
               trigger:{
                       event:[string],
                       riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
                }
           }
        */

        LocalStorageStore.prototype._onGet = function _onGet(query) {
          console.log(Constants.WELLKNOWN_EVENTS.in.localstorageGet, query);
          var stored = localStorage.getItem(query.key);
          var data = null;

          if (stored && stored !== 'undefined') {
            data = JSON.parse(stored);
          }
          if (query.trigger.riotControl === true) {
            riot.control.trigger(query.trigger.event, data);
          } else {
            this.trigger(query.trigger.event, data);
          }
        };
        /*
         {
         key:'myKey'
         }
         */

        LocalStorageStore.prototype._onRemove = function _onRemove(query) {
          console.log(Constants.WELLKNOWN_EVENTS.in.localstorageRemove, query);
          localStorage.removeItem(query.key);
        };

        LocalStorageStore.prototype._onClear = function _onClear() {
          console.log(Constants.WELLKNOWN_EVENTS.in.localstorageClear);
          localStorage.clear();
        };

        return LocalStorageStore;
      }(_storeBase2.default);

      exports.default = LocalStorageStore;
      module.exports = exports['default'];

      /***/
    },
    /* 15 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _validators = __webpack_require__(3);

      var _validators2 = _interopRequireDefault(_validators);

      var _riotcontrolExt = __webpack_require__(9);

      var _riotcontrolExt2 = _interopRequireDefault(_riotcontrolExt);

      __webpack_require__(5);

      var _dynamicJscssLoader = __webpack_require__(4);

      var _dynamicJscssLoader2 = _interopRequireDefault(_dynamicJscssLoader);

      var _componentLoaderStore = __webpack_require__(6);

      var _componentLoaderStore2 = _interopRequireDefault(_componentLoaderStore);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /*
      var registerRecord = {
        name:'riotjs-partial-spa',
        views:[
          {view:'my-component-page'},
          {view:'typicode-user-detail'}
        ],
        stores:[
          {store: new TypicodeUserStore()}
        ],
        postLoadEvents:[
          {event:'typicode-init',data:{}}
        ],
        preUnloadEvents:[
          {event:'typicode-uninit',data:{}}
        ]
      };
      riot.control.trigger('plugin-registration',registerRecord);
      
      */

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'plugin-registration-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          pluginRegistration: 'plugin-registration',
          pluginUnregistration: 'plugin-unregistration'
        },
        out: {
          pluginRegistered: 'plugin-registered',
          pluginUnregistered: 'plugin-unregistered'
        }
      };
      _deepFreeze2.default.freeze(Constants);

      var PluginRegistrationStore = function (_StoreBase) {
        _inherits(PluginRegistrationStore, _StoreBase);

        _createClass(PluginRegistrationStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function PluginRegistrationStore(riotControlExt, dynamicJsCssLoader, componentLoaderStore) {
          _classCallCheck(this, PluginRegistrationStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          _validators2.default.validateType(riotControlExt, _riotcontrolExt2.default, 'riotControlExt');
          _validators2.default.validateType(dynamicJsCssLoader, _dynamicJscssLoader2.default, 'dynamicJsCssLoader');
          _validators2.default.validateType(componentLoaderStore, _componentLoaderStore2.default, 'componentLoaderStore');

          riot.observable(_this);
          _this.riotControlExt = riotControlExt;
          _this.dynamicJsCssLoader = dynamicJsCssLoader;
          _this.componentLoaderStore = componentLoaderStore;

          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.pluginRegistration, handler: _this._registerPlugin }, { event: Constants.WELLKNOWN_EVENTS.in.pluginUnregistration, handler: _this._unregisterPlugin }];
          _this.bindEvents();
          riot.state.registeredPlugins = new Set();

          return _this;
        }

        PluginRegistrationStore.prototype._findRegistration = function _findRegistration(registrationName) {

          var mySet = riot.state.registeredPlugins;

          for (var _iterator = mySet, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var item = _ref;

            if (item.name === registrationName) {
              return item;
            }
          }
          return null;
        };

        PluginRegistrationStore.prototype._removeRegistration = function _removeRegistration(registrationName) {

          var mySet = riot.state.registeredPlugins;

          for (var _iterator2 = mySet, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var item = _ref2;

            if (item.name === registrationName) {
              mySet.delete(item);
              break;
            }
          }
          return null;
        };

        PluginRegistrationStore.prototype._registerPlugin = function _registerPlugin(registration) {

          var foundRegistration = this._findRegistration(registration.name);

          if (foundRegistration === null) {

            // 1. Add the registration record
            riot.state.registeredPlugins.add(registration);

            // 2. Ready up the stores
            for (var i = 0; i < registration.stores.length; i++) {

              // 2.1 Tell the stores to START listening.  Doing a bind, which may not be neccessary
              //    but it has to match the unbind that I am doing later in the unregister.
              //    It is required to be implemented, even if it is a noop.
              registration.stores[i].store.bindEvents();

              // 2.2 Add the stores
              registration.stores[i].name = registration.name + '-store-' + i; // need this for my own tracking
              this.riotControlExt.add(registration.stores[i].name, registration.stores[i].store);
            }

            // 3. fire post load events
            //    NOTE: we do NOT fire unload events as they are async and these stores have to go
            for (var _i3 = 0; _i3 < registration.postLoadEvents.length; _i3++) {
              riot.control.trigger(registration.postLoadEvents[_i3].event, registration.postLoadEvents[_i3].data);
            }

            // 4. Rebuild the routes.
            riot.router.resetCatchAll(); // this rebuilds the routes, without the above nulled one

            // FINALLY. Tell the world that things have changed.
            riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.pluginRegistered, registration);
          } else {
            console.error(Constants.NAME, registration, 'plugin already registered!');
          }
        };

        PluginRegistrationStore.prototype._unregisterPlugin = function _unregisterPlugin(registration) {

          var foundRegistration = this._findRegistration(registration.name);

          if (foundRegistration === null) {
            console.error(Constants.NAME, registration, 'plugin already unregistered!');
          } else {
            // 0. We do NOT fire unregister events as the stores will be gone before any event can reach them

            // 1. Tell the router to drop all routes for this component.
            var component = this.componentLoaderStore._findComponent(foundRegistration.name);

            if (component && foundRegistration.registrants && foundRegistration.registrants.routeContributer) {
              component.state.loaded = false;
              foundRegistration.registrants.routeContributer = null; // get rid of the contributer.
              riot.router.resetCatchAll(); // this rebuilds the routes, without the above nulled one
            }

            // 2. Shutdown the stores
            for (var i = 0; i < foundRegistration.stores.length; i++) {

              // 2.1. Tell the store to STOP listening.
              foundRegistration.stores[i].store.unbindEvents(); // stop listening

              // 2.2. Remove the store.
              this.riotControlExt.remove(foundRegistration.stores[i].name);
            }

            // 3. Unload the JSCSS stuff.
            this.dynamicJsCssLoader.unloadExternalJsCss(component);

            // 4. Remove the registration record
            this._removeRegistration(foundRegistration.name);

            // FINALLY. Tell the world that things have changed.
            riot.control.trigger(Constants.WELLKNOWN_EVENTS.out.pluginUnregistered, registration);
          }
        };

        return PluginRegistrationStore;
      }(_storeBase2.default);

      exports.default = PluginRegistrationStore;
      module.exports = exports['default'];

      /***/
    },
    /* 16 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'riotcontrol-dispatch-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          dispatch: Constants.NAMESPACE + 'dispatch'
        },
        out: {}
      };
      _deepFreeze2.default.freeze(Constants);

      var RiotControlDispatchStore = function (_StoreBase) {
        _inherits(RiotControlDispatchStore, _StoreBase);

        _createClass(RiotControlDispatchStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function RiotControlDispatchStore() {
          _classCallCheck(this, RiotControlDispatchStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          riot.observable(_this);
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.dispatch, handler: _this._onDispatch }];
          _this.bindEvents();
          return _this;
        }

        RiotControlDispatchStore.prototype._onDispatch = function _onDispatch(event, data) {
          console.log(Constants.WELLKNOWN_EVENTS.in.dispatch, event, data);
          this.trigger(event, data);
        };

        return RiotControlDispatchStore;
      }(_storeBase2.default);

      exports.default = RiotControlDispatchStore;
      module.exports = exports['default'];

      /***/
    },
    /* 17 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _router = __webpack_require__(5);

      var _router2 = _interopRequireDefault(_router);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Constants = function Constants() {
        _classCallCheck(this, Constants);
      };

      Constants.NAME = 'startup-store';
      Constants.NAMESPACE = Constants.NAME + ':';
      Constants.WELLKNOWN_EVENTS = {
        in: {
          start: Constants.NAMESPACE + 'start',
          fetchConfig: Constants.NAMESPACE + 'fetch-config',
          fetchConfigResult: Constants.NAMESPACE + 'fetch-config-result',
          fetchConfigResult2: Constants.NAMESPACE + 'fetch-config-result2',
          componentsAdded: Constants.NAMESPACE + 'components-added'

        },
        out: {
          configComplete: Constants.NAMESPACE + 'config-complete'
        }
      };

      _deepFreeze2.default.freeze(Constants);

      var StartupStore = function (_StoreBase) {
        _inherits(StartupStore, _StoreBase);

        _createClass(StartupStore, null, [{
          key: 'constants',
          get: function get() {
            return Constants;
          }
        }]);

        function StartupStore() {
          _classCallCheck(this, StartupStore);

          var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

          riot.observable(_this);

          _this._startupComplete = false;
          _this._done = false;
          _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.start, handler: _this._onStart }, { event: Constants.WELLKNOWN_EVENTS.in.fetchConfig, handler: _this._onFetchConfig }, { event: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, handler: _this._onFetchConfigResult2 }, { event: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, handler: _this._onFetchConfigResult }, { event: Constants.WELLKNOWN_EVENTS.in.componentsAdded, handler: _this._onComponentsAdded }];
          _this.bindEvents();
          return _this;
        }

        StartupStore.prototype._onComponentsAdded = function _onComponentsAdded(ack) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.componentsAdded, ack);
          this.trigger(Constants.WELLKNOWN_EVENTS.out.configComplete);
          //    riot.control.trigger(ack.ack.evt, ack.ack);
        };

        StartupStore.prototype._onFetchConfigResult = function _onFetchConfigResult(result, ack) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, result, ack);
          if (result.error || !result.response.ok) {
            riot.control.trigger(riot.EVT.errorStore.in.errorCatchAll, { code: 'startup-config1234' });
          } else {
            riot.control.trigger(riot.EVT.componentLoaderStore.in.addDynamicComponents, result.json.components, { evt: Constants.WELLKNOWN_EVENTS.in.componentsAdded });
          }
        };

        StartupStore.prototype._onFetchConfigResult2 = function _onFetchConfigResult2(result, ack) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2, result, ack);
        };

        StartupStore.prototype._onFetchConfig = function _onFetchConfig(path) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfig, path);
          var url = path;
          var myAck = {
            evt: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult
          };
          var myAck2 = {
            evt: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult2
          };

          riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, { method: 'HEAD' }, myAck2);
          riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, myAck);
        };

        StartupStore.prototype._onStart = function _onStart(nextTag) {
          console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.start, this._done, nextTag);
          if (this._done) {
            return;
          }

          if (!nextTag) {
            nextTag = 'app';
          }
          if (nextTag === 'app') {
            this._done = true;
            // only when the nextTag is 'app' do we engage the router.
            // 'app' is last
            riot.router = new _router2.default();
            riot.mount(nextTag);
            riot.route.start(true);
          } else {
            riot.mount(nextTag);
          }
        };

        return StartupStore;
      }(_storeBase2.default);

      exports.default = StartupStore;
      module.exports = exports['default'];

      /***/
    },
    /* 18 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

      /***/
    },
    /* 19 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      __webpack_require__(18);

      var _riotRoute = __webpack_require__(25);

      var _riotRoute2 = _interopRequireDefault(_riotRoute);

      var _jsCookie = __webpack_require__(24);

      var _jsCookie2 = _interopRequireDefault(_jsCookie);

      var _riotcontrol = __webpack_require__(26);

      var _riotcontrol2 = _interopRequireDefault(_riotcontrol);

      var _randomString = __webpack_require__(8);

      var _randomString2 = _interopRequireDefault(_randomString);

      var _riotRouteExtension = __webpack_require__(20);

      var _riotRouteExtension2 = _interopRequireDefault(_riotRouteExtension);

      var _progressStore = __webpack_require__(7);

      var _progressStore2 = _interopRequireDefault(_progressStore);

      var _dynamicJscssLoader = __webpack_require__(4);

      var _dynamicJscssLoader2 = _interopRequireDefault(_dynamicJscssLoader);

      var _componentLoaderStore = __webpack_require__(6);

      var _componentLoaderStore2 = _interopRequireDefault(_componentLoaderStore);

      var _errorStore = __webpack_require__(10);

      var _errorStore2 = _interopRequireDefault(_errorStore);

      var _historyStore = __webpack_require__(12);

      var _historyStore2 = _interopRequireDefault(_historyStore);

      var _fetchStore = __webpack_require__(11);

      var _fetchStore2 = _interopRequireDefault(_fetchStore);

      var _localstorageStore = __webpack_require__(14);

      var _localstorageStore2 = _interopRequireDefault(_localstorageStore);

      var _riotcontrolExt = __webpack_require__(9);

      var _riotcontrolExt2 = _interopRequireDefault(_riotcontrolExt);

      var _routeStore = __webpack_require__(2);

      var _routeStore2 = _interopRequireDefault(_routeStore);

      var _pluginRegistrationStore = __webpack_require__(15);

      var _pluginRegistrationStore2 = _interopRequireDefault(_pluginRegistrationStore);

      var _startupStore = __webpack_require__(17);

      var _startupStore2 = _interopRequireDefault(_startupStore);

      var _riotcontrolDispatchStore = __webpack_require__(16);

      var _riotcontrolDispatchStore2 = _interopRequireDefault(_riotcontrolDispatchStore);

      var _keepAliveStore = __webpack_require__(13);

      var _keepAliveStore2 = _interopRequireDefault(_keepAliveStore);

      var _masterEventTable = __webpack_require__(22);

      var _masterEventTable2 = _interopRequireDefault(_masterEventTable);

      __webpack_require__(23);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      riot.global = {};
      riot.Cookies = _jsCookie2.default;

      var P7HostCore = function () {
        function P7HostCore() {
          _classCallCheck(this, P7HostCore);

          this._masterEventTable = new _masterEventTable2.default();
          this._name = 'P7HostCore';
          window.riot = riot; // TODO: ask Zeke about this
          riot.route = _riotRoute2.default;
          riot.control = _riotcontrol2.default;
          riot.state = {};
        }

        P7HostCore.prototype.Initialize = function Initialize() {

          riot.routeState = {};

          var randomString = new _randomString2.default();
          var hash = randomString.randomHash();

          riot.state = {
            _internal: {
              hash: hash
            },
            error: { code: 'unknown' },
            route: {
              defaultRoute: 'main/home'
            }
          };
          this._riotRouteExtension = new _riotRouteExtension2.default();

          this._progressStore = new _progressStore2.default();
          this._dynamicJsCssLoader = new _dynamicJscssLoader2.default();
          this._errorStore = new _errorStore2.default();
          this._fetchStore = new _fetchStore2.default();
          this._localStorageStore = new _localstorageStore2.default();
          this._riotControlExt = new _riotcontrolExt2.default();
          this._routeStore = new _routeStore2.default();
          this._keepAliveStore = new _keepAliveStore2.default();
          this._historyStore = new _historyStore2.default();

          this._componentLoaderStore = new _componentLoaderStore2.default(this._dynamicJsCssLoader);
          this._pluginRegistrationStore = new _pluginRegistrationStore2.default(this._riotControlExt, this._dynamicJsCssLoader, this._componentLoaderStore);

          this._riotControlDispatchStore = new _riotcontrolDispatchStore2.default();
          this._startupStore = new _startupStore2.default();

          riot.control.addStore(this._progressStore);
          riot.control.addStore(this._componentLoaderStore);
          riot.control.addStore(this._errorStore);
          riot.control.addStore(this._fetchStore);
          riot.control.addStore(this._localStorageStore);
          riot.control.addStore(this._routeStore);
          riot.control.addStore(this._pluginRegistrationStore);
          riot.control.addStore(this._riotControlDispatchStore);
          riot.control.addStore(this._keepAliveStore);
          riot.control.addStore(this._startupStore);
          riot.control.addStore(this._historyStore);

          return riot;
        };

        _createClass(P7HostCore, [{
          key: 'name',
          get: function get() {
            return this._name;
          }
        }]);

        return P7HostCore;
      }();

      exports.default = P7HostCore;
      module.exports = exports['default'];

      /***/
    },
    /* 20 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var RiotRouteExtension = function RiotRouteExtension() {
        _classCallCheck(this, RiotRouteExtension);

        var self = this;

        self.name = 'RiotRouteExtension';
        self.namespace = self.name + ':';
        self.currentPath = '';

        self._defaultParser = function (path) {
          self.currentPath = path;
          return path.split(/[/?#]/);
        };
        self._getCurrentPath = function () {
          return self.currentPath;
        };
        riot.route.parser(self._defaultParser, null);
        riot.route.currentPath = self._getCurrentPath;
      };

      exports.default = RiotRouteExtension;
      module.exports = exports['default'];

      /***/
    },
    /* 21 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.StoreBase = exports.Validator = exports.P7HostCore = exports.RandomString = exports.DeepFreeze = undefined;

      var _deepFreeze = __webpack_require__(0);

      var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

      var _randomString = __webpack_require__(8);

      var _randomString2 = _interopRequireDefault(_randomString);

      var _p7HostCore = __webpack_require__(19);

      var _p7HostCore2 = _interopRequireDefault(_p7HostCore);

      var _validators = __webpack_require__(3);

      var _validators2 = _interopRequireDefault(_validators);

      var _storeBase = __webpack_require__(1);

      var _storeBase2 = _interopRequireDefault(_storeBase);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.DeepFreeze = _deepFreeze2.default;
      exports.RandomString = _randomString2.default;
      exports.P7HostCore = _p7HostCore2.default;
      exports.Validator = _validators2.default;
      exports.StoreBase = _storeBase2.default;

      window.P7HostCore = {
        DeepFreeze: _deepFreeze2.default,
        RandomString: _randomString2.default,
        Validator: _validators2.default,
        StoreBase: _storeBase2.default
      };

      /***/
    },
    /* 22 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _progressStore = __webpack_require__(7);

      var _progressStore2 = _interopRequireDefault(_progressStore);

      var _fetchStore = __webpack_require__(11);

      var _fetchStore2 = _interopRequireDefault(_fetchStore);

      var _componentLoaderStore = __webpack_require__(6);

      var _componentLoaderStore2 = _interopRequireDefault(_componentLoaderStore);

      var _localstorageStore = __webpack_require__(14);

      var _localstorageStore2 = _interopRequireDefault(_localstorageStore);

      var _errorStore = __webpack_require__(10);

      var _errorStore2 = _interopRequireDefault(_errorStore);

      var _historyStore = __webpack_require__(12);

      var _historyStore2 = _interopRequireDefault(_historyStore);

      var _routeStore = __webpack_require__(2);

      var _routeStore2 = _interopRequireDefault(_routeStore);

      var _riotcontrolDispatchStore = __webpack_require__(16);

      var _riotcontrolDispatchStore2 = _interopRequireDefault(_riotcontrolDispatchStore);

      var _pluginRegistrationStore = __webpack_require__(15);

      var _pluginRegistrationStore2 = _interopRequireDefault(_pluginRegistrationStore);

      var _startupStore = __webpack_require__(17);

      var _startupStore2 = _interopRequireDefault(_startupStore);

      var _keepAliveStore = __webpack_require__(13);

      var _keepAliveStore2 = _interopRequireDefault(_keepAliveStore);

      var _router = __webpack_require__(5);

      var _router2 = _interopRequireDefault(_router);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var MasterEventTable = function MasterEventTable() {
        _classCallCheck(this, MasterEventTable);

        riot.EVT = {};

        riot.EVT.keepAliveStore = _keepAliveStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.progressStore = _progressStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.routeStore = _routeStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.componentLoaderStore = _componentLoaderStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.errorStore = _errorStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.fetchStore = _fetchStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.localStorageStore = _localstorageStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.riotControlDispatchStore = _riotcontrolDispatchStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.pluginRegistrationStore = _pluginRegistrationStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.startupStore = _startupStore2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.router = _router2.default.constants.WELLKNOWN_EVENTS;
        riot.EVT.historyStore = _historyStore2.default.constants.WELLKNOWN_EVENTS;
      };

      exports.default = MasterEventTable;
      module.exports = exports['default'];

      /***/
    },
    /* 23 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var riot = __webpack_require__(18);
      riot.tag2('startup', '', '', '', function (opts) {
        var self = this;

        riot.global.window = self.opts.window;

        if (self.opts.config) {
          self.config = self.opts.config;
        }
        self.keepAlive = self.opts.keepAlive;
        riot.state.keepAlive = { url: self.keepAlive };

        self.nextTag = 'app';
        if (self.opts.nextTag) {
          self.nextTag = self.opts.nextTag;
        }
        self.loaded = false;
        self._bind = function () {
          riot.control.on('startup-store:config-complete', self.onConfigComplete);
        };
        self._unbind = function () {
          riot.control.off('startup-store:config-complete', self.onConfigComplete);
        };

        self.on('mount', function () {
          self._bind();
          riot.control.trigger(riot.EVT.startupStore.in.fetchConfig, self.config);
          if (self.keepAlive) {
            riot.control.trigger('keep-alive-store:enable');
          }
        });

        self.on('unmount', function () {
          self._unbind();
        });

        self.onConfigComplete = function () {
          if (!self.loaded) {
            self.loaded = true;
            self._unbind();
            riot.control.trigger(riot.EVT.startupStore.in.start, self.nextTag);
          }
        };
      });

      /***/
    },
    /* 24 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

      /***/
    },
    /* 25 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_25__;

      /***/
    },
    /* 26 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

      /***/
    },
    /* 27 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_27__;

      /***/
    }])
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(25)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot_observable__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot_observable__);


/**
 * Simple client-side router
 * @module riot-route
 */

var RE_ORIGIN = /^.+?\/\/+[^\/]+/;
var EVENT_LISTENER = 'EventListener';
var REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER;
var ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER;
var HAS_ATTRIBUTE = 'hasAttribute';
var POPSTATE = 'popstate';
var HASHCHANGE = 'hashchange';
var TRIGGER = 'trigger';
var MAX_EMIT_STACK_LEVEL = 3;
var win = typeof window != 'undefined' && window;
var doc = typeof document != 'undefined' && document;
var hist = win && history;
var loc = win && (hist.location || win.location);
var prot = Router.prototype;
var clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click';
var central = __WEBPACK_IMPORTED_MODULE_0_riot_observable___default()();

var started = false;
var routeFound = false;
var debouncedEmit;
var base;
var current;
var parser;
var secondParser;
var emitStack = [];
var emitStackLevel = 0;

/**
 * Default parser. You can replace it via router.parser method.
 * @param {string} path - current path (normalized)
 * @returns {array} array
 */
function DEFAULT_PARSER(path) {
  return path.split(/[/?#]/)
}

/**
 * Default parser (second). You can replace it via router.parser method.
 * @param {string} path - current path (normalized)
 * @param {string} filter - filter string (normalized)
 * @returns {array} array
 */
function DEFAULT_SECOND_PARSER(path, filter) {
  var f = filter
    .replace(/\?/g, '\\?')
    .replace(/\*/g, '([^/?#]+?)')
    .replace(/\.\./, '.*');
  var re = new RegExp(("^" + f + "$"));
  var args = path.match(re);

  if (args) { return args.slice(1) }
}

/**
 * Simple/cheap debounce implementation
 * @param   {function} fn - callback
 * @param   {number} delay - delay in seconds
 * @returns {function} debounced function
 */
function debounce(fn, delay) {
  var t;
  return function () {
    clearTimeout(t);
    t = setTimeout(fn, delay);
  }
}

/**
 * Set the window listeners to trigger the routes
 * @param {boolean} autoExec - see route.start
 */
function start(autoExec) {
  debouncedEmit = debounce(emit, 1);
  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
  doc[ADD_EVENT_LISTENER](clickEvent, click);
  if (autoExec) { emit(true); }
}

/**
 * Router class
 */
function Router() {
  this.$ = [];
  __WEBPACK_IMPORTED_MODULE_0_riot_observable___default()(this); // make it observable
  central.on('stop', this.s.bind(this));
  central.on('emit', this.e.bind(this));
}

function normalize(path) {
  return path.replace(/^\/|\/$/, '')
}

function isString(str) {
  return typeof str == 'string'
}

/**
 * Get the part after domain name
 * @param {string} href - fullpath
 * @returns {string} path from root
 */
function getPathFromRoot(href) {
  return (href || loc.href).replace(RE_ORIGIN, '')
}

/**
 * Get the part after base
 * @param {string} href - fullpath
 * @returns {string} path from base
 */
function getPathFromBase(href) {
  return base[0] === '#'
    ? (href || loc.href || '').split(base)[1] || ''
    : (loc ? getPathFromRoot(href) : href || '').replace(base, '')
}

function emit(force) {
  // the stack is needed for redirections
  var isRoot = emitStackLevel === 0;
  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) { return }

  emitStackLevel++;
  emitStack.push(function() {
    var path = getPathFromBase();
    if (force || path !== current) {
      central[TRIGGER]('emit', path);
      current = path;
    }
  });
  if (isRoot) {
    var first;
    while (first = emitStack.shift()) { first(); } // stack increses within this call
    emitStackLevel = 0;
  }
}

function click(e) {
  if (
    e.which !== 1 // not left click
    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
    || e.defaultPrevented // or default prevented
  ) { return }

  var el = e.target;
  while (el && el.nodeName !== 'A') { el = el.parentNode; }

  if (
    !el || el.nodeName !== 'A' // not A tag
    || el[HAS_ATTRIBUTE]('download') // has download attr
    || !el[HAS_ATTRIBUTE]('href') // has no href attr
    || el.target && el.target !== '_self' // another window or frame
    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) === -1 // cross origin
  ) { return }

  if (el.href !== loc.href
    && (
      el.href.split('#')[0] === loc.href.split('#')[0] // internal jump
      || base[0] !== '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
      || base[0] === '#' && el.href.split(base)[0] !== loc.href.split(base)[0] // outside of #base
      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
    )) { return }

  e.preventDefault();
}

/**
 * Go to the path
 * @param {string} path - destination path
 * @param {string} title - page title
 * @param {boolean} shouldReplace - use replaceState or pushState
 * @returns {boolean} - route not found flag
 */
function go(path, title, shouldReplace) {
  // Server-side usage: directly execute handlers for the path
  if (!hist) { return central[TRIGGER]('emit', getPathFromBase(path)) }

  path = base + normalize(path);
  title = title || doc.title;
  // browsers ignores the second parameter `title`
  shouldReplace
    ? hist.replaceState(null, title, path)
    : hist.pushState(null, title, path);
  // so we need to set it manually
  doc.title = title;
  routeFound = false;
  emit();
  return routeFound
}

/**
 * Go to path or set action
 * a single string:                go there
 * two strings:                    go there with setting a title
 * two strings and boolean:        replace history with setting a title
 * a single function:              set an action on the default route
 * a string/RegExp and a function: set an action on the route
 * @param {(string|function)} first - path / action / filter
 * @param {(string|RegExp|function)} second - title / action
 * @param {boolean} third - replace flag
 */
prot.m = function(first, second, third) {
  if (isString(first) && (!second || isString(second))) { go(first, second, third || false); }
  else if (second) { this.r(first, second); }
  else { this.r('@', first); }
};

/**
 * Stop routing
 */
prot.s = function() {
  this.off('*');
  this.$ = [];
};

/**
 * Emit
 * @param {string} path - path
 */
prot.e = function(path) {
  this.$.concat('@').some(function(filter) {
    var args = (filter === '@' ? parser : secondParser)(normalize(path), normalize(filter));
    if (typeof args != 'undefined') {
      this[TRIGGER].apply(null, [filter].concat(args));
      return routeFound = true // exit from loop
    }
  }, this);
};

/**
 * Register route
 * @param {string} filter - filter for matching to url
 * @param {function} action - action to register
 */
prot.r = function(filter, action) {
  if (filter !== '@') {
    filter = '/' + normalize(filter);
    this.$.push(filter);
  }
  this.on(filter, action);
};

var mainRouter = new Router();
var route = mainRouter.m.bind(mainRouter);

/**
 * Create a sub router
 * @returns {function} the method of a new Router object
 */
route.create = function() {
  var newSubRouter = new Router();
  // assign sub-router's main method
  var router = newSubRouter.m.bind(newSubRouter);
  // stop only this sub-router
  router.stop = newSubRouter.s.bind(newSubRouter);
  return router
};

/**
 * Set the base of url
 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
 */
route.base = function(arg) {
  base = arg || '#';
  current = getPathFromBase(); // recalculate current path
};

/** Exec routing right now **/
route.exec = function() {
  emit(true);
};

/**
 * Replace the default router to yours
 * @param {function} fn - your parser function
 * @param {function} fn2 - your secondParser function
 */
route.parser = function(fn, fn2) {
  if (!fn && !fn2) {
    // reset parser for testing...
    parser = DEFAULT_PARSER;
    secondParser = DEFAULT_SECOND_PARSER;
  }
  if (fn) { parser = fn; }
  if (fn2) { secondParser = fn2; }
};

/**
 * Helper function to get url query as an object
 * @returns {object} parsed query
 */
route.query = function() {
  var q = {};
  var href = loc.href || current;
  href.replace(/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v; });
  return q
};

/** Stop routing **/
route.stop = function () {
  if (started) {
    if (win) {
      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
      doc[REMOVE_EVENT_LISTENER](clickEvent, click);
    }
    central[TRIGGER]('stop');
    started = false;
  }
};

/**
 * Start routing
 * @param {boolean} autoExec - automatically exec after starting if true
 */
route.start = function (autoExec) {
  if (!started) {
    if (win) {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        start(autoExec);
      }
      else {
        document.onreadystatechange = function () {
          if (document.readyState === 'interactive') {
            // the timeout is needed to solve
            // a weird safari bug https://github.com/riot/route/issues/33
            setTimeout(function() { start(autoExec); }, 1);
          }
        };
      }
    }
    started = true;
  }
};

/** Prepare the router **/
route.base();
route.parser();

/* harmony default export */ __webpack_exports__["default"] = (route);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var RiotControl = {
  _stores: [],
  addStore: function(store) {
    this._stores.push(store);
  },
  reset: function() {
    this._stores = [];
  }
};

['on','one','off','trigger'].forEach(function(api){
  RiotControl[api] = function() {
    var args = [].slice.call(arguments);
    this._stores.forEach(function(el){
      el[api].apply(el, args);
    });
  };
});

if (true) module.exports = RiotControl;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);

__webpack_require__(16);

__webpack_require__(14);

var _routeContributer = __webpack_require__(21);

var _routeContributer2 = _interopRequireDefault(_routeContributer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var riot = __webpack_require__(0);

riot.tag2('app', '<loading-indicator></loading-indicator> <header></header> <div class="container-fluid"> <div class="row"> <div class="col-sm-3 col-md-2 sidebar"> <div class="list-group table-of-contents"> <sidebar></sidebar> </div> </div> <div id="mainContent" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> <div id="riot-app"></div> <div class="alert alert-dismissible alert-success" ref="success-alert" id="success-alert"> <button type="button" class="close" data-dismiss="alert">&times;</button> <strong>Success! </strong> A successful keep-alive has been issued. </div> </div> </div> </div>', '', '', function (opts) {
  var self = this;
  self.name = 'app';
  self.on('before-mount', function () {
    console.log('before-mount');
    var routeContributer = new _routeContributer2.default();
    var registerRecord = {
      name: 'main-component',
      stores: [],
      registrants: {
        routeContributer: routeContributer
      },
      postLoadEvents: [],
      preUnloadEvents: []
    };

    riot.control.trigger('plugin-registration', registerRecord);
  });

  self._bind = function () {
    riot.control.on(riot.EVT.keepAliveStore.out.keptAlive, self.onKeptAlive);
  };

  self._unbind = function () {
    riot.control.off(riot.EVT.keepAliveStore.out.keptAlive, self.onKeptAlive);
  };
  self.onKeptAlive = function () {
    console.log(self.name, 'onKeptAlive');

    $("#success-alert").alert();
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
      $("#success-alert").slideUp(500);
    });
  };

  self.on('mount', function () {
    console.log(self.name, 'mount');
    self._bind();
    $("#success-alert").hide();
  });

  self.on('unmount', function () {
    console.log(self.name, 'unmount');
    self._unbind();
  });
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('my-next-startup', '', '', '', function (opts) {
  var self = this;
  if (self.opts.config) {
    self.config = self.opts.config;
  }
  self.nextTag = 'app';
  if (self.opts.nextTag) {
    self.nextTag = self.opts.nextTag;
  }

  self.loaded = false;

  self._bind = function () {
    riot.control.on('next-config-store:config-complete', self.onConfigComplete);
  };
  self._unbind = function () {
    riot.control.off('next-config-store:config-complete', self.onConfigComplete);
  };

  self.on('mount', function () {
    self._bind();
    riot.control.trigger('next-config-store:fetch-config', self.config);
  });

  self.on('unmount', function () {
    self._unbind();
  });

  self.onConfigComplete = function () {
    if (!self.loaded) {
      self.loaded = true;
      self._unbind();
      riot.control.trigger(riot.EVT.startupStore.in.start, self.nextTag);
    }
  };
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var OptsMixin = {

  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function init() {
    console.log('OptsMixin:init:', this);
  },

  getOpts: function getOpts() {
    return this.opts;
  },

  setOpts: function setOpts(opts, update) {
    this.opts = opts;
    if (!update) {
      this.update();
    }
    return this;
  }
};

if (true) module.exports = OptsMixin;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _P7HostCore = __webpack_require__(1);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'next-config-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    fetchConfig: Constants.NAMESPACE + 'fetch-config',
    fetchConfigResult: Constants.NAMESPACE + 'fetch-config-result',
    fetchConfigHeadResult: Constants.NAMESPACE + 'fetch-config-head-result',
    downloadRecordsResult: Constants.NAMESPACE + 'download-records-result'
  },
  out: {
    configComplete: Constants.NAMESPACE + 'config-complete'
  }
};
_P7HostCore.DeepFreeze.freeze(Constants);

var NextConfigStore = function (_StoreBase) {
  _inherits(NextConfigStore, _StoreBase);

  _createClass(NextConfigStore, null, [{
    key: 'constants',
    get: function get() {
      return Constants;
    }
  }]);

  function NextConfigStore() {
    _classCallCheck(this, NextConfigStore);

    var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

    riot.observable(_this);
    _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.fetchConfig, handler: _this._onFetchConfig }, { event: Constants.WELLKNOWN_EVENTS.in.fetchConfigResult, handler: _this._onFetchConfigResult }, { event: Constants.WELLKNOWN_EVENTS.in.fetchConfigHeadResult, handler: _this._onFetchConfigHeadResult }, { event: Constants.WELLKNOWN_EVENTS.in.downloadRecordsResult, handler: _this._onDownloadRecordsResult }];
    _this.bindEvents();
    return _this;
  }

  NextConfigStore.prototype._onFetchConfig = function _onFetchConfig(path) {
    console.log(Constants.NAME, Constants.WELLKNOWN_EVENTS.in.fetchConfig, path);
    this.off(Constants.WELLKNOWN_EVENTS.in.fetchConfig, this._onFetchConfig); // done with this one.

    var url = path;
    var myAck = {
      evt: riot.EVT.nextConfigStore.in.fetchConfigResult
    };

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, myAck);

    var myAck2 = {
      evt: riot.EVT.nextConfigStore.in.fetchConfigHeadResult
    };

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, 'local://my-command/my-action', {
      someString: 'Hello from riot',
      someInt: 41
    }, myAck2);

    var myAck3 = {
      evt: riot.EVT.nextConfigStore.in.downloadRecordsResult
    };

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, 'local://download/records', null, myAck3);
  };

  NextConfigStore.prototype._onFetchConfigResult = function _onFetchConfigResult(result, ack) {
    console.log(Constants.NAME, riot.EVT.nextConfigStore.in.fetchConfigResult, result, ack);
    this.off(riot.EVT.nextConfigStore.in.fetchConfigResult, this._onFetchConfigResult); // done with this one

    if (result.error || !result.response.ok) {
      riot.control.trigger(riot.EVT.errorStore.in.errorCatchAll, { code: 'startup-config1234' });
    } else {
      this.trigger(Constants.WELLKNOWN_EVENTS.out.configComplete);
    }
  };

  NextConfigStore.prototype._onFetchConfigHeadResult = function _onFetchConfigHeadResult(result, ack) {
    console.log(Constants.NAME, riot.EVT.nextConfigStore.in.fetchConfigHeadResult, result, ack);
  };

  NextConfigStore.prototype._onDownloadRecordsResult = function _onDownloadRecordsResult(result, ack) {
    console.log(Constants.NAME, riot.EVT.nextConfigStore.in.downloadRecordsResult, result, ack);
  };

  return NextConfigStore;
}(_P7HostCore.StoreBase);

exports.default = NextConfigStore;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _P7HostCore = __webpack_require__(1);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'sidebar-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    sidebarAddItem: Constants.NAMESPACE + 'sidebar-add-item',
    sidebarRemoveItem: Constants.NAMESPACE + 'sidebar-remove-item'
  },
  out: {}
};
_P7HostCore.DeepFreeze.freeze(Constants);

var SidebarStore = function (_StoreBase) {
  _inherits(SidebarStore, _StoreBase);

  function SidebarStore() {
    _classCallCheck(this, SidebarStore);

    var _this = _possibleConstructorReturn(this, _StoreBase.call(this));

    riot.observable(_this);
    _this.state = riot.state.sidebar;
    _this.itemsSet = new Set();

    _this._loadFromState();
    _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.sidebarAddItem, handler: _this._onSidebarAddItem }, { event: Constants.WELLKNOWN_EVENTS.in.sidebarRemoveItem, handler: _this._onSidebarRemoveItem }];
    _this.bindEvents();
    return _this;
  }

  SidebarStore.prototype._commitToState = function _commitToState() {
    this.state.items = Array.from(this.itemsSet);
    this.trigger(riot.EVT.routeStore.out.riotRouteDispatchAck);
  };

  SidebarStore.prototype._loadFromState = function _loadFromState() {
    for (var _iterator = this.state.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      this.itemsSet.add(item);
    }
  };

  SidebarStore.prototype._findItem = function _findItem(item) {
    for (var _iterator2 = this.state.items, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var t = _ref2;

      if (t.title === item.title && t.view === item.view) {
        return t;
      }
    }
    return null;
  };

  SidebarStore.prototype._deleteItem = function _deleteItem(item) {
    for (var _iterator3 = this.state.items, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var t = _ref3;

      if (t.title === item.title) {
        this.itemsSet.delete(t);
        break;
      }
    }
  };

  SidebarStore.prototype._onSidebarAddItem = function _onSidebarAddItem(item) {
    var t = this._findItem(item);

    if (t == null) {
      this.itemsSet.add(item);
      this._commitToState();
    }
  };

  SidebarStore.prototype._onSidebarRemoveItem = function _onSidebarRemoveItem(item) {
    this._deleteItem(item);
    this._commitToState();
  };

  _createClass(SidebarStore, null, [{
    key: 'constants',
    get: function get() {
      return Constants;
    }
  }]);

  return SidebarStore;
}(_P7HostCore.StoreBase);

exports.default = SidebarStore;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('header', '<div class="navbar navbar-default navbar-fixed-top"> <div class="container"> <div class="navbar-header"> <a href="../" class="navbar-brand">Bootswatch</a> <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div> <div class="navbar-collapse collapse" id="navbar-main"> <ul class="nav navbar-nav"> <li> <a href="https://github.com/ghstahl/P7-riotjs-host">github</a> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li each="{navItems}" onclick="{parent.route}" class="{active : parent.routeState.route === this.route}"> <a>{this.title}</a> </li> </ul> </div> </div> </nav>', '', '', function (opts) {
  var self = this;
  self.routeState = riot.routeState;

  self.navItems = [{ title: 'Home', route: '/main/home' }, { title: 'Projects', route: '/main/projects' }];

  self.on('mount', function () {
    console.log('header mount');
    riot.control.on(riot.EVT.routeStore.out.riotRouteDispatchAck, self._onRiotRouteDispatchAck);
  });
  self.on('unmount', function () {
    console.log('header unmount');
    riot.control.off(riot.EVT.routeStore.out.riotRouteDispatchAck, self._onRiotRouteDispatchAck);
  });

  self._onRiotRouteDispatchAck = function () {
    console.log('header', riot.EVT.routeStore.out.riotRouteDispatchAck);
    self.update();
  };

  self.route = function (evt) {
    riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, evt.item.route);
  };
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('itemlist', '<div class="row"> <div class="col-md-6"> <h3>{opts.title}</h3> <ul> <li each="{items}">{this.name}</li> </ul> </div> <div class="col-md-6"> <h3>{opts.title}</h3> <ul> <li each="{items}">{this.name}</li> </ul> </div> </div>', '', '', function (opts) {
  var _this = this;

  var self = this;
  self.items = [];

  self.on('mount', function () {
    console.log('itemlist mount');
    riot.control.on(riot.EVT.loadItemsSuccess, self.onLoadItemsSuccess);
    riot.control.trigger(riot.EVT.loadItems);
  });
  self.on('unmount', function () {
    console.log('itemlist unmount');
    riot.control.off(riot.EVT.loadItemsSuccess, self.onLoadItemsSuccess);
  });
  self.onLoadItemsSuccess = function (items) {
    _this.items = items;
    _this.update();
  };
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _nprogress = __webpack_require__(23);

var nprogress = _interopRequireWildcard(_nprogress);

__webpack_require__(22);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var riot = __webpack_require__(0);


riot.tag2('loading-indicator', '', '', '', function (opts) {
    var self = this;
    self.onProgressStart = function () {
        nprogress.start();
    };
    self.onProgressDone = function () {
        nprogress.done();
    };
    self.on('mount', function () {
        console.log('loading-indicator mount......');
        riot.control.on(riot.EVT.progressStore.out.progressStart, self.onProgressStart);
        riot.control.on(riot.EVT.progressStore.out.progressDone, self.onProgressDone);
    });

    self.on('unmount', function () {
        console.log('loading-indicator unmount......');
        riot.control.off(riot.EVT.progressStore.out.progressStart, self.onProgressStart);
        riot.control.off(riot.EVT.progressStore.out.progressDone, self.onProgressDone);
    });
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('pretty-json', '<pre>{JSON.stringify(this.obj, null, 2)}</pre>', '', '', function (opts) {
    var self = this;
    self.obj = opts.obj;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('sidebar', '<a each="{state.items}" onclick="{parent.route}" class="{parent.routeState.route === this.route? \'active list-group-item\':\'list-group-item\'}">{this.title}</a> </div>', '', '', function (opts) {
	var self = this;
	self.state = riot.state.sidebar;
	self.routeState = riot.routeState;

	self.on('mount', function () {
		console.log('sidebar mount');
		riot.control.on(riot.EVT.routeStore.out.riotRouteDispatchAck, self.onRiotRouteDispatchAck);
	});
	self.on('unmount', function () {
		console.log('sidebar unmount');
		riot.control.off(riot.EVT.routeStore.out.riotRouteDispatchAck, self.onRiotRouteDispatchAck);
	});

	self.onRiotRouteDispatchAck = function () {
		console.log('sidebar', riot.EVT.routeStore.out.riotRouteDispatchAck);
		self.update();
	};

	self.route = function (evt) {
		riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, evt.item.route);
	};
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('error', '<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Error Code: {state.code} </h3> </div> <div class="panel-body"> <div class="alert alert-danger"> <strong>Well Hell!</strong> We have dispatched the minions to determine who was responsible for this defect. Once they have been dealt with, we will fix the issue. </div> </div> </div>', '', '', function (opts) {
  var self = this;
  self.name = "error";
  self.error = false;

  self.on('before-mount', function () {
    self.state = riot.state.error;
  });

  self.on('mount', function () {
    console.log(self.name, 'mount');
  });

  self.on('unmount', function () {
    console.log(self.name, 'unmount');
  });
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13);

var riot = __webpack_require__(0);


riot.tag2('home', '<div class="progress"> <div class="progress-bar progress-bar-info" riot-style="width: {times[0]}%"></div> </div <div class="progress"> <div class="progress-bar progress-bar-success" riot-style="width: {times[1]}%"></div> </div> <div class="progress"> <div class="progress-bar progress-bar-warning" riot-style="width: {times[2]}%"></div> </div> <div class="progress"> <div class="progress-bar progress-bar-danger" riot-style="width: {times[3]}%"></div> </div> <div class="progress progress-striped"> <div class="progress-bar progress-bar-info" riot-style="width: {times[4]}%"></div> </div> <div class="progress progress-striped"> <div class="progress-bar progress-bar-success" riot-style="width: {times[5]}%"></div> </div> <div class="progress progress-striped"> <div class="progress-bar progress-bar-warning" riot-style="width: {times[6]}%"></div> </div> <div class="progress progress-striped"> <div class="progress-bar progress-bar-danger" riot-style="width: {times[7]}%"></div> </div> <div class="progress progress-striped active"> <div class="progress-bar" riot-style="width: {times[8]}%"></div> </div> <div> <a href="#" class="btn {buttonClasses[buttonS[0]]}">Default</a> <a href="#" class="btn {buttonClasses[buttonS[1]]}">Primary</a> <a href="#" class="btn {buttonClasses[buttonS[2]]}">Success</a> <a href="#" class="btn {buttonClasses[buttonS[3]]}">Info</a> <a href="#" class="btn {buttonClasses[buttonS[4]]}">Warning</a> <a href="#" class="btn {buttonClasses[buttonS[5]]}">Danger</a> <a href="#" class="btn {buttonClasses[buttonS[6]]}">Link</a> </div> <div class="spacer"></div> <table class="table table-hover"> <thead> <tr> <th>Name</th> <th>Download</th> </tr> </thead> <tbody> <tr> <td>NSDeluxeDownloader</td> <td><a href="https://github.com/ghstahl/CefSharp.MinimalExample.Riot/raw/master/CefSharp.MinimalExample.WinForms/Resources/NSDeluxeDownloader.exe?hint=dog" download="NSDeluxeDownloader.exe">Download</a></td> </tr> <tr> <td>NSPremiumDownloader</td> <td><a href="https://github.com/ghstahl/CefSharp.MinimalExample.Riot/raw/master/CefSharp.MinimalExample.WinForms/Resources/NSPremiumDownloader.exe?hint=dog" download="NSDeluxeDownloader.exe">Download</a></td> </tr> </tbody> </table> <a href="https://github.com/ghstahl/CefSharp.MinimalExample.Riot/raw/master/CefSharp.MinimalExample.WinForms/Resources/NSDeluxeDownloader.exe?hint=dog" download="NSDeluxeDownloader.exe">Download</a> <div> <a class="btn btn-default" onclick="{this.generateAnError}">Generate An Error</a> </div>', '', '', function (opts) {
	var self = this;
	self.name = 'home';

	self.times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	self.buttonS = [0, 1, 2, 3, 4, 5, 6];
	self.buttonClasses = ["btn-default", "btn-primary", "btn-success", "btn-info", "btn-warning", "btn-danger", "btn-link"];

	self.a = 0;
	self.b = 0;
	self.c = 0;

	self.tick = function () {

		var arrayLength = self.times.length;
		for (var i = 0; i < arrayLength; i++) {
			self.times[i] = Math.floor(Math.random() * (100 - 0) + 0);
		}

		arrayLength = self.buttonS.length;
		for (var i = 0; i < arrayLength; i++) {
			self.buttonS[i] = Math.floor(Math.random() * (6 - 0) + 0);
		}

		self.a = self.times[0];
		self.b = Math.random() * (100 - self.a) + self.a;
		self.c = 100 - self.a - self.b;

		self.update();
	};

	self.on('mount', function () {
		self.tick();
		self.timer = setInterval(this.tick, 400);
	});
	self.on('unmount', function () {
		clearInterval(self.timer);
	});

	self.generateAnError = function () {
		riot.control.trigger(riot.EVT.errorStore.in.errorCatchAll, { code: 'dancingLights-143523' });
	};
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(15);

var riot = __webpack_require__(0);


riot.tag2('projects', '<div each="{component in components}" class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">{component.key}</h3> </div> <div class="panel-body"> <div class="well well-lg"> This will load a mini spa which has been pre-bundled. This mini spa was built using the riotjs-partial-tag nested project. </div> <a onclick="{parent.loadMyComponentsSPA}" class="{component.state.loaded == false?\'btn btn-default btn-lg\':\'disabled btn btn-default btn-lg\'}"> Load Component</a> <a onclick="{parent.unloadMyComponentsSPA}" class="{component.state.loaded == true?\'btn btn-default btn-lg\':\'disabled btn btn-default btn-lg\'}"> Unload Component</a> <a onclick="{this.clearLocalStorage}" class="btn btn-primary btn-lg"> Clear Local Storage</a> <div class="spacer"></div> <pretty-json obj="{component}"></pretty-json> </div> </div>', '', '', function (opts) {
	var self = this;
	self.mixin("opts-mixin");
	self.name = 'projects';

	self.on('before-mount', function () {
		if (riot.state.projects === undefined) {
			riot.state.projects = { loaded: false, text: "Not Loaded Yet..." };
		}

		if (riot.state.componentLoaderState != null && riot.state.componentLoaderState.components != null) {
			self.components = self.getComponentsArray();
		}
	});

	self.getComponentsArray = function () {
		var result = [];
		riot.state.componentLoaderState.components.forEach(function (value, key, map) {
			result.push(value);
		});
		return result;
	};

	self.on('mount', function () {
		console.log(self.name, 'mount');
		riot.control.on(riot.EVT.componentLoaderStore.out.componentLoaderStoreStateUpdated, self.onComponentLoaderStoreStateUpdated);
	});

	self.on('unmount', function () {
		console.log(self.name, 'unmount');
		riot.control.off(riot.EVT.componentLoaderStore.out.componentLoaderStoreStateUpdated, self.onComponentLoaderStoreStateUpdated);
	});

	self.onComponentLoaderStoreStateUpdated = function () {
		console.log(self.name, riot.EVT.componentLoaderStore.out.componentLoaderStoreStateUpdated);
		if (riot.state.componentLoaderState != null && riot.state.componentLoaderState.components != null) {
			self.components = self.getComponentsArray();
			self.update();
		}
	};

	self.clearLocalStorage = function () {
		riot.control.trigger(riot.EVT.localStorageStore.in.localstorageClear);
	};
	self.loadMyComponentsSPA = function (e) {
		var component = e.item.component;
		var key = component.key;
		riot.control.trigger(riot.EVT.componentLoaderStore.in.loadDynamicComponent, key);
	};

	self.unloadMyComponentsSPA = function (e) {
		var component = e.item.component;
		var key = component.key;
		riot.control.trigger(riot.EVT.componentLoaderStore.in.unloadDynamicComponent, key);
	};
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

__webpack_require__(11);

__webpack_require__(7);

__webpack_require__(6);

var _P7HostCore = __webpack_require__(1);

var _optsMixin = __webpack_require__(8);

var _optsMixin2 = _interopRequireDefault(_optsMixin);

var _nextConfigStore = __webpack_require__(9);

var _nextConfigStore2 = _interopRequireDefault(_nextConfigStore);

var _sidebarStore = __webpack_require__(10);

var _sidebarStore2 = _interopRequireDefault(_sidebarStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'bootswatch/slate/bootstrap.css';
// import 'bootstrap';
var p7HostCore = new _P7HostCore.P7HostCore(riot);
// import FetchWrapper from './fetch-wrapper.js';
// let fetchWrapper = new FetchWrapper();
/*
import P7HostCore from './p7-host-core/index.js';
*/

var randomString = new _P7HostCore.RandomString();
var hash = randomString.randomHash();

p7HostCore.Initialize();
riot.state.route.defaultRoute = '/main/home';
riot.state.sidebar = {
  touch: 0,
  items: [{ title: 'Home', route: '/main/home' }, { title: 'Projects', route: '/main/projects' }]
};

// Add the mixings
// //////////////////////////////////////////////////////

riot.mixin('opts-mixin', _optsMixin2.default);

// Add the stores
// //////////////////////////////////////////////////////

riot.EVT.nextConfigStore = _nextConfigStore2.default.constants.WELLKNOWN_EVENTS;
var nextConfigStore = new _nextConfigStore2.default();

var sidebarStore = new _sidebarStore2.default();

riot.control.addStore(nextConfigStore);
riot.control.addStore(sidebarStore);

var testComponent = {
  key: 'typicode-component',
  path: '/partial/typicode_component/bundle.js',
  type: 'js',
  trigger: {
    onLoad: [{
      event: 'SidebarStore:sidebar-add-item',
      data: {
        title: 'My Components Page',
        route: 'my-component-page/home'
      }
    }],
    onUnload: [{
      event: 'SidebarStore:sidebar-remove-item',
      data: { title: 'My Components Page' }
    }, {
      event: 'plugin-unregistration',
      data: { name: 'typicode-component' }
    }]
  },
  routeLoad: {
    route: '/my-component-page..'
  },
  state: {
    loaded: false
  }
};

riot.control.trigger('init-component-loader-store');
// riot.control.trigger('add-dynamic-component',testComponent);

// riot.mount('app');

// riot.control.trigger('dynamic-jscss-loader-init');
// put Router Last
// //////////////////////////////////////////////////////

// Finally dispatch the first event.
// //////////////////////////////////////////////////////
// NOTE: DON'T DO the following;
//		RiotControl.trigger(riot.EVT.finalMount,'data');
// REASON:
//      RiotControl events need to go to stores, and if you directly send the event to a tag
//      you will get as many callbacks to the tag as there were stores.  If you have 3 random stores, which
//      have nothing to do with the riot.EVT.finalMount event, you will still get 3 calls to the handler.
// SOLUTION:
// 		Send the event to the store, and in my case I send it to what is basically a middleman dispatcher.  My
//      dispatcher forwards on the riot.EVT.finalMount.  Only one handler and only one time.
// //////////////////////////////////////////////////////
// riot.control.trigger('riot-dispatch',riot.EVT.finalMount,'some data');
// riot.control.trigger(riot.EVT.startupStore.in.start);

riot.mount('startup');
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(17);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteContributer = function () {
  function RouteContributer() {
    _classCallCheck(this, RouteContributer);

    riot.observable(this);
    this.name = 'RouteContributer';
    this._initializeViewSet();
  }

  RouteContributer.prototype._initializeViewSet = function _initializeViewSet() {
    this._viewsSet = new Set();
    var s = this._viewsSet;

    s.add('home');
    s.add('projects');
    this.views = Array.from(s);
    this.defaultRoute = '/main/home/';
  };

  RouteContributer.prototype.contributeRoutes = function contributeRoutes(r) {
    var self = this;

    console.log(self.name, riot.EVT.router.out.contributeRoutes, r);
    r('/main/*', function (name) {
      console.log('route handler of /main/' + name);
      var view = name;

      if (self.views.indexOf(view) === -1) {
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
      } else {
        riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, view);
      }
    });

    r('/main..', function () {
      console.log('route handler of /main');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
    });

    r('/error..', function () {
      console.log('route handler of /error..');
      riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'error');
    });
  };

  return RouteContributer;
}();

exports.default = RouteContributer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

;(function(window, undefined) {var observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          (callbacks[event] = callbacks[event] || []).push(fn)
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) callbacks = {}
        else {
          if (fn) {
            var arr = callbacks[event]
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) arr.splice(i--, 1)
            }
          } else delete callbacks[event]
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on)
          fn.apply(el, arguments)
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {

        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i

        for (i = 0; i < arglen; i++) {
          args[i] = arguments[i + 1] // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0)

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args)
        }

        if (callbacks['*'] && event != '*')
          el.trigger.apply(el, ['*', event].concat(args))

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  })

  return el

}
  /* istanbul ignore next */
  // support CommonJS, AMD & browser
  if (true)
    module.exports = observable
  else if (typeof define === 'function' && define.amd)
    define(function() { return observable })
  else
    window.observable = observable

})(typeof window != 'undefined' ? window : undefined);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map