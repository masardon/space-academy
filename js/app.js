// ============================================
// SPACE ACADEMY — Main App
// ============================================

function showToast(message, type = "") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast" + (type ? ` ${type}` : "");
  toast.hidden = false;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

// Generate stars background
function initStars() {
  const container = document.getElementById("stars");
  const count = 80;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", (2 + Math.random() * 4) + "s");
    star.style.setProperty("--max-opacity", (0.3 + Math.random() * 0.7));
    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.width = star.style.height = (1 + Math.random() * 2) + "px";
    container.appendChild(star);
  }
}

// Back button
document.getElementById("btnBack").addEventListener("click", () => {
  if (history.length > 1) {
    history.back();
  } else {
    Router.navigate("missions");
  }
});

// Bottom nav
document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    Router.navigate(view);
  });
});

// Profile button in header
document.getElementById("btnProfile").addEventListener("click", () => {
  Router.navigate("profile");
});

// Settings button in header
document.getElementById("btnSettings").addEventListener("click", () => {
  Router.navigate("settings");
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initStars();
  Router.init();
});
