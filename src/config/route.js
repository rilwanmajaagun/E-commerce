import { Router } from 'express';
import { multer } from '../utils';
import {
    userController, categorController, productController, orderController, payment
} from '../controllers';
import {
    userAuth, categoryAuth, validator, productAuth, orderAuth
} from '../middlewares';

const router = new Router();

router.post('/auth/register', validator.signup, userAuth.signup, userController.createUsers);
router.post('/check', userController.checkUser);
router.post('/auth/login', validator.login, userAuth.login, userController.login);
router.post('/category', userAuth.verifyToken, userAuth.adminAuthorization, categoryAuth.selectCategory, categorController.createCategory);
router.get('/category', categorController.selectAllCategory);
router.get('/auth/confrimation', userAuth.verifyToken, userAuth.is_active, userController.activateUser);
router.post('/auth/confirmation', validator.checkEmail, userAuth.confrimationToken, userController.confrimationToken);
router.post('/product', userAuth.verifyToken, userAuth.adminAuthorization, multer.upload, validator.product, productAuth.selectProduct, productController.addProduct);
router.get('/product', productController.selectAllProduct);
router.post('/search/Product', validator.searchProduct, productAuth.CheckProduct, productController.getSpecifyProduct);
router.post('/select/product/category', validator.getProductBycategory, productController.selectProductBycategory);
router.get('/product/category', productController.getAllProductByCategories);
router.delete('/product', userAuth.verifyToken, userAuth.adminAuthorization, validator.searchProduct, productAuth.CheckProduct, productController.deleteProduct);
router.post('/auth/forgot-password', validator.checkEmail, userController.forgetPassword);
router.post('/auth/reset-password', userAuth.verifyToken, userController.resetPassword);
router.delete('/category', userAuth.verifyToken, userAuth.adminAuthorization, categoryAuth.CheckCategory, categorController.deleteCategory);
router.put('/category', userAuth.verifyToken, userAuth.adminAuthorization, validator.category, categoryAuth.CheckCategory, categorController.updateCategory);
router.put('/product', userAuth.verifyToken, userAuth.adminAuthorization, validator.updateProduct, productAuth.CheckProductByid, productController.updateProduct);
router.post('/order', userAuth.verifyToken, validator.createOrder, orderAuth.productStatus, orderController.createOrder);
router.patch('/cancelorder', userAuth.verifyToken, orderAuth.checkOrderStatus, orderController.cancelOrder);
router.patch('/updateOrder', validator.updateOrderStatus, orderAuth.selectOrder, orderController.UpdateOrderStatus);
router.post('/bankpayment', payment.bankPayment);
router.post('/cardpayment/:order_id', userAuth.verifyToken, payment.cardPayment);
router.get('/verifypayment/:reference', userAuth.verifyToken, userAuth.adminAuthorization, payment.verifyPayment);

export default router;
