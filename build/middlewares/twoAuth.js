"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _config = require("../config");

var _services = require("../services");

/* eslint-disable import/no-cycle */
var sendCode = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, user, Number;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            _context.next = 3;
            return _services.userService.checkIfUserExist(email);

          case 3:
            user = _context.sent;
            Number = user.phone_number.slice(1);

            _config.nexmo.verify.request({
              number: "234".concat(Number),
              brand: 'Ecommerce',
              code_length: '4'
            }, function (error, ressult) {
              if (ressult.status !== 0) {
                res.status(_httpStatus["default"].OK).send({
                  message: 'successful',
                  request_id: ressult.request_id
                });
              } else {
                res.status(_httpStatus["default"].BAD_REQUEST).send({
                  message: 'Error sending verification code'
                });
              }
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendCode(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var checkCode = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, request_id, code;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, request_id = _req$body.request_id, code = _req$body.code;

            _config.nexmo.verify.check({
              request_id: request_id,
              code: code
            }, function (error, result) {
              if (result.status === '0') {
                return res.status(_httpStatus["default"].OK).send({
                  message: 'successful'
                });
              }

              return res.status(_httpStatus["default"].BAD_REQUEST).send({
                message: 'Error verifiying code'
              });
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkCode(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  sendCode: sendCode,
  checkCode: checkCode
};
exports["default"] = _default;