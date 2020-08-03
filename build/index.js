"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _httpStatus = _interopRequireDefault(require("http-status"));

var _config2 = require("./config");

var _route = _interopRequireDefault(require("./config/route"));

var port = process.env.ECOMMERCE_PORT || process.env.PORT || 3000;

_config2.app.listen(port, function () {
  _config2.logger.info("Application listen on port ".concat(port));
}); // app.get('/', (req, res) => {
//     client.ping((err, msg) => {
//         if (err) {
//             return res.status(status.INTERNAL_SERVER_ERROR).send(status[500]);
//         }
//         return res.status(status.OK).send({ mesaage: msg });
//     });
// });


_config2.app.get('/', function (req, res) {
  res.status(_httpStatus["default"].OK).send({
    message: 'Hello'
  });
});

_config2.app.use('/api/v1', _route["default"]);

var _default = _config2.app;
exports["default"] = _default;