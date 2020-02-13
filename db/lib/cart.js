const db = require("../../models");

const storeSession = sessionID => {
  db.Session.create({ session: sessionID });
};

const checkSession = sessionID => {
  db.Session.findOne({ where: { session: sessionID } }).then(result => {
    if (result != null) {
      console.log("worked");
      return true;
    }
    console.log("failed");
    storeSession(sessionID);
  });
};

module.exports = {
  checkSession: checkSession
};
