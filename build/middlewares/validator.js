"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _utils = require("../utils");

var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _utils.schema.user.validateAsync(req.body);

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function signup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _utils.schema.login.validateAsync(req.body);

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context2.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var checkEmail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _utils.schema.email.validateAsync(req.body);

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context3.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  }));

  return function checkEmail(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var product = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _utils.schema.products.validateAsync(req.body);

          case 3:
            _context4.next = 8;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context4.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 5]]);
  }));

  return function product(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var searchProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _utils.schema.product.validateAsync(req.body);

          case 3:
            _context5.next = 8;
            break;

          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context5.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 5]]);
  }));

  return function searchProduct(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var getProductBycategory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _utils.schema.category.validateAsync(req.body);

          case 3:
            _context6.next = 8;
            break;

          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context6.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 5]]);
  }));

  return function getProductBycategory(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var category = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _utils.schema.updateCategory.validateAsync(req.body);

          case 3:
            _context7.next = 8;
            break;

          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context7.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 5]]);
  }));

  return function category(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

var updateProduct = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _utils.schema.updateProducts.validateAsync(req.body);

          case 3:
            _context8.next = 8;
            break;

          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context8.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 5]]);
  }));

  return function updateProduct(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

var createOrder = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _utils.schema.updateProducts.validateAsync(req.body);

          case 3:
            _context9.next = 8;
            break;

          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context9.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 5]]);
  }));

  return function createOrder(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

var updateOrderStatus = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _utils.schema.updateStatus.validateAsync(req.body);

          case 3:
            _context10.next = 8;
            break;

          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: _context10.t0.details[0].message.replace(/[\"]/gi, '')
            }));

          case 8:
            next();

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 5]]);
  }));

  return function updateOrderStatus(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

var _default = {
  signup: signup,
  login: login,
  checkEmail: checkEmail,
  product: product,
  searchProduct: searchProduct,
  getProductBycategory: getProductBycategory,
  category: category,
  updateProduct: updateProduct,
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus
};
exports["default"] = _default;