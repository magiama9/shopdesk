module.exports = function(sequelize, DataTypes) {
  const Cart = sequelize.define("Cart", {
    productID: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  });
  return Cart;
};
