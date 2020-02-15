const add = require("../lib/query");

const testItem = {
  name: "Testing",
  description: "This is a test",
  qty: 5,
  price: 100,
  img: "/assets/images/uploads/test.jpg"
}

const otherItem = {
  name: "Another Item",
  description: "More items",
  qty: 3,
  price: 200,
  img: "/assets/images/uploads/shopping.png"
}

module.exports = seedDB = () => {
  
  // Add items to inventory on DB load
  add.addItem(testItem);
  add.addItem(testItem);
  add.addItem(testItem);
  add.addItem(testItem);
  add.addItem(otherItem);

  // Add an item to the cart on DB load
  add.addToCart(123, 1);
};
