DROP DATABASE IF EXISTS coolStoreDB;

-- Create the database employeeDB and specified it for use.
CREATE DATABASE coolStoreDB;

USE coolStoreDB;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  price INT(5),
  description VARCHAR(100),
  img VARCHAR(500),
  inCart BOOLEAN DEFAULT false,
  saved BOOLEAN DEFAULT false,
  PRIMARY KEY(id)
)