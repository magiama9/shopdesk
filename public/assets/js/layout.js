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


//this is for testing and it works
  // let testingPrice = $(".testing").text();
  // let expressions = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
  // let numb = testingPrice.match(expressions);
  // console.log(numb);
 

  let price = $(".price").text();
  // using regular expression match method to grab a number from a string, in this case a price
  let characters = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
  let numb = price.match(characters);
  console.log(numb);



  const currency = ["EUR", "CAD", "USD"];

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=USD&to=${currency}&amount=${numb}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
      "x-rapidapi-key": "0f8b4936e4msh4b12f41af486daap16e507jsn846907cf2bfd"
    }
  }
  
  $.ajax(settings).done(function (res) {
    console.log(res);
 
 
// this is for testing, and it works
    let newPrice = "Price: EUR " + res.rates.EUR.rate_for_amount;
    $(".testing").text(newPrice);


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
        default:
      };
    });


    $(".eur").on("click", function (e) {
      e.preventDefault();
      euroExchange();
    });

    const euroExchange = function (e) {

      // for (i = 0; i < numb.length; i++) {

      numb.forEach(exchangedPrice => {
        let newPrice = exchangedPrice.newPrice = "Price: EUR " + res.rates.EUR.rate_for_amount;
        $(".price").text(newPrice);
      })
    };
    // };

  


  // $(".cad").on("click", function (e) {
  //   e.preventDefault();
  //   canadianExchange();
  // });

  // const canadianExchange = function () {

  //   for (i = 0; i < length; i++) {

  //     price = "Price: C$ " + res.rates.CAD.rate;
  //     $(".price").text(price);

  //   };
  // };


 
});

});
