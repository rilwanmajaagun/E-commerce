import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { ordersQuery, db } from '../db';

const createOrder = async(user_id, user_name, email, body) => {
    const id = uuidv4();
    const {
        quantity,
        product_name
    } = body;
    const payload = [id, user_id, user_name, quantity, product_name, email];
    const order = await db.oneOrNone(ordersQuery.createOrders, payload);
    return order;
};

const cancelOrder = async(email, id) => db.none(ordersQuery.cancelledOrder, [email, id]);

const checkOrderStatus = async(email, id) => {
    const status = db.oneOrNone(ordersQuery.selectOrderStatus, [email, id]);
    return status;
};

const selectOrder = async(body) => {
    const { id } = body;
    const order = await db.oneOrNone(ordersQuery.getOrderId, [id]);
    return order;
};

const updateOrderStatus = async(body) => {
    const { id, order_status } = body;
    return db.none(ordersQuery.updateOrderStatus, [order_status, id]);
};

const transcationDetails = async(body) => {
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
};

const verfiyTanscation = async(status, refrence) => db.none(ordersQuery.verifyTranscation, [status, refrence]);

const createWishList = async(body, user_id) => {
    const id = uuidv4();
    const { product_id } = body;
    return db.none(ordersQuery.wishList, [ id, user_id, product_id]);
};

const checkWishList = async(body) => {
    const { product_id } = body;
    return db.oneOrNone(ordersQuery.checkWishList, [product_id]);
};

const getWishList = async(user_id) => db.manyOrNone(ordersQuery.getWishList, [user_id]);

const selectWishList = async(body) => {
    const { id } = body;
    return db.oneOrNone(ordersQuery.selectWishListItem, [id]);
};

const deletewishList = async(body, user_id) => {
    const { id } = body;
    const payload = [
        id,
        user_id
    ];
    return db.none(ordersQuery.deleteWishList, payload);
};

export default {
    createOrder,
    cancelOrder,
    checkOrderStatus,
    updateOrderStatus,
    selectOrder,
    transcationDetails,
    verfiyTanscation,
    createWishList,
    checkWishList,
    getWishList,
    deletewishList,
    selectWishList
};
