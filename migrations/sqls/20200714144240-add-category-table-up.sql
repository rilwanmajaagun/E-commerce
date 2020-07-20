CREATE TABLE IF NOT EXISTS category(
id uuid,
name varchar not null PRIMARY KEY,
created_at timestamp DEFAULT Now(),
updated_at timestamp
);
