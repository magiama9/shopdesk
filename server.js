const express = require("express");
//requires in index file that sequelize helps us with (DO NOT TOUCH THAT INDEX.JS FILE GOD DAMNIT!)
const db = require("./models");
var app = express();
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static directory
app.use(express.static("app/public"));
//Routes
require("./app/routes/api-routes.js")(app);
//force:type is essentially the same as DROP DATABASE IF EXISTS
db.sequelize.sync({ force: type }).then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port %s", PORT);
  });
});