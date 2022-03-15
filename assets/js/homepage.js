let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");


let formSubmitHandler = (event) => {
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
}

let getUserRepos = (users) => {
    let apiUrl = "https://api.github.com/users/" + users + "/repos";

    fetch(apiUrl).then(response => {
        response.json().then(data => {
            displayRepos(data, users);
        })
    })
}

let displayRepos = (repos, searchTerm) => {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (let i = 0; i <repos.length; i++) {
        // format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;
        console.log(repoName);

        // container for each repo
        let repoEl = document.createElement('div');
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        /// create span element to hold repository name
        let titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        repoContainerEl.appendChild(repoEl);

        // create a status element
        let statusEl = document.createElement('span');
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class=u'fas fa-times stats-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);
    }
} 
userFormEl.addEventListener("submit", formSubmitHandler);