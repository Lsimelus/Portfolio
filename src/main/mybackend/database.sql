CREATE DATABASE perntodo;

CREATE TABLE todo1(
    todo_id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    name VARCHAR(50),
    phone VARCHAR(50),
    message VARCHAR(2000)
);