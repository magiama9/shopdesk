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
const addItem = (obj, path) => {
  db.Items.create({
    name: obj.name,
    description: obj.description,
    qty: obj.qty,
    price: obj.price,
    img: path
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
// Placeholder function to save items using sequelize
// Expects ID to be the ID of a selected item and valid
const save = id => {
  db.Items.update(
    {
      saved: true
    },
    { where: { id: id } }
  );
};

// Placeholder function to unsave items using sequelize
// Expects ID to be the ID of a selected item and valid
const unSave = id => {
  db.Items.update(
    {
      saved: false
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
  view: viewInventory,
  addItem: addItem,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  save: save,
  unSave: unSave,
  search: searchItem,
  decreaseQty: decreaseQty
};
