DROP TABLE IF EXISTS contacts CASCADE;

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  avatar TEXT NOT NULL,
  phone_number VARCHAR(255) NOT NULL
)