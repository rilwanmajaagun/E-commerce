export default {
    createOrders: `
    INSERT INTO orders (
        id,
        transaction_id,
        user_id,
        order_id,
        product_id,
        product_name,
        price,
        quantity,
        sub_total
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    cancelledOrder: `
    UPDATE orders set order_status = 'cancelled' WHERE order_id =($1) AND user_id =($2);
    `,
    selectOrderStatus: `
    SELECT order_status FROM orders WHERE email =($1) AND id =($2);
    `,
    updateOrder: `
    UPDATE orders SET order_status  =($1), delivery_status = ($2) where order_id = ($3);
    `,
    selectOrder: `
        SELECT * FROM orders WHERE order_id = ($1)
    `,
    transactionDetails: `
    INSERT INTO transaction(
        id, 
        payment_id,
        transaction_id,
        reference,
        amount,
        status,
        currency,
        created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `,
    verifyTransaction: `
    update transaction set verified=($1) where reference = ($2)
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
        sub_total,
        order_id
    ) VALUES ($1, $2, $3, $4, $5) 
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
        cart.product_id,
        product.product_name,
        product.category,
        product.status,
        product.quantity,
        product.price,
        product.product_name,
        product.product_image,
        cart.quantity,
        cart.sub_total,
        order_id
    FROM product 
    JOIN cart 
    ON product.id = cart.product_id
    WHERE user_id = ($1);
    `,
    updateCart: `
    UPDATE cart SET quantity = ($1), sub_total = ($2) WHERE user_id= ($3) AND id = ($4);
   `,
    getSubTotal: `
   SELECT sub_total FROM cart where id = ($1)
   `,
    getPrice: `
   SELECT price 
   FROM product
   JOIN cart
   ON product.id = cart.product_id
   WHERE cart.id = ($1)
   `,
    selectCartItem: `
   SELECT * FROM cart WHERE id = ($1)
   `,
    deleteCart: `
   DELETE FROM cart WHERE id = ($1) AND user_id = ($2);
   `,
    moveWishListToCart: ` 
    INSERT INTO cart (id,user_id, product_id, sub_total, order_id)
    SELECT 
        wishlist.id, 
        wishlist.user_id,
        wishlist.product_id,
        product.price,
        ($3)
    FROM wishlist
    JOIN product
    ON product.id = wishlist.product_id
    WHERE wishlist.id = ($1) AND user_id = ($2);
    `,
    address_details: `
    INSERT INTO address_details (
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
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
    getAddressById: `
    SELECT * FROM address_details WHERE user_id = ($1) AND id = ($2)
    `,
    updateAddress: `
    UPDATE address_details 
    SET 
        first_name=($1),
        last_name=($2),
        mobile_number=($3),
        additional_mobile_number=($4),
        address=($5),
        state_region=($6),
        city=($7)
    WHERE user_id=($8) AND id=($9)
    `,
    getAddress: `
    SELECT * FROM address_details WHERE user_id = ($1) ORDER BY is_default DESC;
    `,
    resetDefault: `
    UPDATE address_details SET is_default = FALSE WHERE user_id = ($1);
    `,
    setDefaultAddress: `
    UPDATE address_details SET is_default = TRUE WHERE user_id = ($1) AND id = ($2);
    `,
    deleteAddress: `
    DELETE FROM address_details WHERE id = ($1) AND user_id = ($2);
    `,
    getOneAddress: `
    SELECT * FROM address_details WHERE id = ($1)
    `,
    SelectCartById: `
    SELECT * FROM cart WHERE id = ($1)
    `,
    updateTransactionTableId: `
    UPDATE orders SET transaction_table_id = ($1), payment_status = 'PAID' WHERE transaction_id = ($2)
    `,
    sumSubTotal: `
    SELECT SUM(sub_total)
    FROM orders
    WHERE transaction_id = ($1);
     `,
    updateShippingDetails: `
     UPDATE orders SET shipping_address = ($1), shipping_name = ($2), shipping_phone_number = ($3) WHERE transaction_id = ($4)
     `
};
