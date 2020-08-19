/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS transaction (
id uuid, payment_id varchar, transaction_id uuid not null, reference varchar not null, 
amount varchar, currency varchar, status varchar ,created_at timestamp, 
verified varchar DEFAULT 'pending',
PRIMARY KEY (id)
);