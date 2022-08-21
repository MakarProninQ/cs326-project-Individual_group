import { Renderer } from "./renderer.js";

let curUserId = "";
let curUsername = "";

const maxRenderActivitiesNum = 19;
let renderer = new Renderer(maxRenderActivitiesNum);

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

    await completeLogin(usernameInput, passwordInput, loginContainerElem);
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
    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreActivitiesButtonClicked);
    }

    for (let i = 0; i < maxRenderActivitiesNum && i < activitiesArr.length; ++i) {
        const activityRowButton = document.getElementById(activitiesArr[i]._id);
        activityRowButton.addEventListener("click", () => closedActivityClicked(activitiesArr[i]));
    }
}

async function logoutButtonClicked() {
    curUserId = "";
    curUsername = "";
    localStorage.clear();
    renderer = new Renderer(maxRenderActivitiesNum);
    renderer.renderLoginPage();
    document.getElementById("signup-button").addEventListener('click', signupButtonClicked);
    document.getElementById("login-button").addEventListener('click', loginButtonClicked);
    await fetch('/logout');
}

async function myActivitiesButtonClicked() {
    const activitiesRes = await fetch(`/private/${curUserId}/user/get20MyActivities`);
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
    const patricipatingUsers = [curUsername];
    const today = new Date();
    const created = today.toUTCString();
    const updated = today.toUTCString();
    const comments = [];

    const newActivityInputObj = {imgUrl: imgUrl, name: name, by: by, patricipatingUsers: patricipatingUsers,
        numParticipantsNeeded: numParticipantsNeeded, description: description, location: location,
        when: when, created: created, updated: updated, tags: tags, dueDate: dueDate, comments: comments};

    renderCreateButtonF();

    document.getElementById("main-page-button").addEventListener("click", mainPageButtonClicked);
    document.getElementById("create-button").addEventListener("click", () => createButtonClicked(newActivityInputObj));
    document.getElementById("logout-button").addEventListener("click", logoutButtonClicked);
    document.getElementById("my-activities-button").addEventListener("click", myActivitiesButtonClicked);
    document.getElementById("username-button").addEventListener("click", usernameButtonClicked);
}

function usernameButtonClicked() {

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
}

async function mainPageButtonClicked() {
    const activitiesRes = await fetch(`/private/${curUserId}/activities/getNext20`);
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

async function createButtonClicked(a) {
    renderer.removeAlertText();

    const newActivityObj = {imgUrl: a.imgUrl.value, name: a.name.value, by: a.by, patricipatingUsers: a.patricipatingUsers,
        numParticipantsNeeded: parseInt(a.numParticipantsNeeded.value), description: a.description.value, location: a.location.value,
        when: a.when.value, created: a.created, updated: a.updated, tags: a.tags.value.split(' '), dueDate: a.dueDate.value,
        comments: a.comments};

    const createPageContainer = document.getElementById("create-page-container");

    const createActivRes= await fetch(`/private/${curUserId}/activities/addOne`, {
        method: 'POST',
        body: JSON.stringify( newActivityObj ),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if ( !createActivRes.ok ) {
        const alertText = `Failed to save new activity to the server. Response status: ${createActivRes.status}`;
        renderer.renderAlertText(alertText, createPageContainer);
        return;
    }
    else {
        const createActivResObj = await createActivRes.json();
        renderer.renderOpenedActivity( createActivResObj, curUsername );
        document.getElementById("close-button").addEventListener("click", closeButtonClicked);
        document.getElementById("join-button").addEventListener("click", joinButtonClicked);
        document.getElementById("add-comment-button").addEventListener("click", addCommentButtonClicked);
    }

    const updateMyActivRes = await fetch(`/private/${curUserId}/user/updateMyActivities`, {
        method: 'POST',
        body: JSON.stringify( {activityId: createActivResObj._id} ),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if ( !updateMyActivRes.ok ) {
        const alertText = `Failed to update user activities on the server. Response status: ${updateMyActivRes.status}`;
        renderer.renderAlertText(alertText, createPageContainer);
        return;
    }
}

async function addCommentButtonClicked(){
    const addCommentInput = document.getElementById('add-comment-input');
    const commentsContainer = document.getElementById('comments-container');

    const newComment = {username: curUsername, text: addCommentInput.value};

    renderer.openedActivity.comments.push(newComment);
    renderer.loadMoreComments(commentsContainer);
    addCommentInput.value = "";

    const addCommentRes = await fetch(`/private/${curUserId}/activities/addComment`, {
        method: 'POST',
        body: JSON.stringify({activityId: renderer.openedActivity._id, comment: newComment}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if ( !addCommentRes.ok ) {
        const alertText = `Failed to save new comment to the server. Response status: ${addCommentRes.status}`;
        alert(alertText);
        return;
    }
};

function closeButtonClicked() {
    const oldOpenedActivityElem = document.getElementById("opened-activity-item");
    const oldOpenedActivity = renderer.openedActivity;
    oldOpenedActivityElem.replaceWith(renderer.generateActivityListItem(renderer.openedActivity));
    renderer.openedActivity = null;
    document.getElementById(oldOpenedActivity._id).addEventListener("click", () => closedActivityClicked(oldOpenedActivity));
}

async function joinButtonClicked() {
    renderer.openedActivity.patricipatingUsers.push(curUsername);

    const updateMyActivRes = await fetch(`/private/${curUserId}/user/updateMyActivities`, {
        method: 'POST',
        body: JSON.stringify( {activityId: renderer.openedActivity._id} ),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if ( !updateMyActivRes.ok ) {
        const alertText = `Failed to update user activities on the server. Response status: ${updateMyActivRes.status}`;
        alert(alertText);
        return;
    }
    else {
        const joinButton = document.getElementById("join-button");
        joinButton.classList.add("disabled-button");
        joinButton.disabled = "disabled";
    }
}

function loadCommentsButtonClicked() {
    const commentsContainer = document.getElementById('comments-container');
    renderer.loadMoreComments(commentsContainer);
    addCommentInput.value = "";
}

async function loadMoreMyActivitiesButtonClicked() {
    const activitiesRes = await fetch(`/private/${curUserId}/user/get20MyActivities?lastActivityId=${renderer.lastActivityId}`);
    const activitiesArr = await activitiesRes.json();

    loadMoreActivities(activitiesArr);

    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreMyActivitiesButtonClicked);
    }
}

async function loadMoreActivitiesButtonClicked() {
    const activitiesRes = await fetch(`/private/${curUserId}/activities/getNext20?lastActivityId=${renderer.lastActivityId}`);
    const activitiesArr = await activitiesRes.json();

    loadMoreActivities(activitiesArr);

    const loadMoreButton = document.getElementById("load-more-button")
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", loadMoreActivitiesButtonClicked);
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