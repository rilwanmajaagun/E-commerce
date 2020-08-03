"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _nexmo = _interopRequireDefault(require("nexmo"));

var nexmo = new _nexmo["default"]({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_SECRET_KEY
});
var _default = nexmo;
exports["default"] = _default;