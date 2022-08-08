import { Activity } from "./activity.js";
import { User } from "./user.js";

let curUser = null;
let users = [];
const someUser = new User();
someUser.setUsername(null, null, "mpronin@umass.edu");
someUser.setPassword("mpronin@umass.edu", null, "password");
someUser.setUserId(users.length);
users.push(someUser);

function createActivityButtonClicked() {

}

function myActivitiesButtonClicked() {

}

function renderMainPageHeader() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";



    const headerMenuContainer = document.createElement("div");
    headerMenuContainer.id = "header-menu-container";
    headerMenuContainer.classList.add("row");


    const usernameButton = document.createElement("button");
    usernameButton.id = "username-button";
    usernameButton.classList.add("col-2");
    usernameButton.innerHTML = `<u>${curUser.getUsername()}</u>`;

    headerMenuContainer.appendChild(usernameButton);



    const myActivitiesButton = document.createElement("button");
    myActivitiesButton.id = "my-activities-button";
    myActivitiesButton.classList.add("col-3", "regular-button");
    myActivitiesButton.innerText = "My activities";
    myActivitiesButton.addEventListener("click", myActivitiesButtonClicked);
    
    headerMenuContainer.appendChild(myActivitiesButton);



    const createActivityButton = document.createElement("button");
    createActivityButton.id = "create-activity-button";
    createActivityButton.classList.add("col-3", "regular-button");
    createActivityButton.innerText = "Create activity";
    createActivityButton.addEventListener("click", createActivityButtonClicked);

    headerMenuContainer.appendChild(createActivityButton);

    
    
    mainContainer.appendChild(headerMenuContainer);
}

function renderMainScreen() {
    renderMainPageHeader();
}

function completeLogin(userID) {
    curUser = users[userID];
}

function secondSignupButtonClicked() {
    const incorrectSignupAlert =  document.getElementById("incorrect-signup-alert");
    if ( incorrectSignupAlert ) {
        incorrectSignupAlert.remove();
    }

    const newUsernameInputObj = document.getElementById("new-username-input");
    const newPasswordInputObj = document.getElementById("new-password-input");
    const confirmPasswordInputObj = document.getElementById("confirm-password-input");

    const alertTextP = document.createElement("p");
    alertTextP.id = "incorrect-signup-alert";
    alertTextP.classList.add("alert-text", "align-self-center");

    if ( newUsernameInputObj.value.length < 5 ) {
        alertTextP.innerText="Username should have at least 5 characters";
        document.getElementById("signup-container").appendChild(alertTextP);
        newUsernameInputObj.value = "";
        return;
    }

    for (let user of users) {
        if ( user.getUsername() === newUsernameInputObj.value ) {
            alertTextP.innerText="This username already exists";
            document.getElementById("signup-container").appendChild(alertTextP);
            newUsernameInputObj.value = "";
            return;
        }
    }

    if ( newPasswordInputObj.value.length < 5 ) {
        alertTextP.innerText="Password should have at least 5 characters";
        document.getElementById("signup-container").appendChild(alertTextP);
        newPasswordInputObj.value = "";
        confirmPasswordInputObj.value = "";
        return;
    }

    if ( newPasswordInputObj.value !== confirmPasswordInputObj.value ) {
        alertTextP.innerText="Passwords do not match";
        document.getElementById("signup-container").appendChild(alertTextP);
        newPasswordInputObj.value = "";
        confirmPasswordInputObj.value = "";
        return;
    }

    const newUser = new User();
    newUser.setUsername(null, null, newUsernameInputObj.value);
    newUser.setPassword(newUsernameInputObj.value, null, newPasswordInputObj.value);
    newUser.setUserId(users.length);
    users.push(newUser);

    completeLogin(newUser.getID());
    renderMainScreen();
}

