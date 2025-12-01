// DARK MODE
const darkModeButtons = document.querySelectorAll(".darkModeToggle");

function updateIcons(theme) {
  darkModeButtons.forEach(btn => {
    const icon = btn.querySelector("i");
    const text = btn.querySelector("p");

    if (theme === "dark") {
      // Thème sombre actif → bouton montre SUN = aller vers clair
      icon.classList.remove("bx-moon");
      icon.classList.add("bx-sun");

      if (text) text.textContent = "Clair";
    } else {
      // Thème clair actif → bouton montre MOON = aller vers sombre
      icon.classList.remove("bx-sun");
      icon.classList.add("bx-moon");

      if (text) text.textContent = "Sombre";
    }
  });
}


function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateIcons(newTheme);
}

// Clic sur tous les boutons
darkModeButtons.forEach(btn => btn.addEventListener("click", toggleTheme));

// Charger le thème sauvegardé
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark"; // Default darkmode
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateIcons(savedTheme);
});

// ----- MENU MOBILE -----
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenu = document.getElementById("closeMobileMenu");

// Ouvrir
burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

// Fermer via le bouton X
closeMobileMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

// Fermer en cliquant sur un lien
document.querySelectorAll(".mobile-menu-links a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});