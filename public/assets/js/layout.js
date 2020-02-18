
$(document).ready(function () {

  $("select").formSelect(); // materialize plugin for form where user is selecting state
  $(".dropdown-trigger").dropdown();


  // Class menu added to these buttons: kitchen, bedroom, bathroom, living room, outdoors
  $(".menu").on("click", function () {
    $(".initial").addClass("hide");
    $(".product-display").removeClass("hide");
  });

  // Listener to post to the search route when enter is pressed on the search input field
  $(document).keyup(function (event) {
    if ($("#autocomplete-input").is(":focus") && event.key == "Enter") {
      $.post(`/search/${$("#autocomplete-input").val()}`);
    }
  });

  // // home page icon on a navbar
  // // $(".home").on("click", function () {
  // //   console.log("click");
  // //   $(".product-display").addClass("hide");
  // //   $(".initial").removeClass("hide");
  // //   $(".cart").addClass("hide");
  // // });

  // // Proceed to checkout button
  // $(".chekout-btn").on("click", function () {
  //   $(".cart").addClass("hide");
  //   $(".product-display").addClass("hide");
  //   $(".initial").addClass("hide");
  //   $(".checkout-form").removeClass("hide");
  // });

  // // add-to cart button
  // // $(".add-to-cart").on("click", function () {
  // //   $(".cart").removeClass("hide");
  // //   $(".product-display").addClass("hide");
  // //   $(".initial").addClass("hide");
  // //   $(".checkout-form").addClass("hide");
  // // });

  // // checkout button
  // $(".payment-btn").on("click", function (){
  //   $(".checkout-form").addClass("hide");
  //   $(".payment-form").removeClass("hide");
  //   $(".cart").addClass("hide");

  // });

  // // place order button
  // $(".place-order").on("click", function(){
  //   $(".product-display").addClass("hide");
  //   $(".initial").addClass("hide");
  //   $(".checkout-form").addClass("hide");
  //   $(".payment-form").addClass("hide");
  //   $(".thank-you").removeClass("hide");
  // });

  // // continue-shopping
  // $(".continue-shopping").on("click", function (){
  //   $(".thank-you").addClass("hide");
  //   $(".initial").removeClass("hide");
  // });

  $(".add-to-cart").on("click", function () {
    let id = $(this).data("id");
    $.ajax("/add/cart/" + id, {
      type: "PUT"
    });
  });

  // login icon/ or "login" on a navbar
  $(".login").on("click", function () {
    $(".login-form").removeClass("hide");
    $(".product-display").addClass("hide");
    $(".initial").addClass("hide");
    $(".checkout-form").addClass("hide");
    $(".payment-form").addClass("hide");
    $(".thank-you").addClass("hide");
    $(".cart").addClass("hide");
    $(".signup-form").addClass("hide");
  });

  // login button
  $(".login-btn").on("click", function () {
    $(".cart").removeClass("hide");
    $(".login-form").addClass("hide");
    $(".thank-you").addClass("hide");
    $(".signup-form").addClass("hide");
  });

  // signup icon/ or "sign up" on a navbar
  $(".signup").on("click", function () {
    $(".signup-form").removeClass("hide");
    $(".login-form").addClass("hide");
    $(".product-display").addClass("hide");
    $(".initial").addClass("hide");
    $(".checkout-form").addClass("hide");
    $(".payment-form").addClass("hide");
    $(".thank-you").addClass("hide");
    $(".cart").addClass("hide");
  });

  $(".signupbtn").on("click", function () {
    window.scrollTo(0, 0);
    $(".signup-form").addClass("hide");
    $(".initial").removeClass("hide");
    $(".thank-you").addClass("hide");
  });

  // =============================================================================================================//
 // converting prices to different currencies
 let price = $(".price").text();
 // using regular expression match method to extract a number from a string, in this case a price
 let characters = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
 let numb = price.match(characters);
 price = numb;
 console.log(price);
 
 const currency = ["EUR", "CAD", "USD"];
 var settings = {
   "async": true,
   "crossDomain": true,
   "url": `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=USD&to=${currency}&amount=1`,
   "method": "GET",
   "headers": {
     "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
     "x-rapidapi-key": "0f8b4936e4msh4b12f41af486daap16e507jsn846907cf2bfd"
   }
 }
 $.ajax(settings).done(function (res) {
   console.log(res);
   let currentRate = res.rates.EUR.rate_for_amount; // current rate exchange dolar to euro
   const euroExchange = function () {
   // converting all prices into euros  
     let arrayPrice = price[0] * currentRate / numb[0];
     
     convertedPrice = price.map(newPrice => {
       return JSON.stringify(newPrice * arrayPrice);
     });
     console.log(convertedPrice); // this returns array of new prices
// =====================================================//
// HERE IS THE ISSUE. I CAN'T MATCH PRICES TO DISPLAY WHERE THEY BELONG
     for (let i = 0; i < price.length; i++) {
       price[i] === convertedPrice[i] / currentRate;
       $(".price").text("Price: EUR " + convertedPrice[i]);
     }
//======================================================//
 }
   $(".eur").on("click", function (e) {
   e.preventDefault();
   euroExchange();
 });
 $(".currency").on("click", function (e) {
   e.preventDefault();
   switch (currency) {
     case "EUR":
       euroExchange();
       break;
     case "CAD":
       canadianExchange();
       break;
     case "USD":
       dollarExchange();
       break;
     default: "USD"
   };
 });
});   


});
