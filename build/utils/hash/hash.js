"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Helpers = {
  hashPassword: function hashPassword(password) {
    var saltRounds = 10;

    var salt = _bcrypt["default"].genSaltSync(saltRounds);

    var hash = _bcrypt["default"].hashSync(password, salt);

    if (hash && salt) {
      return {
        salt: salt,
        hash: hash
      };
    }

    return false;
  },
  generateToken: function generateToken(first_name, email) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var key, token;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              key = process.env.SECRET_KEY;
              token = _jsonwebtoken["default"].sign({
                first_name: first_name,
                email: email
              }, key, {
                expiresIn: '1h'
              });
              return _context.abrupt("return", token);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  comparePassword: function comparePassword(password, hash) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var match;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _bcrypt["default"].compare(password, hash);

            case 2:
              match = _context2.sent;
              return _context2.abrupt("return", match);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  decodeToken: function decodeToken(token) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
var _default = Helpers;
exports["default"] = _default;