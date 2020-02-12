module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define("Users", {
    username: DataType.STRING,
    password: DataType.STRING
  });
  return Users;
};
