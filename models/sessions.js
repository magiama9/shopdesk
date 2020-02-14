module.exports = function(sequelize, DataTypes) {
  const Sessions = sequelize.define("Sessions", {
    session: DataTypes.STRING,
  });
  return Sessions;
};