/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders(
id uuid, user_id uuid, user_name VARCHAR NOT NULL, Quantity int DEFAULT 1, order_status VARCHAR DEFAULT 'pending', cancelled BOOLEAN DEFAULT false, 
product_name VARCHAR NOT NULL, email VARCHAR not null, 
created_at TIMESTAMP DEFAULT NOW(), PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (product_name) REFERENCES product(product_name), FOREIGN KEY (email) REFERENCES users(email)
);