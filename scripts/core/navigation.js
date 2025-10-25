/**
 * Скроллит до элемента, в котором произошел ивент, с учетом высоты шапки
 * @param {Event} event ивент клика по ссылке
 */
const sectionScrollHandler = (event) => {
    event.preventDefault();

    const header = document.querySelector(".header");
    const target = document.querySelector(event.target.hash);

    scrollTo({
        top: target.offsetTop - header.offsetHeight,
        behavior: "smooth",
    });
};

const initNavigation = () => {
    const links = document.querySelectorAll(".header__nav-link");

    links.forEach((link) => {
        link.addEventListener("click", sectionScrollHandler);
    });
};
