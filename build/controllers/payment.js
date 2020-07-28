"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _axios = _interopRequireDefault(require("axios"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _logger = _interopRequireDefault(require("../config/logger"));

var _middlewares = require("../middlewares");

var _services = require("../services");

var bankPayment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, amount, _req$body$bank, code, account_number, birthday, options, transaction, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, amount = _req$body.amount, _req$body$bank = _req$body.bank, code = _req$body$bank.code, account_number = _req$body$bank.account_number, birthday = _req$body.birthday;
            options = {
              method: 'POST',
              url: 'https://api.paystack.co/charge',
              port: 443,
              headers: {
                Authorization: "Bearer ".concat(process.env.PAYSTACK_API_KEY),
                'Content-Type': 'application/json'
              },
              data: {
                email: email,
                amount: amount,
                metadata: {
                  custom_fields: [{
                    value: 'makurdi',
                    display_name: 'Donation for',
                    variable_name: 'donation_for'
                  }]
                },
                bank: {
                  code: code,
                  account_number: account_number
                },
                birthday: birthday
              }
            };
            _context.next = 5;
            return (0, _axios["default"])(options);

          case 5:
            transaction = _context.sent;
            data = transaction.data.data;
            return _context.abrupt("return", res.json(data));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);

            _logger["default"].info(_context.t0.response.status);

            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function bankPayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var cardPayment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var order_id, _req$body2, email, amount, _req$body2$card, cvv, number, expiry_month, expiry_year, pin, options, transaction, data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            order_id = req.params.order_id;
            _context2.prev = 1;
            _req$body2 = req.body, email = _req$body2.email, amount = _req$body2.amount, _req$body2$card = _req$body2.card, cvv = _req$body2$card.cvv, number = _req$body2$card.number, expiry_month = _req$body2$card.expiry_month, expiry_year = _req$body2$card.expiry_year, pin = _req$body2.pin;
            options = {
              method: 'POST',
              url: 'https://api.paystack.co/charge',
              port: 443,
              headers: {
                Authorization: "Bearer ".concat(process.env.PAYSTACK_API_KEY),
                'Content-Type': 'application/json'
              },
              data: {
                email: email,
                amount: amount,
                metadata: {
                  custom_fields: [{
                    value: 'makurdi',
                    display_name: 'Donation for',
                    variable_name: 'donation_for'
                  }]
                },
                card: {
                  cvv: cvv,
                  number: number,
                  expiry_month: expiry_month,
                  expiry_year: expiry_year
                },
                pin: pin
              }
            };
            _context2.next = 6;
            return (0, _axios["default"])(options);

          case 6:
            transaction = _context2.sent;
            data = transaction.data.data;
            data.order_id = order_id;
            _context2.next = 11;
            return _middlewares.orderAuth.createTranscationDetails(data);

          case 11:
            return _context2.abrupt("return", res.json(data));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](1);

            _logger["default"].info(_context2.t0.response.status);

            return _context2.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 14]]);
  }));

  return function cardPayment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var verifyPayment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var reference, options, transactionStatus, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            reference = req.params.reference;
            options = {
              method: 'GET',
              url: "https://api.paystack.co/transaction/verify/".concat(reference),
              port: 443,
              headers: {
                Authorization: "Bearer ".concat(process.env.PAYSTACK_API_KEY),
                'Content-Type': 'application/json'
              }
            };
            _context3.next = 5;
            return (0, _axios["default"])(options);

          case 5:
            transactionStatus = _context3.sent;
            data = transactionStatus.data.data;

            if (data.status === 'success') {
              _services.orderSerivce.verfiyTanscation('success', reference);
            } else {
              _services.orderSerivce.verfiyTanscation('failed', reference);
            }

            return _context3.abrupt("return", res.json(data));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);

            _logger["default"].info(_context3.t0);

            return _context3.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function verifyPayment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  bankPayment: bankPayment,
  cardPayment: cardPayment,
  verifyPayment: verifyPayment
};
exports["default"] = _default;