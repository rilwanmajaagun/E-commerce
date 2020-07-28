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
var selectCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var category;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _services.categoryService.selectCategory(req.body);

          case 3:
            category = _context.sent;

            if (!category) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatus["default"].CONFLICT).send({
              message: 'category already exist'
            }));

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).send({
              message: _httpStatus["default"][500]
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function selectCategory(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var CheckCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var category;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _services.categoryService.selectCategory(req.body);

          case 3:
            category = _context2.sent;

            if (category) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(_httpStatus["default"].CONFLICT).send({
              message: 'category does not exist'
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

  return function CheckCategory(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  selectCategory: selectCategory,
  CheckCategory: CheckCategory
};
exports["default"] = _default;