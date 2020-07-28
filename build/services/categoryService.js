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

/* eslint-disable import/no-cycle */
var createCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var id, name, payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = (0, _uuid.v4)();
            name = body.name;
            payload = [id, name];
            return _context.abrupt("return", _db.db.one(_db.categoryQuery.createCategory, payload));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createCategory(_x) {
    return _ref.apply(this, arguments);
  };
}();

var selectCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var name;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = body.name;
            return _context2.abrupt("return", _db.db.oneOrNone(_db.categoryQuery.chechkCategory, name));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function selectCategory(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var selectAllCategory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _db.db.manyOrNone(_db.categoryQuery.selectAllCategory));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function selectAllCategory() {
    return _ref3.apply(this, arguments);
  };
}();

var deleteCategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var name;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            name = body.name;
            return _context4.abrupt("return", _db.db.oneOrNone(_db.categoryQuery.deleteCategory, [name]));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteCategory(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var updateCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var name, new_name, category;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            name = body.name, new_name = body.new_name;
            _context5.next = 3;
            return _db.db.oneOrNone(_db.categoryQuery.updateCategory, [new_name, name]);

          case 3:
            category = _context5.sent;
            return _context5.abrupt("return", category);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateCategory(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  createCategory: createCategory,
  selectCategory: selectCategory,
  selectAllCategory: selectAllCategory,
  deleteCategory: deleteCategory,
  updateCategory: updateCategory
};
exports["default"] = _default;