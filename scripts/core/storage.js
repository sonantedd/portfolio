/**
 * Переводит срок жизни в миллисекунды
 * @param {number} expiresIn срок жизни
 * @param {'day' | 'hour' | 'minute' | 'second'} expiresPeriod период
 * @returns {number}
 */
const getExpiresInMilliseconds = (expiresIn, expiresPeriod) => {
    switch (expiresPeriod) {
        case "day":
            return expiresIn * 24 * 60 * 60 * 1000;
        case "hour":
            return expiresIn * 60 * 60 * 1000;
        case "minute":
            return expiresIn * 60 * 1000;
        case "second":
            return expiresIn * 1000;
        default:
            return expiresIn;
    }
};

/**
 * Сохраняет значение в localStorage со сроком жизни
 * @param {string} key ключ
 * @param {any} value значение
 * @param {number} expiresIn срок жизни
 * @param {'day' | 'hour' | 'minute' | 'second'} expiresPeriod период
 */
const setCache = (key, value, expiresIn, expiresPeriod) => {
    const expiresAt = Date.now() + getExpiresInMilliseconds(expiresIn, expiresPeriod);
    localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
};

/**
 * Получает значение из localStorage, если не истёк срок
 * @param {string} key ключ
 * @returns {any|null}
 */
const getCache = (key) => {
    const item = localStorage.getItem(key);
    if (!item) {
        return null;
    }

    const { value, expiresAt } = JSON.parse(item);
    if (Date.now() > expiresAt) {
        localStorage.removeItem(key);
        return null;
    }
    return value;
};
