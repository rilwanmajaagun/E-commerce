"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _bluebird = _interopRequireDefault(require("bluebird"));

var _pgPromise = _interopRequireDefault(require("pg-promise"));

var _config2 = _interopRequireDefault(require("../../config"));

// eslint-disable-next-line import/no-cycle
var options = {
  promiseLib: _bluebird["default"]
};
var pgp = (0, _pgPromise["default"])(options);
var db = pgp(_config2["default"].DATABASE_URL);
var _default = db;
exports["default"] = _default;