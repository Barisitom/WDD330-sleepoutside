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
