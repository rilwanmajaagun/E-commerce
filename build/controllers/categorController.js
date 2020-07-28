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

var createCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var category;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _services.categoryService.createCategory(req.body);

          case 3:
            category = _context.sent;
            return _context.abrupt("return", res.status(_httpStatus["default"].CREATED).send({
              message: 'category created successfully',
              data: {
                id: category.id,
                name: category.name,
                created_at: category.created_at
              }
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function createCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var selectAllCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            _config.client.get('allcategory', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(error, result) {
                var allCategory;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!result) {
                          _context2.next = 2;
                          break;
                        }

                        return _context2.abrupt("return", res.status(_httpStatus["default"].OK).send({
                          message: 'All categories selected sucessfully',
                          data: JSON.parse(result)
                        }));

                      case 2:
                        _context2.next = 4;
                        return _services.categoryService.selectAllCategory();

                      case 4:
                        allCategory = _context2.sent;

                        if (!allCategory) {
                          _context2.next = 9;
                          break;
                        }

                        _config.client.set('allcategory', JSON.stringify(allCategory));

                        _config.client.expire('allcategory', 300);
                        /*  expires in five minute*/


                        return _context2.abrupt("return", res.status(_httpStatus["default"].OK).send({
                          message: 'All categories selected sucessfully ',
                          data: allCategory
                        }));

                      case 9:
                        return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).send({
                          message: 'Error get all categories',
                          data: null
                        }));

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }());

            _context3.next = 7;
            break;

          case 4:
            _context3.prev = 4;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 4]]);
  }));

  return function selectAllCategory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteCategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var category;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _services.categoryService.deleteCategory(req.body);

          case 3:
            category = _context4.sent;
            return _context4.abrupt("return", res.status(_httpStatus["default"].OK).send({
              message: "".concat(category.name, " Deleted successfully")
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function deleteCategory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var updateCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var category;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _services.categoryService.updateCategory(req.body);

          case 3:
            category = _context5.sent;
            return _context5.abrupt("return", res.status(_httpStatus["default"].CREATED).send({
              message: "".concat(category.name, " updated sucessfully")
            }));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500],
              data: null
            }));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function updateCategory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  createCategory: createCategory,
  selectAllCategory: selectAllCategory,
  deleteCategory: deleteCategory,
  updateCategory: updateCategory
};
exports["default"] = _default;