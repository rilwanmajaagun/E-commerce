/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS category(
id uuid PRIMARY KEY,
name varchar not null,
created_at timestamp DEFAULT Now(),
updated_at timestamp
  );