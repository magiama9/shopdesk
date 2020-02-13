const add = require("../lib/query");

const testItem = {
  name: "Testing",
  description: "This is a test",
  qty: 5,
  price: 100,
  img: "/assets/public/uploads/test.jpg"
}

const otherItem = {
  name: "Another Item",
  description: "More items",
  qty: 3,
  price: 200,
  img: "assets/images/shopping.png"
}

module.exports = seedDB = () => {
  add.addItem(testItem);
  add.addItem(testItem);
  add.addItem(testItem);
  add.addItem(testItem);
  add.addItem(otherItem);
};
