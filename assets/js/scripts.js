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


// Copier email
const card = document.getElementById("contactCard");
const btn = document.getElementById("contactCopyButton");
const email = document.getElementById("contactEmail").textContent.trim();
const hint = document.getElementById("contactHint");
const iconCopy = document.getElementById("contactIconCopy");
const iconCheck = document.getElementById("contactIconCheck");

let timer;

function copyEmail() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
            .then(showFeedback)
            .catch(fallbackCopy);
    } else {
        fallbackCopy();
    }
}

function fallbackCopy() {
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    try {
        document.execCommand("copy");
        showFeedback();
    } catch (err) {
        alert("Impossible de copier, sélectionnez manuellement l'email");
    }
    document.body.removeChild(ta);
}

function showFeedback() {
    hint.textContent = "Copié !";
    iconCopy.style.display = "none";
    iconCheck.style.display = "block";
    iconCheck.classList.add("contact-card-pulse");

    clearTimeout(timer);
    timer = setTimeout(function () {
        hint.textContent = "Clique pour copier";
        iconCheck.style.display = "none";
        iconCopy.style.display = "block";
        iconCheck.classList.remove("contact-card-pulse");
    }, 1800);
}

// Sur le bouton ET sur la carte
btn.addEventListener("click", function (e) {
    e.stopPropagation(); // éviter double événement
    copyEmail();
});

card.addEventListener("click", copyEmail);

// CV

const toggle = document.getElementById("cvToggle");
const options = document.querySelector(".cv-options");

toggle.addEventListener("click", () => {
    options.style.display =
        options.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".cv-download")) {
        options.style.display = "none";
    }
});

// cards competences
const cards = document.querySelectorAll('.competence-card');

function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

function openCard(target) {
  cards.forEach(card => {
    if (card !== target) {
      card.classList.remove('active');
    }
  });
  target.classList.add('active');
}

function toggleCard(card) {
  card.classList.toggle('active');
}

cards.forEach(card => {
  const header = card.querySelector('.competence-header');

  // 🖥️ DESKTOP → hover ouvre (jamais toggle)
  header.addEventListener('mouseenter', () => {
    if (!isMobile()) {
      openCard(card);
    }
  });

  // 📱 MOBILE → click toggle (ouvre / ferme)
  header.addEventListener('click', () => {
    if (isMobile()) {
      toggleCard(card);
    } else {
      openCard(card);
    }
  });
});
