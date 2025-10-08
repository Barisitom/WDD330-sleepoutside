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

// 🏕️ Tents
const tents = {
  marmot: document.querySelector(".marmot"),
  northface: document.querySelector(".northface"),
  north: document.querySelector(".north"),
  cedar: document.querySelector(".cedar"),
};

["marmot", "northface", "north", "cedar"].forEach(id => {
  const button = document.getElementById(`Quick_lookup_${id}`);
  button?.addEventListener("click", () => showDialog(tents[id]));
});

// 🎒 Backpacks
const backpacks = {
  urban: document.getElementById("urban_dialog"),
  campus: document.getElementById("campus_dialog"),
  trailpro: document.getElementById("trailpro_dialog"),
  carry: document.getElementById("carry_dialog"),
};

["urban", "campus", "trailpro", "carry"].forEach(id => {
  const button = document.getElementById(`Quick_lookup_${id}`);
  button?.addEventListener("click", () => showDialog(backpacks[id]));
});


// 🛌 Sleeping Bags
const sleepingBags = {
  blue: document.querySelector(".blue_bag"),
  green: document.querySelector(".green_bag"),
  orange: document.querySelector(".orange_bag"),
  gray: document.querySelector(".gray_bag"),
};

["blue", "green", "orange", "gray"].forEach(color => {
  const button = document.getElementById(`Quick_lookup_${color}`);
  button?.addEventListener("click", () => showDialog(sleepingBags[color]));
});

// 🪶 Hammocks
const hammocks = {
  tropical: document.getElementById("tropical"),
  boho: document.getElementById("boho"),
  travel: document.getElementById("travel"),
  double: document.getElementById("double"),
};

["tropical", "boho", "travel", "double"].forEach(id => {
  const button = document.getElementById(`Quick_lookup_${id}`);
  button?.addEventListener("click", () => showDialog(hammocks[id]));
});

// 💬 Shared showDialog function
function showDialog(dialog) {
  if (dialog && dialog.showModal) {
    dialog.showModal();
  }
}

//  Close dialog buttons
document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    const dialog = btn.closest("dialog");
    dialog?.close();
  });
});
