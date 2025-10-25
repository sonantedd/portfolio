/**
 * Создает элемент списка контактов
 * @param {{ title: string, link: { text: string, href: string} }} props значения для создания элемента списка контактов
 * @returns {HTMLLIElement}
 */
const createContactItem = (props) => {
    const contactsTemplate = document.querySelector(".contacts__template").content;

    const contactsItem = contactsTemplate.querySelector(".contacts__item").cloneNode(true);
    contactsItem.querySelector(".contacts__subtitle").textContent = props.title;
    const link = contactsItem.querySelector(".contacts__link");
    link.textContent = props.link.text;
    link.href = props.link.href;

    return contactsItem;
};

/**
 * Рендерит элементы списка контактов из массива переданных данных
 * @param {{ title: string, link: { text: string, href: string }}[]} data массив с информацией о контактах
 */
const renderContacts = (data) => {
    const contactsList = document.querySelector(".contacts__list");

    data.forEach((element) => {
        contactsList.appendChild(createContactItem(element));
    });
};

const initContacts = () => {
    renderContacts(getContactsData());
};
