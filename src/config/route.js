import { Router } from 'express';
import { multer } from '../utils';
import {
    userController, categorController, productController, orderController, payment, downloadCsv
} from '../controllers';
import {
    userAuth, categoryAuth, validator, productAuth, orderAuth, sendcode
} from '../middlewares';
import ordersController from '../controllers/ordersController';

const router = new Router();

router.post('/auth/register', validator.signup, userAuth.signup, userController.createUsers);
router.post('/check', userController.checkUser);
router.post('/auth/login', validator.login, userAuth.login, userController.login);
router.get('/auth/userdetails', userAuth.verifyToken, userController.userDetails);
router.post('/category', userAuth.verifyToken, userAuth.adminAuthorization, categoryAuth.selectCategory, categorController.createCategory);
router.get('/category', categorController.selectAllCategory);
router.get('/auth/confirmation', userAuth.verifyToken, userAuth.is_active, userController.activateUser);
router.post('/auth/confirmation', validator.checkEmail, userAuth.confrimationToken, userController.confrimationToken);
router.post('/product', userAuth.verifyToken, userAuth.adminAuthorization, multer.upload, validator.product, productAuth.selectProduct, productController.addProduct);
router.get('/product', productController.selectAllProduct);
router.post('/search/Product', validator.searchProduct, productAuth.CheckProduct, productController.getSpecifyProduct);
router.post('/select/product/category', validator.getProductByCategory, productController.selectProductByCategory);
router.get('/product/category', productController.getAllProductByCategories);
router.delete('/product', userAuth.verifyToken, userAuth.adminAuthorization, validator.searchProduct, productAuth.CheckProduct, productController.deleteProduct);
router.post('/auth/forgot-password', validator.checkEmail, userController.forgetPassword);
router.post('/auth/reset-password', userAuth.verifyToken, userController.resetPassword);
router.delete('/category', userAuth.verifyToken, userAuth.adminAuthorization, categoryAuth.CheckCategory, categorController.deleteCategory);
router.put('/category', userAuth.verifyToken, userAuth.adminAuthorization, validator.category, categoryAuth.CheckCategory, categorController.updateCategory);
router.put('/product', userAuth.verifyToken, userAuth.adminAuthorization, validator.updateProduct, productAuth.CheckProductById, productController.updateProduct);
router.post('/order', userAuth.verifyToken, orderController.createOrders);
router.patch('/cancelOrder', userAuth.verifyToken, orderAuth.checkOrderStatus, orderController.cancelOrder);
router.patch('/updateOrder', userAuth.verifyToken, userAuth.adminAuthorization, validator.updateOrderStatus, orderAuth.selectOrder, orderController.UpdateOrderStatus);
router.post('/bankpayment', userAuth.verifyToken, payment.bankPayment);
router.post('/cardpayment/:transaction_id', userAuth.verifyToken, payment.cardPayment);
router.get('/verifypayment/:reference', userAuth.verifyToken, userAuth.adminAuthorization, payment.verifyPayment);
router.post('/wishlist', userAuth.verifyToken, orderAuth.alreadyExistInWishList, orderController.createWishList);
router.get('/wishlist', userAuth.verifyToken, ordersController.getWishList);
router.get('/subTotal/:transaction_id', ordersController.getSumSubTotal);
router.delete('/wishlist/:id', userAuth.verifyToken, orderAuth.deleteWishList, orderController.deleteWishList);
router.post('/cart', userAuth.verifyToken, validator.checkproductId, orderAuth.alreadyExistInCart, orderController.createCart);
router.get('/cart', userAuth.verifyToken, ordersController.getCart);
router.delete('/cart/:id', userAuth.verifyToken, orderAuth.deleteCart, orderController.deleteCart);
router.patch('/cart', userAuth.verifyToken, ordersController.updateCart);
router.post('/cart/wishlist', userAuth.verifyToken, orderAuth.alreadyMovedToCart, ordersController.moveToCart);
router.post('/address', userAuth.verifyToken, validator.checkAddress, ordersController.AddAddressDetails);
router.put('/address', userAuth.verifyToken, validator.checkupdatedAddress, ordersController.updateAddress);
router.get('/address', userAuth.verifyToken, orderController.getAddress);
router.patch('/address', userAuth.verifyToken, orderController.setDefaultAddress);
router.delete('/address/:id', userAuth.verifyToken, orderAuth.deleteAddress, orderController.deleteAddress);
router.post('/sendcode', sendcode.sendCode);
router.post('/checkcode', sendcode.checkCode);
router.get('/download', downloadCsv);
export default router;
