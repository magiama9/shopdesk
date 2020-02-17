const add = require("../lib/query");

const bed1 = {
  name: "Comfort Kween",
  description: "The most comfortable bed of all time, literally you'll never ever experience anything more comfortable ever again for the rest of your life.  3% money back guarantee.",
  category: "bedroom",
  qty: 20,
  price: 1069.69,
  img: "/assets/images/bed1.png"
}

const bed2 = {
  name: "Mediocrity at its Finest",
  description: "It's a bed.  You can sleep on it.",
  category: "bedroom",
  qty: 20,
  price: 200.00,
  img: "/assets/images/bed2.png"
}

const bed3 = {
  name: "Very Good",
  description: "This here is a very good bed.  Solidly upper middle class.  Better than good, but not amazing by any means.",
  category: "bedroom",
  qty: 20,
  price: 651.32,
  img: "/assets/images/bed3.png"
}

const couch1 = {
  name: "Comfy Bomfy",
  description: "Elegant, classic, comfortable, blue.  What more could you ask for?",
  category: "living-room",
  qty: 20,
  price: 720.01,
  img: "/assets/images/livingroom1.png"
}

const couch2 = {
  name: "Lazy Daisy",
  description: "Follow your dreams, buy this couch!",
  category: "living-room",
  qty: 20,
  price: 1001.01,
  img: "/assets/images/livingroom2.png"
}

const couch3 = {
  name: "Classy and Sassy",
  description: "This is a couch for people who have no children and no pets... and no fun.",
  category: "living-room",
  qty: 20,
  price: 20049.99,
  img: "/assets/images/livingroom3.png"
}

const outdoor1 = {
  name: "Classy and Sassy",
  description: "This is a couch for people who have no children and no pets... and no fun.",
  category: "living-room",
  qty: 20,
  price: 20049.99,
  img: "/assets/images/outdoor1.png"
}

const outdoor2 = {
  name: "Classy and Sassy",
  description: "This is a couch for people who have no children and no pets... and no fun.",
  category: "living-room",
  qty: 20,
  price: 20049.99,
  img: "/assets/images/outdoor2.png"
}

// const outdoor3 = {
//   name: "Classy and Sassy",
//   description: "This is a couch for people who have no children and no pets... and no fun.",
//   category: "living-room",
//   qty: 20,
//   price: 20049.99,
//   img: "/assets/images/outdoor3.png"
// }

module.exports = seedDB = () => {
  
  // Add items to inventory on DB load
  add.addItem(bed1);
  add.addItem(bed2);
  add.addItem(bed3);
  add.addItem(couch1);
  add.addItem(couch2);
  add.addItem(couch3);
  add.addItem(outdoor1);
  add.addItem(outdoor2);
  // add.addItem(outdoor3);


  // Add an item to the cart on DB load
  add.addToCart(123, 1);
};
