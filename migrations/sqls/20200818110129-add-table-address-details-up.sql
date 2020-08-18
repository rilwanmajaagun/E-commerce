/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS address_details(
id uuid, user_id uuid, first_name VARCHAR NOT NULL, last_name VARCHAR NOT NULL, mobile_number VARCHAR(11) NOT NULL,
additional_mobile_number VARCHAR(11), address VARCHAR NOT NULL, state_region VARCHAR NOT NULL, city VARCHAR NOT NULL,
is_default VARCHAR DEFAULT false, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id)
); 