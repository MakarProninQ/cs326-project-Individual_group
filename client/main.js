import * as fetchData from "./fetchData.js";
import { Renderer } from "./renderer.js";

let curUserId = "";
let curUsername = "";

const maxRenderActivitiesNum = 19;
let renderer = new Renderer(maxRenderActivitiesNum);

renderer.renderLoginPage();
const savedUsername = localStorage.getItem("username");
if (savedUsername) {
    document.getElementById("username-input").value = savedUsername;
}

document.getElementById("signup-button").addEventListener('click', signupButtonClicked);
document.getElementById("login-button").addEventListener('click', loginButtonClicked);

async function loginButtonClicked() {
    renderer.removeAlertText();

    const usernameInput = document.getElementById("username-input").value;
    const passwordInput = document.getElementById("password-input").value;

    const loginContainerElem = document.getElementById("login-container");

    await completeLogin(usernameInput, passwordInput, loginContainerElem);
}

function signupButtonClicked() {
    renderer.renderSignupPage();
    document.getElementById("back-button").addEventListener('click', signupPageBackButtonClicked);
    document.getElementById("second-signup-button").addEventListener('click', secondSignupButtonClicked);
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


    const response = await fetchData.sendSignUpInformation(newUsernameInput, newPasswordInput);


    const dbResObj = await response.json();

    if (dbResObj.err === "username exists") {
        const alertText = "This username already exists.";
        renderer.renderAlertText(alertText, signupContainerElem);
        return;
    }

    if ( !response.ok ) {
        const alertText = `Failed to sign up the user on the server. Response status: ${response.status}`;
        renderer.renderAlertText(alertText, signupContainerElem);
        return;
    }

    await completeLogin(newUsernameInput, newPasswordInput, signupContainerElem);
}

function usernameButtonClicked() {

    renderer.renderChangePasswordPage();

    document.getElementById("back-button").addEventListener("click", mainPageButtonClicked);
    document.getElementById("save-password-button").addEventListener("click", savePasswordButtonClicked);
    document.getElementById("delete-button").addEventListener("click", deleteAccountButtonClicked);
}

async function logoutButtonClicked() {
    curUserId = "";
    curUsername = "";
    localStorage.clear();
    renderer = new Renderer(maxRenderActivitiesNum);
    renderer.renderLoginPage();
    document.getElementById("signup-button").addEventListener('click', signupButtonClicked);
    document.getElementById("login-button").addEventListener('click', loginButtonClicked);
    await fetchData.logOut();
}

async function myActivitiesButtonClicked() {
    const activitiesRes = await fetchData.readMyActivities(curUserId);
    if ( !activitiesRes.ok ) {
        const alertText = `Failed to fetch activities from the server. Response status: ${activitiesRes.status}`;
        alert(alertText);
        return;
    }
    const activitiesArr = await activitiesRes.json();

    renderer.renderMyActivitiesPage(activitiesArr, curUsername);

    for (let i = 0; i < maxRenderActivitiesNum && i < activitiesArr.length; ++i) {
        const activityRowButton = document.getElementById(activitiesArr[i]._id);
        activityRowButton.addEventListener("click", () => closedActivityClicked(activitiesArr[i]));
    }

    document.getElementById("main-page-button").addEventListener("click", mainPageButtonClicked);    
    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("create-activity-button").addEventListener("click", createActivityButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);
    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreMyActivitiesButtonClicked);
    }
}

function createActivityButtonClicked() {
    const renderCreateButtonF = renderer.renderCreateActivityPage(curUsername);

    const createPageContainer = document.getElementById("create-page-container");

    const imgUrl = renderer.generateInputField("Image URL", "text", createPageContainer);
    const name = renderer.generateInputField("Name", "text", createPageContainer);
    const numParticipantsNeeded = renderer.generateInputField("Participants needed", "text", createPageContainer);
    const description = renderer.generateInputField("Description", "text", createPageContainer);
    const location = renderer.generateInputField("Location", "text", createPageContainer);
    const when = renderer.generateInputField("When", "date", createPageContainer);
    const dueDate = renderer.generateInputField("Latest date to join", "date", createPageContainer);
    const tags = renderer.generateInputField("Tags", "text", createPageContainer);
    const by = curUsername;
    const participatingUsers = [curUsername];
    const today = new Date();
    const created = today.toUTCString();
    const updated = today.toUTCString();
    const comments = [];

    const newActivityInputObj = {imgUrl: imgUrl, name: name, by: by, participatingUsers: participatingUsers,
        numParticipantsNeeded: numParticipantsNeeded, description: description, location: location,
        when: when, created: created, updated: updated, tags: tags, dueDate: dueDate, comments: comments};

    renderCreateButtonF();

    document.getElementById("main-page-button").addEventListener("click", mainPageButtonClicked);
    document.getElementById("create-button").addEventListener("click", () => createButtonClicked(newActivityInputObj));
    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("my-activities-button").addEventListener("click", myActivitiesButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);
}

