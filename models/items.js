module.exports = function(sequelize, DataTypes) {
  const Items = sequelize.define("Items", {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    img: DataTypes.STRING,
    category: DataTypes.STRING
  });
  return Items;
};
