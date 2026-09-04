// OneStop Trading - Shopping Cart

let cart = JSON.parse(localStorage.getItem("onestopCart")) || [];

const cartNumber = document.querySelector(".cart b");
const cartButtons = document.querySelectorAll(".add-cart");

function saveCart() {
  localStorage.setItem("onestopCart", JSON.stringify(cart));
}

function updateCartCount() {
  if (cartNumber) {
    const totalItems = cart.reduce(function(total, item) {
      return total + item.quantity;
    }, 0);

    cartNumber.textContent = totalItems;
  }
}

// Add products to cart
cartButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    const product = button.closest(".product");

    const productName = product.querySelector("h3").textContent;
    const priceText = product.querySelector("strong").textContent;

    const price = Number(
      priceText.replace("₵", "").replace(",", "").trim()
    );

    const existingProduct = cart.find(function(item) {
      return item.name === productName;
    });

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

// Display cart page
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function displayCart() {

  if (!cartItems) {
    return;
  }

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products from OneStop Trading.</p>
        <a href="index.html">Start Shopping</a>
      </div>
    `;

    if (cartTotal) {
      cartTotal.textContent = "₵0";
    }

    return;
  }

  let total = 0;

  cart.forEach(function(item, index) {

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">

        <div>
          <h3>${item.name}</h3>
          <p>₵${item.price.toLocaleString()}</p>
        </div>

        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">−</button>
          <strong>${item.quantity}</strong>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>

        <strong>₵${itemTotal.toLocaleString()}</strong>

        <button class="remove-item" onclick="removeItem(${index})">
          Remove
        </button>

      </div>
    `;
  });

  if (cartTotal) {
    cartTotal.textContent = "₵" + total.toLocaleString();
  }
}

// Increase / decrease quantity
function changeQuantity(index, amount) {

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  displayCart();
  updateCartCount();
}

// Remove product
function removeItem(index) {

  cart.splice(index, 1);

  saveCart();
  displayCart();
  updateCartCount();
}

updateCartCount();
displayCart();
// ==============================
// CHECKOUT PAGE
// ==============================

const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const deliveryFeeElement = document.getElementById("delivery-fee");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutRegion = document.getElementById("checkout-region");

function getDeliveryFee(region) {

  const deliveryRates = {
    "Greater Accra": 30,
    "Ashanti": 40,
    "Central": 40,
    "Eastern": 40,
    "Western": 50,
    "Volta": 50,
    "Oti": 60,
    "Northern": 60,
    "Savannah": 60,
    "North East": 60,
    "Upper East": 60,
    "Upper West": 60,
    "Bono": 50,
    "Bono East": 50,
    "Ahafo": 50,
    "Western North": 50
  };

  return deliveryRates[region] || 0;
}


function displayCheckout() {

  if (!checkoutItems) {
    return;
  }

  checkoutItems.innerHTML = "";

  if (cart.length === 0) {

    checkoutItems.innerHTML = `
      <p>Your cart is empty.</p>
      <a href="index.html">Continue Shopping</a>
    `;

    if (checkoutSubtotal) {
      checkoutSubtotal.textContent = "₵0";
    }

    if (deliveryFeeElement) {
      deliveryFeeElement.textContent = "₵0";
    }

    if (checkoutTotal) {
      checkoutTotal.textContent = "₵0";
    }

    return;
  }

  let subtotal = 0;

  cart.forEach(function(item) {

    const itemTotal = item.price * item.quantity;

    subtotal += itemTotal;

    checkoutItems.innerHTML += `
      <div class="checkout-item">

        <div>
          <div class="checkout-item-name">
            ${item.name}
          </div>

          <div class="checkout-item-quantity">
            Quantity: ${item.quantity}
          </div>
        </div>

        <strong>
          ₵${itemTotal.toLocaleString()}
        </strong>

      </div>
    `;
  });


  const selectedRegion = checkoutRegion
    ? checkoutRegion.value
    : "";

  const deliveryFee = getDeliveryFee(selectedRegion);

  const total = subtotal + deliveryFee;


  if (checkoutSubtotal) {
    checkoutSubtotal.textContent =
      "₵" + subtotal.toLocaleString();
  }

  if (deliveryFeeElement) {
    deliveryFeeElement.textContent =
      deliveryFee === 0
        ? "Select region"
        : "₵" + deliveryFee.toLocaleString();
  }

  if (checkoutTotal) {
    checkoutTotal.textContent =
      "₵" + total.toLocaleString();
  }
}


// Update delivery when region changes

if (checkoutRegion) {

  checkoutRegion.addEventListener("change", function() {
    displayCheckout();
  });

}


displayCheckout();
