"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _uuid = require("uuid");

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _db = require("../db");

var _services = require("../services");

var _express = _interopRequireDefault(require("./express"));

var _middlewares = require("../middlewares");

/* eslint-disable import/no-cycle */
var FacebookStrategy = _passportFacebook["default"].Strategy;

_passport["default"].use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'first_name', 'last_name', 'email']
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken, refreshToken, profile, cb) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            process.nextTick( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var user, id, salt, password, is_active, payload, newUser;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return _services.userService.checkIfUserExist(profile.emails[0].value);

                    case 3:
                      user = _context.sent;

                      if (!user) {
                        _context.next = 6;
                        break;
                      }

                      return _context.abrupt("return", cb(null, user));

                    case 6:
                      id = (0, _uuid.v4)();
                      salt = process.env.SALT;
                      password = process.env.PASSWORD;
                      is_active = true;
                      payload = [id, profile.name.familyName, profile.name.givenName, profile.emails[0].value, password, salt, is_active];
                      _context.next = 13;
                      return _db.db.any(_db.userQuery.createFaceBookUser, payload);

                    case 13:
                      newUser = _context.sent;
                      return _context.abrupt("return", cb(null, newUser[0]));

                    case 17:
                      _context.prev = 17;
                      _context.t0 = _context["catch"](0);
                      return _context.abrupt("return", cb(_context.t0));

                    case 20:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, null, [[0, 17]]);
            })));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));

_express["default"].get('/auth/facebook', _passport["default"].authenticate('facebook', {
  scope: ['email']
}));

_express["default"].get('/auth/facebook/callback', _passport["default"].authenticate('facebook', {
  failureRedirect: '/failed'
}), function (req, res) {
  res.redirect('/success');
});

_express["default"].get('/success', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _middlewares.userAuth.socialMeadiAuth(req, res));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

_express["default"].get('/failed', function (req, res) {
  res.send('failed attempt');
});