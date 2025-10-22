const getDayPeriod = () => {
    const hours = new Date().getHours();
    console.log(hours);

    if (0 <= hours && hours < 6) {
        return "Доброй ночи";
    }
    if (6 <= hours && hours < 12) {
        return "Доброе утро";
    }
    if (12 <= hours && hours < 18) {
        return "Добрый день";
    }
    if (18 <= hours) {
        return "Добрый вечер";
    }
};

const getGreetings = () => {
    return `${getDayPeriod()}, User!`;
};
