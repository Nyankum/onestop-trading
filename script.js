// OneStop Trading - basic marketplace functions

let cartCount = 0;

const cartNumber = document.querySelector(".cart b");
const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    cartCount++;

    cartNumber.textContent = cartCount;

    button.textContent = "Added ✓";

    setTimeout(function() {
      button.textContent = "Add to Cart";
    }, 1200);

  });

});
