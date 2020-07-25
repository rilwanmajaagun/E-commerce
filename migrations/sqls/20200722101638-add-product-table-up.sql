/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS product( id uuid,
product_name VARCHAR NOT NULL UNIQUE,
category  VARCHAR NOT NULL,
status VARCHAR Default 'in_stock',
quantity int DEFAULT 1,
price int NOT NULL, created_at TIMESTAMP DEFAULT NOW(),
PRIMARY KEY (id),FOREIGN KEY(category)
REFERENCES category(name) ON UPDATE CASCADE ON DELETE CASCADE);