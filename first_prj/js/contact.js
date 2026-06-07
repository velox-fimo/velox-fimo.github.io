
  document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    var msg = document.getElementById('success-msg');
    msg.style.display = 'block';
    this.reset();
    setTimeout(function(){ msg.style.display = 'none'; }, 5000);
  });


  const openCartTrigger = document.querySelector("#open-cart-trigger");
  if (openCartTrigger) {
    openCartTrigger.addEventListener("click", (event) => {
      event.preventDefault();
      const cart = document.querySelector(".cart"); 
      if (cart) cart.classList.add("show-cart");
      document.getElementById("cart-overlay").classList.add("active");
      document.body.style.overflow = "hidden";
      renderCart();
    });
  }

  
  const close_button = document.querySelector("#close-cart-btn");
  if (close_button) {
    close_button.addEventListener("click", (event) => {
      event.preventDefault();
      const cart = document.querySelector(".cart");
      if (cart) cart.classList.remove("show-cart");
      document.getElementById("cart-overlay").classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  
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
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Redirecting to checkout...");
    }
  });

  
  function getCart() {
    try { return JSON.parse(localStorage.getItem("myCart")) || []; }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }

  
  function updateBadge() {
    const cart = getCart();
    const total = cart.length;
    const badge = document.getElementById("cart-badge");
    const count = document.getElementById("cart-count");
    if (badge) badge.textContent = total;
    if (count) count.textContent = total;
  }

  
  function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = '<div class="cart-empty">Your cart is currently empty.</div>';
      if (totalEl) totalEl.textContent = "€0,00 EUR";
      return;
    }

    let html = "";
    let subtotal = 0;
    cart.forEach((product, idx) => {
      subtotal += Number(product.price);
      const img = Array.isArray(product.img) ? product.img[0] : (product.img || '../image/logo.svg');
      html += `
        <div class="cart-product-item">
          <div class="cart-img-product">
            <img src="${img}" alt="${product.name}">
          </div>
          <div class="cart-info-product">
            <p class="text-cart-1">2026</p>
            <p class="text-cart-2">${product.name}</p>
            <p class="text-cart-4">ADDITIONAL VEHICLE FEATURES:</p>
            <ul class="text-cart-5">
              <li>Assist & Slipper Clutch</li>
              <li>Premium Performance Components</li>
            </ul>
            <div class="cart-info-product-2">
              <button class="cart-info-product-2-button" onclick="removeFromCart(${idx})">Delete</button>
              <div style="font-size: 20px;">$${product.price}</div>
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;
    if (totalEl) totalEl.textContent = `€${subtotal.toFixed(2)} EUR`;
  }

  window.removeFromCart = function(idx) {
    const cart = getCart();
    cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
    updateBadge();
  };

  // sync entre les onglets
  window.addEventListener("storage", (e) => {
    if (e.key === "myCart") {
      updateBadge();
      renderCart();
    }
  });

  
  updateBadge();


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