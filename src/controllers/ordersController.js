import status from 'http-status';
import { orderSerivce, userService } from '../services';
import { orderAuth } from '../middlewares';

const createOrder = async(req, res) => {
    const { email } = res.locals.user;
    const { product_name, quantity } = req.body;
    try {
        const user = await userService.checkIfUserExist(email);
        const userName = `${user.first_name} ${user.last_name}`;
        const order = await orderSerivce.createOrder(user.id, userName, user.email, req.body);
        await orderAuth.updateQauntity(product_name, quantity);
        return res.status(status.CREATED).send({
            message: 'your order as been placed',
            data: order
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const cancelOrder = async(req, res) => {
    const { email } = res.locals.user;
    const { id } = req.body;
    try {
        await orderSerivce.cancelOrder(email, id);
        return res.status(status.OK).send({
            message: 'your order has been cancelled'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const UpdateOrderStatus = async(req, res) => {
    try {
        await orderSerivce.updateOrderStatus(req.body);
        return res.status(status.OK).send({
            message: 'product order as been updated sucessfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const createWishList = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        await orderSerivce.createWishList(req.body, user.id);
        return res.status(status.CREATED).send({
            message: 'product added succesfuly'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getWishList = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        const wishList = await orderSerivce.getWishList(user.id);
        if (wishList.length === 0) {
            return res.status(status.OK).send({
                message: 'Wish List is empty',
                wishList
            });
        }
        return res.status(status.OK).send({
            message: 'Wish List fetched successfully',
            wishList
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

export default {
    createOrder,
    cancelOrder,
    UpdateOrderStatus,
    createWishList,
    getWishList
};
