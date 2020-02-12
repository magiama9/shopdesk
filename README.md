# group-project-02

## About

This is an e-commerce application to manage and interact with an online storefront. Customers are able to view items for sale, add items to their shopping cart and make purchases. Store owners are able to manage their inventory, add and remove items for sale, and alter existing items.

### Project Scope

This project was completed over the course of 4 working days. Collaborators are Katie Durga, Anna Panas, and Sam Randels. All defined product requirements were met and the application was demonstrated with full functionality.

### Business Context

E-commerce is the fastest growing sector of the US retail market. In 2018, total retail sales in the US grew by 3.0% while e-commerce sales in the US grew by 15.0%. Small businesses see the greatest customer acquisition and revenue growth from implementing e-commerce.

### User Stories

Business Owner --- As the owner of a store, I want to be able to reach customers with an e-commerce platform so that I can expand my business and increase revenue.

Customer --- As a consumer, I want to be able to easily find and purchase great products from my favorite retailers online so that I don't have to leave the house.

Store Manager --- As the manager of a store, I want to be able to easily check and update inventory so that we don't run out of products that customers want and need.

## Technical

### Deployment & Front-End

Application is currently deployed using Heroku. The site front-end is built on the Materialize CSS framework and designed to be responsive and accessible. Content is dynamically shown to the users with the Handlebars templating engine.

### DB Schema

Product inventory and management is handled with a table of items. Determining whether items are saved for later or in a user's cart is handled with a boolean column for each item. Because of that, the entire inventory and product display functionality can be handled with only one table.

Authentication is handled with a users table. Current implementation is non-secure. In the future, authentication will be handled with Passport.

Products are initially seeded for testing, but can by dynamically added and updated by administrator users.

### Node Dependencies

* MySQL2 -- DB Querying language/framework

* Sequelize -- Handles DB queries using JavaScript

* Express -- Handles routing and server functionality

* Handlebars -- Controls views & dynamic content updating

* Passport -- Authentication manager

* Passport-local -- Handles authentication pass/fail using a local DB

### APIs

* Currency Converter -- API allows conversion of currency values displayed to a user's local currency

## Minimum Viable Product

### COMPLETED

### TODO

* All items for sale display with an item name, price, description, and image

* Customers are able to view all items for sale

* Customers are able to add items to their cart

* Customers are able to purchase items from their cart

* Customers are able to convert prices to their local currency

* Purchasing an item updates the available quantity in the DB

* Store owners are able to view inventory

* Store owners are able to add products to the inventory

### WISHLIST

* Allow users to save items for later without adding them to their cart

* Implement secure authentication using Passport and Passport-Local

* Out of stock items aren't displayed and aren't allowed to be purchased.

* Inventory management handled through deployed UI instead of command line interface

* Users are able to search the site for a specific product

* Users are able to sort and view products by category

* Users are able to filter products based on certain criteria (price, quantity available, etc)
