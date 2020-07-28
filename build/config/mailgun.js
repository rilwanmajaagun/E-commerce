"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _logger = _interopRequireDefault(require("./logger"));

var apiKey = process.env.API_KEY;
var domain = process.env.DOMAIN;

var mailgun = require('mailgun-js')({
  apiKey: apiKey,
  domain: domain
});

var verifyMail = function verifyMail(name, email, token) {
  var data = {
    from: 'E-commerce <rilwan30@yahoo.com>',
    to: "".concat(email),
    subject: "Hi ".concat(name, " please verify your E-commerce account"),
    text: "Hi,Thanks for using E-commerce! Please confirm your email address by clicking on the link below.\n        We'll communicate with you from time to time via email so it's important that we have an up-to-date \n        email address on file. http://localhost:3000/api/v1/auth/confrimation?token=".concat(token)
  };
  return mailgun.messages().send(data, function (error, body) {
    _logger["default"].info(body);
  });
};

var welcomeMail = function welcomeMail(name, email) {
  var data = {
    from: 'E-commerce <rilwan30@yahoo.com>',
    to: "".concat(email),
    subject: "Welcome ".concat(name),
    text: "Hi ".concat(name, " Your account has been activated")
  };
  return mailgun.messages().send(data, function (error, body) {
    _logger["default"].info(body);
  });
};

var resetPassword = function resetPassword(name, email, token) {
  var data = {
    from: 'E-commerce <majaagunoyinkolade@gmail.com>',
    to: "".concat(email),
    subject: "Hi ".concat(name, " Reset your Password"),
    text: "Hi, Reset your password using this link http://localhost:3000/api/v1/auth/reset-password?token=".concat(token)
  };
  return mailgun.messages().send(data, function (error, body) {
    _logger["default"].info(body);
  });
};

var resetSuccessful = function resetSuccessful(name, email) {
  var data = {
    from: 'E-commerce <rilwan30@yahoo.com>',
    to: "".concat(email),
    subject: "Hi ".concat(name),
    text: 'Hi, Reset your password has been Reset successfully'
  };
  return mailgun.messages().send(data, function (error, body) {
    _logger["default"].info(body);
  });
};

var _default = {
  verifyMail: verifyMail,
  welcomeMail: welcomeMail,
  resetPassword: resetPassword,
  resetSuccessful: resetSuccessful
};
exports["default"] = _default;