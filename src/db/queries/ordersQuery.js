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
    `,
    wishList: `
    INSERT INTO wishlist(
        id,
        user_id,
        product_id
    ) VALUES ($1, $2, $3) 
    `,
    checkWishList: `
    SELECT * FROM wishlist WHERE product_id = ($1)
    `,
    getWishList: `
    SELECT
        wishlist.id,
        product.product_name,
        product.category,
        product.status,
        product.quantity,
        product.price,
        product.product_name,
        product.product_image
    FROM product
    JOIN wishlist
    ON product.id = wishlist.product_id
    WHERE user_id = ($1)
    `,
    selectWishListItem: `
    SELECT * FROM wishlist WHERE id = ($1)
    `,
    deleteWishList: `
    DELETE FROM wishlist WHERE id = ($1) AND user_id = ($2);
    `,
    createCart: `
    INSERT INTO cart(
        id,
        user_id,
        product_id,
        sub_total
    ) VALUES ($1, $2, $3, $4) 
    `,
    checkCart: `
    SELECT * FROM cart WHERE product_id = ($1)
    `,
    getProductPrice: `
    SELECT price FROM product where id = ($1)
    `,
    getCart: `
    SELECT 
        cart.id,
        product.product_name,
        product.category,
        product.status,
        product.quantity,
        product.price,
        product.product_name,
        product.product_image,
        cart.quantity,
        cart.sub_total
    FROM product 
    JOIN cart 
    ON product.id = cart.product_id
    WHERE user_id = ($1);
`
};
