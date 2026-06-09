const openCartTrigger = document.querySelector("#open-cart-trigger");
if (openCartTrigger) {
  openCartTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    const cart = document.querySelector(".cart"); 
    if (cart) cart.classList.add("show-cart");
    renderCart();
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


document.getElementById("checkout-btn").addEventListener("click", () => {
  const cart = getCart();
  if (cart.length === 0) alert("Your cart is empty!");
  else alert("Redirecting to checkout...");
});

function getCart() { try { return JSON.parse(localStorage.getItem("myCart")) || []; } catch { return []; } }
function saveCart(cart) { localStorage.setItem("myCart", JSON.stringify(cart)); }

function updateBadge() {
  const total = getCart().length;
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
        <div class="cart-img-product"><img src="${img}"></div>
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
            <div style="font-size:20px;">$${product.price}</div>
          </div>
        </div>
      </div>`;
  });
  container.innerHTML = html;
  if (totalEl) totalEl.textContent = `€${subtotal.toFixed(2)} EUR`;
  const cartCountText = document.querySelector(".cart-header-text");
  if (cartCountText) cartCountText.innerHTML = `Your cart (<span id="cart-count">${cart.length}</span>)`;
}

window.removeFromCart = function(idx) {
  const cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
  updateBadge();
};


window.addEventListener("storage", (e) => {
  if (e.key === "myCart") { updateBadge(); renderCart(); }
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
  if (!e.target.closest("#discover-dropdown")) document.getElementById("discover-dropdown").classList.remove("open");
  if (!e.target.closest("#brand-dropdown")) document.getElementById("brand-dropdown").classList.remove("open");
});

document.querySelectorAll(".product img").forEach((img, idx) => {
  img.addEventListener("click", () => {
    const categories = ["moto", "mule", "teryx", "jet-ski"];
    const cat = categories[idx % 4];
    window.location.href = `shop-page.html?cat=${cat}`;
  });
});


function smoothScrollTo(target, duration = 900) {
  const startY    = window.scrollY;
  const targetY   = target.getBoundingClientRect().top + window.scrollY - 80; // -80 pour le header fixe
  const distance  = targetY - startY;
  let   startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      target.classList.add('visible');
    }
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1); 
    const target = document.getElementById(id);

    if (!target) return;   

    e.preventDefault();
    smoothScrollTo(target, 950);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  },
  { threshold: 0.15 }
);


document.querySelectorAll('.scroll-target').forEach(el => observer.observe(el));

 document.querySelector(".discover").addEventListener("click",(x)=>{document.querySelector(".inner-1").classList.toggle("inner-1-show")});
  document.querySelector(".brand").addEventListener("click",(x)=>{document.querySelector(".inner-2").classList.toggle("inner-2-show")});
document.querySelector(".menu-btn").addEventListener("click",(x)=>{
  document.querySelector(".menu").classList.add("show");
})
document.querySelector(".menu-close-btn").addEventListener("click",(x)=>{
   document.querySelector(".menu").classList.remove("show");
})