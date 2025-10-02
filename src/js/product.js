import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; 
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  updateCartCount(); // ✅ update badge after adding
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// ✅ update badge count function
function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  document.querySelector(".cart-count").textContent = cartItems.length;
}

// ✅ run once on page load to show current count
document.addEventListener("DOMContentLoaded", updateCartCount);


import { getParam } from './utils.mjs';
const productId = getParam('product'); // returns "880RR"


document.addEventListener("DOMContentLoaded", () => {
  const priceElement = document.getElementById("productPrice");
  const discountElement = document.querySelector(".product-card__discount");
  const discountedPriceElement = document.getElementById("discountedPrice");

  if (priceElement && discountElement && discountedPriceElement) {
    const originalPrice = parseFloat(priceElement.dataset.price);
    const discount = parseInt(discountElement.dataset.discount, 10);

    // Calculate discounted price
    const finalPrice = (originalPrice * (1 - discount / 100)).toFixed(2);

    // Update the DOM
    priceElement.innerHTML = `
      <span class="product-card__price--old">Original $${originalPrice.toFixed(2)}</span>
    `;
    discountedPriceElement.textContent = `Discounted  $${finalPrice}`;
  }
});

