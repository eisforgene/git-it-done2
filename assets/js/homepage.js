let getUserRepos = (users) => {
    let apiUrl = "https://api.github.com/users/" + users + "/repos";

    fetch(apiUrl).then(response => {
        response.json().then(data => {
            console.log(data);
        })
    })
}

getUserRepos();