async function loadMoreActivitiesButtonClicked() {
    const activitiesRes = await fetchData.loadMoreActivitiesWithParam(curUserId, renderer.lastActivityId);
    if ( !activitiesRes.ok ) {
        const alertText = `Failed to fetch activities from the server. Response status: ${activitiesRes.status}`;
        alert(alertText);
        return;
    }
    const activitiesArr = await activitiesRes.json();

    loadMoreActivities(activitiesArr);

    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreActivitiesButtonClicked);
    }
}

async function loadMoreMyActivitiesButtonClicked() {
    const activitiesRes = await fetchData.loadMoreMyActivitiesWithParam(curUserId, renderer.lastActivityId)
    if ( !activitiesRes.ok ) {
        const alertText = `Failed to fetch activities from the server. Response status: ${activitiesRes.status}`;
        alert(alertText);
        return;
    }
    const activitiesArr = await activitiesRes.json();

    loadMoreActivities(activitiesArr);

    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreMyActivitiesButtonClicked);
    }
}

function closedActivityClicked(activity) {
    const oldOpenedActivityElem = document.getElementById("opened-activity-item");
    const oldOpenedActivity = renderer.openedActivity;
    if (oldOpenedActivityElem) {
        oldOpenedActivityElem.replaceWith(renderer.generateActivityListItem(renderer.openedActivity));
        document.getElementById(oldOpenedActivity._id).addEventListener("click", () => closedActivityClicked(oldOpenedActivity));
    }
    renderer.renderOpenedActivity(activity, curUsername);
    document.getElementById("close-button").addEventListener("click", closeButtonClicked);
    document.getElementById("join-button").addEventListener("click", joinButtonClicked);
    document.getElementById("add-comment-button").addEventListener("click", addCommentButtonClicked);
    const loadCommentsButtonElem = document.getElementById("load-comments-button")
    if (loadCommentsButtonElem) {
        loadCommentsButtonElem.addEventListener("click", loadCommentsButtonClicked);
    }
    const deleteButtonElem = document.getElementById("delete-button");
    if (deleteButtonElem) {
        deleteButtonElem.addEventListener("click", deleteActivityButtonClicked);
    }
}

function closeButtonClicked() {
    const oldOpenedActivityElem = document.getElementById("opened-activity-item");
    const oldOpenedActivity = renderer.openedActivity;
    oldOpenedActivityElem.replaceWith(renderer.generateActivityListItem(renderer.openedActivity));
    renderer.openedActivity = null;
    document.getElementById(oldOpenedActivity._id).addEventListener("click", () => closedActivityClicked(oldOpenedActivity));
}

async function joinButtonClicked() {
    renderer.openedActivity.participatingUsers.push(curUsername);

    const updateMyActivRes = await fetchData.joinActivity(curUserId, renderer.openedActivity._id);

    if ( !updateMyActivRes.ok ) {
        const alertText = `Failed to update user activities on the server. Response status: ${updateMyActivRes.status}`;
        alert(alertText);
        return;
    }
    else {
        const joinButton = document.getElementById("join-button");
        joinButton.classList.add("disabled-button");
        joinButton.disabled = "disabled";
        renderer.renderOpenedActivity(renderer.openedActivity, curUsername);
        document.getElementById("close-button").addEventListener("click", closeButtonClicked);
        document.getElementById("join-button").addEventListener("click", joinButtonClicked);
        document.getElementById("add-comment-button").addEventListener("click", addCommentButtonClicked);
        const loadCommentsButtonElem = document.getElementById("load-comments-button")
        if (loadCommentsButtonElem) {
            loadCommentsButtonElem.addEventListener("click", loadCommentsButtonClicked);
        }
        const deleteButtonElem = document.getElementById("delete-button");
        if (deleteButtonElem) {
            deleteButtonElem.addEventListener("click", deleteActivityButtonClicked);
        }
    }
}

