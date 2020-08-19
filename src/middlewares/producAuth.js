import status from 'http-status';
// eslint-disable-next-line import/no-cycle
import { productService, categoryService } from '../services';

const selectProduct = async(req, res, next) => {
    const { category } = req.body;
    req.body.name = category;
    try {
        const product = await productService.selectProduct(req.body);
        const categories = await categoryService.selectCategory(req.body);
        if (!categories) {
            return res.status(status.BAD_REQUEST).send({ message: 'Input a valid category' });
        }
        if (product) {
            return res.status(status.BAD_REQUEST).send({ message: 'product already exist' });
        }
    } catch (e) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    } next();
};

const CheckProduct = async(req, res, next) => {
    try {
        const product = await productService.selectProduct(req.body);
        if (!product) {
            return res.status(status.BAD_REQUEST).send({
                message: 'product does not exist'
            });
        }
    } catch (e) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    }
    next();
};

const CheckProductById = async(req, res, next) => {
    req.body.name = req.body.category;
    try {
        const product = await productService.selectProductById(req.body);
        const categories = await categoryService.selectCategory(req.body);
        if (!categories) {
            return res.status(status.BAD_REQUEST).send({ message: 'Input a valid category' });
        }
        if (!product) {
            return res.status(status.CONFLICT).send({
                message: 'product does not exist'
            });
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    }
    next();
};

const updateQuantity = async(req, res, next) => {
    try {
        const product = await productService.checkStatusAndQuantity(req.body);
        const newQuantity = product.quantity - 1;
        let status;
        if (newQuantity === 0) {
            status = 'out_of_stock';
        } else {
            status = 'in_stock';
        }
        await productService.updateQuantityAndStatus(newQuantity, status, req.body);
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    } next();
};

export default {
    selectProduct,
    CheckProduct,
    CheckProductById,
    updateQuantity
};
