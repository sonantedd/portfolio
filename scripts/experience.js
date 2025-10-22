const experienceTemplate = document.querySelector(".experience__template").content;
const experienceList = document.querySelector(".experience__list");

const createExperienceItem = (props) => {
    const experienceItem = experienceTemplate.querySelector(".experience__item").cloneNode(true);
    experienceItem.querySelector(".experience__company").textContent = props.company;
    experienceItem.querySelector(".experience__position").textContent = props.position;

    const period = experienceItem.querySelector(".experience__period");
    period.firstChild.textContent = props.period.start;
    period.lastChild.textContent = props.period.end ? props.period.end : "Настоящее время";

    return experienceItem;
};

const renderExperience = () => {
    experienceData.forEach((element) => {
        experienceList.appendChild(createExperienceItem(element));
    });
};
