"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _bull = _interopRequireDefault(require("bull"));

var _logger = _interopRequireDefault(require("./logger"));

var sendMailQueue = new _bull["default"]('sendMail', process.env.REDIS_URL);
sendMailQueue.on('completed', function (job, result) {
  _logger["default"].info("Job completed with result ".concat(result));
});
var _default = sendMailQueue;
exports["default"] = _default;