"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var myFormat = _winston["default"].format.combine(_winston["default"].format.colorize(), _winston["default"].format.timestamp(), _winston["default"].format.align(), _winston["default"].format.printf(function (info) {
  return "[".concat(info.timestamp, "] ").concat(info.level, " - ").concat(info.message);
}));

var logger = _winston["default"].createLogger({
  transports: [new _winston["default"].transports.Console({
    format: myFormat
  })]
});

var _default = logger;
exports["default"] = _default;