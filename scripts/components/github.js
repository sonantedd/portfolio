const githubTemplate = document.querySelector(".projects__template").content;
const githubList = document.querySelector(".projects__list");
const searchInput = document.querySelector(".projects__search-input");

const fetchRepos = async () => {
    try {
        const res = await fetch("https://api.github.com/users/sonantedd/repos");

        return res.json();
    } catch (error) {
        githubList.appendChild(createGithubItem({ name: "Ошибка получения проектов" }));
    }
};

const fetchLanguages = async (url) => {
    try {
        const res = await fetch(url);

        return res.json();
    } catch (error) {
        return [];
    }
};

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

const getTags = () => {
    return {
        HTML: "html",
        CSS: "css",
        JavaScript: "js",
    };
};

const createGithubTag = (tag) => {
    const item = document.createElement("li");
    item.classList.add("projects__repo-tag", "tag", getTags()[tag]);
    item.textContent = tag;

    return item;
};

const createGithubItem = (repo) => {
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

const getRepos = async () => {
    const cookies = getCookies();
    const cachedRepos = cookies.repos;
    if (cachedRepos) {
        return JSON.parse(cachedRepos);
    }
    githubList.appendChild(createGithubItem({ name: "Загрузка" }));

    const rawRepos = await fetchRepos();
    const mappedRepos = await githubPick(rawRepos);
    setCookie("repos", JSON.stringify(mappedRepos), 5, "minute");

    return mappedRepos;
};

const debounce = (fn, delay = 200) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

const filterRepos = (repos, query) => {
    const q = query.trim().toLowerCase();
    return repos.filter(
        (r) =>
            r.name.toLowerCase().includes(q) ||
            (r.description && r.description.toLowerCase().includes(q))
    );
};

const renderRepos = (repos, query) => {
    githubList.innerHTML = "";
    const filteredRepos = filterRepos(repos, query);
    console.log(filteredRepos);
    if (!filteredRepos.length) {
        githubList.appendChild(createGithubItem({ name: "Репозитории не найдены" }));
    }
    filteredRepos.forEach((repo) => {
        githubList.appendChild(createGithubItem(repo));
    });
};

const initRepos = async () => {
    const allRepos = await getRepos();
    renderRepos(allRepos, searchInput.value);

    const debouncedFilter = debounce((e) => {
        renderRepos(allRepos, e.target.value);
    }, 300);

    searchInput.addEventListener("input", (e) => debouncedFilter(e));
};
