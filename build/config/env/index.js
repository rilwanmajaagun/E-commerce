"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _development = _interopRequireDefault(require("./development"));

var _production = _interopRequireDefault(require("./production"));

var _test = _interopRequireDefault(require("./test"));

var NODE_ENV = process.env.ECOMMERCE_NODE_ENV;
var _default = {
  development: _development["default"],
  test: _test["default"],
  production: _production["default"]
}[NODE_ENV || 'production'];
exports["default"] = _default;