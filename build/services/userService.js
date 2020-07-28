"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuid = require("uuid");

var _db = require("../db");

var _utils = require("../utils");

/* eslint-disable import/no-cycle */
// import { logger } from '../config';
var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var id, first_name, last_name, email, password, phone_number, email_address, firsName, LastName, hashedPassword, payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _uuid.v4)();
            first_name = body.first_name, last_name = body.last_name, email = body.email, password = body.password, phone_number = body.phone_number;
            email_address = email.toLowerCase();

            firsName = function firsName(first_name) {
              return first_name.charAt(0).toUpperCase() + first_name.slice(1);
            };

            LastName = function LastName(last_name) {
              return last_name.charAt(0).toUpperCase() + last_name.slice(1);
            };

            hashedPassword = _utils.hash.hashPassword(password);
            payload = [id, firsName(first_name), LastName(last_name), email_address, phone_number, hashedPassword.hash, hashedPassword.salt];
            return _context.abrupt("return", _db.db.one(_db.userQuery.createUser, payload));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var checkIfUserExist = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
    var email_address, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email_address = email.toLowerCase();
            _context2.next = 3;
            return _db.db.oneOrNone(_db.userQuery.getUser, [email_address]);

          case 3:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkIfUserExist(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var activateUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _db.db.oneOrNone(_db.userQuery.activateUser, [email]);

          case 2:
            data = _context3.sent;
            return _context3.abrupt("return", data);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function activateUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(email, body) {
    var password, hashedPassword, payload;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            password = body.password;
            hashedPassword = _utils.hash.hashPassword(password);
            payload = [hashedPassword.hash, email];
            return _context4.abrupt("return", _db.db.oneOrNone(_db.userQuery.resetPassword, payload));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = {
  createUser: createUser,
  checkIfUserExist: checkIfUserExist,
  activateUser: activateUser,
  resetPassword: resetPassword
};
exports["default"] = _default;