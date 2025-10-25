/**
 * Обработчик наведения на тултип с обновлением класса направления появления тултипа
 * @param {HTMLElement} element контейнер тултипа
 */
const getTooltipFlowDirection = (element) => {
    const content = element.querySelector(".tooltip-content");
    const rect = element.getBoundingClientRect();
    const isBelow = window.innerHeight - rect.bottom > content.offsetHeight;

    content.classList.toggle("top", !isBelow);
    content.classList.toggle("bottom", isBelow);
};

const initTooltip = () => {
    const container = document.querySelector(".tooltip-container");

    container.addEventListener("mouseenter", () => getTooltipFlowDirection(container));
};
