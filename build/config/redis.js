"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _redis = _interopRequireDefault(require("redis"));

var _logger = _interopRequireDefault(require("./logger"));

// const REDIS_PORT = process.env.REDIS_PORT || 6379;
var client = _redis["default"].createClient({
  url: process.env.REDIS_URL
});

client.on('error', function (error) {
  _logger["default"].error(error);
});
var _default = client;
exports["default"] = _default;