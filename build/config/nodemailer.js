"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _mailgen = _interopRequireDefault(require("mailgen"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _bull = _interopRequireDefault(require("./bull"));

var _logger = _interopRequireDefault(require("./logger"));

var mailGenerator = new _mailgen["default"]({
  theme: 'default',
  product: {
    name: 'E-commerce',
    link: 'http://localhost:3000/'
  }
});

var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD
  }
});

var option = function option(email, subject, html) {
  var mailOptions = {
    from: "\"E-commerce\"<".concat(process.env.NODE_MAILER_EMAIL, ">"),
    to: email,
    subject: subject,
    html: html
  };
  return mailOptions;
};

var sendmail = function sendmail(mailOptions) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

var options = {
  attempts: 2
};

function signupMail(_x, _x2, _x3) {
  return _signupMail.apply(this, arguments);
}

function _signupMail() {
  _signupMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, first_name, token) {
    var mail, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return mailGenerator.generate({
              body: {
                name: first_name,
                intro: 'Welocome to E-commerce',
                action: {
                  instructions: "Please confirm your email address by clicking on the link below.\n                We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file\n                ",
                  button: {
                    color: '#22BC66',
                    text: 'Confrim your account',
                    link: "http://localhost:3000/api/v1/auth/confirmation?token=".concat(token)
                  }
                }
              }
            });

          case 2:
            mail = _context2.sent;
            _context2.next = 5;
            return transporter;

          case 5:
            _context2.next = 7;
            return option(email, 'signup sucessful', mail);

          case 7:
            data = _context2.sent;

            _bull["default"].add(data, options);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _signupMail.apply(this, arguments);
}

function verifyMail(_x4, _x5, _x6) {
  return _verifyMail.apply(this, arguments);
}

function _verifyMail() {
  _verifyMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email, first_name, token) {
    var mail, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return mailGenerator.generate({
              body: {
                name: first_name,
                intro: 'Welocome to E-commerce',
                action: {
                  instructions: "Please confirm your email address by clicking on the link below.\n                We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file\n                ",
                  button: {
                    color: '#22BC66',
                    text: 'Confrim your account',
                    link: "http://localhost:3000/api/v1/auth/confirmation?token=".concat(token)
                  }
                }
              }
            });

          case 2:
            mail = _context3.sent;
            _context3.next = 5;
            return transporter;

          case 5:
            _context3.next = 7;
            return option(email, 'Verify Your email', mail);

          case 7:
            data = _context3.sent;

            _bull["default"].add(data, options);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _verifyMail.apply(this, arguments);
}

function forgetPasswordMail(_x7, _x8, _x9) {
  return _forgetPasswordMail.apply(this, arguments);
}

function _forgetPasswordMail() {
  _forgetPasswordMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(first_name, email, token) {
    var mail, data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return mailGenerator.generate({
              body: {
                name: first_name,
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                  instructions: 'Click the button below to reset your password:',
                  button: {
                    color: '#DC4D2F',
                    text: 'Rest your Password',
                    link: "http://localhost:3000/api/v1/auth/reset-password?token=".concat(token)
                  }
                }
              }
            });

          case 2:
            mail = _context4.sent;
            _context4.next = 5;
            return transporter;

          case 5:
            _context4.next = 7;
            return option(email, 'Rest Password', mail);

          case 7:
            data = _context4.sent;

            _bull["default"].add(data, options);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _forgetPasswordMail.apply(this, arguments);
}

function welcomeMail(_x10, _x11) {
  return _welcomeMail.apply(this, arguments);
}

function _welcomeMail() {
  _welcomeMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(first_name, email) {
    var mail, data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return mailGenerator.generate({
              body: {
                name: first_name,
                intro: 'Your account has been activated'
              }
            });

          case 2:
            mail = _context5.sent;
            _context5.next = 5;
            return transporter;

          case 5:
            _context5.next = 7;
            return option(email, 'Welcome', mail);

          case 7:
            data = _context5.sent;

            _bull["default"].add(data, options);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _welcomeMail.apply(this, arguments);
}

function resetSuccessful(_x12, _x13) {
  return _resetSuccessful.apply(this, arguments);
} // consumer


function _resetSuccessful() {
  _resetSuccessful = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(first_name, email) {
    var mail, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return mailGenerator.generate({
              body: {
                name: first_name,
                intro: 'Your password has been Reset successfully'
              }
            });

          case 2:
            mail = _context6.sent;
            _context6.next = 5;
            return transporter;

          case 5:
            _context6.next = 7;
            return option(email, 'Reset Successful', mail);

          case 7:
            data = _context6.sent;

            _bull["default"].add(data, options);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _resetSuccessful.apply(this, arguments);
}

_bull["default"].process( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(job) {
    var respo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sendmail(job.data);

          case 2:
            respo = _context.sent;
            console.log(respo);
            return _context.abrupt("return", respo);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x14) {
    return _ref.apply(this, arguments);
  };
}());

var _default = {
  signupMail: signupMail,
  forgetPasswordMail: forgetPasswordMail,
  welcomeMail: welcomeMail,
  resetSuccessful: resetSuccessful,
  verifyMail: verifyMail
};
exports["default"] = _default;