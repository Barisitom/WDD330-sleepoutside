// /src/js/ProductDetails.mjs
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId; // e.g. "880RR"
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // fetch the product details first
    this.product = await this.dataSource.findProductById(this.productId);
    // then render HTML
    this.renderProductDetails();
    // set up the Add to Cart button
    document.getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Example: store product in localStorage
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(this.product);
    localStorage.setItem("so-cart", JSON.stringify(cart));
    alert(`${this.product.Name} added to cart`);
  }

  // ...existing code...
renderProductDetails(product) {
  const productContainer = document.querySelector(".product-detail");
  let discountHtml = "";
  if (product.discount && product.discount > 0) {
    const discountAmount = Math.round(product.Price * product.discount);
    discountHtml = `
      <div class="discount-indicator">
        <span class="discount-badge">${Math.round(product.discount * 100)}% OFF</span>
        <span class="discount-amount">Save $${discountAmount}</span>
      </div>
    `;
  }
  productContainer.innerHTML = `
    <h2>${product.Name}</h2>
    <p>Price: <span class="original-price" style="text-decoration: ${product.discount ? "line-through" : "none"}">$${product.Price}</span>
      ${product.discount ? `<span class="discounted-price">$${(product.Price * (1 - product.discount)).toFixed(2)}</span>` : ""}
    </p>
    ${discountHtml}
    <!-- ...other product details... -->
  `;
}
// ...existing code...
}
