


// =============================================================
//                  REQUIRE IN QUERY FUNCTIONS
// =============================================================
const query = require("../../db/lib/query")

// =============================================================
//                          ROUTES
// =============================================================

module.exports = function(app) {

  // GET ROUTE FOR VIEWING INVENTORY
  app.get("/", function(req, res) {
    query.view();
  });


  // POST ROUTE FOR ADDING INVENTORY


  // PUT ROUTE FOR UPDATING INVENTORY QUANTITY

  
  // PUT ROUTE FOR ADDING TO CART


  // PUT ROUTE FOR ADDING TO SAVED ITEMS

  
}