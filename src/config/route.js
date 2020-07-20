import { Router } from 'express';
import { userController, categorController, productController } from '../controllers';
import {
    userAuth, categoryAuth, validator, productAuth
} from '../middlewares';

const router = new Router();

router.post('/auth/register', validator.signup, userAuth.signup, userController.createUsers);
router.post('/check', userController.checkUser);
router.post('/auth/login', validator.login, userAuth.login, userController.login);
router.post('/category', userAuth.verifyToken, userAuth.adminAuthorization, categoryAuth.selectCategory, categorController.createCategory);
router.get('/category', categorController.selectAllCategory);
router.get('/auth/confrimation', userAuth.verifyToken, userAuth.is_active, userController.activateUser);
router.post('/auth/confirmation', validator.checkEmail, userAuth.confrimationToken, userController.confrimationToken);
router.post('/product', userAuth.verifyToken, userAuth.adminAuthorization, validator.product, productAuth.selectProduct, productController.addProduct);
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

export default router;
