// select the div container by using the id's

let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");


let formSubmitHandler = (event) => { 
    event.preventDefault(); // prevents submission of the form
    let username = nameInputEl.value.trim(); // stores and trims the value of the nameInputEl which is selected by the username id within the form element  

    if (username) { // if there is a username value
        getUserRepos(username); // getUserRepos function is invoked with the username as the argument
        nameInputEl.value = ""; // the input value is reset to an empty ""
    } else { // if there is no username, return this alert
        alert("Please enter a GitHub username");
    }
    console.log(event); 
}

let getUserRepos = (users) => { 
    let apiUrl = "https://api.github.com/users/" + users + "/repos"; // dynamically sets repo address into apiUrl variable

    fetch(apiUrl) // uses the fetch promise with apiUrl as the parameter
    .then(response => { // returns promise as a 'response' object
        if (response.ok) { // if response is available (.ok) then the reponse object is returned in json format
            response.json().then(data => { // then the promise will invoke a callback function called displayRepos handling two parameters (data from the response) and users
                displayRepos(data, users);
            });  
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(error => { // if there is an error, the alert will invoke
        alert("Unable to connect to GitHub");
    });
}

let displayRepos = (repos, searchTerm) => { // displayRepos function contains two parameters
    if (repos.length === 0) { // if there are no repos
        repoContainerEl.textContent = "No repositories found"; // return this text into repoContainerEl
        return; // exit out of the function
    }

    repoContainerEl.textContent = "";  // set repoContainerEl as an empty ""
    repoSearchTerm.textContent = searchTerm; // set repoSearchTerm's textContent as the searchTerm variable

    for (let i = 0; i <repos.length; i++) {
        // format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        // container for each repo
        let repoEl = document.createElement('a'); // create an a attribute which creates a hyperlink
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href" , "./single-repo.html?repo=" + repoName); // set the attribute with an href (link destination) to single-repo.html
        // this href is relative to the original html page (index.html at the root)

        // create span element to hold repository name
        let titleEl = document.createElement('span');
        titleEl.textContent = repoName; // textContent of titleEl is same as the repoName

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