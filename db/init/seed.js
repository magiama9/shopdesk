const add = require("../lib/query");

const testItem = {
  name: "Testing",
  description: "This is a test",
  qty: 5,
  price: 100,
  img: "/assets/public/uploads/test.jpg"
}
module.exports = seedDB = () => {
  add.addItem(testItem);
  add.addItem(testItem);
  add.addItem(testItem);
};
