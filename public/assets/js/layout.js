$(document).ready(function () {
  console.log("kanslkdf");
  $('select').formSelect(); // materialize plugin for form where user is selecting state


// All the content lives on one html page, so we're adding hide/show classes for all links and buttons

// Class menu added to these buttons: kitchen, bedroom, bathroom, living room, outdoors
$(".menu").on("click", function () {
  $(".initial").addClass("hide");
  $(".product-display").removeClass("hide");
  $(".cart").addClass("hide");
});

// home page icon on a navbar
// $(".home").on("click", function () {
//   console.log("click");
//   $(".product-display").addClass("hide");
//   $(".initial").removeClass("hide");
//   $(".cart").addClass("hide");
// });

// shopping-cart icon on a navbar
// $(".shopping-cart").on("click", function () {
  
//   $(".product-display").addClass("hide");
//   $(".initial").addClass("hide");
//   $(".cart").removeClass("hide");
// });

// Proceed to checkout button
$(".chekout-btn").on("click", function () {
  $(".cart").addClass("hide");
  $(".product-display").addClass("hide");
  $(".initial").addClass("hide");
  $(".checkout-form").removeClass("hide");
});

// add-to cart button
// $(".add-to-cart").on("click", function () {
//   $(".cart").removeClass("hide");
//   $(".product-display").addClass("hide");
//   $(".initial").addClass("hide");
//   $(".checkout-form").addClass("hide");
// });

// checkout button
$(".payment-btn").on("click", function (){
  $(".checkout-form").addClass("hide");
  $(".payment-form").removeClass("hide");
  $(".cart").addClass("hide");

});

// place order button
$(".place-order").on("click", function(){
  $(".product-display").addClass("hide");
  $(".initial").addClass("hide");
  $(".checkout-form").addClass("hide");
  $(".payment-form").addClass("hide");
  $(".thank-you").removeClass("hide");
});

// continue-shopping
$(".continue-shopping").on("click", function (){
  $(".thank-you").addClass("hide");
  $(".initial").removeClass("hide");
});

$(".add-to-cart").on("click", function () {
  let id = $(this).data("id");
  $.ajax("/add/cart/" + id, {
    type: "PUT"
  })
});
});