/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders(
id uuid, transaction_id uuid NOT NULL, user_id uuid, order_id uuid NOT NULL, 
product_id uuid,product_name VARCHAR NOT NULL, price int, 
quantity int NOT NULL ,sub_total int NOT NULL, 
payment_status VARCHAR DEFAULT 'NOT PAID', order_status VARCHAR DEFAULT 'REVIEW' NOT NULL ,
delivery_status VARCHAR DEFAULT 'pending', 
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES product(id)
);