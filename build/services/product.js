"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuid = require("uuid");

var _db = require("../db");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var addProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var id, product_name, category, quantity, price, product_image, payload, product;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _uuid.v4)();
            product_name = body.product_name, category = body.category, quantity = body.quantity, price = body.price, product_image = body.product_image;
            payload = [id, product_name, category, quantity, price, product_image];
            _context.next = 5;
            return _db.db.one(_db.productQuery.createProduct, payload);

          case 5:
            product = _context.sent;
            return _context.abrupt("return", product);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addProduct(_x) {
    return _ref.apply(this, arguments);
  };
}();

var selectProduct = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var product_name;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            product_name = body.product_name;
            return _context2.abrupt("return", _db.db.oneOrNone(_db.productQuery.getProductByProduct_name, [product_name]));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function selectProduct(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var selectProductByid = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var id;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = body.id;
            return _context3.abrupt("return", _db.db.oneOrNone(_db.productQuery.getProductByid, [id]));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function selectProductByid(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getAllProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _db.db.manyOrNone(_db.productQuery.getAllProduct));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getAllProduct() {
    return _ref4.apply(this, arguments);
  };
}();

var getProductBycategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var category;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            category = body.category;
            return _context5.abrupt("return", _db.db.manyOrNone(_db.productQuery.getProductByCategories, [category]));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getProductBycategory(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var getAllProductBycategories = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var product;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _db.db.any(_db.productQuery.getAllProductByCategory);

          case 2:
            product = _context6.sent;
            return _context6.abrupt("return", product);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getAllProductBycategories() {
    return _ref6.apply(this, arguments);
  };
}();

var deleteProduct = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(body) {
    var product_name;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            product_name = body.product_name;
            return _context7.abrupt("return", _db.db.oneOrNone(_db.productQuery.deleteProduct, [product_name]));

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteProduct(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

var updateProduct = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(body) {
    var id, oldData, newdata, product;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = body.id;
            _context8.next = 3;
            return _db.db.oneOrNone(_db.productQuery.getProductByid, [id]);

          case 3:
            oldData = _context8.sent;
            newdata = _objectSpread(_objectSpread({}, oldData), body);
            product = _db.db.oneOrNone(_db.productQuery.updateProduct, [newdata.product_name, newdata.category, newdata.quantity, newdata.price, newdata.status, id]);
            return _context8.abrupt("return", product);

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function updateProduct(_x6) {
    return _ref8.apply(this, arguments);
  };
}();

var checkStatusAndQuantity = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(product_name) {
    var product;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _db.db.oneOrNone(_db.productQuery.checkProductStatus, [product_name]);

          case 2:
            product = _context9.sent;
            return _context9.abrupt("return", product);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function checkStatusAndQuantity(_x7) {
    return _ref9.apply(this, arguments);
  };
}();

var updateQuantityAndStatus = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(quantity, status, product_name) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", _db.db.none(_db.productQuery.updateQuantityAndStatu, [quantity, status, product_name]));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function updateQuantityAndStatus(_x8, _x9, _x10) {
    return _ref10.apply(this, arguments);
  };
}();

var _default = {
  addProduct: addProduct,
  selectProduct: selectProduct,
  getAllProduct: getAllProduct,
  getProductBycategory: getProductBycategory,
  getAllProductBycategories: getAllProductBycategories,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
  selectProductByid: selectProductByid,
  checkStatusAndQuantity: checkStatusAndQuantity,
  updateQuantityAndStatus: updateQuantityAndStatus
};
exports["default"] = _default;