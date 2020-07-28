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

// eslint-disable-next-line import/no-cycle
var createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user_id, user_name, email, body) {
    var id, quantity, product_name, payload, order;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _uuid.v4)();
            quantity = body.quantity, product_name = body.product_name;
            payload = [id, user_id, user_name, quantity, product_name, email];
            _context.next = 5;
            return _db.db.oneOrNone(_db.ordersQuery.createOrders, payload);

          case 5:
            order = _context.sent;
            return _context.abrupt("return", order);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createOrder(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var cancelOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, id) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _db.db.none(_db.ordersQuery.cancelledOrder, [email, id]));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function cancelOrder(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var checkOrderStatus = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email, id) {
    var status;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            status = _db.db.oneOrNone(_db.ordersQuery.selectOrderStatus, [email, id]);
            return _context3.abrupt("return", status);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function checkOrderStatus(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var selectOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var id, order;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = body.id;
            _context4.next = 3;
            return _db.db.oneOrNone(_db.ordersQuery.getOrderId, [id]);

          case 3:
            order = _context4.sent;
            return _context4.abrupt("return", order);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function selectOrder(_x9) {
    return _ref4.apply(this, arguments);
  };
}();

var updateOrderStatus = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var id, order_status;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = body.id, order_status = body.order_status;
            return _context5.abrupt("return", _db.db.none(_db.ordersQuery.updateOrderStatus, [order_status, id]));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateOrderStatus(_x10) {
    return _ref5.apply(this, arguments);
  };
}();

var transcationDetails = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(body) {
    var payload;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            payload = [body.id, body.order_id, body.reference, body.amount, body.status, body.currency, body.created_at];
            return _context6.abrupt("return", _db.db.none(_db.ordersQuery.transcationDetails, payload));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function transcationDetails(_x11) {
    return _ref6.apply(this, arguments);
  };
}();

var verfiyTanscation = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(status, refrence) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _db.db.none(_db.ordersQuery.verifyTranscation, [status, refrence]));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function verfiyTanscation(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  createOrder: createOrder,
  cancelOrder: cancelOrder,
  checkOrderStatus: checkOrderStatus,
  updateOrderStatus: updateOrderStatus,
  selectOrder: selectOrder,
  transcationDetails: transcationDetails,
  verfiyTanscation: verfiyTanscation
};
exports["default"] = _default;