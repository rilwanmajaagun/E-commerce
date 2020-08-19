export default {
    createProduct: `
    INSERT INTO product(
        id,
        product_name,
        category,
        quantity,
        price,
        product_image,
        product_description
    )VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * 
    `,
    getProductByProduct_name: `
    SELECT * FROM product
    WHERE  product_name LIKE ($1);
    `,
    getAllProduct: `
    SELECT * FROM product
    `,
    getProductByCategories: `
    SELECT id, product_name, category, product.quantity, product.price, product.status, product_image,product_description
    FROM product WHERE category = ($1)
    `,
    getAllProductByCategory: `
    SELECT id, product_name, category, product.quantity, product.price, product.status, product_description
    FROM product ORDER BY category;
    `,
    deleteProduct: `
    DELETE FROM product WHERE product_name =($1) 
    RETURNING product_name
    `,
    updateProduct: `
    UPDATE product SET product_name=($1),category=($2),quantity=($3),price=($4), status=($5)
    wHERE id = ($6) RETURNING product_name, category, quantity, price
    `,
    getProductById: `
    SELECT * FROM product WHERE id= ($1)
    `,
    checkProductStatus: `
    SELECT status, quantity from Product WHERE product_name=($1);
    `,
    updateQuantityAndStatus: `
    UPDATE product SET quantity=($1), status=($2) WHERE product_name =($3);
    `
};
