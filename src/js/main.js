// helper: safely get from localStorage
function getCartItems() {
  return JSON.parse(localStorage.getItem("so-cart")) || [];
}

// update the badge number
function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;

  const cartItems = getCartItems();
  badge.textContent = cartItems.length; // or sum qty if you store qty
}
// run on every page load
document.addEventListener("DOMContentLoaded", updateCartBadge);
// export so you can call it again after add/remove
export { updateCartBadge };


document.querySelectorAll(".product-card").forEach(card => {
  const priceElement = card.querySelector(".product-card__price");
  const discountElement = card.querySelector(".product-card__discount");

  if (priceElement && discountElement) {
    const discount = parseInt(discountElement.dataset.discount, 10);
    const originalPrice = parseFloat(priceElement.textContent.replace("$", ""));
    const discountedPrice = (originalPrice * (1 - discount / 100)).toFixed(2);

    // Update DOM
    priceElement.innerHTML = `
      <span class="product-card__price--old">ORIGINAL:   $${originalPrice.toFixed(2)}</span>
      <span class="product-card__price--new">DISCOUNTED: $${discountedPrice}</span>
    `;
  }
});
