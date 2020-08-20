import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { logger } from '../config';
// eslint-disable-next-line import/no-cycle
import { ordersQuery, db } from '../db';

export default {
    createOrders: async(data, user_id) => {
        const id = uuidv4();
        const transaction_id = uuidv4();
        const order = data.map((cart) => db.oneOrNone(ordersQuery.createOrders, [
            id,
            transaction_id,
            user_id,
            cart.order_id,
            cart.product_id,
            cart.product_name,
            cart.price,
            cart.quantity,
            cart.sub_total
        ]));
        logger.info(order);
        return transaction_id;
    },

    cancelOrder: async(body, user_id) => {
        const { order_id } = body;
        db.none(ordersQuery.cancelledOrder, [order_id, user_id]);
    },

    checkOrderStatus: async(email, id) => {
        const status = db.oneOrNone(ordersQuery.selectOrderStatus, [email, id]);
        return status;
    },

    selectOrder: async(body) => {
        const { order_id } = body;
        const order = await db.oneOrNone(ordersQuery.selectOrder, [order_id]);
        return order;
    },

    updateOrderStatus: async(body) => {
        const { order_id } = body;
        const OldData = await db.one(ordersQuery.selectOrder, [order_id]);
        const newData = { ...OldData, ...body };
        return db.none(ordersQuery.updateOrder, [newData.order_status, newData.delivery_status, order_id]);
    },

    transactionDetails: async(body) => {
        const id = uuidv4();
        const payment_id = body.id;
        const payload = [
            id,
            payment_id,
            body.transaction_id,
            body.reference,
            body.amount,
            body.status,
            body.currency,
            body.created_at
        ];
        return db.one(ordersQuery.transactionDetails, payload);
    },

    verifyTransactions: async(status, reference) => db.none(ordersQuery.verifyTransaction, [status, reference]),

    createWishList: async(body, user_id) => {
        const id = uuidv4();
        const { product_id } = body;
        return db.none(ordersQuery.wishList, [id, user_id, product_id]);
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

    deleteWishList: async(params, user_id) => {
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

    getPrice: async(body) => {
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

    address_details: async(body, user_id, is_default) => {
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
            city,
            is_default
        ];
        return db.none(ordersQuery.address_details, payload);
    },

    updateAddress: async(body, user_id) => {
        const { id } = body;
        const oldData = await db.one(ordersQuery.getAddressById, [user_id, id]);
        const newData = { ...oldData, ...body };
        return db.none(ordersQuery.updateAddress, [
            newData.first_name,
            newData.last_name,
            newData.mobile_number,
            newData.additional_mobile_number,
            newData.address,
            newData.state_region,
            newData.city,
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

    deleteAddress: async(params, user_id) => {
        const { id } = params;
        return db.none(ordersQuery.deleteAddress, [id, user_id]);
    },

    updateTransactionTableId: async(transaction_id, transaction_table_id) => {
        db.none(ordersQuery.updateTransactionTableId, [transaction_table_id, transaction_id]);
    },

    updateShippingDetails: async(address, name, phone_number, params) => {
        const { transaction_id } = params;
        db.none(ordersQuery.updateShippingDetails, [address, name, phone_number, transaction_id]);
    },
    sumSubTotal: async(transaction_id) => db.one(ordersQuery.sumSubTotal, [transaction_id])
};
