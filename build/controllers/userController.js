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

var _config = require("../config");

var createUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$userService$cr, id, first_name, email, created_at, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _services.userService.createUser(req.body);

          case 3:
            _yield$userService$cr = _context.sent;
            id = _yield$userService$cr.id;
            first_name = _yield$userService$cr.first_name;
            email = _yield$userService$cr.email;
            created_at = _yield$userService$cr.created_at;
            _context.next = 10;
            return _utils.hash.generateToken(first_name, email);

          case 10:
            token = _context.sent;

            _config.mailing.signupMail(email, first_name, token);

            return _context.abrupt("return", id ? res.status(_httpStatus["default"].CREATED).send({
              message: 'user created sucessfully',
              data: {
                id: id,
                email: email,
                date_created: created_at,
                token: token
              }
            }) : res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'error creating user',
              data: null
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function createUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var checkUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = req.body.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            user = _context2.sent;
            return _context2.abrupt("return", res.send(user, _httpStatus["default"].OK));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function checkUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var email, user, token;
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
            _context3.next = 7;
            return _utils.hash.generateToken(user.first_name, user.email);

          case 7:
            token = _context3.sent;
            return _context3.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: 'login successful',
              data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                token: token
              }
            }));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));

  return function login(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var activateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var email, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            email = res.locals.user.email;
            _context4.prev = 1;
            _context4.next = 4;
            return _services.userService.activateUser(email);

          case 4:
            user = _context4.sent;

            _config.mailing.welcomeMail(user.first_name, user.email);

            return _context4.abrupt("return", user ? res.status(_httpStatus["default"].OK).send({
              message: 'Account activated'
            }) : res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Error activating account'
            }));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function activateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var confrimationToken = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var email, user, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            email = req.body.email;
            _context5.prev = 1;
            _context5.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            user = _context5.sent;
            _context5.next = 7;
            return _utils.hash.generateToken(user.first_name, user.email);

          case 7:
            token = _context5.sent;

            _config.mailing.verifyMail(user.email, user.first_name, token);

            return _context5.abrupt("return", user ? res.status(_httpStatus["default"].CREATED).send({
              message: 'sent'
            }) : res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Error sending confrimation code'
            }));

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            });

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function confrimationToken(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var forgetPassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var email, user, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            email = req.body.email;
            _context6.prev = 1;
            _context6.next = 4;
            return _services.userService.checkIfUserExist(email);

          case 4:
            user = _context6.sent;

            if (!user) {
              _context6.next = 11;
              break;
            }

            _context6.next = 8;
            return _utils.hash.generateToken(user.first_name, user.email);

          case 8:
            token = _context6.sent;

            _config.mailing.forgetPasswordMail(user.first_name, user.email, token);

            return _context6.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: 'reset link sent'
            }));

          case 11:
            return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'user not found'
            }));

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](1);
            res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            });

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 14]]);
  }));

  return function forgetPassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var resetPassword = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var email, user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            email = res.locals.user.email;
            _context7.prev = 1;
            _context7.next = 4;
            return _services.userService.resetPassword(email, req.body);

          case 4:
            user = _context7.sent;

            if (!user) {
              _context7.next = 8;
              break;
            }

            _config.mailing.resetSuccessful(user.first_name, user.email);

            return _context7.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: 'password reset successfully'
            }));

          case 8:
            return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Error reseting password'
            }));

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](1);
            res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            });

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 11]]);
  }));

  return function resetPassword(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  createUsers: createUsers,
  checkUser: checkUser,
  login: login,
  activateUser: activateUser,
  confrimationToken: confrimationToken,
  forgetPassword: forgetPassword,
  resetPassword: resetPassword
};
exports["default"] = _default;