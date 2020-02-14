const db = require("../../models");

const storeSession = sessionID => {
  db.Sessions.create({ session: sessionID });
};

const checkSession = sessionID => {
  db.Sessions.findAll({ where: { session: sessionID } }).then(result => {
    if (result.length != 0) {
      console.log("worked");
    } else {
      console.log("failed");
      storeSession(sessionID);
    }
  });
};

const updateSessionCart = sessionID => {};

module.exports = {
  checkSession: checkSession
};
