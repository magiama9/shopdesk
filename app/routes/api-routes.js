// =============================================================
//                  SET UP IMAGE UPLOADING
//              https://www.npmjs.com/package/multer
// =============================================================
const multer = require("multer");
// const passport = require("passport");
const path = require("path");
const db = require("../../models");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const secured = require("../lib/secured");
const passport = require("passport");
const dotenv = require("dotenv");
const util = require("util");
const url = require("url");
const querystring = require("querystring");
dotenv.config();
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://shoppy.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://guarded-brook-11312.herokuapp.com/api/auth",
  issuer: "https://shoppy.auth0.com/",
  algorithms: ["RS256"]
});

// SETS STORAGE DESTINATION AND FILENAMES WHEN IMAGES ARE UPLOADED
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/assets/images/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// =============================================================
//                  REQUIRE IN QUERY FUNCTIONS
// =============================================================

const query = require("../../db/lib/query");
const cart = require("../../db/lib/cart");

// =============================================================
//                          ROUTES
// =============================================================

module.exports = function(app) {
  //app.use(jwtCheck);
  // GET ROUTE FOR VIEWING INVENTORY
  app.get("/", function(req, res) {
    console.log(req.session.id);
    cart.checkSession(req.session.id);
    query.view(res);
  });

  // Test route for item adding
  // upload.html is a placeholder form
  app.get("/inventory", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/upload.html"));
    //res.render("productupload");
  });

  // POST ROUTE FOR ADDING INVENTORY
  // FORM NEEDS TO HAVE A FILE INPUT FIELD NAMED PHOTO
  app.post("/inventory/upload", upload.single("photo"), (req, res, next) => {
    // req.file is the `photo` file
    // req.body holds the text fields of the form
    console.log(req.body);

    // initializes filepath variable
    let filepath;

    // Returns the file path on windows machines that use the \ for filepaths
    if (
      req.file.path.substring(
        req.file.path.toLowerCase().lastIndexOf("\\assets\\")
      ) != -1
    ) {
      filepath = req.file.path.substring(
        req.file.path.toLowerCase().lastIndexOf("\\assets\\")
      );
    } else if (
      // Returns the correct file path on mac/unix systems that use / for filepaths
      req.file.path.substring(
        req.file.path.toLowerCase().lastIndexOf("/assets/")
      ) != -1
    ) {
      filepath = req.file.path.substring(
        req.file.path.toLowerCase().lastIndexOf("/assets/")
      );
    }

    // replaces \ globally with / for storing in the db
    let filepath2 = filepath.replace(/\\/g, "/");

    // stores the req.body as a new object
    let obj = req.body;

    // Sets the img property of the new object to a filepath
    obj.img = filepath2;

    // Adds an item to the database.
    query.addItem(obj);
  });

  // PUT ROUTE FOR ADDING TO CART
  // YEAH, THIS SHOULD PROBABLY BE A POST ROUTE
  app.put("/add/cart/:id", (req, res) => {
    query.addToCart(req.session.id, req.params.id);
    res.send("Added to Cart");
  });

  // Post route for searching
  app.post("/search/:name", (req, res) => {
    console.log("stuff");
    query.search(req.params.name, res);
  });
  // PUT ROUTE FOR UPDATING INVENTORY QUANTITY

  app.put("/api/inventory/:id", function(req, res) {
    query.decreaseQty(res);
  });

  // GET ROUTE FOR VIEWING CART
  app.get("/cart", function(req, res) {
    query.viewCart(req.session.id, res);
  });

  /* GET user profile. */
  app.get("/user", secured(), function(req, res, next) {
    const { _raw, _json, ...userProfile } = req.user;
    res.json(userProfile);
  });

  /* GET home page. */
  app.get("/testauth", function(req, res, next) {
    res.send("This is pretty cool");
  });

  // Perform the login, after login Auth0 will redirect to callback
  app.get(
    "/login",
    passport.authenticate("auth0", {
      scope: "openid email profile"
    }),
    function(req, res) {
      res.redirect("/callback");
    }
  );

  // Perform the final stage of authentication and redirect to previously requested URL or '/user'
  app.get("/callback", function(req, res, next) {
    passport.authenticate("auth0", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || "/user");
      });
    })(req, res, next);
  });

  // Perform session logout and redirect to homepage
  app.get("/logout", (req, res) => {
    req.logout();

    const returnTo = req.protocol + "://" + req.hostname;
    const port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo += ":" + port;
    }

    const logoutURL = new url.URL(
      util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN)
    );
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
  });
};
