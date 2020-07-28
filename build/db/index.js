"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "db", {
  enumerable: true,
  get: function get() {
    return _postgres["default"];
  }
});
Object.defineProperty(exports, "userQuery", {
  enumerable: true,
  get: function get() {
    return _users["default"];
  }
});
Object.defineProperty(exports, "categoryQuery", {
  enumerable: true,
  get: function get() {
    return _category["default"];
  }
});
Object.defineProperty(exports, "productQuery", {
  enumerable: true,
  get: function get() {
    return _product["default"];
  }
});
Object.defineProperty(exports, "ordersQuery", {
  enumerable: true,
  get: function get() {
    return _ordersQuery["default"];
  }
});

var _postgres = _interopRequireDefault(require("./setup/postgres"));

var _users = _interopRequireDefault(require("./queries/users"));

var _category = _interopRequireDefault(require("./queries/category"));

var _product = _interopRequireDefault(require("./queries/product"));

var _ordersQuery = _interopRequireDefault(require("./queries/ordersQuery"));