/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS wishlist(
id uuid, user_id uuid , product_id uuid,
PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id),  FOREIGN KEY (product_id) REFERENCES product(id) );