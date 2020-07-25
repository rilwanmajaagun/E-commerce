import status from 'http-status';
import { schema } from '../utils';

const signup = async(req, res, next) => {
    try {
        await schema.user.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const login = async(req, res, next) => {
    try {
        await schema.login.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const checkEmail = async(req, res, next) => {
    try {
        await schema.email.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const product = async(req, res, next) => {
    try {
        await schema.products.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const searchProduct = async(req, res, next) => {
    try {
        await schema.product.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const getProductBycategory = async(req, res, next) => {
    try {
        await schema.category.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const category = async(req, res, next) => {
    try {
        await schema.updateCategory.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const updateProduct = async(req, res, next) => {
    try {
        await schema.updateProducts.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

const createOrder = async(req, res, next) => {
    try {
        await schema.updateProducts.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};
const updateOrderStatus = async(req, res, next) => {
    try {
        await schema.updateStatus.validateAsync(req.body);
    } catch (error) {
        return res.status(status.BAD_REQUEST).send({
            message: error.details[0].message.replace(/[\"]/gi, '')
        });
    }
    next();
};

export default {
    signup,
    login,
    checkEmail,
    product,
    searchProduct,
    getProductBycategory,
    category,
    updateProduct,
    createOrder,
    updateOrderStatus

};
