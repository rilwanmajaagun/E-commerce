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

var _config = require("../config");

/* eslint-disable import/no-cycle */
var productStatus = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var product_name, product;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            product_name = req.body.product_name;
            _context.prev = 1;
            _context.next = 4;
            return _services.productSerivce.checkStatusAndQuantity(product_name);

          case 4:
            product = _context.sent;

            if (!(product.status === 'out_of_stock')) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'product is out of stock pls check back later'
            }));

          case 7:
            if (!(product.quantity < req.body.quantity)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: "only ".concat(product.quantity, " left ")
            }));

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 14:
            next();

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function productStatus(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var updateQauntity = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name, quan) {
    var product, newQunatity, _status;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _services.productSerivce.checkStatusAndQuantity(name);

          case 3:
            product = _context2.sent;
            newQunatity = product.quantity - quan;

            if (newQunatity === 0) {
              _status = 'out_of_stock';
            } else {
              _status = 'in_stock';
            }

            _context2.next = 8;
            return _services.productSerivce.updateQuantityAndStatus(newQunatity, _status, name);

          case 8:
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);

            _config.logger.info(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function updateQauntity(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var checkOrderStatus = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var email, id, Status;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = res.locals.user.email;
            id = req.body.id;
            _context3.prev = 2;
            _context3.next = 5;
            return _services.orderSerivce.checkOrderStatus(email, id);

          case 5:
            Status = _context3.sent;

            if (Status) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Order could not be found'
            }));

          case 8:
            if (!(Status.order_status === 'shipped')) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Your order has been shipped '
            }));

          case 10:
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 15:
            next();

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 12]]);
  }));

  return function checkOrderStatus(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var selectOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var order;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _services.orderSerivce.selectOrder(req.body);

          case 3:
            order = _context4.sent;

            if (order) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Order not found'
            }));

          case 6:
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function selectOrder(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var createTranscationDetails = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _services.orderSerivce.transcationDetails(body));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createTranscationDetails(_x12) {
    return _ref5.apply(this, arguments);
  };
}();

var alreadyExistInWishList = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var prod, product;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _services.orderSerivce.checkWishList(req.body);

          case 3:
            prod = _context6.sent;

            if (!(prod !== null)) {
              _context6.next = 10;
              break;
            }

            req.body.id = prod.product_id;
            _context6.next = 8;
            return _services.productSerivce.selectProductByid(req.body);

          case 8:
            product = _context6.sent;
            return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: "".concat(product.product_name, " already exists in Wish List")
            }));

          case 10:
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 15:
            next();

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 12]]);
  }));

  return function alreadyExistInWishList(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteWishList = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var items;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _services.orderSerivce.selectWishList(req.body);

          case 3:
            items = _context7.sent;

            if (items) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Product does not exist in wish List'
            }));

          case 6:
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 8]]);
  }));

  return function deleteWishList(_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  updateQauntity: updateQauntity,
  productStatus: productStatus,
  checkOrderStatus: checkOrderStatus,
  selectOrder: selectOrder,
  createTranscationDetails: createTranscationDetails,
  alreadyExistInWishList: alreadyExistInWishList,
  deleteWishList: deleteWishList
};
exports["default"] = _default;