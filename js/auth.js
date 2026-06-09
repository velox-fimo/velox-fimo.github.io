
const defaultUsers = [
  { firstname: "Mohamed", lastname: "Oumokhtar", email: "mohamed@velox.com", phone: "0555000001", password: "Velox123!" },
  { firstname: "Admin",   lastname: "Velox",      email: "admin@velox.com",  phone: "0555000002", password: "Admin123!" }
];

function getUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem("velox_users")) || [];
    return [...defaultUsers, ...stored];
  } catch {
    return [...defaultUsers];
  }
}

function saveNewUser(user) {
  try {
    const stored = JSON.parse(localStorage.getItem("velox_users")) || [];
    stored.push(user);
    localStorage.setItem("velox_users", JSON.stringify(stored));
  } catch { /* silencieux */ }
}


const regex = {
  email:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  phone:    /^(05|06|07)\d{8}$/,
  name:     /^[a-zA-ZÀ-ÿ\s]{2,}$/
};


function showError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const wrapper = input.closest(".password-wrapper") || input.parentElement;

  let err = wrapper.querySelector(".err-msg");
  if (!err) {
    err = document.createElement("div");
    err.className = "err-msg";
    err.style.cssText = "color:#e63946; font-size:11px; margin-top:3px;";
    wrapper.appendChild(err);
  }
  err.textContent = message;
  input.style.borderColor = "#e63946";
  input.style.boxShadow   = "0 0 8px rgba(230,57,70,0.4)";
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const wrapper = input.closest(".password-wrapper") || input.parentElement;
  const err = wrapper.querySelector(".err-msg");
  if (err) err.textContent = "";
  input.style.borderColor = "";
  input.style.boxShadow   = "";
}

/**
 * Affiche un bandeau de message (succès ou erreur) sous le formulaire du panel.
 * @param {string}  msg       - texte à afficher
 * @param {boolean} success   - true = vert, false = rouge
 * @param {string}  panelId   - "panel-signup" ou "panel-signin"
 */
function showMessage(msg, success, panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  let el = panel.querySelector(".auth-message");
  if (!el) {
    el = document.createElement("div");
    el.className = "auth-message";
    const form = panel.querySelector("form");
    if (form) form.insertAdjacentElement("afterend", el);
    else panel.appendChild(el);
  }
  el.textContent = msg;
  el.style.cssText = `
    margin: 10px auto;
    width: 85%;
    padding: 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    background-color: ${success ? "rgba(92,186,71,0.2)"  : "rgba(230,57,70,0.2)"};
    color:            ${success ? "#5cba47"               : "#e63946"};
    border: 1px solid ${success ? "#5cba47"               : "#e63946"};
  `;
}


document.addEventListener("DOMContentLoaded", function () {


const tabBtns = document.querySelectorAll(".tab-btn");
const panels  = document.querySelectorAll(".tab-panel");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    // Désactiver tous les boutons et masquer tous les panels
    tabBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    panels.forEach(p => {
      p.classList.remove("active");
      p.style.display = "none";
    });
    // Activer le bon bouton et afficher le bon panel
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    const targetPanel = document.getElementById("panel-" + target);
    targetPanel.classList.add("active");
    targetPanel.style.display = "flex";
  });
});

// Auto-switch vers Sign In si ?tab=signin dans l'URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("tab") === "signin") {
  const signinBtn = document.querySelector('[data-tab="signin"]');
  if (signinBtn) signinBtn.click();
}

document.querySelectorAll(".toggle-eye").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    if (!input) return;
    input.type      = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "👁" : "🙈";
  });
});


const closeBtn = document.getElementById("login-close-btn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    window.location.href = document.referrer || "../html/welcome-page.html";
  });
}


const menuBtn   = document.querySelector(".menu-btn");
const menuPanel = document.querySelector(".menu");
const menuClose = document.querySelector(".menu-close-btn");

if (menuBtn)   menuBtn.addEventListener("click",   () => menuPanel.classList.add("show"));
if (menuClose) menuClose.addEventListener("click", () => menuPanel.classList.remove("show"));

