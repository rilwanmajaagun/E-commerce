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
            message: 'product added successfuly'
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

const deleteWishList = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        await orderSerivce.deletewishList(req.params, user.id);
        return res.status(status.OK).send({
            message: 'Product deleted successfully '
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const createCart = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const price = await orderSerivce.getprice(req.body);
        const user = await userService.checkIfUserExist(email);
        await orderSerivce.createCart(req.body, user.id, price.price);
        return res.status(status.CREATED).send({
            message: 'product added successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getCart = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        const cart = await orderSerivce.getCart(user.id);
        if (cart.length === 0) {
            return res.status(status.OK).send({
                message: 'Cart is empty',
                cart
            });
        }
        return res.status(status.OK).send({
            message: 'Cart fetched successfully',
            cart
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const updateCart = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        const sub_total = await orderSerivce.getTotal(req.body);
        const total = await sub_total.price * req.body.quantity;
        await orderSerivce.updateCart(req.body, user.id, total);
        return res.status(status.CREATED).send({
            message: 'cart updated successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const deleteCart = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        await orderSerivce.deleteCart(req.params, user.id);
        return res.status(status.OK).send({
            message: 'Product deleted successfully '
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const moveToCart = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        await orderSerivce.moveToCart(req.body, user.id);
        return res.status(status.OK).send({
            message: 'Product added to cart successfully'
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
    getWishList,
    deleteWishList,
    createCart,
    getCart,
    updateCart,
    deleteCart,
    moveToCart
};
