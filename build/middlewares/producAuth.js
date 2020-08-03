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

// eslint-disable-next-line import/no-cycle
var selectProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var category, product, categories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            category = req.body.category;
            req.body.name = category;
            _context.prev = 2;
            _context.next = 5;
            return _services.productSerivce.selectProduct(req.body);

          case 5:
            product = _context.sent;
            _context.next = 8;
            return _services.categoryService.selectCategory(req.body);

          case 8:
            categories = _context.sent;

            if (categories) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Input a valid category'
            }));

          case 11:
            if (!product) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'product already exist'
            }));

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 18:
            next();

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 15]]);
  }));

  return function selectProduct(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var CheckProduct = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var product;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _services.productSerivce.selectProduct(req.body);

          case 3:
            product = _context2.sent;

            if (product) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(_httpStatus["default"].CONFLICT).send({
              message: 'product does not exist'
            }));

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function CheckProduct(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var CheckProductByid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var product, categories;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req.body.name = req.body.category;
            _context3.prev = 1;
            _context3.next = 4;
            return _services.productSerivce.selectProductByid(req.body);

          case 4:
            product = _context3.sent;
            _context3.next = 7;
            return _services.categoryService.selectCategory(req.body);

          case 7:
            categories = _context3.sent;

            if (categories) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Input a valid category'
            }));

          case 10:
            if (product) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(_httpStatus["default"].CONFLICT).send({
              message: 'product does not exist'
            }));

          case 12:
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 17:
            next();

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 14]]);
  }));

  return function CheckProductByid(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var updateQauntity = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var product, newQunatity, _status;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _services.productSerivce.checkStatusAndQuantity(req.body);

          case 3:
            product = _context4.sent;
            newQunatity = product.quantity - 1;

            if (newQunatity === 0) {
              _status = 'out_of_stock';
            } else {
              _status = 'in_stock';
            }

            _context4.next = 8;
            return _services.productSerivce.updateQuantityAndStatus(newQunatity, _status, req.body);

          case 8:
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 13:
            next();

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function updateQauntity(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = {
  selectProduct: selectProduct,
  CheckProduct: CheckProduct,
  CheckProductByid: CheckProductByid,
  updateQauntity: updateQauntity
};
exports["default"] = _default;