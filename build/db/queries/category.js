"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  createCategory: "\n    INSERT INTO category(\n        id,\n        name\n    ) VALUES ($1, $2) RETURNING * \n    ",
  selectAllCategory: "\n    SELECT * FROM category\n    ",
  chechkCategory: "\n    SELECT * FROM category WHERE name=($1)\n    ",
  deleteCategory: "\n    DELETE FROM category WHERE name =($1) \n    RETURNING name\n    ",
  updateCategory: "\n    UPDATE category SET name =($1), updated_at = Now() WHERE name = ($2) RETURNING name;\n    "
};
exports["default"] = _default;