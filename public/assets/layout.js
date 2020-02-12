// if any of the following buttons (kitchen, bedroom, bathroom, living room, outdoors) klicke
//initial  picture will hide and a card with items will display
$(".menu").on("click", function () {
$(".initial").addClass("hide");
$(".product-display").removeClass("hide");
});

// if home page is cliked, hides items card and displays initial picture
$(".home").on("click", function () {
  $(".product-display").addClass("hide");
  $(".initial").removeClass("hide");
});