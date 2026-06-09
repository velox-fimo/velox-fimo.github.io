import { products } from './product.js';

const grid = document.querySelector('.product-container-grid');
const cartBody = document.querySelector(".cart-body-scroll");

const categoryFilter = {
  all:       (p) => true,
  moto:      (p) => p.type === "MOTORCYCLE",
  mule:      (p) => p.type === "MULE",
  teryx:     (p) => p.type === "TERYX",
  "jet-ski": (p) => p.type === "JET SKI"
};

let cartItems = JSON.parse(localStorage.getItem("myCart")) || [];

renderCartUI();

function renderProducts(filter = 'all') {
  if (!grid) return;
  const filtered = products.filter(categoryFilter[filter]);
  let productsHTML = '';

  filtered.forEach((product) => {
    const productImg = Array.isArray(product.img) ? product.img[0] : product.img;
    productsHTML += `<div class="product">
      <div class="availability">En stock</div>
      <div class="container-image-product">
        <img src="${productImg || ''}" class="image-product">
      </div>
      <div class="info-product">
        <p class="info-product-title">${product.name}</p>
        <p>${product.price}$</p>
        <p class="btn-detail" data-detail="${product.name}">more details</p>
        <button class="add-to-cart-btn" data-name="${product.name}">ADD TO CART</button>
      </div>
    </div>`;
  });

  grid.innerHTML = productsHTML;
}

const urlParams = new URLSearchParams(window.location.search);
const catFromUrl = urlParams.get('cat');
if (catFromUrl && categoryFilter[catFromUrl]) {
  renderProducts(catFromUrl);
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
    if (b.dataset.cat === catFromUrl) b.classList.add('active');
  });
} else {
  renderProducts('all');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.cat);
  });
});

const openCartTrigger = document.querySelector("#open-cart-trigger");
if (openCartTrigger) {
  openCartTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    const cart = document.querySelector(".cart");
    if (cart) cart.classList.add("show-cart");
  });
}

const close_button = document.querySelector("#close-cart-btn");
if (close_button) {
  close_button.addEventListener("click", (event) => {
    event.preventDefault();
    const cart = document.querySelector(".cart");
    if (cart) cart.classList.remove("show-cart");
  });
}

function renderCartUI() {
  const cartBadge = document.querySelector("#cart-badge");
  if (cartBadge) cartBadge.textContent = cartItems.length;

  if (!cartBody) return;

  if (cartItems.length === 0) {
    cartBody.innerHTML = '<div class="cart-empty"><p>Your cart is currently empty.</p></div>';
    const cartCountText = document.querySelector(".cart-header-text");
    if (cartCountText) cartCountText.textContent = "Your cart (0)";
    const totalPriceText = document.querySelector('.total-price');
    if (totalPriceText) totalPriceText.textContent = "€0,00 EUR";
    return;
  }

  let cartHTML = '';
  let subtotal = 0;

  const cartCountText = document.querySelector(".cart-header-text");
  if (cartCountText) cartCountText.textContent = `Your cart (${cartItems.length})`;

  cartItems.forEach((product, index) => {
    subtotal += Number(product.price);
    const cartProductImg = Array.isArray(product.img) ? product.img[0] : product.img;
    cartHTML += `
      <div class="cart-product-item">
        <div class="cart-img-product"><img src="${cartProductImg || ''}"></div>
        <div class="cart-info-product">
          <p class="text-cart-1">2026</p>
          <p class="text-cart-2">${product.name}</p>
          <p class="text-cart-4">ADDITIONAL VEHICLE FEATURES:</p>
          <ul class="text-cart-5">
            <li>Assist & Slipper Clutch</li>
            <li>Premium Performance Components</li>
          </ul>
          <div class="cart-info-product-2">
            <button class="cart-info-product-2-button" onclick="removeFromCart(${index})">Delete</button>
            <div style="font-size:20px;">$${product.price}</div>
          </div>
        </div>
      </div>`;
  });

  cartBody.innerHTML = cartHTML;
  const totalPriceText = document.querySelector('.total-price');
  if (totalPriceText) totalPriceText.textContent = `€${subtotal.toFixed(2)} EUR`;
}

window.removeFromCart = function(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("myCart", JSON.stringify(cartItems));
  renderCartUI();
};

document.getElementById("discover-dropdown").addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("discover-dropdown").classList.toggle("open");
  document.getElementById("brand-dropdown").classList.remove("open");
});

document.getElementById("brand-dropdown").addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("brand-dropdown").classList.toggle("open");
  document.getElementById("discover-dropdown").classList.remove("open");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#discover-dropdown") && !e.target.closest(".menu"))
    document.getElementById("discover-dropdown").classList.remove("open");
  if (!e.target.closest("#brand-dropdown") && !e.target.closest(".menu"))
    document.getElementById("brand-dropdown").classList.remove("open");

  if (e.target.classList.contains("add-to-cart-btn")) {
    e.preventDefault();
    e.stopPropagation();
    const targetName = e.target.getAttribute("data-name");
    const matchedProduct = products.find((p) => p.name.trim() === targetName.trim());
    if (matchedProduct) {
      cartItems.push(matchedProduct);
      localStorage.setItem("myCart", JSON.stringify(cartItems));
      renderCartUI();
    }
  }

  const btn = e.target.closest(".btn-detail");
  if (btn) {
    e.preventDefault();
    const name_btn = btn.getAttribute("data-detail");
    const foundProduct = products.find((p) => p.name.trim() === name_btn.trim());
    if (foundProduct) {
      localStorage.setItem("productinfo", JSON.stringify(foundProduct));
      window.location.href = "product-page.html";
    }
  }
});

document.querySelector(".discover").onclick = () => {
  document.querySelector(".inner-1").classList.toggle("inner-1-show");
};
document.querySelector(".brand").onclick = () => {
  document.querySelector(".inner-2").classList.toggle("inner-2-show");
};
document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".menu").classList.add("show");
});
document.querySelector(".menu-close-btn").addEventListener("click", () => {
  document.querySelector(".menu").classList.remove("show");
});