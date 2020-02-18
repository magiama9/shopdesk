$(document).ready(function() {
  console.log("kanslkdf");

  // USES A PROXY TO MAKE THE API WORK ON HEROKU & WITH CORS
  // PROXY IS CORS-ANYWHERE
  // WE CAN ALSO SET THIS UP AS A NODE PACKAGE AND USE IT TO FORWARD API CALLS THROUGH OUR SERVER
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
    }
  });
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
    origin: "https://guarded-brook-11312.herokuapp.com",
    crossDomain: true,
    url: `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=USD&to=${currency}&amount=1`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
      "x-rapidapi-key": "0f8b4936e4msh4b12f41af486daap16e507jsn846907cf2bfd"
    }
  };
  $.ajax(settings).done(function(res) {
    let euroRate = res.rates.EUR.rate_for_amount; // current rate exchange dollar to EUR
    let cadRate = res.rates.CAD.rate_for_amount; // current rate exchange dollar to CAD
    let usdRate = res.rates.USD.rate_for_amount; // current rate exchange dollar to USD
    const euroExchange = function() {
      // converting all prices into euros
      let arrayPrice = (price[0] * euroRate) / numb[0];

      convertedPrice = price.map(newPrice => {
        return JSON.stringify(newPrice * arrayPrice);
      });
      console.log(convertedPrice); // this returns array of new prices
      // =====================================================//

      dispTotal(calcTotal(convertedPrice), "eur");
      // LOOPS THROUGH EACH PRICE VALUE AND SETS THE TEXT TO THE REQUESTED VALUE
      // CONVERTS TO A FLOATING POINT NUMBER AND BACK TO A STRING TO GET THE CORRECT NUMBER OF DECIMALS
      price.forEach((val, idx) => {
        let selector = `#price${idx}`;
        $(selector).text(
          "Price: \u20AC" + parseFloat(convertedPrice[idx]).toFixed(2)
        );
      });
    };

    const canadianExchange = function() {
      // converting all prices into euros
      let arrayPrice = (price[0] * cadRate) / numb[0];

      convertedPrice = price.map(newPrice => {
        return JSON.stringify(newPrice * arrayPrice);
      });
      console.log(convertedPrice); // this returns array of new prices
      // =====================================================//

      // LOOPS THROUGH EACH PRICE VALUE AND SETS THE TEXT TO THE REQUESTED VALUE
      dispTotal(calcTotal(convertedPrice), "cad");
      price.forEach((val, idx) => {
        let selector = `#price${idx}`;
        $(selector).text(
          "Price: CAD " + parseFloat(convertedPrice[idx]).toFixed(2)
        );
      });
    };

    const dollarExchange = function() {
      // converting all prices into euros
      let arrayPrice = (price[0] * usdRate) / numb[0];

      convertedPrice = price.map(newPrice => {
        return JSON.stringify(newPrice * arrayPrice);
      });
      console.log(convertedPrice); // this returns array of new prices
      // =====================================================//

      // LOOPS THROUGH EACH PRICE VALUE AND SETS THE TEXT TO THE REQUESTED VALUE
      dispTotal(calcTotal(convertedPrice), "usd");
      price.forEach((val, idx) => {
        let selector = `#price${idx}`;
        $(selector).text("Price: $" + convertedPrice[idx]);
      });
    };
    $(".eur").on("click", function(e) {
      e.preventDefault();
      euroExchange();
    });
    $(".cad").on("click", function(e) {
      e.preventDefault();

      canadianExchange();
    });
    $(".usd").on("click", function(e) {
      e.preventDefault();
      dollarExchange();
    });
    dollarExchange();
  });


  

  // Calculates subtotal
  // Each price is coerced into a number before being added to the subtotal
  const calcTotal = array => {
    let subT = 0;
    array.forEach(idx => {
      subT += +idx;
    });
    return subT;
  };

  // Displays the subtotal in the subtotal span
  // Switches currency symbol based on currency selected
  const dispTotal = (num, curr) => {
    let sub = num.toFixed(2);
    switch (curr) {
      case "usd":
        $(".subtotal").text(`$${sub}`);
        break;
      case "cad":
        $(".subtotal").text(`CAD ${sub}`);
        break;
      case "eur":
        $(".subtotal").text(`\u20AC${sub}`);
        break;
    }
  };

  dispTotal(calcTotal(price), "usd");
});
