/**** GLOBAL VARIABLE LIST ****/

//Select the div section with the class of overview
const overview = document.querySelector(".overview");

//Store my GitHub username
const username = "jenidub";

//Select the repos section
const repoSection = document.querySelector(".repos");

//Select the repo-list class representing the ul
const repoList = document.querySelector(".repo-list");

//Select the area where individual repo data appears
const repoInfo = document.querySelector(".repo-data");

//Select the Back to Repo Gallery button
const backToGallery = document.querySelector(".view-repos");

//Select the search bar area
const filterInput = document.querySelector(".filter-repos");


/**** MAIN CODE LIST ****/
//Retrieve user GitHub repos with async function
const githubData = async function () {
    const data = await fetch (`https://api.github.com/users/${username}`);
    const dataObject = await data.json();
    displayData(dataObject);
}

//Display user data on web site
const displayData = function(json) {
    let div = document.createElement("div");
    div.className = 'user-info';
    
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${json.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${json.name}</p>
    <p><strong>Bio:</strong> ${json.bio}</p>
    <p><strong>Location:</strong> ${json.location}</p>
    <p><strong>Number of public repos:</strong> ${json.public_repos}</p>
    </div>`;

    overview.append(div);
}

githubData();

//Display information about the repos
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");

    for (let repo of repos) {
        let li = document.createElement("li");
        li.className = 'repo';
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}

//Fetch user list of repos with async function
const gitHubRepos = async function () {
    const repoData = await fetch (`https://api.github.com/users/${username}/repos?per_page=100`);
    const repoJSON = await repoData.json();
    displayRepos(repoJSON);
}

gitHubRepos();

//repoList event Listener for clicking on the name (H3) of a repo
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        individualRepo(repoName);
    }
})

//Fetch specific repo information using an async function
const individualRepo = async function (r) {
    const oneRepoInfo = await fetch (`https://api.github.com/repos/${username}/${r}`);
    const oneRepoJSON = await oneRepoInfo.json();

    const languages = await fetch (oneRepoJSON.languages_url);
    const languagesData = await languages.json();
    let languageList = [];
    for (let lang in languagesData) {
        languageList.push(lang);
    };

    displayOneRepo(oneRepoJSON, languageList);
}

//Display individual repo information
const displayOneRepo = function (repo, languages) {
    repoInfo.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repo.name}</h3>
    <p>Description: ${repo.description}</p>
    <p>Default Branch: ${repo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;

    repoInfo.append(div);
    repoInfo.classList.remove("hide");
    repoList.classList.add("hide");
    backToGallery.classList.remove("hide");
}

//Back to Repo Gallery button Event Listener
backToGallery.addEventListener("click", function(e) {
    repoSection.classList.remove("hide");
    repoList.classList.remove("hide");
    repoInfo.classList.add("hide");
    backToGallery.classList.add("hide");
    filterInput.classList.remove("hide");
    filterInput.value = '';
})

//How to restore the full list of repos after pressing backtoGallery?

filterInput.addEventListener("input", function(e) {
    let search = e.target.value;
    search = search.toLowerCase();

    let repos = document.querySelectorAll(".repo");
    for (let r of repos) {
        let check = r.innerText.toLowerCase();
        console.log(search, check);
        if (check.includes(search)) {
            r.classList.remove("hide");
        } else {
            r.classList.add("hide");
        }
    }
})