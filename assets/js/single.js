let issueContainerEl = document.querySelector('#issues-container'); // select the div container based on #issues-container id
let limitWarningEl = document.querySelector('#limit-warning'); // select div container based on #limit-warning id
let repoNameEl = document.querySelector('#repo-name');

let getRepoName = () => {
    let queryString = document.location.search; // locate the query string (associated with forms)
    let repoName = queryString.split("=")[1]; // grab the query string and split the string at '=', grab the string at index [1] since [0] will be ?repo    

    if (repoName) { // if there's a repo name => execute these expressions
        repoNameEl.textContent = repoName; // set textContent for the span element by grabbing it with a querySelector and placing the repoName into it
        getRepoIssues(repoName); // call getRepoIssues function with repoName as the parameter
    } else { // if not => go to this page
        document.location.replace('./index.html');
    }

}

let getRepoIssues = (repo) => { // getRepoIssues function will pass a parameter, repo (name of the repository)
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; // dynamically create repo address and store in apiUrl variable
    fetch(apiUrl) // fetch the apiUrl through its repo address and then chain a .then to fulfill the fetch promise
        .then(response => { 
            if (response.ok) { // if there is a response from the fetch (.ok) return the response promise in json format
                response.json().then(data => { // fulfill promise by running the displayIssues function with the .then and (data) parameter.
                    displayIssues(data);

                    if (response.headers.get("Link")) { // if Link header exists within the response object
                        displayWarning(repo); // displayWarning function invokes
                    }
                });
            } else { // if response is unsuccessful return this alert
                document.location.replace('./index.html');
            }
        });
}

let displayIssues = (issues) => {
    if (issues.length === 0) { // if issues.length equals 0, fill the textContent with it saying 'This repo has no open issues!' then return to stop the function from executing again
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (let i = 0; i < issues.length; i++) {
        let issueEl = document.createElement('a'); // hyperlink
        issueEl.classList = 'list-item flex-row justify-space-between align-center'; // assigning classes
        issueEl.setAttribute('href', issues[i].html_url); // grabbing property (html_url) of issues object at [i] index
        issueEl.setAttribute('target', '_blank'); // creates a new tab instead of replacing current webpage

        let titleEl = document.createElement('span'); //create span element
        titleEl.textContent = issues[i].title; // set span element as the property (title) of issues object at [i] as the text content.

        issueEl.appendChild(titleEl); // append new span element into issueEl (a attribute);

        let typeEl = document.createElement('span'); // create another span element

        if (issues[i].pull_request) { // if the object issues at [i] index has a property named pull_request, the textContent for the new span element will = 'Pull Request' otherwise it'll be 'Issues'
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl); // append the typeEl span element to issueEl = the a attribute

        issueContainerEl.appendChild(issueEl); // append issueEl span element into issueContainerEl, which selects the div container by the id #issues-container and appends it into it
    }
}

let displayWarning = (repo) => {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    let linkEl = document.createElement('a'); // create an a tag that defines a hyperlink
    linkEl.textContent = "See More Issues on GitHub.com"; // set text for the element
    linkEl.setAttribute('href', 'https://github.com/' + repo + '/issues'); // specifies link's destination | href = address
    linkEl.setAttribute('target', '_blank'); // target specifies where to open the linked document, blank = new window | target = action

    limitWarningEl.appendChild(linkEl); // append to warning container

    // create an a element with specific text content and attributes
    // append to #limit-warning container
};

getRepoName();