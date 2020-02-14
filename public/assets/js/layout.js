$(document).ready(function () {
  console.log("kanslkdf");
  $('select').formSelect(); // materialize plugin for form where user is selecting state


// All the content lives on one html page, so we're adding hide/show classes for all links and buttons

// Class menu added to these buttons: kitchen, bedroom, bathroom, living room, outdoors
$(".menu").on("click", function () {
  $(".product-display").removeClass("hide");
  $(".initial").addClass("hide");
  $(".cart").addClass("hide");
  $(".login-form").addClass("hide");
  $(".checkout-form").addClass("hide");
  $(".payment-form").addClass("hide");
  $(".thank-you").addClass("hide");
});

// home page icon/or "home" on a navbar
$(".home").on("click", function () {
  $(".initial").removeClass("hide");
  $(".product-display").addClass("hide");
  $(".cart").addClass("hide");
  $(".login-form").addClass("hide");
  $(".checkout-form").addClass("hide");
  $(".payment-form").addClass("hide");
  $(".thank-you").addClass("hide");
});

// shopping-cart icon/ or "Your cart" on a navbar
$(".shopping-cart").on("click", function () {
  $(".product-display").addClass("hide");
  $(".initial").addClass("hide");
  $(".cart").removeClass("hide");
  $(".login-form").addClass("hide");
});

// Proceed to checkout button
$(".chekout-btn").on("click", function () {
  $(".checkout-form").removeClass("hide");
  $(".cart").addClass("hide");
  $(".product-display").addClass("hide");
  $(".initial").addClass("hide");
  $(".login-form").addClass("hide");
});

// add to cart button
$(".add-to-cart").on("click", function () {
  $(".cart").removeClass("hide");
  $(".product-display").addClass("hide");
  $(".initial").addClass("hide");
  $(".checkout-form").addClass("hide");
  $(".login-form").addClass("hide");
  $(".payment-form").addClass("hide");
});

// Proceed to checkout button
$(".payment-btn").on("click", function (){
  $(".checkout-form").addClass("hide");
  $(".payment-form").removeClass("hide");
  $(".cart").addClass("hide");
  $(".login-form").addClass("hide");
});

// place order button
$(".place-order").on("click", function(){
  $(".product-display").addClass("hide");
  $(".initial").addClass("hide");
  $(".checkout-form").addClass("hide");
  $(".payment-form").addClass("hide");
  $(".thank-you").removeClass("hide");
  $(".login-form").addClass("hide");
});

// continue-shopping 
$(".continue-shopping").on("click", function (){
  $(".thank-you").addClass("hide");
  $(".initial").removeClass("hide");
});

// login icon/ or "login" on a navbar
$(".login").on("click", function (){
$(".login-form").removeClass("hide");
$(".product-display").addClass("hide");
$(".initial").addClass("hide");
$(".checkout-form").addClass("hide");
$(".payment-form").addClass("hide");
$(".thank-you").addClass("hide");
$(".cart").addClass("hide");
});




});

