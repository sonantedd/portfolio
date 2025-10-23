const getDayPeriod = () => {
    const hours = new Date().getHours();

    if (0 <= hours && hours < 6) {
        return "Good night";
    }
    if (6 <= hours && hours < 12) {
        return "Good morning";
    }
    if (12 <= hours && hours < 18) {
        return "Good afternoon";
    }
    if (18 <= hours) {
        return "Good evening";
    }
    return "Hello";
};

const getGreetings = () => {
    return `${getDayPeriod()}, World!`;
};

document.querySelector(".hero__title-content").textContent = getGreetings();
