// if any of the following buttons (kitchen, bedroom, bathroom, living room, outdoors) klicked
//home page hides and a card with items will display
$(".menu").on("click", function () {
$(".initial").addClass("hide");
$(".product-display").removeClass("hide");
$(".cart").addClass("hide");
});

// if home icon is cliked, hides items card and displays home page
$(".home").on("click", function () {
  $(".product-display").addClass("hide");
  $(".initial").removeClass("hide");
  $(".cart").addClass("hide");
});

// if shopping cart cliked,
$(".shopping-cart").on("click", function (){
    $(".product-display").addClass("hide");
    $(".initial").addClass("hide");
    $(".cart").removeClass("hide");
    
})