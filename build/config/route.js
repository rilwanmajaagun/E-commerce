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
router.post('/auth/register', _middlewares.validator.signup, _middlewares.userAuth.signup, _controllers.userController.createUsers); // done
// router.post('/check', userController.checkUser);

router.post('/auth/login', _middlewares.validator.login, _middlewares.userAuth.login, _controllers.userController.login); // done

router.post('/category', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.categoryAuth.selectCategory, _controllers.categorController.createCategory); // done

router.get('/category', _controllers.categorController.selectAllCategory); // done

router.get('/auth/confirmation', _middlewares.userAuth.verifyToken, _middlewares.userAuth.is_active, _controllers.userController.activateUser); // done

router.post('/auth/confirmation', _middlewares.validator.checkEmail, _middlewares.userAuth.confrimationToken, _controllers.userController.confrimationToken); // done

router.post('/product', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _utils.multer.upload, _middlewares.validator.product, _middlewares.productAuth.selectProduct, _controllers.productController.addProduct); // done

router.get('/product', _controllers.productController.selectAllProduct); // done

router.post('/search/Product', _middlewares.validator.searchProduct, _middlewares.productAuth.CheckProduct, _controllers.productController.getSpecifyProduct); // done

router.post('/select/product/category', _middlewares.validator.getProductBycategory, _controllers.productController.selectProductBycategory); // done

router.get('/product/category', _controllers.productController.getAllProductByCategories); // done

router["delete"]('/product', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.searchProduct, _middlewares.productAuth.CheckProduct, _controllers.productController.deleteProduct); // done

router.post('/auth/forgot-password', _middlewares.validator.checkEmail, _controllers.userController.forgetPassword); // done

router.post('/auth/reset-password', _middlewares.userAuth.verifyToken, _controllers.userController.resetPassword); // done

router["delete"]('/category', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.categoryAuth.CheckCategory, _controllers.categorController.deleteCategory); // done

router.put('/category', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.category, _middlewares.categoryAuth.CheckCategory, _controllers.categorController.updateCategory); // done

router.put('/product', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.updateProduct, _middlewares.productAuth.CheckProductByid, _controllers.productController.updateProduct); // done

router.post('/order', _middlewares.userAuth.verifyToken, _middlewares.validator.createOrder, _middlewares.orderAuth.productStatus, _controllers.orderController.createOrder); //

router.patch('/cancelorder', _middlewares.userAuth.verifyToken, _middlewares.orderAuth.checkOrderStatus, _controllers.orderController.cancelOrder); //

router.patch('/updateOrder', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _middlewares.validator.updateOrderStatus, _middlewares.orderAuth.selectOrder, _controllers.orderController.UpdateOrderStatus); //

router.post('/bankpayment', _middlewares.userAuth.verifyToken, _controllers.payment.bankPayment);
router.post('/cardpayment/:order_id', _middlewares.userAuth.verifyToken, _controllers.payment.cardPayment); //

router.get('/verifypayment/:reference', _middlewares.userAuth.verifyToken, _middlewares.userAuth.adminAuthorization, _controllers.payment.verifyPayment); //

var _default = router;
exports["default"] = _default;