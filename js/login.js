function getCart() {
      try { return JSON.parse(localStorage.getItem("myCart")) || []; }
      catch { return []; }
    }
    function saveCart(c) { localStorage.setItem("myCart", JSON.stringify(c)); }

    function updateBadge() {
      const n = getCart().length;
      ["badge-pc","badge-mobile"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = n;
      });
      const cc = document.getElementById("cart-count");
      if (cc) cc.textContent = n;
    }

    function renderCart() {
      const cart = getCart();
      const container = document.getElementById("cart-items");
      const totalEl   = document.getElementById("cart-total");
      const countEl   = document.getElementById("cart-count");
      if (!container) return;
      if (countEl) countEl.textContent = cart.length;
      if (cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p></div>';
        if (totalEl) totalEl.textContent = "€0.00 EUR";
        return;
      }
      let html = "", subtotal = 0;
      cart.forEach((p, i) => {
        subtotal += Number(p.price) || 0;
        const img = Array.isArray(p.img) ? p.img[0] : (p.img || "");
        html += `
          <div class="cart-product-item">
            <div class="cart-img-product"><img src="${img}" alt="${p.name}"></div>
            <div class="cart-info-product">
              <p class="text-cart-1">2026</p>
              <p class="text-cart-2">${p.name}</p>
              <p class="text-cart-4">ADDITIONAL VEHICLE FEATURES:</p>
              <ul class="text-cart-5">
                <li>Assist &amp; Slipper Clutch</li>
                <li>Premium Performance Components</li>
              </ul>
              <div class="cart-info-product-2">
                <button class="cart-info-product-2-button" onclick="removeItem(${i})">Delete</button>
                <span style="font-size:18px;font-weight:700;">$${p.price}</span>
              </div>
            </div>
          </div>`;
      });
      container.innerHTML = html;
      if (totalEl) totalEl.textContent = `€${subtotal.toFixed(2)} EUR`;
    }

    function removeItem(i) {
      const c = getCart(); c.splice(i, 1); saveCart(c); renderCart(); updateBadge();
    }

    function openCart() {
      document.querySelector(".cart").classList.add("show-cart");
      document.getElementById("cart-overlay").classList.add("active");
      document.body.style.overflow = "hidden";
      renderCart();
    }
    function closeCart() {
      document.querySelector(".cart").classList.remove("show-cart");
      document.getElementById("cart-overlay").classList.remove("active");
      document.body.style.overflow = "";
    }

    document.getElementById("cart-trigger-pc").addEventListener("click",     e => { e.preventDefault(); openCart(); });
    document.getElementById("cart-trigger-mobile").addEventListener("click", e => { e.preventDefault(); openCart(); });
    document.getElementById("close-cart-btn").addEventListener("click", closeCart);
    document.getElementById("cart-overlay").addEventListener("click",  closeCart);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
    document.getElementById("checkout-btn").addEventListener("click", () => {
      getCart().length === 0 ? alert("Your cart is empty!") : alert("Redirecting to checkout...");
    });
    window.addEventListener("storage", e => { if (e.key === "myCart") { updateBadge(); renderCart(); } });
    updateBadge();