/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS transcation (
transcation_id varchar, order_id uuid not null, refrence varchar not null, amount varchar, currency varchar, status varchar ,created_at timestamp, verified varchar DEFAULT 'pending',
PRIMARY KEY (transcation_id), FOREIGN KEY (order_id) REFERENCES orders(id)
);