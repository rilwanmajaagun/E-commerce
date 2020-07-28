"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  createUser: "\n    INSERT INTO users(\n        id,\n        first_name,\n        last_name,\n        email,\n        phone_number,\n        password,\n        salt\n    )\n    VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING * \n    ",
  createFaceBookUser: "\n    INSERT INTO users(\n        id,\n        first_name,\n        last_name,\n        email,\n        password,\n        salt,\n        is_active\n    )\n    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * \n    ",
  getUser: "\n    SELECT * FROM users WHERE email=($1);\n    ",
  activateUser: "\n    UPDATE users SET is_active = true, updated_at = NOW() WHERE email=($1)\n    RETURNING email, first_name, is_active\n     ",
  resetPassword: "\n     UPDATE users SET password = ($1), updated_at = NOW() \n     WHERE email = ($2) RETURNING *\n     "
};
exports["default"] = _default;