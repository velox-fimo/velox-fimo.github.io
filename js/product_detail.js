
function getCart() {
  try { return JSON.parse(localStorage.getItem("myCart")) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("myCart", JSON.stringify(cart));
}
function updateBadge() {
  document.querySelectorAll("#cart-badge").forEach(b => b.textContent = total);
  const count = document.getElementById("cart-count");
  if (count) count.textContent = total;
}
function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");
  if (!container) return;
  if (countEl) countEl.textContent = cart.length;
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p></div>';
    if (totalEl) totalEl.textContent = "€0,00 EUR";
    return;
  }
  let html = "";
  let subtotal = 0;
  cart.forEach((product, idx) => {
    subtotal += Number(product.price);
    const img = Array.isArray(product.img) ? product.img[0] : (product.img || '');
    html += `
      <div class="cart-product-item">
        <div class="cart-img-product"><img src="${img}" alt="${product.name}"></div>
        <div class="cart-info-product">
          <p class="text-cart-1">2026</p>
          <p class="text-cart-2">${product.name}</p>
          <p class="text-cart-4">ADDITIONAL VEHICLE FEATURES:</p>
          <ul class="text-cart-5">
            <li>Assist & Slipper Clutch</li>
            <li>Premium Performance Components</li>
          </ul>
          <div class="cart-info-product-2">
            <button class="cart-info-product-2-button" onclick="removeItem(${idx})">Delete</button>
            <div style="font-size:20px;">$${product.price}</div>
          </div>
        </div>
      </div>`;
  });
  container.innerHTML = html;
  if (totalEl) totalEl.textContent = `€${subtotal.toFixed(2)} EUR`;
}
function removeItem(idx) {
  const cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
  updateBadge();
}


document.querySelectorAll("#open-cart-trigger").forEach(trigger => trigger.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".cart").classList.add("show-cart");
  document.getElementById("cart-overlay").classList.add("active");
  document.body.style.overflow = "hidden";
  renderCart();
}));
document.getElementById("close-cart-btn").addEventListener("click", () => {
  document.querySelector(".cart").classList.remove("show-cart");
  document.getElementById("cart-overlay").classList.remove("active");
  document.body.style.overflow = "";
});
document.getElementById("cart-overlay").addEventListener("click", () => {
  document.querySelector(".cart").classList.remove("show-cart");
  document.getElementById("cart-overlay").classList.remove("active");
  document.body.style.overflow = "";
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".cart").classList.remove("show-cart");
    document.getElementById("cart-overlay").classList.remove("active");
    document.body.style.overflow = "";
  }
});
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (getCart().length === 0) alert("Your cart is empty!");
  else alert("Redirecting to checkout...");
});
window.addEventListener("storage", (e) => {
  if (e.key === "myCart") { updateBadge(); renderCart(); }
});


const productinfo = JSON.parse(localStorage.getItem("productinfo"));

document.querySelector(".product-detail").innerHTML = `
  <div class="welcome-image"> 
    <img src="${productinfo.img_background || ''}"> 
  </div> 
  <div class="product"> 
    <div class="gallery-product"> 
      <div class="gal-image"><img src="${productinfo.img[0] || ''}"></div> 
      <div class="gal-image"><img src="${productinfo.img[1] || ''}"></div> 
      <div class="gal-image"><img src="${productinfo.img[2] || ''}"></div> 
      <div class="gal-image"><img src="${productinfo.img[3] || ''}"></div> 
    </div> 
    <img src="${productinfo.img[0] || ''}" class="image-product"> 
    <div class="info-product"> 
      <p class="text-1">${productinfo.date || ''}</p> 
      <p class="text-2">${productinfo.name || 'Produit sans nom'}</p> 
      <p class="text-3">Price : ${productinfo.price || '0'}$</p> 
      <p class="text-4">ADDITIONAL VEHICLE FEATURES:</p> 
      <ul class="text-5"> 
        <li>${productinfo.features[0] || ''}</li> 
        <li>${productinfo.features[1] || ''}</li> 
        <li>${productinfo.features[2] || ''}</li> 
        <li>${productinfo.features[3] || ''}</li> 
      </ul>
      <button class="add-to-cart-btn">ADD TO CART</button>
      <button class="back-btn" onclick="history.back()">← BACK</button>
    </div> 
  </div>`;


const mainImage = document.querySelector(".image-product");
document.querySelectorAll(".gal-image img").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    mainImage.src = thumb.src;
  });
});


document.querySelector(".add-to-cart-btn").addEventListener("click", () => {
  const cart = getCart();
  cart.push(productinfo);
  saveCart(cart);
  updateBadge();
  alert("Produit ajouté au panier !");
});


updateBadge();
document.querySelector(".back-btn").addEventListener("click",()=>{
  window.location.href = "shop-page.html";
})



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
  if (!e.target.closest("#discover-dropdown")) {
    document.getElementById("discover-dropdown").classList.remove("open");
  }
  if (!e.target.closest("#brand-dropdown")) {
    document.getElementById("brand-dropdown").classList.remove("open");
  }
});

 document.querySelector(".discover").addEventListener("click",(x)=>{document.querySelector(".inner-1").classList.toggle("inner-1-show")});
  document.querySelector(".brand").addEventListener("click",(x)=>{document.querySelector(".inner-2").classList.toggle("inner-2-show")});
document.querySelector(".menu-btn").addEventListener("click",(x)=>{
  document.querySelector(".menu").classList.add("show");
})
document.querySelector(".menu-close-btn").addEventListener("click",(x)=>{
   document.querySelector(".menu").classList.remove("show");
})