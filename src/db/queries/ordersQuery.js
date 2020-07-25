export default {
    createOrders: `
    INSERT INTO orders(
        id,
        user_id,
        user_name,
        quantity,
        product_name,
        email
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
    cancelledOrder: `
    UPDATE orders set cancelled = true WHERE email =($1) AND id =($2);
    `,
    selectOrderStatus: `
    SELECT order_status FROM orders WHERE email =($1) AND id =($2);
    `,
    updateOrderStatus: `
    UPDATE orders SET order_status  =($1) where id = ($2);
    `,
    getOrderId: `SELECT * FROM orders WHERE id = ($1);
    `,
    transcationDetails: `
    INSERT INTO transcation(
        transcation_id,
        order_id,
        refrence,
        amount,
        status,
        currency,
        created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
    `,
    verifyTranscation: `
    update transcation set verified=($1) where refrence = ($2)
    `
};