function renderSignupScreen() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";



    const signupContainer = document.createElement("div");
    signupContainer.id = "signup-container";
    signupContainer.classList.add("container");



    const newUsernameRowDiv = document.createElement("div");
    newUsernameRowDiv.classList.add("row");

    const newUsernameInput = document.createElement("input");
    newUsernameInput.id = "new-username-input";
    newUsernameInput.type = "text";
    newUsernameInput.classList.add("col-6", "entry-field");

    const newUsernameLabel = document.createElement("label");
    newUsernameLabel.for = "new-username-input";
    newUsernameLabel.classList.add("col-5");
    newUsernameLabel.innerHTML = "<strong>New username:</strong>";

    newUsernameRowDiv.appendChild(newUsernameLabel);
    newUsernameRowDiv.appendChild(newUsernameInput);



    const newPasswordRowDiv = document.createElement("div");
    newPasswordRowDiv.classList.add("row");

    const newPasswordInput = document.createElement("input");
    newPasswordInput.id = "new-password-input";
    newPasswordInput.type = "password";
    newPasswordInput.classList.add("col-6", "entry-field");

    const newPasswordLabel = document.createElement("label");
    newPasswordLabel.for = "new-password-input";
    newPasswordLabel.classList.add("col-5");
    newPasswordLabel.innerHTML = "<strong>New password:</strong>";

    newPasswordRowDiv.appendChild(newPasswordLabel);
    newPasswordRowDiv.appendChild(newPasswordInput);

    const confirmPasswordRowDiv = document.createElement("div");
    confirmPasswordRowDiv.classList.add("row");

    const confirmPasswordInput = document.createElement("input");
    confirmPasswordInput.id = "confirm-password-input";
    confirmPasswordInput.type = "password";
    confirmPasswordInput.classList.add("col-6", "entry-field");

    const confirmPasswordLabel = document.createElement("label");
    confirmPasswordLabel.for = "confirm-password-input";
    confirmPasswordLabel.classList.add("col-5");
    confirmPasswordLabel.innerHTML = "<strong>Confirm password:</strong>";

    confirmPasswordRowDiv.appendChild(confirmPasswordLabel);
    confirmPasswordRowDiv.appendChild(confirmPasswordInput);



    const secondSignupButton = document.createElement("button");
    secondSignupButton.id = "second-signup-button";
    secondSignupButton.classList.add("col-3", "regular-button");
    secondSignupButton.innerText = "Sign up";
    secondSignupButton.addEventListener("click", secondSignupButtonClicked);



    signupContainer.appendChild(newUsernameRowDiv);
    signupContainer.appendChild(newPasswordRowDiv);
    signupContainer.appendChild(confirmPasswordRowDiv);
    signupContainer.appendChild(secondSignupButton);



    mainContainer.appendChild(signupContainer);
}

function loginButtonClicked() {
    const incorrectLoginAlert =  document.getElementById("incorrect-login-alert");
    if ( incorrectLoginAlert ) {
        incorrectLoginAlert.remove();
    }

    const usernameInputObj = document.getElementById("username-input");
    const passwordInputObj = document.getElementById("password-input");

    let filteredUsers = users.filter((user) => user.checkInfo(usernameInputObj.value, passwordInputObj.value));
    if ( filteredUsers.length === 0 ) {
        const alertTextP = document.createElement("p");
        alertTextP.id = "incorrect-login-alert";
        alertTextP.classList.add("alert-text", "align-self-center");
        alertTextP.innerText="Incorrect username or password";
        document.getElementById("login-container").appendChild(alertTextP);
        usernameInputObj.value = "";
        passwordInputObj.value = "";
        return;
    }

    completeLogin(filteredUsers[0].getID());
    renderMainScreen();
}


function renderLoginScreen() {
    const mainContainer = document.getElementById("main-container");
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
    loginButton.classList.add("col-3", "regular-button");
    loginButton.innerText = "Log in";
    loginButton.addEventListener("click", loginButtonClicked);



    const signupRowDiv = document.createElement("div");
    signupRowDiv.classList.add("row");

    const signupButton = document.createElement("button");
    signupButton.id = "signup-button";
    signupButton.classList.add("col-3", "regular-button");
    signupButton.innerText = "Sign up";
    signupButton.addEventListener("click", renderSignupScreen);

    const signupButtonLabel = document.createElement("label");
    signupButtonLabel.for = "signup-button";
    signupButtonLabel.classList.add("col-9", "align-self-center");
    signupButtonLabel.innerHTML = "<small>Don't have an account yet?</small>";

    signupRowDiv.appendChild(signupButtonLabel);
    signupRowDiv.appendChild(signupButton);



    loginContainer.appendChild(usernameRowDiv);
    loginContainer.appendChild(passwordRowDiv);
    loginContainer.appendChild(loginButton);
    loginContainer.appendChild(signupRowDiv);


    
    mainContainer.appendChild(loginContainer);
}


renderLoginScreen();
