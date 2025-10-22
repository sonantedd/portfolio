const skillsTemplate = document.querySelector(".skills__template").content;
const skillsList = document.querySelector(".skills__list");

const createSkillsSublist = (skill) => {
    const skillsSubitem = document.createElement("li");
    skillsSubitem.textContent =
        typeof skill !== "string" ? Object.values(skill).join(" — ") : skill;
    skillsSubitem.classList.add("skills__item");

    return skillsSubitem;
};

const createSkillsItem = (props) => {
    const skillsItem = skillsTemplate.querySelector(".skills__category").cloneNode(true);
    skillsItem.querySelector(".skills__subtitle").textContent = props.category;
    const skillsSublist = skillsItem.querySelector(".skills__sublist");

    props.items.forEach((skill) => {
        skillsSublist.appendChild(createSkillsSublist(skill));
    });

    return skillsItem;
};

const renderSkills = () => {
    skillsData.forEach((element) => {
        skillsList.appendChild(createSkillsItem(element));
    });
};
