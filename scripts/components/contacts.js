const contactsTemplate = document.querySelector(".contacts__template").content;
const contactsList = document.querySelector(".contacts__list");

const createContactItem = (props) => {
    const contactsItem = contactsTemplate.querySelector(".contacts__item").cloneNode(true);
    contactsItem.querySelector(".contacts__subtitle").textContent = props.title;
    const link = contactsItem.querySelector(".contacts__link");
    link.textContent = props.link.text;
    link.href = props.link.href;

    return contactsItem;
};

const renderContacts = () => {
    contactsData.forEach((element) => {
        contactsList.appendChild(createContactItem(element));
    });
};
