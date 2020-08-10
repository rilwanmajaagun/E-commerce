"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  createProduct: "\n    INSERT INTO product(\n        id,\n        product_name,\n        category,\n        quantity,\n        price,\n        product_image,\n        product_description\n    )VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * \n    ",
  getProductByProduct_name: "\n    SELECT * FROM product\n    WHERE  product_name LIKE ($1);\n    ",
  getAllProduct: "\n    SELECT * FROM product\n    ",
  getProductByCategories: "\n    SELECT id, product_name, category, product.quantity, product.price, product.status, product_image,product_description\n    FROM product WHERE category = ($1)\n    ",
  getAllProductByCategory: "\n    SELECT id, product_name, category, product.quantity, product.price, product.status, product_description\n    FROM product ORDER BY category;\n    ",
  deleteProduct: "\n    DELETE FROM product WHERE product_name =($1) \n    RETURNING product_name\n    ",
  updateProduct: "\n    UPDATE product SET product_name=($1),category=($2),quantity=($3),price=($4), status=($5)\n    wHERE id = ($6) RETURNING product_name, category, quantity, price\n    ",
  getProductByid: "\n    SELECT * FROM product WHERE id= ($1)\n    ",
  checkProductStatus: "\n    SELECT status, quantity from Product WHERE product_name=($1);\n    ",
  updateQuantityAndStatu: "\n    UPDATE product SET quantity=($1), status=($2) WHERE product_name =($3);\n    "
};
exports["default"] = _default;