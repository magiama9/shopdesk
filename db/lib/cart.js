const db = require("../../models");

const storeSession = sessionID => {
  db.Session.create({ session: sessionID });
};

const checkSession = sessionID => {
  db.Session.findAll({ where: { session: sessionID } }).then(result => {
    if (result != null) {
      console.log("worked");
    }
    console.log("failed");
    storeSession(sessionID);
  });
};

const updateSessionCart = (sessionID) => {
}

module.exports = {
  checkSession: checkSession
};
