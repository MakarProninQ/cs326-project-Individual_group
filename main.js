import { Activity } from "./activity.js";

function renderLoginScreen() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.classList.add("login-screen")
    mainContainer.innerHTML = "";



    const loginContainer = document.createElement("div");
    loginContainer.id = "login-container";
    loginContainer.classList.add("container");



    const usernameRowDiv = document.createElement("div");
    usernameRowDiv.classList.add("row");

    const usernameInput = document.createElement("input");
    usernameInput.id = "username-input";
    usernameInput.type = "text";
    usernameInput.classList.add("col-8", "entry-field");

    const usernameLabel = document.createElement("label");
    usernameLabel.for = "username-input";
    usernameLabel.id = "username"
    usernameLabel.classList.add("col-3");
    usernameLabel.innerHTML = "<strong>Username:</strong>";

    usernameRowDiv.appendChild(usernameLabel);
    usernameRowDiv.appendChild(usernameInput);



    const passwordRowDiv = document.createElement("div");
    passwordRowDiv.classList.add("row");

    const passwordInput = document.createElement("input");
    passwordInput.id = "password-input";
    passwordInput.type = "password";
    passwordInput.classList.add("col-8", "entry-field");

    const passwordLabel = document.createElement("label");
    passwordLabel.for = "password-input";
    passwordLabel.classList.add("col-3");
    passwordLabel.innerHTML = "<strong>Password:</strong>";

    passwordRowDiv.appendChild(passwordLabel);
    passwordRowDiv.appendChild(passwordInput);


    const loginButton = document.createElement("button");
    loginButton.id = "login-button";
    loginButton.type = "button";
    loginButton.classList.add("col-3");
    loginButton.innerText = "Log in";



    loginContainer.appendChild(usernameRowDiv);
    loginContainer.appendChild(passwordRowDiv);
    loginContainer.appendChild(loginButton);


    
    mainContainer.appendChild(loginContainer);
}

renderLoginScreen();
