module.exports = function(sequelize, DataTypes) {
  const Carts = sequelize.define("Carts", {
    productID: DataTypes.INTEGER,
    session: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING
  });
  return Carts;
};
