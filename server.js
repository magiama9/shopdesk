
// Express and Express Handlebars Dependencies
const express = require("express");
const exphb = require("express-handlebars");

// Requires in index file that sequelize helps us with (DO NOT TOUCH THAT INDEX.JS FILE GOD DAMNIT!)
const db = require("./models");
const seed = require("./db/init/seed");

// Initializes Express
const app = express();

// Sets port to use host server port or 8080 for development
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./app/routes/api-routes.js")(app);



// Updates DB before beginning the express service
// force:true is essentially the same as DROP DATABASE IF EXISTS
db.sequelize.sync({ force: true }).then(function() {
  seed();
  app.listen(PORT, function() {
    console.log("Listening on port %s", PORT);
  });
});
