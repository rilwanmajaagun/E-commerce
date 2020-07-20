import status from 'http-status';
import { productSerivce, categoryService } from '../services';

const selectProduct = async(req, res, next) => {
    const { category } = req.body;
    req.body.name = category;
    try {
        const product = await productSerivce.selectProduct(req.body);
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
        const product = await productSerivce.selectProduct(req.body);
        if (!product) {
            return res.status(status.CONFLICT).send({
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

const CheckProductByid = async(req, res, next) => {
    req.body.name = req.body.category;
    try {
        const product = await productSerivce.selectProductByid(req.body);
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

export default {
    selectProduct,
    CheckProduct,
    CheckProductByid
};
