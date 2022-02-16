/**** GLOBAL VARIABLE LIST ****/

//Select the div section with the class of overview
const overview = document.querySelector(".overview");

//Store my GitHub username
const username = "jenidub";

/**** MAIN CODE LIST ****/
//Retrieve user GitHub repos with async function
const githubData = async function () {
    const data = await fetch (`https://api.github.com/users/${username}`);
    const dataObject = await data.json();
    console.log(dataObject);
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