const navItems = document.querySelectorAll(".nav-item");
const screens = {
  inicio: document.getElementById("screen-inicio"),
  pedidos: document.getElementById("screen-pedidos"),
  rastrear: document.getElementById("screen-rastrear"),
  perfil: document.getElementById("screen-perfil"),
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.hidden = key !== name;
  });

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.screen === name);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showScreen(item.dataset.screen));
});

// Also allow product "+" buttons to give a tiny click feedback (cosmetic only)
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.85)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 120);
  });
});