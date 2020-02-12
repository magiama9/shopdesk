// =============================================================
//                  SET UP IMAGE UPLOADING
//              https://www.npmjs.com/package/multer
// =============================================================
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const db = require("../../models");


// SETS STORAGE DESTINATION AND FILENAMES WHEN IMAGES ARE UPLOADED
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + "-" + Date.now());
  }
});

const upload = multer({ storage: storage });

// =============================================================
//                  REQUIRE IN QUERY FUNCTIONS
// =============================================================

const query = require("../../db/lib/query");

// =============================================================
//                          ROUTES
// =============================================================

module.exports = function(app, passport) {
  // GET ROUTE FOR VIEWING INVENTORY

  // POST ROUTE FOR ADDING INVENTORY
  // FORM NEEDS TO HAVE A FILE INPUT FIELD NAMED PHOTO
  app.post("/inventory/upload", upload.single("photo"), (req, res, next) => {
    // req.file is the `photo` file
    // req.body holds the text fields of the form

    // Adds an item to the database. req.file.path SHOULD be the correct file path
    // Needs testing
    query.addItem(req.body, req.file.path);
  });

  app.get("/authenticate", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/auth.html"));
  });

  app.post(
    "/authenticate",
    passport.authenticate("local-signin", { failureRedirect: "/error" }),
    (req, res) => {
      res.send("Thank you for logging in.");
    }
  );

  app.get("/success", (req, res) => res.send("Welcome!"));

  app.get("/error", (req, res) => res.send("error logging in"));

  // PUT ROUTE FOR UPDATING INVENTORY QUANTITY

  // PUT ROUTE FOR ADDING TO CART

  // PUT ROUTE FOR ADDING TO SAVED ITEMS
};
