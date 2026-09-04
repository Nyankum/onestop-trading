// OneStop Trading - Shopping Cart

let cart = JSON.parse(localStorage.getItem("onestopCart")) || [];

const cartNumber = document.querySelector(".cart b");
const cartButtons = document.querySelectorAll(".add-cart");

function saveCart() {
  localStorage.setItem("onestopCart", JSON.stringify(cart));
}

function updateCartCount() {
  if (cartNumber) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartNumber.textContent = totalItems;
  }
}

cartButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    const productCard = button.closest(".product-card");

    const productName = productCard.querySelector("h3").textContent;
    const priceText = productCard.querySelector(".price").textContent;

    const price = Number(
      priceText.replace("₵", "").replace(",", "").trim()
    );

    const existingProduct = cart.find(
      item => item.name === productName
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        name: productName,
        price: price,
        quantity: 1
      });
    }

    saveCart();
    updateCartCount();

    button.textContent = "Added ✓";

    setTimeout(function() {
      button.textContent = "Add to Cart";
    }, 1200);

  });

});

updateCartCount();
