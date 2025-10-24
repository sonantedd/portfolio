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

const setCookie = (name, value, expiresIn, expiresPeriod) => {
    const date = new Date();
    const expiresMiliseconds = getExpiresInMiliseconds(expiresIn, expiresPeriod);

    date.setTime(date.getTime() + expiresMiliseconds);
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

const getCookies = () => {
    return document.cookie.split("; ").reduce((acc, item) => {
        const [key, value] = item.split("=");
        acc[key] = value;
        return acc;
    }, {});
};
