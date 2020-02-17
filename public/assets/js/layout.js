$(document).ready(function() {
  console.log("kanslkdf");
  $("select").formSelect(); // materialize plugin for form where user is selecting state
  $(".dropdown-trigger").dropdown(); // materialize plugin for 'my account' button

  // All the content lives on one html page, so we're adding hide/show classes for all links and buttons

  // Class menu added to these buttons: kitchen, bedroom, bathroom, living room, outdoors
  $(".menu").on("click", function() {
    $(".initial").addClass("hide");
    $(".product-display").removeClass("hide");
  });

  // Listener to post to the search route when enter is pressed on the search input field
  $(document).keyup(function(event) {
    if ($("#autocomplete-input").is(":focus") && event.key == "Enter") {
      $.post(`/search/${$("#autocomplete-input").val()}`);
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

  // login icon/ or "login" on a navbar
  $(".login").on("click", function() {
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
  $(".login-btn").on("click", function() {
    $(".cart").removeClass("hide");
    $(".login-form").addClass("hide");
    $(".thank-you").addClass("hide");
    $(".signup-form").addClass("hide");
  });

  // signup icon/ or "sign up" on a navbar
  $(".signup").on("click", function() {
    $(".signup-form").removeClass("hide");
    $(".login-form").addClass("hide");
    $(".product-display").addClass("hide");
    $(".initial").addClass("hide");
    $(".checkout-form").addClass("hide");
    $(".payment-form").addClass("hide");
    $(".thank-you").addClass("hide");
    $(".cart").addClass("hide");
  });

  $(".signupbtn").on("click", function() {
    window.scrollTo(0, 0);
    $(".signup-form").addClass("hide");
    $(".initial").removeClass("hide");
    $(".thank-you").addClass("hide");
  });
});