function loadCommentsButtonClicked() {
    const commentsContainer = document.getElementById('comments-container');
    renderer.loadMoreComments(commentsContainer);
}

async function addCommentButtonClicked(){
    const addCommentInput = document.getElementById('add-comment-input');
    const commentsContainer = document.getElementById('comments-container');

    const newComment = {username: curUsername, text: addCommentInput.value};

    renderer.openedActivity.comments.push(newComment);
    renderer.loadMoreComments(commentsContainer);
    addCommentInput.value = "";

    const addCommentRes = await fetchData.addComment(curUserId, renderer.openedActivity._id, renderer.openedActivity.comments);

    if ( !addCommentRes.ok ) {
        const alertText = `Failed to save new comment to the server. Response status: ${addCommentRes.status}`;
        alert(alertText);
        return;
    }
};

async function mainPageButtonClicked() {
    const activitiesRes = await fetchData.readActivities(curUserId);
    if ( !activitiesRes.ok ) {
        const alertText = `Failed to fetch activities from the server. Response status: ${activitiesRes.status}`;
        alert(alertText);
        return;
    }
    const activitiesArr = await activitiesRes.json();

    renderer.renderMainPage(activitiesArr, curUsername);

    for (let i = 0; i < maxRenderActivitiesNum && i < activitiesArr.length; ++i) {
        const activityRowButton = document.getElementById(activitiesArr[i]._id);
        activityRowButton.addEventListener("click", () => closedActivityClicked(activitiesArr[i]));
    }

    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("my-activities-button").addEventListener("click", myActivitiesButtonClicked);
    document.getElementById("create-activity-button").addEventListener("click", createActivityButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);
    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreActivitiesButtonClicked);
    }
}

async function savePasswordButtonClicked() {
    const oldPasswordInput = document.getElementById("old-password-input").value;
    const newPasswordInput = document.getElementById("new-password-input").value;
    const confirmPasswordInput = document.getElementById("confirm-password-input").value;
    const changePasswordContainer = document.getElementById("change-password-container");


    if (newPasswordInput.length < 8) {
        const alertText = "New password should have at least 8 characters";
        renderer.renderAlertText(alertText, changePasswordContainer);
        return;
    }

    if (confirmPasswordInput !== newPasswordInput) {
        const alertText = "Passwords do not match";
        renderer.renderAlertText(alertText, changePasswordContainer);
        return;
    }

    const changePwdRes = await fetchData.changePassword(curUserId, newPasswordInput, oldPasswordInput);

    if ( !changePwdRes.ok ) {
        const alertText = `Failed to update user's password on the server. Response status: ${changePwdRes.status}`;
        renderer.renderAlertText(alertText, changePasswordContainer);
        return;
    }

    const resObj = await changePwdRes.json();

    if (resObj.err === "incorrect password") {
        const alertText = "Incorrect old password";
        renderer.renderAlertText(alertText, changePasswordContainer);
        return;
    }

    mainPageButtonClicked();
}

