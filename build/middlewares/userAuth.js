"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _services = require("../services");

var _utils = require("../utils");

// eslint-disable-next-line import/no-cycle
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var email, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            _context.prev = 1;
            _context.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            data = _context.sent;

            if (!data) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatus["default"].CONFLICT).send({
              message: 'user already exist'
            }));

          case 7:
            next();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send(_httpStatus["default"][500]));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function signup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, email, password, user, match;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context2.prev = 1;
            _context2.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            user = _context2.sent;
            _context2.next = 7;
            return _utils.hash.comparePassword(password, user.password);

          case 7:
            match = _context2.sent;

            if (user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.send({
              message: 'user not found'
            }, _httpStatus["default"].CONFLICT));

          case 10:
            if (match) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Incorrect password',
              data: null
            }));

          case 12:
            if (!(user.is_active === false)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(_httpStatus["default"].UNAUTHORIZED).send({
              message: 'verify email address'
            }));

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send(_httpStatus["default"][500]));

          case 19:
            next();

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 16]]);
  }));

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var confrimationToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var email, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = req.body.email;
            _context3.prev = 1;
            _context3.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'user not found'
            }));

          case 7:
            if (!(user.is_active === true)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Account is verified'
            }));

          case 9:
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send(_httpStatus["default"][500]));

          case 14:
            next();

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));

  return function confrimationToken(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var is_active = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var email, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            email = res.locals.user.email;
            _context4.prev = 1;
            _context4.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            user = _context4.sent;

            if (!(user.is_active === true)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Account is verified'
            }));

          case 7:
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send(_httpStatus["default"][500]));

          case 12:
            next();

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function is_active(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var verifyToken = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var token, decoded;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            token = req.query.token || req.headers.token;

            if (token) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'token not provided'
            }));

          case 3:
            _context5.prev = 3;
            _context5.next = 6;
            return _utils.hash.decodeToken(token);

          case 6:
            decoded = _context5.sent;
            req.user = {
              first_name: decoded.first_name,
              email: decoded.email
            };
            res.locals.user = req.user;
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](3);
            res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context5.t0
            });

          case 14:
            next();

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 11]]);
  }));

  return function verifyToken(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var adminAuthorization = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var email, user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            email = res.locals.user.email;
            _context6.prev = 1;
            _context6.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            user = _context6.sent;

            if (user.is_admin) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(_httpStatus["default"].FORBIDDEN).send({
              message: 'user not allowed'
            }));

          case 7:
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](1);
            res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context6.t0.message
            });

          case 12:
            next();

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 9]]);
  }));

  return function adminAuthorization(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var socialMeadiAuth = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(request) {
    var token;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _utils.hash.generateToken(request.user.first_name, request.user.email);

          case 2:
            token = _context7.sent;
            return _context7.abrupt("return", token);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function socialMeadiAuth(_x19) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  signup: signup,
  login: login,
  confrimationToken: confrimationToken,
  verifyToken: verifyToken,
  is_active: is_active,
  adminAuthorization: adminAuthorization,
  socialMeadiAuth: socialMeadiAuth
};
exports["default"] = _default;