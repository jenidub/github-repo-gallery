/**** GLOBAL VARIABLE LIST ****/

//Select the div section with the class of overview
const overview = document.querySelector(".overview");

//Store my GitHub username
const username = "jenidub";

//Select the repo-list class representing the ul
const repoList = document.querySelector(".repo-list");


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