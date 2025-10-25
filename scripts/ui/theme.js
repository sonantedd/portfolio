/**
 * Обновляет класс темы body элемента в зависимости от состояния тоггла
 * @param {boolean} checked состояние тоггла
 */
const updateTheme = (checked) => {
    document.body.classList.toggle("frappe", !checked);
    document.body.classList.toggle("latte", checked);
};

const initTheme = () => {
    const switchInput = document.querySelector("#theme");

    updateTheme(switchInput.checked);
    switchInput.addEventListener("change", (e) => updateTheme(e.target.checked));
};
