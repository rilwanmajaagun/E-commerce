import { Router } from 'express';
import { multer } from '../utils';
import {
    userController, categorController, productController, orderController, payment
} from '../controllers';
import {
    userAuth, categoryAuth, validator, productAuth, orderAuth
} from '../middlewares';

const router = new Router();

router.post('/auth/register', validator.signup, userAuth.signup, userController.createUsers); // done
// router.post('/check', userController.checkUser);
router.post('/auth/login', validator.login, userAuth.login, userController.login); // done
router.post('/category', userAuth.verifyToken, userAuth.adminAuthorization, categoryAuth.selectCategory, categorController.createCategory); // done
router.get('/category', categorController.selectAllCategory); // done
router.get('/auth/confirmation', userAuth.verifyToken, userAuth.is_active, userController.activateUser); // done
router.post('/auth/confirmation', validator.checkEmail, userAuth.confrimationToken, userController.confrimationToken); // done
router.post('/product', userAuth.verifyToken, userAuth.adminAuthorization, multer.upload, validator.product, productAuth.selectProduct, productController.addProduct); // done
router.get('/product', productController.selectAllProduct); // done
router.post('/search/Product', validator.searchProduct, productAuth.CheckProduct, productController.getSpecifyProduct); // done
router.post('/select/product/category', validator.getProductBycategory, productController.selectProductBycategory); // done
router.get('/product/category', productController.getAllProductByCategories); // done
router.delete('/product', userAuth.verifyToken, userAuth.adminAuthorization, validator.searchProduct, productAuth.CheckProduct, productController.deleteProduct); // done
router.post('/auth/forgot-password', validator.checkEmail, userController.forgetPassword); // done
router.post('/auth/reset-password', userAuth.verifyToken, userController.resetPassword); // done
router.delete('/category', userAuth.verifyToken, userAuth.adminAuthorization, categoryAuth.CheckCategory, categorController.deleteCategory); // done
router.put('/category', userAuth.verifyToken, userAuth.adminAuthorization, validator.category, categoryAuth.CheckCategory, categorController.updateCategory); // done
router.put('/product', userAuth.verifyToken, userAuth.adminAuthorization, validator.updateProduct, productAuth.CheckProductByid, productController.updateProduct); // done
router.post('/order', userAuth.verifyToken, validator.createOrder, orderAuth.productStatus, orderController.createOrder); //
router.patch('/cancelorder', userAuth.verifyToken, orderAuth.checkOrderStatus, orderController.cancelOrder); //
router.patch('/updateOrder', userAuth.verifyToken, userAuth.adminAuthorization, validator.updateOrderStatus, orderAuth.selectOrder, orderController.UpdateOrderStatus); //
router.post('/bankpayment', userAuth.verifyToken, payment.bankPayment);
router.post('/cardpayment/:order_id', userAuth.verifyToken, payment.cardPayment); //
router.get('/verifypayment/:reference', userAuth.verifyToken, userAuth.adminAuthorization, payment.verifyPayment); //

export default router;
