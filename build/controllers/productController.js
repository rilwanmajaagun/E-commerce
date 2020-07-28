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

var _middlewares = require("../middlewares");

var addProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var myfile, picture, product;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            myfile = req.file;
            _context.next = 4;
            return _middlewares.aws.uploadImage(myfile);

          case 4:
            picture = _context.sent;
            req.body.product_image = picture.Location;
            _context.next = 8;
            return _services.productSerivce.addProduct(req.body);

          case 8:
            product = _context.sent;
            return _context.abrupt("return", product ? res.status(_httpStatus["default"].CREATED).send({
              message: 'product Added Sucessfully',
              data: {
                id: product.id,
                product_name: product.product_name,
                category: product.category,
                status: product.status,
                quantity: product.quantity,
                price: product.price,
                product_image: product.product_name
              }
            }) : res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'Error adding product',
              data: {}
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function addProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getSpecifyProduct = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
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
            return _context2.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: 'Product found',
              data: {
                product: product.product_name,
                category: product.category,
                status: product.status,
                quantity: product.quantity,
                price: product.price
              }
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getSpecifyProduct(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var selectAllProduct = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;

            _config.client.get('allProduct', /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(error, result) {
                var product;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!result) {
                          _context3.next = 2;
                          break;
                        }

                        return _context3.abrupt("return", res.status(_httpStatus["default"].OK).send({
                          message: 'successfully fetched all product',
                          data: JSON.parse(result)
                        }));

                      case 2:
                        _context3.next = 4;
                        return _services.productSerivce.getAllProduct();

                      case 4:
                        product = _context3.sent;

                        if (!product) {
                          _context3.next = 9;
                          break;
                        }

                        _config.client.set('allProduct', JSON.stringify(product));

                        _config.client.expire('allProduct', 300);
                        /*  expires in five minute*/


                        return _context3.abrupt("return", res.status(_httpStatus["default"].OK).send({
                          message: 'successfully fetched all product',
                          data: product
                        }));

                      case 9:
                        return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
                          message: 'Error get all Product',
                          data: null
                        }));

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }());

            _context4.next = 7;
            break;

          case 4:
            _context4.prev = 4;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 4]]);
  }));

  return function selectAllProduct(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var selectProductBycategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var product;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _services.productSerivce.getProductBycategory(req.body);

          case 3:
            product = _context5.sent;
            return _context5.abrupt("return", product.length > 0 ? res.status(_httpStatus["default"].OK).send({
              message: 'Product found',
              data: product
            }) : res.status(_httpStatus["default"].BAD_REQUEST).send({
              message: 'No Product found'
            }));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function selectProductBycategory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var getAllProductByCategories = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            _config.client.get('allProductBycategories', /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(error, result) {
                var product;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!result) {
                          _context6.next = 2;
                          break;
                        }

                        return _context6.abrupt("return", res.status(_httpStatus["default"].OK).send({
                          message: 'successfully fetched all product',
                          data: JSON.parse(result)
                        }));

                      case 2:
                        _context6.next = 4;
                        return _services.productSerivce.getAllProductBycategories();

                      case 4:
                        product = _context6.sent;

                        if (!product) {
                          _context6.next = 9;
                          break;
                        }

                        _config.client.set('allProductBycategories', JSON.stringify(product));

                        _config.client.expire('allProductBycategories', 300);
                        /*  expires in five minute*/


                        return _context6.abrupt("return", res.status(_httpStatus["default"].OK).send({
                          message: 'successfully fetch all product',
                          data: product
                        }));

                      case 9:
                        return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
                          message: 'Error get all Product',
                          data: null
                        }));

                      case 10:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x13, _x14) {
                return _ref7.apply(this, arguments);
              };
            }());

            _context7.next = 7;
            break;

          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 4]]);
  }));

  return function getAllProductByCategories(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteProduct = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var product;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _services.productSerivce.deleteProduct(req.body);

          case 3:
            product = _context8.sent;
            return _context8.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: "".concat(product.product_name, " Deleted successfully")
            }));

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function deleteProduct(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var updateProduct = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var product;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _services.productSerivce.updateProduct(req.body);

          case 3:
            product = _context9.sent;
            return _context9.abrupt("return", res.status(_httpStatus["default"].CREATED).send({
              message: 'product updated sucessfully',
              data: product
            }));

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function updateProduct(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var _default = {
  addProduct: addProduct,
  getSpecifyProduct: getSpecifyProduct,
  selectAllProduct: selectAllProduct,
  selectProductBycategory: selectProductBycategory,
  getAllProductByCategories: getAllProductByCategories,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct
};
exports["default"] = _default;