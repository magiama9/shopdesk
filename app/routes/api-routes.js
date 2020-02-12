// =============================================================
//                  SET UP IMAGE UPLOADING
//              https://www.npmjs.com/package/multer
// =============================================================
const multer = require("multer");

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

module.exports = function(app) {
  // GET ROUTE FOR VIEWING INVENTORY

  // POST ROUTE FOR ADDING INVENTORY
  // FORM NEEDS TO HAVE A FILE INPUT FIELD NAMED PHOTO
  app.post("/inventory/upload", upload.single("photo"), (req, res, next) => {
    // req.file is the `photo` file
    // req.body will hold the text fields of the form
  });

  // PUT ROUTE FOR UPDATING INVENTORY QUANTITY

  // PUT ROUTE FOR ADDING TO CART

  // PUT ROUTE FOR ADDING TO SAVED ITEMS
};
