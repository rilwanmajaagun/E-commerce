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

var _middlewares = require("../middlewares");

var createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, _req$body, product_name, quantity, user, userName, order;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = res.locals.user.email;
            _req$body = req.body, product_name = _req$body.product_name, quantity = _req$body.quantity;
            _context.prev = 2;
            _context.next = 5;
            return _services.userService.checkIfUserExist(email);

          case 5:
            user = _context.sent;
            userName = "".concat(user.first_name, " ").concat(user.last_name);
            _context.next = 9;
            return _services.orderSerivce.createOrder(user.id, userName, user.email, req.body);

          case 9:
            order = _context.sent;
            _context.next = 12;
            return _middlewares.orderAuth.updateQauntity(product_name, quantity);

          case 12:
            return _context.abrupt("return", res.status(_httpStatus["default"].CREATED).send({
              message: 'your order as been placed',
              data: order
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 15]]);
  }));

  return function createOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var cancelOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, id;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = res.locals.user.email;
            id = req.body.id;
            _context2.prev = 2;
            _context2.next = 5;
            return _services.orderSerivce.cancelOrder(email, id);

          case 5:
            return _context2.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: 'your order has been cancelled'
            }));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function cancelOrder(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var UpdateOrderStatus = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _services.orderSerivce.updateOrderStatus(req.body);

          case 3:
            return _context3.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: 'product order as been updated sucessfully'
            }));

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function UpdateOrderStatus(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  createOrder: createOrder,
  cancelOrder: cancelOrder,
  UpdateOrderStatus: UpdateOrderStatus
};
exports["default"] = _default;