const discoverItem = document.querySelector(".discover");
const brandItem    = document.querySelector(".brand");
const inner1       = document.querySelector(".inner-1");
const inner2       = document.querySelector(".inner-2");

if (discoverItem) discoverItem.addEventListener("click", () => inner1.classList.toggle("inner-1-show"));
if (brandItem)    brandItem.addEventListener("click",    () => inner2.classList.toggle("inner-2-show"));


const discoverDropdown = document.getElementById("discover-dropdown");
const brandDropdown    = document.getElementById("brand-dropdown");

if (discoverDropdown) {
  discoverDropdown.addEventListener("click", e => {
    e.stopPropagation();
    discoverDropdown.classList.toggle("open");
    if (brandDropdown) brandDropdown.classList.remove("open");
  });
}
if (brandDropdown) {
  brandDropdown.addEventListener("click", e => {
    e.stopPropagation();
    brandDropdown.classList.toggle("open");
    if (discoverDropdown) discoverDropdown.classList.remove("open");
  });
}
document.addEventListener("click", () => {
  if (discoverDropdown) discoverDropdown.classList.remove("open");
  if (brandDropdown)    brandDropdown.classList.remove("open");
});


const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const firstname = document.getElementById("signup-firstname").value.trim();
    const lastname  = document.getElementById("signup-lastname").value.trim();
    const email     = document.getElementById("signup-email").value.trim();
    const phone     = document.getElementById("signup-phone").value.trim();
    const password  = document.getElementById("signup-pwd").value;

    ["signup-firstname","signup-lastname","signup-email","signup-phone","signup-pwd"].forEach(clearError);

    // Validation champ par champ
    if (!regex.name.test(firstname)) {
      showError("signup-firstname", "Prénom invalide (min 2 lettres)");
      valid = false;
    }
    if (!regex.name.test(lastname)) {
      showError("signup-lastname", "Nom invalide (min 2 lettres)");
      valid = false;
    }
    if (!regex.email.test(email)) {
      showError("signup-email", "Email invalide");
      valid = false;
    }
    if (phone && !regex.phone.test(phone)) {
      showError("signup-phone", "Téléphone invalide (ex: 0555123456)");
      valid = false;
    }
    if (!regex.password.test(password)) {
      showError("signup-pwd", "Min 8 car. avec majuscule, chiffre et symbole");
      valid = false;
    }

    if (!valid) return;

    // Vérifier si l'email est déjà pris
    const exists = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      showMessage("Cet email est déjà utilisé !", false, "panel-signup");
      return;
    }

    // Enregistrer le nouvel utilisateur
    const newUser = { firstname, lastname, email, phone, password };
    saveNewUser(newUser);
    localStorage.setItem("velox_user", JSON.stringify({ firstname, lastname, email }));

    showMessage("Compte créé avec succès ! Redirection...", true, "panel-signup");
    setTimeout(() => { window.location.href = "../html/welcome-page.html"; }, 1500);
  });
}


const signinForm = document.getElementById("signin-form");
if (signinForm) {
  signinForm.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const email    = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-pwd").value;

    ["signin-email","signin-pwd"].forEach(clearError);

    if (!regex.email.test(email)) {
      showError("signin-email", "Email invalide");
      valid = false;
    }
    if (!password) {
      showError("signin-pwd", "Veuillez saisir votre mot de passe");
      valid = false;
    }

    if (!valid) return;

    // Vérifier les identifiants (comptes par défaut + inscrits)
    const user = getUsers().find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      showMessage("Email ou mot de passe incorrect !", false, "panel-signin");
      return;
    }

    localStorage.setItem("velox_user", JSON.stringify({ firstname: user.firstname, lastname: user.lastname, email: user.email }));
    showMessage(`Bienvenue ${user.firstname} ! Redirection...`, true, "panel-signin");
    setTimeout(() => { window.location.href = "../html/welcome-page.html"; }, 1500);
  });
}

}); 