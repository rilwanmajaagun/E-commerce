/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users(
  id  uuid PRIMARY KEY,
  first_name varchar not null,
  last_name varchar not null,
  email varchar not null,
  phone_number varchar,
  password varchar not null,
  salt varchar not null,
  is_admin boolean default false,
  is_active boolean default false,
  created_at timestamp default NOW(),
  updated_at timestamp
);
