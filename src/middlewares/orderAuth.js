/* eslint-disable import/no-cycle */
import status from 'http-status';
import { productSerivce, orderSerivce } from '../services';
import { logger } from '../config';

const productStatus = async(req, res, next) => {
    const { product_name } = req.body;
    try {
        const product = await productSerivce.checkStatusAndQuantity(product_name);
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

const updateQauntity = async(name, quan) => {
    try {
        const product = await productSerivce.checkStatusAndQuantity(name);
        const newQunatity = product.quantity - quan;
        let status;
        if (newQunatity === 0) {
            status = 'out_of_stock';
        } else {
            status = 'in_stock';
        }
        await productSerivce.updateQuantityAndStatus(newQunatity, status, name);
    } catch (error) {
        logger.info(error);
    }
};

const checkOrderStatus = async(req, res, next) => {
    const { email } = res.locals.user;
    const { id } = req.body;
    try {
        const Status = await orderSerivce.checkOrderStatus(email, id);
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
    }next();
};

const selectOrder = async(req, res, next) => {
    try {
        const order = await orderSerivce.selectOrder(req.body);
        if (!order) {
            return res.status(status.BAD_REQUEST).send({
                message: 'Order not found'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    } next();
};

const createTranscationDetails = async(body) => orderSerivce.transcationDetails(body);

export default {
    updateQauntity,
    productStatus,
    checkOrderStatus,
    selectOrder,
    createTranscationDetails
};
