"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _uuid = require("uuid");

var _passport = _interopRequireDefault(require("passport"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth20"));

var _db = require("../db");

var _services = require("../services");

var _express = _interopRequireDefault(require("../config/express"));

var _middlewares = require("../middlewares");

var _axios = _interopRequireDefault(require("axios"));

/* eslint-disable import/no-cycle */
var GoogleStrategy = _passportGoogleOauth["default"].Strategy;

_passport["default"].use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, refreshToken, profile, done) {
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
              _context.next = 8;
              break;
            }

            done(null, user);
            _context.next = 17;
            break;

          case 8:
            id = (0, _uuid.v4)();
            salt = process.env.SALT;
            password = process.env.PASSWORD;
            is_active = true;
            payload = [id, profile.name.familyName, profile.name.givenName, profile.emails[0].value, password, salt, is_active];
            _context.next = 15;
            return _db.db.any(_db.userQuery.createFaceBookUser, payload);

          case 15:
            newUser = _context.sent;
            return _context.abrupt("return", done(null, newUser[0]));

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            done(_context.t0);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));

_express["default"].get('/api/v1/google', _passport["default"].authenticate('google', {
  scope: ['openid', 'email', 'profile']
}));

_express["default"].get('/auth/google/callback', _passport["default"].authenticate('google', {
  failureRedirect: '/failed'
}), function (req, res) {
  res.redirect('/successs');
});

_express["default"].get('/successs', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _middlewares.userAuth.socialMeadiAuth(req, res));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

_express["default"].get('/failed', function (req, res) {
  res.send('failed attempt');
});