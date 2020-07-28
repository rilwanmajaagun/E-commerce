"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "userService", {
  enumerable: true,
  get: function get() {
    return _userService["default"];
  }
});
Object.defineProperty(exports, "categoryService", {
  enumerable: true,
  get: function get() {
    return _categoryService["default"];
  }
});
Object.defineProperty(exports, "redisService", {
  enumerable: true,
  get: function get() {
    return _redis["default"];
  }
});
Object.defineProperty(exports, "productSerivce", {
  enumerable: true,
  get: function get() {
    return _product["default"];
  }
});
Object.defineProperty(exports, "orderSerivce", {
  enumerable: true,
  get: function get() {
    return _orders["default"];
  }
});

var _userService = _interopRequireDefault(require("./userService"));

var _categoryService = _interopRequireDefault(require("./categoryService"));

var _redis = _interopRequireDefault(require("./redis"));

var _product = _interopRequireDefault(require("./product"));

var _orders = _interopRequireDefault(require("./orders"));