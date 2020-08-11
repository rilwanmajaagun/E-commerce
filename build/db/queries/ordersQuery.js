"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  createOrders: "\n    INSERT INTO orders(\n        id,\n        user_id,\n        user_name,\n        quantity,\n        product_name,\n        email\n    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *\n    ",
  cancelledOrder: "\n    UPDATE orders set cancelled = true WHERE email =($1) AND id =($2);\n    ",
  selectOrderStatus: "\n    SELECT order_status FROM orders WHERE email =($1) AND id =($2);\n    ",
  updateOrderStatus: "\n    UPDATE orders SET order_status  =($1) where id = ($2);\n    ",
  getOrderId: "SELECT * FROM orders WHERE id = ($1);\n    ",
  transcationDetails: "\n    INSERT INTO transcation(\n        transcation_id,\n        order_id,\n        refrence,\n        amount,\n        status,\n        currency,\n        created_at\n    ) VALUES ($1, $2, $3, $4, $5, $6, $7) \n    ",
  verifyTranscation: "\n    update transcation set verified=($1) where refrence = ($2)\n    ",
  wishList: "\n    INSERT INTO wishlist(\n        id,\n        user_id,\n        product_id\n    ) VALUES ($1, $2, $3) \n    ",
  checkWishList: "\n    SELECT * FROM wishlist WHERE product_id = ($1)\n    "
};
exports["default"] = _default;