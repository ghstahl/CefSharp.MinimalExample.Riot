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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = riot;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(6);

__webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteContributer = function () {
  function RouteContributer() {
    _classCallCheck(this, RouteContributer);

    var self = this;

    riot.observable(self);
    self.name = 'RouteContributer';
    self._initializeViewSet();

    this.initialize();
  }

  RouteContributer.prototype._initializeViewSet = function _initializeViewSet() {
    var self = this;

    self._viewsSet = new Set();
    var s = self._viewsSet;

    s.add('home');
    s.add('typicode-user-detail');
    self.views = Array.from(s);
    self.defaultRoute = '/download-manager/home';
  };

  RouteContributer.prototype.uninitialize = function uninitialize() {};

  RouteContributer.prototype.initialize = function initialize() {};

  RouteContributer.prototype.contributeRoutes = function contributeRoutes(r) {
    var self = this;

    console.log(self.name, riot.EVT.router.out.contributeRoutes, r);
    r('/download-manager/download-detail?id=*', function () {
      console.log('route handler of /download-manager/download-detail');
      riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'mpc-typicode-user-detail');
    });

    r('/download-manager/*', function (name) {
      console.log('route handler of /download-manager/' + name);
      var view = name;

      if (self.views.indexOf(view) === -1) {
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
      } else {
        riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'download-manager-' + view);
      }
    });
    r('/download-manager..', function () {
      console.log('route handler of /download-manager..');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
    });
  };

  return RouteContributer;
}();

exports.default = RouteContributer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userCache = 'typicodeUserCache';

var Constants = function Constants() {
  _classCallCheck(this, Constants);
};

Constants.NAME = 'download-manager-store';
Constants.NAMESPACE = Constants.NAME + ':';
Constants.WELLKNOWN_EVENTS = {
  in: {
    downloadManagerFetchResult: 'download-manager-fetch-result',
    downloadManagerFetch: 'download-manager-fetch',
    typicodeUserFetch: 'download-manager-fetch'
  },
  out: {
    downloadManagerChanged: 'download-managers-changed',
    typicodeUserChanged: 'download-manager-changed'
  }
};
window.P7HostCore.DeepFreeze.freeze(Constants);

var DownloadManagerStore = function (_window$P7HostCore$St) {
  _inherits(DownloadManagerStore, _window$P7HostCore$St);

  function DownloadManagerStore() {
    _classCallCheck(this, DownloadManagerStore);

    var _this = _possibleConstructorReturn(this, _window$P7HostCore$St.call(this));

    riot.observable(_this); // Riot provides our event emitter.
    _this.name = 'TypicodeUserStore';
    riot.EVT.downloadManagerStore = Constants.WELLKNOWN_EVENTS;
    _this.fetchException = null;
    _this.riotHandlers = [{ event: Constants.WELLKNOWN_EVENTS.in.downloadManagerFetch, handler: _this._onDownloadManagerFetch }, { event: Constants.WELLKNOWN_EVENTS.in.downloadManagerFetchResult, handler: _this._onDownloadManagerFetchResult }];
    _this.bindEvents();

    riot.state.downloadManagerState = {};
    _this.state = riot.state.downloadManagerState;
    return _this;
  }

  DownloadManagerStore.prototype._onDownloadManagerFetch = function _onDownloadManagerFetch(query) {
    console.log(Constants.WELLKNOWN_EVENTS.in.downloadManagerFetch);
    var url = 'download-manager.json';
    var myAck = {
      evt: Constants.WELLKNOWN_EVENTS.in.downloadManagerFetchResult
    };

    if (query) {
      myAck.query = query;
    }

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, myAck);
  };

  DownloadManagerStore.prototype._onDownloadManagerFetchResult = function _onDownloadManagerFetchResult(result, ack) {
    console.log(Constants.WELLKNOWN_EVENTS.in.downloadManagerFetchResult, result, ack);
    if (result.error == null && result.response.ok && result.json) {
      // good
      var data = result.json;

      this.state.data = data;
      var url = 'local://download/init-download';

      data.forEach(function (element) {
        riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, element, null);
      });

      this.trigger(Constants.WELLKNOWN_EVENTS.out.downloadManagerChanged);
    } else {
      this.state.data = [];
    }
  };

  DownloadManagerStore.prototype._onTypicodeUserFetch = function _onTypicodeUserFetch(query) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUserFetch);
    var restoredSession = JSON.parse(localStorage.getItem(userCache));
    var blah = riot.Cookies.get('blah-blah-blah');
    var id = parseInt(query.id, 10); // query.id is a string

    if (restoredSession) {
      var result = restoredSession.filter(function (obj) {
        var found = obj.id === id;

        return found;
      });

      if (result && result.length > 0) {
        this.trigger(riot.EVT.typicodeUserStore.out.typicodeUserChanged, result[0]);
      }
    } else {
      // need to fetch.
      var myQuery = {
        type: 'riotControlTrigger',
        evt: riot.EVT.typicodeUserStore.in.typicodeUserFetch,
        query: query,
        blah: blah
      };

      riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, myQuery);
    }
  };
  /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */


  DownloadManagerStore.prototype._resetData = function _resetData() {
    this.fetchException = null;
  };

  _createClass(DownloadManagerStore, null, [{
    key: 'constants',
    get: function get() {
      return Constants;
    }
  }]);

  return DownloadManagerStore;
}(window.P7HostCore.StoreBase);

