let getRepoIssues = (repo) => {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log(data);
            })
        } else {
            alert("There was a problem with your request!");
        }
    });
}

getRepoIssues("facebook/react");