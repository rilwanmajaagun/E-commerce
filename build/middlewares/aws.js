"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _uuid = require("uuid");

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

var uploadImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file) {
    var myFile, fileType, params, datas, picture;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            myFile = file.originalname.split('.');
            fileType = myFile[myFile.length - 1];
            params = {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: "".concat((0, _uuid.v4)(), ".").concat(fileType),
              Body: file.buffer,
              ACL: 'public-read'
            };
            _context.next = 6;
            return s3.upload(params).promise();

          case 6:
            datas = _context.sent;
            _context.next = 9;
            return datas;

          case 9:
            picture = _context.sent;
            return _context.abrupt("return", picture);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function uploadImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  uploadImage: uploadImage
};
exports["default"] = _default;