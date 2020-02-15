// =============================================================
//                  SET UP IMAGE UPLOADING
//              https://www.npmjs.com/package/multer
// =============================================================
const multer = require("multer");
// const passport = require("passport");
const path = require("path");
const db = require("../../models");

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
  });

  // POST ROUTE FOR ADDING INVENTORY
  // FORM NEEDS TO HAVE A FILE INPUT FIELD NAMED PHOTO
  app.post("/inventory/upload", upload.single("photo"), (req, res, next) => {
    // req.file is the `photo` file
    // req.body holds the text fields of the form
    console.log(req.file.path);
    
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

  app.post("/search/:name", (req, res) => {
    console.log("stuff")
    query.search(req.params.name, res);
  })
  // PUT ROUTE FOR UPDATING INVENTORY QUANTITY

  app.put("/api/inventory/:id", function(req, res) {
    query.decreaseQty(res);
  });


  // GET ROUTE FOR VIEWING CART
  app.get("/cart", function(req, res) {
    query.viewCart(req.session.id, res);
  });

};
