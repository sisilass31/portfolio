const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animate() {
    outlineX += (mouseX - outlineX) * 0.10;
    outlineY += (mouseY - outlineY) * 0.10;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
}
animate();

// Tous les éléments interactifs
const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, label');

interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// Bonus : détecte les éléments avec cursor:pointer automatiquement
document.querySelectorAll('*').forEach(el => {
    const style = getComputedStyle(el);
    if (style.cursor === 'pointer') {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    }
});
