/**
 * Создает элемент подсписка навыков
 * @param {string[] | { name: string, level: string }[]} skill значения для создания элемента списка опыта работы
 * @returns {HTMLLIElement}
 */
const createSkillsSublist = (skill) => {
    const skillsSubitem = document.createElement("li");
    skillsSubitem.textContent =
        typeof skill !== "string" ? Object.values(skill).join(" — ") : skill;
    skillsSubitem.classList.add("skills__item");

    return skillsSubitem;
};

/**
 * Создает элемент списка навыков
 * @param {{ category: string, items: string[] | { name: string, level: string }[]}} props значения для создания элемента списка опыта работы
 * @returns {HTMLLIElement}
 */
const createSkillsItem = (props) => {
    const skillsTemplate = document.querySelector(".skills__template").content;
    const skillsItem = skillsTemplate.querySelector(".skills__category").cloneNode(true);

    skillsItem.querySelector(".skills__subtitle").textContent = props.category;
    const skillsSublist = skillsItem.querySelector(".skills__sublist");

    props.items.forEach((skill) => {
        skillsSublist.appendChild(createSkillsSublist(skill));
    });

    return skillsItem;
};

/**
 * Рендерит элементы списка навыков из массива переданных данных
 * @param {{ category: string, items: string[] | { name: string, level: string }[]}[]} data массив с информацией о новыках
 */
const renderSkills = (data) => {
    const skillsList = document.querySelector(".skills__list");

    data.forEach((element) => {
        skillsList.appendChild(createSkillsItem(element));
    });
};

const initSkills = () => {
    renderSkills(getSkillsData());
};
