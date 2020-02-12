// =============================================================
//                  SET UP IMAGE UPLOADING
//              https://www.npmjs.com/package/multer
// =============================================================
const multer = require("multer");

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

module.exports = function(app) {
  // GET ROUTE FOR VIEWING INVENTORY
  app.get("/", function(req, res) {
    query.view(res);
  });

  // POST ROUTE FOR ADDING INVENTORY
  // FORM NEEDS TO HAVE A FILE INPUT FIELD NAMED PHOTO
  app.post("/inventory/upload", upload.single("photo"), (req, res, next) => {
    // req.file is the `photo` file
    // req.body holds the text fields of the form

    // Adds an item to the database. req.file.path SHOULD be the correct file path
    // Needs testing
    query.addItem(req.body, req.file.path);
  });

  // PUT ROUTE FOR UPDATING INVENTORY QUANTITY

  // PUT ROUTE FOR ADDING TO CART

  // PUT ROUTE FOR ADDING TO SAVED ITEMS
};
