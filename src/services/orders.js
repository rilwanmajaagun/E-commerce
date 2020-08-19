import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { ordersQuery, db } from '../db';

export default {
    createOrder: async(user_id, user_name, email, body) => {
        const id = uuidv4();
        const {
            quantity,
            product_name
        } = body;
        const payload = [id, user_id, user_name, quantity, product_name, email];
        const order = await db.oneOrNone(ordersQuery.createOrders, payload);
        return order;
    },

    cancelOrder: async(email, id) => db.none(ordersQuery.cancelledOrder, [email, id]),

    checkOrderStatus: async(email, id) => {
        const status = db.oneOrNone(ordersQuery.selectOrderStatus, [email, id]);
        return status;
    },

    selectOrder: async(body) => {
        const { id } = body;
        const order = await db.oneOrNone(ordersQuery.getOrderId, [id]);
        return order;
    },

    updateOrderStatus: async(body) => {
        const { id, order_status } = body;
        return db.none(ordersQuery.updateOrderStatus, [order_status, id]);
    },

    transcationDetails: async(body) => {
        const payload = [
            body.id,
            body.order_id,
            body.reference,
            body.amount,
            body.status,
            body.currency,
            body.created_at
        ];
        return db.none(ordersQuery.transcationDetails, payload);
    },

    verfiyTanscation: async(status, refrence) => db.none(ordersQuery.verifyTranscation, [status, refrence]),

    createWishList: async(body, user_id) => {
        const id = uuidv4();
        const { product_id } = body;
        return db.none(ordersQuery.wishList, [ id, user_id, product_id]);
    },

    checkWishList: async(body) => {
        const { product_id } = body;
        return db.oneOrNone(ordersQuery.checkWishList, [product_id]);
    },

    getWishList: async(user_id) => db.manyOrNone(ordersQuery.getWishList, [user_id]),

    selectWishList: async(params) => {
        const { id } = params;
        return db.oneOrNone(ordersQuery.selectWishListItem, [id]);
    },

    deletewishList: async(params, user_id) => {
        const { id } = params;
        const payload = [
            id,
            user_id
        ];
        return db.none(ordersQuery.deleteWishList, payload);
    },

    createCart: async(body, user_id, sub_total) => {
        const id = uuidv4();
        const { product_id, order_id } = body;
        return db.none(ordersQuery.createCart, [id, user_id, product_id, sub_total, order_id]);
    },

    checkCart: async(body) => {
        const { product_id } = body;
        return db.oneOrNone(ordersQuery.checkCart, [product_id]);
    },

    checkCartById: async(body) => {
        const { id } = body;
        return db.oneOrNone(ordersQuery.SelectCartById, [id]);
    },

    getprice: async(body) => {
        const { product_id } = body;
        return db.one(ordersQuery.getProductPrice, [product_id]);
    },

    getCart: async(user_id) => db.manyOrNone(ordersQuery.getCart, [user_id]),

    getTotal: async(body) => {
        const { id } = body;
        const total = db.one(ordersQuery.getPrice, [id]);
        return total;
    },

    updateCart: async(body, user_id, sub_total) => {
        const { id, quantity } = body;
        return db.none(ordersQuery.updateCart, [quantity, sub_total, user_id, id]);
    },

    selectCart: async(params) => {
        const { id } = params;
        return db.oneOrNone(ordersQuery.selectCartItem, [id]);
    },

    deleteCart: async(params, user_id) => {
        const { id } = params;
        const payload = [
            id,
            user_id
        ];
        return db.none(ordersQuery.deleteCart, payload);
    },

    moveToCart: async(body, user_id) => {
        const order_id = uuidv4();
        const { id } = body;
        return db.none(ordersQuery.moveWishListToCart, [id, user_id, order_id]);
    },

    address_details: async(body, user_id) => {
        const id = uuidv4();
        const {
            first_name,
            last_name,
            mobile_number,
            additional_mobile_number,
            address,
            state_region,
            city
        } = body;
        const payload = [
            id,
            user_id,
            first_name,
            last_name,
            mobile_number,
            additional_mobile_number,
            address,
            state_region,
            city
        ];
        return db.none(ordersQuery.address_details, payload);
    },
    updateAddress: async(body, user_id) => {
        const { id } = body;
        const oldData = await db.one(ordersQuery.getAddressById, [user_id, id]);
        const newdata = { ...oldData, ...body };
        return db.none(ordersQuery.updateAddress, [
            newdata.first_name,
            newdata.last_name,
            newdata.mobile_number,
            newdata.additional_mobile_number,
            newdata.address,
            newdata.state_region,
            newdata.city,
            user_id,
            id
        ]);
    },

    getOneAddress: async(params) => {
        const { id } = params;
        return db.oneOrNone(ordersQuery.getOneAddress, [id]);
    },

    userAddress: async(user_id) => db.manyOrNone(ordersQuery.getAddress, [user_id]),

    resetAddress: async(user_id) => db.none(ordersQuery.resetDefault, [user_id]),
    setDefaultAddress: async(body, user_id) => {
        const { id } = body;
        return db.none(ordersQuery.setDefaultAddress, [user_id, id]);
    },
    deletAddress: async(params, user_id) => {
        const { id } = params;
        return db.none(ordersQuery.deleteAddress, [id, user_id]);
    }
};
