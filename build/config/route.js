"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _utils = require("../utils");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var router = new _express.Router();
router.post('/auth/register', _middlewares.validator.signup, _middlewares.userAuth.signup, _controllers.userController.createUsers);
router.post('/check', _controllers.userController.checkUser);
router.post('/auth/login', _middlewares.validator.login, _middlewares.userAuth.login, _controllers.userController.login);
router.post('/category', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.categoryAuth.selectCategory, _controllers.categorController.createCategory);
router.get('/category', _controllers.categorController.selectAllCategory);
router.get('/auth/confirmation', _middlewares.userAuth.verifyToken, _middlewares.userAuth.is_active, _controllers.userController.activateUser);
router.post('/auth/confirmation', _middlewares.validator.checkEmail, _middlewares.userAuth.confrimationToken, _controllers.userController.confrimationToken);
router.post('/product', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _utils.multer.upload, _middlewares.validator.product, _middlewares.productAuth.selectProduct, _controllers.productController.addProduct);
router.get('/product', _controllers.productController.selectAllProduct);
router.post('/search/Product', _middlewares.validator.searchProduct, _middlewares.productAuth.CheckProduct, _controllers.productController.getSpecifyProduct);
router.post('/select/product/category', _middlewares.validator.getProductBycategory, _controllers.productController.selectProductBycategory);
router.get('/product/category', _controllers.productController.getAllProductByCategories);
router["delete"]('/product', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.searchProduct, _middlewares.productAuth.CheckProduct, _controllers.productController.deleteProduct);
router.post('/auth/forgot-password', _middlewares.validator.checkEmail, _controllers.userController.forgetPassword);
router.post('/auth/reset-password', _middlewares.userAuth.verifyToken, _controllers.userController.resetPassword);
router["delete"]('/category', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.categoryAuth.CheckCategory, _controllers.categorController.deleteCategory);
router.put('/category', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.category, _middlewares.categoryAuth.CheckCategory, _controllers.categorController.updateCategory);
router.put('/product', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.updateProduct, _middlewares.productAuth.CheckProductByid, _controllers.productController.updateProduct);
router.post('/order', _middlewares.userAuth.verifyToken, _middlewares.validator.createOrder, _middlewares.orderAuth.productStatus, _controllers.orderController.createOrder);
router.patch('/cancelorder', _middlewares.userAuth.verifyToken, _middlewares.orderAuth.checkOrderStatus, _controllers.orderController.cancelOrder);
router.patch('/updateOrder', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.updateOrderStatus, _middlewares.orderAuth.selectOrder, _controllers.orderController.UpdateOrderStatus);
router.post('/bankpayment', _middlewares.userAuth.verifyToken, _controllers.payment.bankPayment);
router.post('/cardpayment/:order_id', _middlewares.userAuth.verifyToken, _controllers.payment.cardPayment);
router.get('/verifypayment/:reference', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _controllers.payment.verifyPayment);
router.post('/sendcode', _middlewares.sendcode.sendCode);
router.post('/checkcode', _middlewares.sendcode.checkCode);
router.get('/download', _controllers.downloadCsv);
var _default = router;
exports["default"] = _default;