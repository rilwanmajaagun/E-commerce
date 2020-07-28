"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var schema = {
  user: _joi["default"].object({
    first_name: _joi["default"].string().required(),
    last_name: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    phone_number: _joi["default"].number(),
    password: _joi["default"].string().min(5).message('password too weak, must not be less than five character').regex(/^[a-zA-Z0-9]{3,30}$/).message('password must contain')
  }),
  login: _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  }),
  email: _joi["default"].object({
    email: _joi["default"].string().email().required()
  }),
  products: _joi["default"].object({
    product_name: _joi["default"].string().required(),
    category: _joi["default"].string().required(),
    quantity: _joi["default"].number().required(),
    price: _joi["default"].number().required()
  }),
  product: _joi["default"].object({
    product_name: _joi["default"].string().required()
  }),
  category: _joi["default"].object({
    category: _joi["default"].string().required()
  }),
  updateCategory: _joi["default"].object({
    name: _joi["default"].string().required(),
    new_name: _joi["default"].string().required()
  }),
  updateProducts: _joi["default"].object({
    product_name: _joi["default"].string(),
    category: _joi["default"].string(),
    quantity: _joi["default"].number(),
    price: _joi["default"].number(),
    status: _joi["default"].string().valid('in_stock', 'out_of_stock'),
    id: _joi["default"].string().uuid()
  }),
  createOrder: _joi["default"].object({
    quantity: _joi["default"].number().required(),
    product_name: _joi["default"].string().required()
  }),
  updateStatus: _joi["default"].object({
    id: _joi["default"].string().uuid(),
    order_status: _joi["default"].string().valid('pending', 'shipped')
  })
};
var _default = schema;
exports["default"] = _default;