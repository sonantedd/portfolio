const switchInput = document.querySelector("#theme");
const DARK_THEME_SELECTOR = "frappe";
const LIGHT_THEME_SELECTOR = "latte";

function updateState(checked) {
    document.body.classList.toggle(DARK_THEME_SELECTOR, !checked);
    document.body.classList.toggle(LIGHT_THEME_SELECTOR, checked);
}

updateState(switchInput.checked);

switchInput.addEventListener("change", (e) => updateState(e.target.checked));
