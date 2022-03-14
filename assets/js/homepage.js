let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");

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
            console.log(data);
        })
    })
}

userFormEl.addEventListener("submit", formSubmitHandler);