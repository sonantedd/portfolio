const container = document.querySelector(".tooltip-container");
const content = container.querySelector(".tooltip-content");

container.addEventListener("mouseenter", () => {
    const rect = container.getBoundingClientRect();
    const isBelow = window.innerHeight - rect.bottom >= content.offsetHeight;
    content.classList.toggle("top", !isBelow);
    content.classList.toggle("bottom", isBelow);
});
