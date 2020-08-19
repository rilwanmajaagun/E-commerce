/* eslint-disable import/no-cycle */
import status from 'http-status';
import { productService, orderService } from '../services';
import { logger } from '../config';

const productStatus = async(req, res, next) => {
    const { product_name } = req.body;
    try {
        const product = await productService.checkStatusAndQuantity(product_name);
        if (product.status === 'out_of_stock') {
            return res.status(status.BAD_REQUEST).send({
                message: 'product is out of stock pls check back later'
            });
        }
        if (product.quantity < req.body.quantity) {
            return res.status(status.BAD_REQUEST).send({
                message: `only ${product.quantity} left `
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

const updateQuantity = async(name, quan) => {
    try {
        const product = await productService.checkStatusAndQuantity(name);
        const newQuantity = product.quantity - quan;
        let status;
        if (newQuantity === 0) {
            status = 'out_of_stock';
        } else {
            status = 'in_stock';
        }
        await productService.updateQuantityAndStatus(newQuantity, status, name);
    } catch (error) {
        logger.info(error);
    }
};

const checkOrderStatus = async(req, res, next) => {
    const { email } = res.locals.user;
    const { id } = req.body;
    try {
        const Status = await orderService.checkOrderStatus(email, id);
        if (!Status) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Order could not be found'
            });
        }
        if (Status.order_status === 'shipped') {
            return res.status(status.BAD_REQUEST).send({
                message: 'Your order has been shipped '
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

const selectOrder = async(req, res, next) => {
    try {
        const order = await orderService.selectOrder(req.body);
        if (!order) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Order not found'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    } next();
};

const createTransactionDetails = async(body) => orderService.transactionDetails(body);

const alreadyExistInWishList = async(req, res, next) => {
    try {
        const prod = await orderService.checkWishList(req.body);
        if (prod !== null) {
            req.body.id = prod.product_id;
            const product = await productService.selectProductById(req.body);
            return res.status(status.BAD_REQUEST).send({
                message: `${product.product_name} already exists in Wish List`
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

const deleteWishList = async(req, res, next) => {
    try {
        const items = await orderService.selectWishList(req.params);
        if (!items) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Product does not exist in wish List'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

const deleteCart = async(req, res, next) => {
    try {
        const items = await orderService.selectCart(req.params);
        if (!items) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Product does not exist in cart'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

const alreadyExistInCart = async(req, res, next) => {
    try {
        const prod = await orderService.checkCart(req.body);
        if (prod !== null) {
            req.body.id = prod.product_id;
            const product = await productService.selectProductById(req.body);
            return res.status(status.BAD_REQUEST).send({
                message: `${product.product_name} already exists in Cart`
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

const alreadyMovedToCart = async(req, res, next) => {
    try {
        const prod = await orderService.checkCartById(req.body);
        if (prod !== null) {
            req.body.id = prod.product_id;
            const product = await productService.selectProductById(req.body);
            return res.status(status.BAD_REQUEST).send({
                message: `${product.product_name} already exists in Cart`
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

const deleteAddress = async(req, res, next) => {
    try {
        const address = await orderService.getOneAddress(req.params);
        if (!address) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Address not found'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

export default {
    updateQuantity,
    productStatus,
    checkOrderStatus,
    selectOrder,
    createTransactionDetails,
    alreadyExistInWishList,
    deleteWishList,
    alreadyExistInCart,
    deleteCart,
    deleteAddress,
    alreadyMovedToCart
};
