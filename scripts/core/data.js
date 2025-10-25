/**
 * Создает массив с информацией об опыте работы
 * @returns {{ company: string, position: string, period: { start: number, end?: number }}[]}
 */
const getExperienceData = () => [
    {
        company: 'ООО "Рога и Копыта"',
        position: "Junior Frontend-разработчик",
        period: {
            start: 2020,
            end: 2022,
        },
    },
    {
        company: "Яндекс",
        position: "Middle Frontend-разработчик",
        period: {
            start: 2022,
            end: 2025,
        },
    },
    {
        company: "Сумасшедший дом",
        position: "Пациент",
        period: {
            start: 2025,
        },
    },
];

/**
 * Создает массив с информацией о контактах
 * @returns {{ category: string, items: string[] | { name: string, level: string }[]}[]}
 */
const getSkillsData = () => [
    {
        category: "Фронтенд",
        items: ["HTML", "CSS", "JavaScript"],
    },
    {
        category: "Инструменты",
        items: ["Git"],
    },
    {
        category: "Языки",
        items: [
            {
                name: "Русский",
                level: "Носитель",
            },
            {
                name: "English",
                level: "Intermediate",
            },
        ],
    },
];

/**
 * Создает массив с информацией о контактах
 * @returns {{ title: string, link: { text: string, href: string }}[]}
 */
const getContactsData = () => [
    {
        title: "Телефон",
        link: {
            text: "8 (999) 999-99-99",
            href: "tel:+79999999999",
        },
    },
    {
        title: "Эл. почта",
        link: {
            text: "sonantedd@gmail.com",
            href: "mailto:sonantedd@gmail.com",
        },
    },
    {
        title: "GitHub",
        link: {
            text: "/sonantedd",
            href: "https://github.com/sonantedd",
        },
    },
    {
        title: "Telegram",
        link: {
            text: "@sonanted",
            href: "https://t.me/sonanted",
        },
    },
];
