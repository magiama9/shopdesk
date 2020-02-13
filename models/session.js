module.exports = function(sequelize, DataTypes) {
  const Session = sequelize.define("Session", {
    session: DataTypes.STRING,
  });
  return Session;
};