const db = require("../../models");

// Placeholder function to view all inventory using sequelize
// Replace console logs with res.json once routes are implemented
const viewInventory = () => {
  db.Items.findAll({}).then(dbItems => {
    dbItems.forEach(idx => {
      console.log(idx.description);
      console.log(idx.name);
      console.log(idx.price);
      console.log(idx.img);
    });
  });
};

// Placeholder function to add an item using sequelize
// Replace console logs with res.json once routes are implemented
const addItem = () => {
  db.Items.create({
    name: "Test",
    description: "This is a test",
    price: 100000,
    img: "/assets/something.jpg"
  }).then(dbItems => {
    console.log(dbItems);
  });
};

// Placeholder function to view items matching search using sequelize
// Replace console logs with res.json once routes are implemented

// SEARCH TERM IS NOT CASE SENSITIVE, THANK GOD.
const searchItem = searchTerm => {
  db.Items.findAll({
    where: {
      name: searchTerm
    }
  }).then(search => {
    search.forEach(idx => {
      console.log(idx.description);
      console.log(idx.name);
      console.log(idx.price);
      console.log(idx.img);
    });
  });
};

// Placeholder function to add items to the cart using sequelize
// Expects ID to be the ID of a selected item and valid
const addToCart = id => {
  db.Items.update(
    {
      inCart: true
    },
    { where: { id: id } }
  );
};

// Placeholder function to add items to the cart using sequelize
// Expects ID to be the ID of a selected item and valid
const removeFromCart = id => {
  db.Items.update(
    {
      inCart: false
    },
    { where: { id: id } }
  );
};

// Placeholder function to decrease available quantity of item once it's purchased
// Expects ID to be the ID of a purchased item and valid
const decreaseQty = id => {
  db.Items.decrement("qty", { where: { id: id } });
};

viewInventory();

module.exports = {
  addItem: addItem
};
