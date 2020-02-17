const db = require("../../models");

// Placeholder function to view all inventory using sequelize
// Replace console logs with res.json once routes are implemented
const viewInventory = res => {
  db.Items.findAll({}).then(dbItems => {
    res.render("index", { items: dbItems });
  });
};

// Placeholder function to add an item using sequelize
// Replace console logs with res.json once routes are implemented
const addItem = obj => {
  db.Items.create({
    name: obj.name,
    description: obj.description,
    qty: obj.qty,
    price: obj.price,
    img: obj.img,
    category: obj.category
  }).then(dbItems => {});
};

// Placeholder function to view items matching search using sequelize
// Replace console logs with res.json once routes are implemented

// SEARCH TERM IS NOT CASE SENSITIVE, THANK GOD.
const searchItem = (searchTerm, res) => {
  db.Items.findAll({
    where: {
      name: searchTerm
    }
  }).then(search => {
    console.log(search);
    res.render("index", { items: search });
  });
};

// Placeholder function to add items to the cart using sequelize
// Expects ID to be the ID of a selected item and valid
const addToCart = (sessionID, id) => {
  db.Items.findAll({ where: { id: id } }).then(result => {
    result.forEach(idx => {
      db.Carts.create({
        session: sessionID,
        productID: id,
        name: idx.name,
        price: idx.price,
        img: idx.img
      });
    });
  });
};

const viewCart = (sessionID, res) => {
  db.Carts.findAll({ where: { session: sessionID } }).then(result => {
    console.log(result);
    res.render("cart", { cart: result });
  });
};

const viewKitchen = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    // console.log(catItems)
    res.render("kitchen", { items: catItems});
  });
};

const viewBathroom = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    // console.log(catItems)
    res.render("bathroom", { items: catItems});
  });
};

const viewOutdoors = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(result => {
    console.log(result)
    res.render("outdoors", { outdoors: result});
  });
};

const viewBedroom = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    console.log(catItems)
    res.render("bedroom", { items: catItems});
  });
};

const viewLivingroom = (category, res) => {
  db.Items.findAll({
    where: {
      category: category
    }
  }).then(catItems => {
    // console.log(catItems)
    res.render("living-room", { items: catItems});
  });
};

// Remove items from the cart using sequelize
// Expects ID to be the ID of a selected item and valid
const removeFromCart = id => {
  db.Carts.destroy({ where: { id: id } }).then(result => {
    return result;
  });
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

// viewInventory();

module.exports = {
  view: viewInventory,
  addItem: addItem,
  addToCart: addToCart,
  viewCart: viewCart,
  removeFromCart: removeFromCart,
  save: save,
  unSave: unSave,
  search: searchItem,
  decreaseQty: decreaseQty,
  viewCart: viewCart,
  viewKitchen: viewKitchen,
  viewBathroom: viewBathroom,
  viewLivingroom: viewLivingroom,
  viewOutdoors: viewOutdoors,
  viewBedroom: viewBedroom
};
