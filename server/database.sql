CREATE DATABASE budgetapp;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories(
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE expenses(
  expense_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  category_id INTEGER REFERENCES categories(category_id),
  amount MONEY NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE budget(
  budget_id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(category_id),
  user_id INTEGER REFERENCES users(user_id),
  amount MONEY,
  date DATE
);

-- Insert fake user
INSERT INTO users (username, first_name, password) 
VALUES ('cagreg', 'carolyn', 'hello');