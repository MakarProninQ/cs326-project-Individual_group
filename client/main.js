import { Renderer } from "./renderer.js";

let curUserId = "";
let curUsername = "";

const renderer = new Renderer();

renderer.renderLoginPage();
document.getElementById("signup-button").addEventListener('click', signupButtonClicked);
document.getElementById("login-button").addEventListener('click', loginButtonClicked);

function signupButtonClicked() {
    renderer.renderSignupPage();
    document.getElementById("back-button").addEventListener('click', signupPageBackButtonClicked);
    document.getElementById("second-signup-button").addEventListener('click', secondSignupButtonClicked);
}

async function loginButtonClicked() {
    renderer.removeAlertText();

    const usernameInput = document.getElementById("username-input").value;
    const passwordInput = document.getElementById("password-input").value;

    const loginContainerElem = document.getElementById("login-container");

    completeLogin(usernameInput, passwordInput, loginContainerElem);
}

function signupPageBackButtonClicked() {
    renderer.renderLoginPage();
    document.getElementById("signup-button").addEventListener('click', signupButtonClicked);
    document.getElementById("login-button").addEventListener('click', loginButtonClicked);
}

async function secondSignupButtonClicked() {
    renderer.removeAlertText();

    const newUsernameInput = document.getElementById("new-username-input").value;
    const newPasswordInput = document.getElementById("new-password-input").value;
    const confirmPasswordInput = document.getElementById("confirm-password-input").value;

    const signupContainerElem = document.getElementById("signup-container");

    if (newUsernameInput.length < 8) {
        const alertText = "Username should have at least 8 characters.";
        renderer.renderAlertText(alertText, signupContainerElem);
        return;
    }

    if (newPasswordInput.length < 8) {
        const alertText = "Password should have at least 8 characters.";
        renderer.renderAlertText(alertText, signupContainerElem);
        return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
        const alertText = "Passwords do not match.";
        renderer.renderAlertText(alertText, signupContainerElem);
        return;
    }


    const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify( {username: newUsernameInput, password: newPasswordInput } ),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    const dbResObj = await response.json();

    if ( !response.ok ) {
        if (dbResObj.err === "usernameExists") {
            const alertText = "This username already exists.";
            renderer.renderAlertText(alertText, signupContainerElem);
            return;
        }
        else {
            const alertText = `Failed to sign up the user on the server. Response status: ${response.status}`;
            renderer.renderAlertText(alertText, signupContainerElem);
            return;
        }
    }
    else {
        completeLogin(newUsernameInput, newPasswordInput, signupContainerElem);
    }
}

async function completeLogin(username, password, element) {
    const loginRes = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify( {username: username, password: password } ),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if ( !loginRes.ok ) {
        const alertText = `Failed to sign up the user on the server. Response status: ${loginRes.status}`;
        renderer.renderAlertText(alertText, element);
        return;
    }

    const loginResObj = await loginRes.json();

    curUsername = username;
    curUserId = loginResObj.userId;

    const activitiesRes = await fetch(`/private/${curUserId}/activities/getNext20`);
    const activitiesArr = await activitiesRes.json();
    
    console.log(activitiesArr);
    renderer.renderMainPage(activitiesArr, curUsername);

    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("my-activities-button").addEventListener("click", myActivitiesButtonClicked);
    document.getElementById("create-activity-button").addEventListener("click", createActivityButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);


    for (let activity of activitiesArr) {
    activityRowButton = document.getElementById(activity._id);
    activityRowButton.addEventListener("click", () => closedActivityClicked(activity));
    }
}

function logoutButtonClicked() {
    curUserId = "";
    curUsername = "";
    localStorage.clear();
    renderer.renderLoginScreen();
}

function myActivitiesButtonClicked() {

}

function createActivityButtonClicked() {

}

function usernameButtonClicked() {

}

function closedActivityClicked(activity) {
    renderer.renderOpenedActivity(activity);
}