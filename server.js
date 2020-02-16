// Express and Express Handlebars Dependencies
const express = require("express");
const session = require("express-session");
const exphb = require("express-handlebars");
const dotenv = require("dotenv");
const userInViews = require('./app/lib/userInViews');
const authRouter = require('./app/routes/auth');
const usersRouter = require('./app/routes/users');
dotenv.config();

const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
// const passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// Requires in index file that sequelize helps us with (DO NOT TOUCH THAT INDEX.JS FILE GOD DAMNIT!)
const db = require("./models");
const seed = require("./db/init/seed");

// Initializes Express
const app = express();

// DEFINES SESSION INFO FOR DEV/PRODUCTION
const sess = {
  secret: "katie durga is one cool cat",
  cookie: {}
};

if (app.get("env") === "production") {

  // N.B. DON'T REMOVE THE PROXY TRUST FOR HEROKU DEPLOYMENT
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// Initializes sessions stored in memory
// N.B. MEMORY STORAGE IS VERY INSECURE AND LEAKY
app.use(session(sess));

// Sets port to use host server port or 8080 for development
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// AUTHENTICATION STRATEGY
// USES AUTH0 AS A SERVICE
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:8080/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);


// INITIALIZES AUTH STRATEGY
passport.use(strategy);


// MAKES EXPRESS USE PASSPORT AND PASSPORT USE SESSIONS
app.use(passport.initialize());
app.use(passport.session());


// DEALS WITH LOGGING USERS IN AND OUT
// I'LL BE HONEST, I DON'T ENTIRELY UNDERSTAND WHAT THIS DOES
// -- SEEMS TO BE IMPORTANT THOUGH --
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// Static directory
app.use(express.static(__dirname + "/public"));


// Sets view enging to use handlebars
app.engine("handlebars", exphb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./app/routes/api-routes.js")(app);

// Updates DB before beginning the express service
// force:true is essentially the same as DROP DATABASE IF EXISTS
db.sequelize.sync({ force: true }).then(function() {
  db.User.create({ username: "admin", password: "admin" });
  seed();
  app.listen(PORT, function() {
    console.log("Listening on port %s", PORT);
  });
});
