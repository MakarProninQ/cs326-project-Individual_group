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

async function logoutButtonClicked() {
    curUserId = "";
    curUsername = "";
    localStorage.clear();
    renderer.renderLoginPage();
    document.getElementById("signup-button").addEventListener('click', signupButtonClicked);
    document.getElementById("login-button").addEventListener('click', loginButtonClicked);
    await fetch('/logout');
}

async function myActivitiesButtonClicked() {
    const activitiesRes = await fetch(`/private/${curUserId}/activities/get20MyActivities`);
    const activitiesArr = await activitiesRes.json();

    renderer.renderMyActivitiesPage(activitiesArr, curUsername);

    for (let activity of activitiesArr) {
    activityRowButton = document.getElementById(activity._id);
    activityRowButton.addEventListener("click", () => closedActivityClicked(activity));
    }

    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("create-activity-button").addEventListener("click", createActivityButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);
    document.getElementById("main-page-button").addEventListener("click", mainPageButtonClicked);
}

function createActivityButtonClicked() {
    const renderCreateButtonF = renderer.renderCreateActivityPage(curUsername);

    const createPageContainer = document.getElementById("create-page-container");

    const imgUrl = renderer.generateInputField("Image link", "text", createPageContainer);
    const name = renderer.generateInputField("Name", "text", createPageContainer);
    const by = curUserId;
    const patricipatingUsers = [].push(curUsername);
    const numParticipantsNeeded = renderer.generateInputField("Participants needed", "text", createPageContainer);
    const description = renderer.generateInputField("Description", "text", createPageContainer);
    const location = renderer.generateInputField("Location", "text", createPageContainer);
    const when = renderer.generateInputField("When", "date", createPageContainer);

    const today = new Date();

    const created = today.toUTCString();
    const updated = today.toUTCString();
    const tags = renderer.generateInputField("Tags", "text", createPageContainer);
    const dueDate = renderer.generateInputField("Latest date to join", "date", createPageContainer);
    const comments = [];

    const newActivityInputObj = {imgUrl: imgUrl, name: name, by: by, patricipatingUsers: patricipatingUsers,
        numParticipantsNeeded: numParticipantsNeeded, description: description, location: location,
        when: when, created: created, updated: updated, tags: tags, dueDate: dueDate, comments: comments};

    renderCreateButtonF();

    document.getElementById("main-page-button").addEventListener("click", mainPageButtonClicked);
    document.getElementById("create-button").addEventListener("click", () => createButtonClicked(newActivityInputObj));
}

function usernameButtonClicked() {

}

function closedActivityClicked(activity) {
    renderer.renderOpenedActivity(activity);
}

async function mainPageButtonClicked() {
    const activitiesRes = await fetch(`/private/${curUserId}/activities/getNext20`);
    const activitiesArr = await activitiesRes.json();

    renderer.renderMainPage(activitiesArr, curUsername);

    for (let activity of activitiesArr) {
    activityRowButton = document.getElementById(activity._id);
    activityRowButton.addEventListener("click", () => closedActivityClicked(activity));
    }

    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("my-activities-button").addEventListener("click", myActivitiesButtonClicked);
    document.getElementById("create-activity-button").addEventListener("click", createActivityButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);
}

function createButtonClicked(newActivityInputObj) {

    const createPageContainer = document.getElementById("create-page-container");

    console.log(newActivityInputObj);

}