/**
 * Запрашивает элементы репозиториев с api GitHub
 * @param {HTMLUListElement} reposList список репозиториев
 * @returns {Promise<Object>}
 */
const fetchRepos = async (reposList) => {
    try {
        const res = await fetch("https://api.github.com/users/sonantedd/repos?sort=updated");

        return res.json();
    } catch (error) {
        reposList.appendChild(createGithubItem({ name: "Ошибка получения проектов" }));
    }
};

/**
 * Запрашивает список языков репозитория с api GitHub
 * @param {string} url адрес api GitHub с информацией о языках репозитория
 * @returns {Object<string, number>}
 */
const fetchLanguages = async (url) => {
    try {
        const res = await fetch(url);

        return res.json();
    } catch (error) {
        return [];
    }
};

/**
 * Преобразует поля объекта репозитория в необходимые поля
 * @param {Object} data объект репозитория
 * @returns {{name: string, description: string, languages: Object<string, number>[], url: string, stargazers_count: number}}
 */
const githubPick = async (data) => {
    const repos = await Promise.all(
        data.map(async (repo) => {
            const languages = await fetchLanguages(repo.languages_url);
            return {
                name: repo.name,
                description: repo.description,
                languages,
                url: repo.html_url,
                stargazers_count: repo.stargazers_count,
            };
        })
    );
    return repos;
};

/**
 * Возвращает объект со значениями тегов
 * @returns {Object<string, string>}
 */
const getTags = () => {
    return {
        HTML: "html",
        CSS: "css",
        JavaScript: "js",
    };
};

/**
 * Создает элемент списка тегов
 * @param {string} tag значение тега
 * @returns {HTMLLIElement}
 */
const createGithubTag = (tag) => {
    const item = document.createElement("li");
    item.classList.add("projects__repo-tag", "tag", getTags()[tag]);
    item.textContent = tag;

    return item;
};

/**
 * Создает элемент списка репозиториев
 * @param {{name: string, description: string, languages: Object<string, number>[], url: string, stargazers_count: number}} repo
 * @returns {HTMLLIElement}
 */
const createGithubItem = (repo) => {
    const githubTemplate = document.querySelector(".projects__template").content;
    const githubItem = githubTemplate.querySelector(".projects__item").cloneNode(true);

    githubItem.querySelector(".projects__item-link").href = repo.url;
    githubItem.querySelector(".projects__repo-name").textContent = repo.name;

    if (repo.stargazers_count || repo.stargazers_count === 0) {
        githubItem.querySelector(".projects__repo-stars").textContent = `★${repo.stargazers_count}`;
    }

    githubItem.querySelector(".projects__repo-description").textContent = repo.description;
    const tagsList = githubItem.querySelector(".projects__repo-tags");

    for (let tag in repo.languages) {
        tagsList.appendChild(createGithubTag(tag));
    }

    return githubItem;
};

/**
 * Получает список репозиториев из кеша или из api GitHub
 * @param {HTMLUListElement} reposList список репозиториев
 * @returns {{name: string, description: string, languages: Object<string, number>[], url: string, stargazers_count: number}}
 */
const getRepos = async (reposList) => {
    const cachedRepos = getCache("repos");
    // можно закомментить это условие, чтобы не тянуть список репозиториев из кеша
    if (cachedRepos) {
        return cachedRepos;
    }
    reposList.appendChild(createGithubItem({ name: "Загрузка" }));

    const rawRepos = await fetchRepos(reposList);
    const mappedRepos = await githubPick(rawRepos);
    setCache("repos", mappedRepos, 5, "minute");

    return mappedRepos;
};

/**
 * Возвращает обертку для функции, вызов которой отложен на заданную задержку
 * @param {(...args: any[]) => void} callback функция, вызов которой нужно задержать
 * @param {number} delay задержка в миллисекундах
 * @returns {(...args: any[]) => void}
 */
const debounce = (callback, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };
};

/**
 *
 * @param {{name: string, description: string, languages: Object<string, number>[], url: string, stargazers_count: number}} repos преобразованные данные репозиториев
 * @param {string} query поисковая строка
 * @returns
 */
const filterRepos = (repos, query) => {
    const q = query.trim().toLowerCase();
    return repos.filter(
        (r) =>
            r.name.toLowerCase().includes(q) ||
            (r.description && r.description.toLowerCase().includes(q))
    );
};

/**
 *
 * @param {HTMLUListElement} reposList список репозиториев
 * @param {{name: string, description: string, languages: Object<string, number>[], url: string, stargazers_count: number}} repos преобразованные данные репозиториев
 * @param {string} query поисковая строка
 */
const renderRepos = (reposList, repos, query) => {
    reposList.innerHTML = "";
    const filteredRepos = filterRepos(repos, query);
    if (!filteredRepos.length) {
        reposList.appendChild(createGithubItem({ name: "Репозитории не найдены" }));
    }
    filteredRepos.forEach((repo) => {
        reposList.appendChild(createGithubItem(repo));
    });
};

const initRepos = async () => {
    const githubList = document.querySelector(".projects__list");
    const searchInput = document.querySelector(".projects__search-input");

    const allRepos = await getRepos(githubList);
    renderRepos(githubList, allRepos, searchInput.value);

    const debouncedFilter = debounce((e) => {
        renderRepos(githubList, allRepos, e.target.value);
    }, 300);

    searchInput.addEventListener("input", (e) => debouncedFilter(e));
};