exports.default = DownloadManagerStore;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

__webpack_require__(3);

var _downloadManagerStore = __webpack_require__(2);

var _downloadManagerStore2 = _interopRequireDefault(_downloadManagerStore);

var _routeContributer = __webpack_require__(1);

var _routeContributer2 = _interopRequireDefault(_routeContributer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rcs = new _routeContributer2.default();
var registerRecord = {
  name: 'download-manager',
  stores: [{ store: new _downloadManagerStore2.default() }],
  registrants: {
    routeContributer: rcs
  },
  postLoadEvents: [{ event: 'download-manager-init', data: {} }]
};

if (window.RandomString) {
  var randomString = new window.RandomString();
  var hash = randomString.randomHash();

  window.hash = hash;
}

riot.control.trigger('plugin-registration', registerRecord);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('download-manager-home', '<div class="panel panel-default"> <div class="panel-heading">Download Manager</div> <div class="panel-body"> <div class="well"> This pulls download from /download-manager.json </div> <table if="{state.data}" class="table table-striped table-hover "> <thead> <tr> <th>File</th> <th>link</th> </tr> </thead> <tbody> <tr each="{state.data}"> <td>{this.FileName}</td> <td> <a href="{this.Url}" download="{this.FileName}">Download</a></td> </tr> </tbody> </table> </div> </div>', '', '', function (opts) {
  var self = this;
  self.error = false;
  self.state = riot.state.downloadManagerState;
  self.results = [];

  self.resetData = function () {
    self.results = [];
    self.error = false;
  };

  self.on('mount', function () {
    console.log('typicode-users mount');
    riot.control.on(riot.EVT.downloadManagerStore.out.downloadManagerChanged, self.onDownloadManagerChanged);
    riot.control.trigger(riot.EVT.downloadManagerStore.in.downloadManagerFetch);
  });
  self.on('unmount', function () {
    console.log('typicode-users unmount');
    riot.control.off(riot.EVT.downloadManagerStore.out.downloadManagerChanged, self.onDownloadManagerChanged);
  });
  self.onDownloadManagerChanged = function (result) {
    console.log(riot.EVT.downloadManagerStore.out.downloadManagerChanged);
    self.update();
  };
  self.route = function (evt) {
    riot.control.trigger('riot-route-dispatch', 'my-component-page/typicode-user-detail?id=' + evt.item.id);
  };
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var riot = __webpack_require__(0);
riot.tag2('mpc-typicode-user-detail', '<div if="{result != null}" class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">{result.name}</h3> </div> <div class="panel-body"> <form class="form-horizontal"> <fieldset> <legend>User Details</legend> <div class="form-group"> <label class="col-sm-2 control-label">Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.name}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Email</label> <div class="col-sm-10"> <p class="form-control-static">{result.email}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Phone</label> <div class="col-sm-10"> <p class="form-control-static">{result.phone}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">User Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.username}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Web Site</label> <div class="col-sm-10"> <p class="form-control-static">{result.website}</p> </div> </div> </fieldset> </form> <form class="form-horizontal"> <fieldset> <legend>Address</legend> <div class="form-group"> <label class="col-sm-2 control-label">Suite</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.suite}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Street</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.street}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">City</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.city}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Zip Code</label> <div class="col-sm-10"> <p class="form-control-static">{result.address.zipcode}</p> </div> </div> </fieldset> </form> <form class="form-horizontal"> <fieldset> <legend>Company</legend> <div class="form-group"> <label class="col-sm-2 control-label">Name</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.name}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Catch Phrase</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.catchPhrase}</p> </div> </div> <div class="form-group"> <label class="col-sm-2 control-label">Business Statement</label> <div class="col-sm-10"> <p class="form-control-static">{result.company.bs}</p> </div> </div> </fieldset> </form> </div> </div>', '', '', function (opts) {
    var self = this;

    self.result = null;
    self.onUserChanged = function (user) {
        self.result = user;
        console.log(self.result);
        self.update();
    };

    self.on('mount', function () {
        var q = riot.route.query();
        console.log('on mount: typicode-user-detail', q);
        riot.control.on(riot.EVT.typicodeUserStore.out.typicodeUserChanged, self.onUserChanged);

        riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUserFetch, { id: q.id });
    });

    self.on('unmount', function () {
        console.log('on unmount:');
        riot.control.off(riot.EVT.typicodeUserStore.out.typicodeUserChanged, self.onUserChanged);
    });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map