import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <span class="remove-item" data-id="${item.Id}">✖</span>
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

function renderCartContents(cartItems) {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// NEW: update the badge count
function updateCartCount(cartItems) {
  const countEl = document.querySelector(".cart-count");
  if (countEl) {
    countEl.textContent = cartItems.length > 0 ? cartItems.length : "";
  }
}

function updateCartFooter(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalEl = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.FinalPrice || item.price || 0);
    }, 0);
    cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
    cartTotalEl.textContent = "Total: $0.00";
  }
}

function removeItemFromCart(id) {
  // get items from localStorage
  let cartItems = getLocalStorage("so-cart") || [];
  // filter out the one clicked
  cartItems = cartItems.filter((item) => item.Id !== id);
  // save new array back to localStorage
  setLocalStorage("so-cart", cartItems);
  // re-render
  renderCartContents(cartItems);
  updateCartFooter(cartItems);
  updateCartCount(cartItems); // 🔹 update badge after removing
}

document.addEventListener("DOMContentLoaded", () => {
  // get the cart items from localStorage
  const cartItems = getLocalStorage("so-cart") || [];

  // render items & footer
  renderCartContents(cartItems);
  updateCartFooter(cartItems);

  updateCartCount(cartItems); // 🔹 update badge on load

  // listen for remove clicks (event delegation)
  document.querySelector(".product-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const id = e.target.dataset.id;
      removeItemFromCart(id);
    }
  });
});

