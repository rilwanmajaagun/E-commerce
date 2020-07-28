"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

var info = function info(message, code, data) {
  return {
    message: message || _httpStatus["default"][code],
    data: data || {}
  };
};

var error = function error(message) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var data = arguments.length > 2 ? arguments[2] : undefined;
  var override = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var error = override || {
    code: _httpStatus["default"][_httpStatus["default"]["".concat(code, "_NAME")]],
    message: _httpStatus["default"]["".concat(code, "_NAME")]
  };

  if (message && message.name) {
    return {
      message: _httpStatus["default"][code],
      error_code: error.code,
      error_message: error.message,
      data: data || null
    };
  }

  return {
    message: message || _httpStatus["default"][code],
    error_code: error.code,
    error_message: error.message,
    data: data || null
  };
};

var _default = {
  info: info,
  error: error
};
exports["default"] = _default;