/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cart(
id uuid, user_id uuid, product_id uuid, quantity int DEFAULT 1,
PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (product_id) REFERENCES product(id) );
