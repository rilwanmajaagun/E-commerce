import status from 'http-status';
import { orderService, userService } from '../services';
// import { orderAuth } from '../middlewares';
import { response } from '../utils';

const createOrders = async(req, res) => {
    const { email } = res.locals.user;
    try {
        const user = await userService.checkIfUserExist(email);
        const transaction_id = await orderService.createOrders(req.body, user.id);
        return res.status(status.CREATED).send({
            message: 'your order as been placed',
            transaction_id
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};
const cancelOrder = async(req, res) => {
    const { email } = res.locals.user;
    const { id } = req.body;
    try {
        await orderService.cancelOrder(email, id);
        return res.status(status.OK).send({
            message: 'your order has been cancelled'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const UpdateOrderStatus = async(req, res) => {
    try {
        await orderService.updateOrderStatus(req.body);
        return res.status(status.OK).send({
            message: 'product order as been updated Successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const createWishList = async(req, res) => {
    try {
        await orderService.createWishList(req.body, await response.user_id(res));
        return res.status(status.CREATED).send({
            message: 'product added successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getWishList = async(req, res) => {
    try {
        const wishList = await orderService.getWishList(await response.user_id(res));
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
        await orderService.deleteWishList(req.params, await response.user_id(res));
        return res.status(status.OK).send({
            message: 'Product deleted successfully '
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const createCart = async(req, res) => {
    try {
        const price = await orderService.getPrice(req.body);
        await orderService.createCart(req.body, await response.user_id(res), price.price);
        return res.status(status.CREATED).send({
            message: 'product added successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getCart = async(req, res) => {
    try {
        const cart = await orderService.getCart(await response.user_id(res));
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
        const sub_total = await orderService.getTotal(req.body);
        const total = await sub_total.price * req.body.quantity;
        await orderService.updateCart(req.body, await response.user_id(res), total);
        return res.status(status.OK).send({
            message: 'cart updated successfully'
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const deleteCart = async(req, res) => {
    try {
        await orderService.deleteCart(req.params, await response.user_id(res));
        response.successful(res, status.OK, 'Product deleted successfully ');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const moveToCart = async(req, res) => {
    try {
        await orderService.moveToCart(req.body, await response.user_id(res));
        response.successful(res, status.OK, 'Product added to cart successfully');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const AddAddressDetails = async(req, res) => {
    try {
        const address = await orderService.userAddress(await response.user_id(res));
        if (address.length === 0) {
            await orderService.address_details(req.body, await response.user_id(res), true);
            response.successful(res, status.CREATED, 'Address Added successfully');
        }
        if (address.length > 0) {
            await orderService.address_details(req.body, await response.user_id(res), false);
            response.successful(res, status.CREATED, 'Address Added successfully');
        }
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const updateAddress = async(req, res) => {
    try {
        await orderService.updateAddress(req.body, await response.user_id(res));
        response.successful(res, status.OK, 'Address updated successfully');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getAddress = async(req, res) => {
    try {
        const address = await orderService.userAddress(await response.user_id(res));
        return res.status(status.OK).send({
            message: 'Address fetched successfully',
            data: address
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const setDefaultAddress = async(req, res) => {
    try {
        await orderService.resetAddress(await response.user_id(res));
        await orderService.setDefaultAddress(req.body, await response.user_id(res));
        response.successful(res, status.OK, 'Address set as default successfully');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const deleteAddress = async(req, res) => {
    try {
        await orderService.deleteAddress(req.params, await response.user_id(res));
        response.successful(res, status.OK, 'Address deleted successfully ');
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const getSumSubTotal = async(req, res) => {
    const { transaction_id } = req.params;
    try {
        const { sum } = await orderService.sumSubTotal(transaction_id);
        return res.status(status.OK).send({
            message: 'YOur ',
            price: sum
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

export default {
    createOrders,
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
    getAddress,
    setDefaultAddress,
    deleteAddress,
    getSumSubTotal
};
