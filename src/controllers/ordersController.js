import status from 'http-status';
import { orderSerivce, userService } from '../services';
import { orderAuth } from '../middlewares';
import { response } from '../utils';

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
    try {
        await orderSerivce.createWishList(req.body, await response.user_id(res));
        return res.status(status.CREATED).send({
            message: 'product added successfuly'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getWishList = async(req, res) => {
    try {
        const wishList = await orderSerivce.getWishList(await response.user_id(res));
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
    try {
        await orderSerivce.deletewishList(req.params, await response.user_id(res));
        return res.status(status.OK).send({
            message: 'Product deleted successfully '
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const createCart = async(req, res) => {
    try {
        const price = await orderSerivce.getprice(req.body);
        await orderSerivce.createCart(req.body, await response.user_id(res), price.price);
        return res.status(status.CREATED).send({
            message: 'product added successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getCart = async(req, res) => {
    try {
        const cart = await orderSerivce.getCart(await response.user_id(res));
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
    try {
        const sub_total = await orderSerivce.getTotal(req.body);
        const total = await sub_total.price * req.body.quantity;
        await orderSerivce.updateCart(req.body, await response.user_id(res), total);
        return res.status(status.OK).send({
            message: 'cart updated successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const deleteCart = async(req, res) => {
    try {
        await orderSerivce.deleteCart(req.params, await response.user_id(res));
        response.successful(res, status.OK, 'Product deleted successfully ');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const moveToCart = async(req, res) => {
    try {
        await orderSerivce.moveToCart(req.body, await response.user_id(res));
        response.successful(res, status.OK, 'Product added to cart successfully');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const AddAddressDetails = async(req, res) => {
    try {
        await orderSerivce.address_details(req.body, await response.user_id(res));
        response.successful(res, status.CREATED, 'Address Added successfully');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const updateAddress = async(req, res) => {
    try {
        await orderSerivce.updateAddress(req.body, await response.user_id(res));
        response.successful(res, status.OK, 'Address updated successfully');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getAddress = async(req, res) => {
    try {
        const address = await orderSerivce.userAddress(await response.user_id(res));
        return res.status(status.OK).send({
            message: 'Address fetched successfully',
            data: address
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
    moveToCart,
    AddAddressDetails,
    updateAddress,
    getAddress
};
