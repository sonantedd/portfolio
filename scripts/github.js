const githubTemplate = document.querySelector(".github__template").content;
const githubList = document.querySelector(".github__list");

const fetchRepos = async () => {
    const res = await fetch("https://api.github.com/users/sonantedd/repos");

    return res.json();
};

const fetchLanguages = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch languages: ${res.status}`);
    return res.json();
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

const createGithubTag = (tag) => {
    const item = document.createElement("li");
    item.classList.add("github__repo-tag", "tag", TAGS_CLASSES[tag]);
    item.textContent = tag;

    return item;
};

const createGithubItem = (repo) => {
    const githubItem = githubTemplate.querySelector(".github__item").cloneNode(true);
    githubItem.querySelector(".github__item-link").href = repo.url;
    githubItem.querySelector(".github__repo-name").textContent = repo.name;
    githubItem.querySelector(".github__repo-stars").textContent += repo.stargazers_count;
    githubItem.querySelector(".github__repo-description").textContent = repo.description;
    const tagsList = githubItem.querySelector(".github__repo-tags");

    for (let tag in repo.languages) {
        tagsList.appendChild(createGithubTag(tag));
    }

    return githubItem;
};

const renderRepos = async () => {
    const data = await fetchRepos();
    const clearData = await githubPick(data);
    // clearData = githubData;
    clearData.forEach((repo) => {
        githubList.appendChild(createGithubItem(repo));
    });
};
