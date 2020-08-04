"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _json2csv = require("json2csv");

var _httpStatus = _interopRequireDefault(require("http-status"));

var _services = require("../services");

var downloadCsv = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var product, json2csvParser, csv;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _services.productSerivce.getAllProduct();

          case 3:
            product = _context.sent;
            json2csvParser = new _json2csv.Parser();
            csv = json2csvParser.parse(product);
            res.setHeader('Content-disposition', 'attachment; filename=product.csv');
            res.set('Content-Type', 'text/csv');
            return _context.abrupt("return", res.status(_httpStatus["default"].OK).send(csv));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function downloadCsv(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = downloadCsv;
exports["default"] = _default;