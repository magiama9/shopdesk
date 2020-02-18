$(document).ready(function() {
  console.log("kanslkdf");
  $("select").formSelect(); // materialize plugin for form where user is selecting state
  $(".dropdown-trigger").dropdown(); // materialize plugin for 'my account' button

  // All the content lives on one html page, so we're adding hide/show classes for all links and buttons

  // Class menu added to these buttons: kitchen, bedroom, bathroom, living room, outdoors

  // Listener to post to the search route when enter is pressed on the search input field
  $(document).keyup(function(event) {
    if ($("#autocomplete-input").is(":focus") && event.key == "Enter") {
      let search = $("#autocomplete-input").val();
      window.location.href = `/search/${search}`;
    }
  });

  $(".add-to-cart").on("click", function() {
    let id = $(this).data("id");
    $.ajax("/add/cart/" + id, {
      type: "PUT"
    });
  });

  $(".removeFromCart").on("click", function() {
    console.log("clicked");
    let id = $(this).attr("id");
    console.log(id);
    $.ajax("/delete/cart/" + id, {
      type: "delete"
    }).then(() => {
      // THIS IS A HACKY WAY TO DO THIS
      // WE SHOULD REALLY BE ABLE TO DYNAMICALLY RENDER NEW CONTENT
      // MAYBE WHEN WE LEARN REACT :{
      location.reload(); // Reloads page so handlebars can refresh content
    });
  });

  // // login icon/ or "login" on a navbar
  // $(".login").on("click", function() {
  //   $(".login-form").removeClass("hide");
  //   $(".product-display").addClass("hide");
  //   $(".initial").addClass("hide");
  //   $(".checkout-form").addClass("hide");
  //   $(".payment-form").addClass("hide");
  //   $(".thank-you").addClass("hide");
  //   $(".cart").addClass("hide");
  //   $(".signup-form").addClass("hide");
  // });

  // // login button
  // $(".login-btn").on("click", function() {
  //   $(".cart").removeClass("hide");
  //   $(".login-form").addClass("hide");
  //   $(".thank-you").addClass("hide");
  //   $(".signup-form").addClass("hide");
  // });

  // // signup icon/ or "sign up" on a navbar
  // $(".signup").on("click", function() {
  //   $(".signup-form").removeClass("hide");
  //   $(".login-form").addClass("hide");
  //   $(".product-display").addClass("hide");
  //   $(".initial").addClass("hide");
  //   $(".checkout-form").addClass("hide");
  //   $(".payment-form").addClass("hide");
  //   $(".thank-you").addClass("hide");
  //   $(".cart").addClass("hide");
  // });

  // $(".signupbtn").on("click", function() {
  //   window.scrollTo(0, 0);
  //   $(".signup-form").addClass("hide");
  //   $(".initial").removeClass("hide");
  //   $(".thank-you").addClass("hide");
  // });

   // =============================================================================================================//
  // converting prices to different currencies
  let price = $(".price").text();
  // using regular expression match method to extract a number from a string, in this case a price
  let characters = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
  let numb = price.match(characters);
  price = numb;
  console.log(price);

  const currency = ["EUR", "CAD", "USD"];
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=USD&to=${currency}&amount=1`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
      "x-rapidapi-key": "0f8b4936e4msh4b12f41af486daap16e507jsn846907cf2bfd"
    }
  };
  $.ajax(settings).done(function(res) {
    console.log("test" + res);
    let currentRate = res.rates.EUR.rate_for_amount; // current rate exchange dolar to euro
    const euroExchange = function() {
      // converting all prices into euros
      let arrayPrice = (price[0] * currentRate) / numb[0];

      convertedPrice = price.map(newPrice => {
        return JSON.stringify(newPrice * arrayPrice);
      });
      console.log(convertedPrice); // this returns array of new prices
      // =====================================================//
      // HERE IS THE ISSUE. I CAN'T MATCH PRICES TO DISPLAY WHERE THEY BELONG

      price.forEach((val, idx) => {
        let selector = `#price${idx + 1}`;
        console.log(selector);
        $(selector).text("Price: \u20AC" + convertedPrice[idx]);
      });
    };
    $(".eur").on("click", function(e) {
      e.preventDefault();
      euroExchange();
    });
    $(".currency").on("click", function(e) {
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
          "USD";
      }
    });
  });
});