async function createButtonClicked(a) {
    renderer.removeAlertText();

    const n = {imgUrl: a.imgUrl.value, name: a.name.value, by: a.by, participatingUsers: a.participatingUsers,
        numParticipantsNeeded: parseInt(a.numParticipantsNeeded.value), description: a.description.value, location: a.location.value,
        when: a.when.value, created: a.created, updated: a.updated, tags: a.tags.value.split(' '), dueDate: a.dueDate.value,
        comments: a.comments};

    const createPageContainer = document.getElementById("create-page-container");

    if ( !(n.imgUrl && typeof n.imgUrl === "string" &&
        n.name && typeof n.name === "string" &&
        n.numParticipantsNeeded && typeof n.numParticipantsNeeded === "number" &&
        n.description && typeof n.description === "string" &&
        n.location && typeof n.location === "string" &&
        n.tags && n.tags[0] && typeof a.tags.value === "string" && 
        n.comments && JSON.stringify(n.comments) === "[]" ) ) {

            const alertText = `Invalid entry`;
            renderer.renderAlertText(alertText, createPageContainer);
            return;
    }

    const createActivRes = await fetchData.createActivity(curUserId, n);

    if ( !createActivRes.ok ) {
        const alertText = `Failed to save new activity to the server. Response status: ${createActivRes.status}`;
        renderer.renderAlertText(alertText, createPageContainer);
        return;
    }

    const createActivResObj = await createActivRes.json();
    if (document.getElementById("opened-activity-item")) {
        closeButtonClicked();
    }
    renderer.renderOpenedActivity( createActivResObj, curUsername );
    document.getElementById("close-button").addEventListener("click", closeButtonClicked);
    document.getElementById("join-button").addEventListener("click", joinButtonClicked);
    document.getElementById("add-comment-button").addEventListener("click", addCommentButtonClicked);
    document.getElementById("delete-button").addEventListener("click", deleteActivityButtonClicked);
}

async function deleteAccountButtonClicked() {
    const updateMyActivRes = await fetchData.deleteAccount(curUserId);

    if ( !updateMyActivRes.ok ) {
        const alertText = `Failed to delete user from the server. Response status: ${updateMyActivRes.status}`;
        alert(alertText);
        return;
    }
    else {
        localStorage.clear();
    }
    
    renderer.renderLoginPage();
    document.getElementById("signup-button").addEventListener('click', signupButtonClicked);
    document.getElementById("login-button").addEventListener('click', loginButtonClicked);
}

async function deleteActivityButtonClicked() {
    const updateMyActivRes = await fetchData.updateMyActivities(curUserId, renderer.openedActivity._id);

    if ( !updateMyActivRes.ok ) {
        const alertText = `Failed to delete activity from the server. Response status: ${updateMyActivRes.status}`;
        alert(alertText);
        return;
    }
    document.getElementById("opened-activity-item").remove();
}

async function completeLogin(username, password, element) {
    const loginRes = await fetchData.sendLoginInofmation(username, password);

    if ( !loginRes.ok ) {
        const alertText = `Failed to log in the user. Response status: ${loginRes.status}`;
        renderer.renderAlertText(alertText, element);
        return;
    }

    const loginResObj = await loginRes.json();

    if (loginResObj.failureMessage) {
        document.getElementById("password-input").value = "";
        const alertText = loginResObj.failureMessage;
        renderer.renderAlertText(alertText, element);
        return;
    }


    curUsername = username;
    localStorage.setItem("username", username);
    curUserId = loginResObj.userId;

    const activitiesRes = await fetchData.readActivities(curUserId);
    if ( !activitiesRes.ok ) {
        const alertText = `Failed to fetch activities from the server. Response status: ${activitiesRes.status}`;
        alert(alertText);
        return;
    }
    const activitiesArr = await activitiesRes.json();

    renderer.renderMainPage(activitiesArr, curUsername);

    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("my-activities-button").addEventListener("click", myActivitiesButtonClicked);
    document.getElementById("create-activity-button").addEventListener("click", createActivityButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);
    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreActivitiesButtonClicked);
    }

    for (let i = 0; i < maxRenderActivitiesNum && i < activitiesArr.length; ++i) {
        const activityRowButton = document.getElementById(activitiesArr[i]._id);
        activityRowButton.addEventListener("click", () => closedActivityClicked(activitiesArr[i]));
    }
}

function loadMoreActivities(activitiesArr) {
    document.getElementById("load-more-button").remove();
    const activitiesContainerElem = document.getElementById("activities-container");

    for (let i = 0; i < maxRenderActivitiesNum && i < activitiesArr.length; ++i) {
        const newActivityElem = renderer.generateActivityListItem(activitiesArr[i]);
        activitiesContainerElem.appendChild(newActivityElem);
        newActivityElem.addEventListener("click", () => closedActivityClicked(activitiesArr[i]));
    }

    renderer.renderLoadMoreButton(activitiesArr.length, activitiesContainerElem);
}