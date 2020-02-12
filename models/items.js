module.exports = function(sequelize, DataTypes) {
  const Items = sequelize.define("Items", {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    img: DataTypes.STRING,
    inCart: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    saved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Items;
};
