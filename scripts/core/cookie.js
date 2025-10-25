/**
 * Переводит срок жизни кук в значение в милисекундах
 * @param {number} expiresIn срок жизни куки
 * @param {'day' | 'hour' | 'minute' | 'second'} expiresPeriod период жизни куки
 * @returns {number}
 */
const getExpiresInMiliseconds = (expiresIn, expiresPeriod) => {
    switch (expiresPeriod) {
        case "day":
            expiresIn *= 24;
        case "hour":
            expiresIn *= 60;
        case "minute":
            expiresIn *= 60;
        case "second":
            expiresIn *= 1000;
    }
    return expiresIn;
};

/**
 * Сохраняет куку со сроком жизни
 * @param {string} name ключ куки
 * @param {string} value значение куки
 * @param {number} expiresIn срок жизни куки
 * @param {'day' | 'hour' | 'minute' | 'second'} expiresPeriod период жизни куки
 */
const setCookie = (name, value, expiresIn, expiresPeriod) => {
    const date = new Date();
    const expiresMiliseconds = getExpiresInMiliseconds(expiresIn, expiresPeriod);

    date.setTime(date.getTime() + expiresMiliseconds);
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

/**
 * Возвращает объект <ключ_куки>: <значение_куки>
 * @returns {Object.<string, string>}
 */
const getCookies = () => {
    return document.cookie.split("; ").reduce((acc, item) => {
        const [key, value] = item.split("=");
        acc[key] = value;
        return acc;
    }, {});
};
