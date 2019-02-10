DROP DATABASE IF EXISTS userlist;
CREATE DATABASE userlist;

\c userlist;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  email VARCHAR,
  password VARCHAR NOT NULL,
  phone VARCHAR
);

INSERT INTO users (username, email, password, phone)
VALUES ('nod','nod@gmail.com','nod123', '2343463333'),
('nodder','nodder@gmail.com','nod1234', '2342793321')
