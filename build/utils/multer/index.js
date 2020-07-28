"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _multer = _interopRequireDefault(require("multer"));

var storage = _multer["default"].memoryStorage({
  destination: function () {
    var _destination = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", '');

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function destination() {
      return _destination.apply(this, arguments);
    }

    return destination;
  }()
});

var upload = (0, _multer["default"])({
  storage: storage
}).single('image');
var _default = {
  upload: upload
};
exports["default"] = _default;