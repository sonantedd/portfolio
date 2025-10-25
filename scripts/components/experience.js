/**
 * Создает элемент списка опыта работы
 * @param {{ company: string, position: string, period: { start: number, end?: number }}} props значения для создания элемента списка опыта работы
 * @returns {HTMLLIElement}
 */
const createExperienceItem = (props) => {
    const experienceTemplate = document.querySelector(".experience__template").content;
    const experienceItem = experienceTemplate.querySelector(".experience__item").cloneNode(true);

    experienceItem.querySelector(".experience__company").textContent = props.company;
    experienceItem.querySelector(".experience__position").textContent = props.position;

    const period = experienceItem.querySelector(".experience__period");
    period.firstChild.textContent = props.period.start;
    period.lastChild.textContent = props.period.end ? props.period.end : "Настоящее время";

    return experienceItem;
};

/**
 * Рендерит элементы списка опыта работы из массива переданных данных
 * @param {{ company: string, position: string, period: { start: number, end?: number }}[]} data массив с информацией об опыте работы
 */
const renderExperience = (data) => {
    const experienceList = document.querySelector(".experience__list");

    data.forEach((element) => {
        experienceList.appendChild(createExperienceItem(element));
    });
};

const initExperience = () => {
    renderExperience(getExperienceData());
};
