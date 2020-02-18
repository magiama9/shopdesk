module.exports = function(sequelize, DataTypes) {
  const Items = sequelize.define("Items", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    category: DataTypes.STRING,
    img: DataTypes.STRING,
  });
  return Items;
};
