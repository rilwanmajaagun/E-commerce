"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _default = {
  DATABASE_URL: process.env.ECOMMERCE_DATABASE_TEST_URL
};
exports["default"] = _default;