/* Replace with your SQL commands */
ALTER TABLE orders
ADD IF NOT EXISTS transaction_table_id uuid ;