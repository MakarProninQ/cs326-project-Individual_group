import { Activity } from "./activity.js";
import { User } from "./user.js";

let curUser = null;
let users = [];
let activities = [];




function generateUsers(){
    const someUser1 = new User();
    someUser1.setUsername(null, null, "mpronin@umass.edu");
    someUser1.setPassword("mpronin@umass.edu", null, "password");
    someUser1.setUserId(users.length);
    users.push(someUser1);

    const someUser2 = new User();
    someUser2.setUsername(null, null, "some@address.com");
    someUser2.setPassword("some@address.com", null, "password!");
    someUser2.setUserId(users.length);
    users.push(someUser2);

    const someUser3 = new User();
    someUser3.setUsername(null, null, "smartFox@address.com");
    someUser3.setPassword("smartFox@address.com", null, "password1");
    someUser3.setUserId(users.length);
    users.push(someUser3);

    const someUser4 = new User();
    someUser4.setUsername(null, null, "usernameNoCom");
    someUser4.setPassword("usernameNoCom", null, "password2");
    someUser4.setUserId(users.length);
    users.push(someUser4);

    const someUser5 = new User();
    someUser5.setUsername(null, null, "Horizon");
    someUser5.setPassword("Horizon", null, "password3");
    someUser5.setUserId(users.length);
    users.push(someUser5);
}

function generateActivities() {

    let generatedDescription = "Some ";
    for (let i = 0; i < 200; ++i) {
        generatedDescription = generatedDescription.concat("very ");
    }
    generatedDescription = generatedDescription.concat("long description.");

    const newActivity1 = new Activity(activities.length, "Chess", 0, new Date('December 17, 2021 03:24:00').toISOString(), 
    new Date('August 1, 2022 15:24:54').toISOString(), new Date('August 10, 2022 03:24:00').toISOString(), 10, [1, 2], new Date('August 9, 2022 03:24:00').toISOString(), "Amherst",
    "https://media.wired.com/photos/624603c1a288ab4bb7de366a/16:9/w_2155,h_1212,c_limit/Learn-Chess-Online-Gear-1053741472.jpg", ["chess", "#smart", "board games"],
    generatedDescription, [{userID: 0, text: "I wrote this comment"}, {userID: 1, text: "chess is boring"}]);
    activities.push(newActivity1);

    const newActivity2 = new Activity(activities.length, "Hiking", 1, new Date('December 18, 2021 03:24:00').toISOString(), 
    new Date('August 2, 2022 03:24:00').toISOString(), new Date('August 11, 2022 03:24:00').toISOString(), 10, [], new Date('August 9, 2022 13:45:00').toISOString(), "Amherst",
    "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325466_1100-800x825.jpg", ["hiking", "health"],
    generatedDescription, [{userID: 2, text: "Health is important"}, {userID: 3, text: "Hiking is great!"}]);
    activities.push(newActivity2);
    
    const newActivity3 = new Activity(activities.length, "Sea of Thieves", 2, new Date('December 19, 2021 07:24:00').toISOString(), 
    new Date('August 3, 2022 03:24:00').toISOString(), new Date('August 12, 2022 04:31:00').toISOString(), 4, [1, 2, 4], new Date('August 9, 2022 03:24:37').toISOString(), "Springfield",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/ss_db93a181951437ffb3f7c2a45d0cb8351e1d8fc1.1920x1080.jpg?t=1659649089", ["computer games", "pirates"],
    generatedDescription, [{userID: 3, text: "Love Sea of Thieves"}, { userID: 0, text: "BEST GAME!!!"}]);
    activities.push(newActivity3);

    const newActivity4 = new Activity(activities.length, "App Development", 3, new Date('December 20, 2021 11:24:00').toISOString(), 
    new Date('August 4, 2022 05:26:00').toISOString(), new Date('August 13, 2022 03:24:00').toISOString(), 5, [], new Date('August 9, 2022 03:24:00').toISOString(), "New York",
    "https://www.vaival.com/wp-content/uploads/2021/01/vaival-application.png", ["CS", "job"],
    generatedDescription, [{userID: 4, text: "Post this here?"}, {userID: 1, text: "Why not?"}]);
    activities.push(newActivity4);

    const newActivity5 = new Activity(activities.length, "GTA V", 4, new Date('December 21, 2021 03:15:00').toISOString(), 
    new Date('August 5, 2022 03:24:00').toISOString(), new Date('August 14, 2022 04:24:00').toISOString(), 13, [0, 4, 2], new Date('August 9, 2022 21:32:00').toISOString(), "Boston",
    "https://media-rockstargames-com.akamaized.net/tina-uploads/posts/172872k8a375k8/c1964d6dfe37619793cf9eb073deff3d0719fe00.jpg", ["computer games", "fun"],
    generatedDescription, [{userID: 1, text: "I wrote this comment"}, {userID: 4, text: "chess is boring"}]);
    activities.push(newActivity5);

    const newActivity6 = new Activity(activities.length, "Battlefield2042", 4, new Date('December 21, 2021 03:15:00').toISOString(), 
    new Date('August 5, 2022 03:24:00').toISOString(), new Date('August 14, 2022 04:24:00').toISOString(), 12, [1], new Date('August 9, 2022 21:32:00').toISOString(), "Boston",
    "https://sportshub.cbsistatic.com/i/2021/12/05/82745ad0-0f76-46a8-9a4d-29657b5efe3a/battlefield-2042.png", ["computer games", "fun",
     "shooter", "battle"], generatedDescription, [{userID: 1, text: "I wrote this comment"}, {userID: 4, text: "chess is boring"}]);
     activities.push(newActivity6);

    const newActivity7 = new Activity(activities.length, "Survey", 3, new Date('December 21, 2021 03:15:00').toISOString(), 
    new Date('August 5, 2022 03:24:00').toISOString(), new Date('August 14, 2022 04:24:00').toISOString(), 10, [0, 1, 3], new Date('August 9, 2022 21:32:00').toISOString(), "Springfield",
    "https://getthematic.com/insights/content/images/wordpress/2018/04/shutterstock_730381336.jpg", ["science"],
    generatedDescription, [{userID: 1, text: "I wrote this comment"}, {userID: 4, text: "chess is boring"}]);
    activities.push(newActivity7);
    
    const newActivity8 = new Activity(activities.length, "GTA 4", 4, new Date('December 21, 2021 03:15:00').toISOString(), 
    new Date('August 5, 2022 03:24:00').toISOString(), new Date('August 14, 2022 04:24:00').toISOString(), 32, [4], new Date('August 9, 2022 21:32:00').toISOString(), "Boston",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8I6dtGm6rp47afFCwocJn1csy8NxTZShhog&usqp=CAU", ["computer games", "fun", "old games"],
    generatedDescription, [{userID: 1, text: "I wrote this comment"}, {userID: 4, text: "I lost my headphones"}, {userID: 3, text: "Gta 4 is an old game"},
    {userID: 2, text: "I love the main character"}, {userID: 3, text: "Rockstar games are great developers!"}, {userID: 4, text: "Weather is great today"},
    {userID: 2, text: "I need more paper"}, {userID: 1, text: "I want to play this game"}, {userID: 2, text: generatedDescription}]);
    activities.push(newActivity8);
}




function getUserByID(id) {
    for (let user of users){
        if ( user.getID() === id){
            return user;
        }
    }
}

function loadNewComment(element, comment, num) {
    const commentRowDiv = document.createElement("div");
    commentRowDiv.classList.add("row", "comment");
    commentRowDiv.id = `comment-${num}`;

    const activityUsernameP = document.createElement("p");
    activityUsernameP.innerHTML = `<u>${getUserByID(comment.userID).getUsername()}</u>`;
    commentRowDiv.appendChild(activityUsernameP);

    const commentP = document.createElement("p");
    commentP.innerText = comment.text;
    commentRowDiv.appendChild(commentP);

    element.appendChild(commentRowDiv);
}

function loadMoreComments(element, activity) {
    let numCommentsLoaded = 0;

    for (let i = 0; i < activity.comments.length; ++i) {
        if (!document.getElementById(`comment-${i}`)){
            numCommentsLoaded = i;
            break;
        }
    }

    let j = numCommentsLoaded;

    while (j < numCommentsLoaded + 5 && j < activity.comments.length) {
        loadNewComment(element, activity.comments[j], j);
        j++;
    }

    const loadCommentsButton = document.getElementById("load-comments-button");
    if ( j === activity.comments.length && loadCommentsButton) {
        loadCommentsButton.parentNode.removeChild(loadCommentsButton);
    }

}

function renderComments(element, activity) {

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("container");

    loadMoreComments(commentsContainer, activity);
    element.appendChild(commentsContainer);

    if ( activity.comments.length > 5 ) {
        const loadCommentsButton = document.createElement("button");
        loadCommentsButton.classList.add("regular-button");
        loadCommentsButton.id = "load-comments-button";
        loadCommentsButton.innerText = "Load more comments";
        loadCommentsButton.addEventListener("click", () => {
            loadMoreComments(commentsContainer, activity);
        })

        element.appendChild(loadCommentsButton);
    }

    const addCommentInput = document.createElement("input");
    addCommentInput.id = "add-comment-input";
    addCommentInput.classList.add("entry-field");
    element.appendChild(addCommentInput);

    const addCommentButton = document.createElement("button");
    addCommentButton.id = "add-comment-button";
    addCommentButton.innerText = "Send new comment";
    addCommentButton.classList.add("green-button");
    addCommentButton.addEventListener("click", () => {
        activity.comments.push({userID: curUser.getID(), text: addCommentInput.value});
        loadMoreComments(commentsContainer, activity);
        addCommentInput.value = "";
    });
    element.appendChild(addCommentButton);

}

function generateActivityListItem(activity) {
    const activityRowButton = document.createElement("button");
    activityRowButton.classList.add("row", "activities-list-item");
    activityRowButton.id = activity.id;
    activityRowButton.addEventListener("click", () => renderOpenedActivity(activity));



    const activityImg = document.createElement("img");
    activityImg.classList.add("col-2", "activity-list-img");
    activityImg.src = activity.image;

    activityRowButton.appendChild(activityImg);



    const activityNameP = document.createElement("p");
    activityNameP.classList.add("col-4", "activity-name");
    activityNameP.innerHTML = `<strong>${activity.name}</strong>`;

    activityRowButton.appendChild(activityNameP);



    const activityTagsDiv = document.createElement("div");
    activityTagsDiv.classList.add("col-3", "container");
    for (let tag of activity.tags) {
        const tagButton = document.createElement("button");
        tagButton.classList.add("tag-button");
        tagButton.innerText = tag;
        tagButton.disabled = "disabled";
        activityTagsDiv.appendChild(tagButton);
    }

    activityRowButton.appendChild(activityTagsDiv);

    

    const participantsBarDiv = document.createElement("div");
    participantsBarDiv.classList.add("col-2", "participants-bar");

    const participantsProgressDiv = document.createElement("div");
    participantsProgressDiv.classList.add("participants-progress");
    const progress = Math.floor(activity.patricipatingUsers.length / activity.numParticipantsNeeded * 100);
    participantsProgressDiv.style.width = progress + "%";
    participantsBarDiv.appendChild(participantsProgressDiv);

    activityRowButton.appendChild(participantsBarDiv);



    return activityRowButton;
}

function joinButtonClicked(activity) {
    const oldElement = document.getElementById(activity.id);
    activity.patricipatingUsers.push(curUser.getID());
    oldElement.replaceWith(generateActivityListItem(activity));
}

function renderOpenedActivity(activity) {
    const newElementRowDiv = document.createElement("div");
    newElementRowDiv.classList.add("row", "container", "opened-activity-item");
    newElementRowDiv.id = activity.id;



    const activityImg = document.createElement("img");
    activityImg.classList.add("opened-activity-img");
    activityImg.src = activity.image;
    newElementRowDiv.appendChild(activityImg);


    const activityNameH = document.createElement("h1");
    activityNameH.innerText = activity.name;
    newElementRowDiv.appendChild(activityNameH);

    const activityUsernameP = document.createElement("p");
    activityUsernameP.innerHTML = `<strong>By: </strong><u>${getUserByID(activity.createdBy).getUsername()}</u>`;
    newElementRowDiv.appendChild(activityUsernameP);




    const participantsNumP = document.createElement("p");
    participantsNumP.innerHTML = `<strong>Participants: ${activity. patricipatingUsers.length}/${activity.numParticipantsNeeded}</strong>`;

    newElementRowDiv.appendChild(participantsNumP);



    const participantsBarDiv = document.createElement("div");
    participantsBarDiv.classList.add("participants-bar");

    const participantsProgressDiv = document.createElement("div");
    participantsProgressDiv.classList.add("participants-progress");
    const progress = Math.floor(activity.patricipatingUsers.length / activity.numParticipantsNeeded * 100);
    participantsProgressDiv.style.width = progress + "%";
    participantsBarDiv.appendChild(participantsProgressDiv);

    newElementRowDiv.appendChild(participantsBarDiv);
    
    

    const descriptionWordP = document.createElement("p");
    descriptionWordP.innerHTML = "<strong>Description:</strong>";
    newElementRowDiv.appendChild(descriptionWordP);

    const descriptionP = document.createElement("p");
    descriptionP.classList.add("opened-activity-description");
    descriptionP.innerText = activity.description;
    newElementRowDiv.appendChild(descriptionP);

    const activityLocationP = document.createElement("p");
    activityLocationP.innerHTML = `<strong>Location: </strong>${activity.location}`;
    newElementRowDiv.appendChild(activityLocationP);


    const activityTimeP = document.createElement("p");
    activityTimeP.innerHTML = `<strong>When? </strong>${activity.activityTime.toString()}`;
    newElementRowDiv.appendChild(activityTimeP);


    const activityCreatedTimeP = document.createElement("p");
    activityCreatedTimeP.classList.add("not-important");
    activityCreatedTimeP.innerHTML = `<small>Created: ${activity.dateCreated.toString()}</small>`;
    newElementRowDiv.appendChild(activityCreatedTimeP);


    const activityUpdatedTimeP = document.createElement("p");
    activityUpdatedTimeP.classList.add("not-important");
    activityUpdatedTimeP.innerHTML = `<small>Updated: ${activity.dateUpdated.toString()}</small>`;
    newElementRowDiv.appendChild(activityUpdatedTimeP);
    
    
    const activityTagsDiv = document.createElement("div");
    activityTagsDiv.classList.add("container", "opened-activity-tags");
    for (let tag of activity.tags) {
        const tagButton = document.createElement("button");
        tagButton.classList.add("tag-button");
        tagButton.innerText = tag;
        tagButton.disabled = "disabled";
        activityTagsDiv.appendChild(tagButton);
    }


    newElementRowDiv.appendChild(activityTagsDiv);

    newElementRowDiv.appendChild(document.createElement("br"));
    const dueDateP = document.createElement("p");
    dueDateP.innerHTML = `<strong>You can join until: </strong>${activity.canJoinUntil.toString()}`;
    newElementRowDiv.appendChild(dueDateP);


    const buttonsRowDiv = document.createElement("div");
    buttonsRowDiv.classList.add("blue-buttons-row")
    
    const joinButton = document.createElement("button");
    joinButton.innerText = "Will Join!";
    if ( activity.patricipatingUsers.includes(curUser.getID()) ) {
        joinButton.classList.add("disabled-button");
        joinButton.disabled = "disabled";
    }
    else {
        joinButton.classList.add("green-button");
    }
    joinButton.addEventListener("click", () => joinButtonClicked(activity));

    buttonsRowDiv.appendChild(joinButton);

    const closeButton = document.createElement("button");
    closeButton.classList.add("green-button");
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", () => {
        const oldElement = document.getElementById(activity.id);
        oldElement.parentNode.replaceChild(generateActivityListItem(activity), oldElement);
    });

    buttonsRowDiv.appendChild(closeButton);

    newElementRowDiv.appendChild(buttonsRowDiv);

    const commentSectionContainer = document.createElement("div");
    commentSectionContainer.classList.add("container");

    renderComments(commentSectionContainer, activity);
    
    newElementRowDiv.appendChild(commentSectionContainer);
    
    const oldElement = document.getElementById(activity.id);

    if ( oldElement ) {
        oldElement.replaceWith(newElementRowDiv);
    }
    else {
        const newActivityH = document.createElement("h1");
        newActivityH.id = "new-activity-h";
        newActivityH.innerText = "New Activity:";

        document.getElementById("create-page-container").appendChild(newActivityH);
        document.getElementById("create-page-container").appendChild(newElementRowDiv);
    }
}

function generateInputField(label, inputType, element) {
    const inputRow = document.createElement("div");
    inputRow.classList.add("row");

    const input = document.createElement("input");
    input.classList.add("entry-field-new-activity", "col-8");
    input.id = label.toLowerCase().split(" ").join("-");
    input.type = inputType;

    const labelEl = document.createElement("label");
    labelEl.classList.add("col-3");
    labelEl.for = label.toLowerCase().split(" ").join("-");
    labelEl.innerHTML = `<strong>${label}: </strong>`;

    inputRow.appendChild(labelEl);
    inputRow.appendChild(input);

    element.appendChild(inputRow);

    return input;
}

function createActivityButtonClicked() {
    renderMainPageHeader();

    const mainPageButton = document.createElement("button");
    mainPageButton.id = "main-page-button";
    mainPageButton.classList.add("col-3", "regular-button");
    mainPageButton.innerText = "Main page";
    mainPageButton.addEventListener("click", () => renderMainScreen(activities));

    document.getElementById("create-activity-button").replaceWith(mainPageButton);
    

    const createPageContainer = document.createElement("div");
    createPageContainer.classList.add("row", "container");
    createPageContainer.id = "create-page-container";
    
    const id = activities.length;
    const img = generateInputField("Image link", "text", createPageContainer);
    const name = generateInputField("Name", "text", createPageContainer);
    const by = curUser.getID();
    const patricipatingUsers = [curUser.getID()];
    const numParticipantsNeeded = generateInputField("Participants needed", "text", createPageContainer);
    const description = generateInputField("Description", "text", createPageContainer);
    const location = generateInputField("Location", "text", createPageContainer);
    const when = generateInputField("When", "date", createPageContainer);

    const today = new Date();

    const created = today.toISOString();
    const updated = today.toISOString();
    const tags = generateInputField("tags", "text", createPageContainer);
    const dueDate = generateInputField("Latest date to join", "date", createPageContainer);
    const comments = [];


    const createButton = document.createElement("button");
    createButton.classList.add("green-button", "col-4");
    createButton.innerText = "Create";
    createButton.addEventListener("click", () => {
        const newActivity = new Activity(id, name.value, by, created, updated, when.value, numParticipantsNeeded.value, 
            patricipatingUsers, dueDate.value, location.value, img.value, tags.value.split(" "), description.value, comments);
        if ( newActivity.allValuesAssigned() ){
            activities.push(newActivity);
            renderOpenedActivity(newActivity);
        }
        else{
            const incorrectEntryAlert =  document.getElementById("incorrect-entry-alert");
            if ( incorrectEntryAlert ) {
                incorrectEntryAlert.remove();
            }
            const alertTextP = document.createElement("p");
            alertTextP.id = "incorrect-entry-alert";
            alertTextP.classList.add("alert-text");
            alertTextP.innerText="Invalid values were given";
            document.getElementById("create-page-container").appendChild(alertTextP);
            return;
        }
    });


    createPageContainer.appendChild(createButton);

    document.getElementById("main-container").appendChild(createPageContainer);


}

function myActivitiesButtonClicked() {
    const mainPageButton = document.createElement("button");
    mainPageButton.id = "main-page-button";
    mainPageButton.classList.add("col-3", "regular-button");
    mainPageButton.innerText = "Main page";
    mainPageButton.addEventListener("click", () => renderMainScreen(activities));

    renderMainScreen(activities.filter((activity) => {
        return activity.patricipatingUsers.includes(curUser.getID());
    }));

    document.getElementById("my-activities-button").replaceWith(mainPageButton);
}

function savePasswordButtonClicked() {
    const incorrectSignupAlert =  document.getElementById("incorrect-signup-alert");
    if ( incorrectSignupAlert ) {
        incorrectSignupAlert.remove();
    }

    const oldPasswordInputObj = document.getElementById("old-password-input");
    const newPasswordInputObj = document.getElementById("new-password-input");
    const confirmPasswordInputObj = document.getElementById("confirm-password-input");

    const alertTextP = document.createElement("p");
    alertTextP.id = "incorrect-signup-alert";
    alertTextP.classList.add("alert-text", "align-self-center");
    
    if ( !curUser.checkInfo(curUser.getUsername(), oldPasswordInputObj.value) ) {
        alertTextP.innerText = "Old password is incorrect";
        document.getElementById("signup-container").appendChild(alertTextP);
        oldPasswordInputObj.value = "";
        return;
    }

    if ( newPasswordInputObj.value.length < 5 ) {
        alertTextP.innerText = "New password should have at least 5 characters";
        document.getElementById("signup-container").appendChild(alertTextP);
        newPasswordInputObj.value = "";
        confirmPasswordInputObj.value = "";
        return;
    }

    if ( newPasswordInputObj.value !== confirmPasswordInputObj.value ) {
        alertTextP.innerText = "New passwords do not match";
        document.getElementById("signup-container").appendChild(alertTextP);
        newPasswordInputObj.value = "";
        confirmPasswordInputObj.value = "";
        return;
    }

    console.log(curUser.setPassword(curUser.getUsername(), document.getElementById("old-password-input").value, 
    document.getElementById("new-password-input").value));
    renderMainScreen(activities);
}

function renderChangePasswordScreen() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";


    const appNameH = document.createElement("h1");
    appNameH.innerHTML = "<em>GroupFinder</em>";
    appNameH.id = "app-name-login";
    mainContainer.appendChild(appNameH);


    const newPasswordContainer = document.createElement("div");
    newPasswordContainer.id = "signup-container";
    newPasswordContainer.classList.add("container");


    const changePasswordH = document.createElement("h2");
    changePasswordH.innerText = "Change password";
    changePasswordH.id = "change-password-header"
    newPasswordContainer.appendChild(changePasswordH); 


    const oldPasswordRowDiv = document.createElement("div");
    oldPasswordRowDiv.classList.add("row");

    const oldPasswordInput = document.createElement("input");
    oldPasswordInput.id = "old-password-input";
    oldPasswordInput.type = "password";
    oldPasswordInput.classList.add("col-6", "entry-field");

    const oldPasswordLabel = document.createElement("label");
    oldPasswordLabel.for = "old-password-input";
    oldPasswordLabel.classList.add("col-5");
    oldPasswordLabel.innerHTML = "<strong>Old password:</strong>";

    oldPasswordRowDiv.appendChild(oldPasswordLabel);
    oldPasswordRowDiv.appendChild(oldPasswordInput);



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


    const buttonsRowDiv = document.createElement("div");
    buttonsRowDiv.classList.add("row", "login-buttons-row");

    const backButton = document.createElement("button");
    backButton.id = "back-button";
    backButton.classList.add("col-3", "regular-button");
    backButton.innerText = "Back";
    backButton.addEventListener("click", () => renderMainScreen(activities));
    buttonsRowDiv.appendChild(backButton);

    const saveButton = document.createElement("button");
    saveButton.id = "save-password-button";
    saveButton.classList.add("col-3", "regular-button");
    saveButton.innerText = "Save";
    saveButton.addEventListener("click", savePasswordButtonClicked);
    buttonsRowDiv.appendChild(saveButton);



    newPasswordContainer.appendChild(oldPasswordRowDiv);
    newPasswordContainer.appendChild(newPasswordRowDiv);
    newPasswordContainer.appendChild(confirmPasswordRowDiv);
    newPasswordContainer.appendChild(buttonsRowDiv);



    mainContainer.appendChild(newPasswordContainer);
}

function renderMainPageHeader() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";



    const headerMenuContainer = document.createElement("div");
    headerMenuContainer.id = "header-menu-container";
    headerMenuContainer.classList.add("row");


    const appNameH = document.createElement("h1");
    appNameH.innerHTML = "<em>GroupFinder</em>";
    appNameH.classList.add("col-2");
    headerMenuContainer.appendChild(appNameH);


    const usernameButton = document.createElement("button");
    usernameButton.id = "username-button";
    usernameButton.classList.add("col-2");
    usernameButton.innerHTML = `<u>${curUser.getUsername()}</u>`;
    usernameButton.addEventListener("click", renderChangePasswordScreen);
    headerMenuContainer.appendChild(usernameButton);



    const logoutButton = document.createElement("button");
    logoutButton.id = "logout-button";
    logoutButton.classList.add("col-2", "regular-button");
    logoutButton.innerText = "Log out";
    logoutButton.addEventListener("click", () => {
        curUser = null;
        renderLoginScreen();
    });
    headerMenuContainer.appendChild(logoutButton);



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

function renderMainScreen(activitiesArr) {
    renderMainPageHeader();

    const activitiesContainer = document.createElement("div");
    activitiesContainer.id = "activities-container";
    activitiesContainer.classList.add("container");

    for (let activity of activitiesArr) {
        activitiesContainer.appendChild(generateActivityListItem(activity));
    }

    document.getElementById("main-container").appendChild(activitiesContainer);
}

function completeLogin(userID) {
    for (let user of users) {
        if (user.getID() === userID){
            curUser = user;
        }
    }
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
        alertTextP.innerText = "Username should have at least 5 characters";
        document.getElementById("signup-container").appendChild(alertTextP);
        newUsernameInputObj.value = "";
        return;
    }

    for (let user of users) {
        if ( user.getUsername() === newUsernameInputObj.value ) {
            alertTextP.innerText = "This username already exists";
            document.getElementById("signup-container").appendChild(alertTextP);
            newUsernameInputObj.value = "";
            return;
        }
    }

    if ( newPasswordInputObj.value.length < 5 ) {
        alertTextP.innerText = "Password should have at least 5 characters";
        document.getElementById("signup-container").appendChild(alertTextP);
        newPasswordInputObj.value = "";
        confirmPasswordInputObj.value = "";
        return;
    }

    if ( newPasswordInputObj.value !== confirmPasswordInputObj.value ) {
        alertTextP.innerText = "Passwords do not match";
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



    const appNameH = document.createElement("h1");
    appNameH.innerHTML = "<em>GroupFinder</em>";
    appNameH.id = "app-name-login";
    mainContainer.appendChild(appNameH);



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


    const buttonsRowDiv = document.createElement("div");
    buttonsRowDiv.classList.add("row", "login-buttons-row");

    const backButton = document.createElement("button");
    backButton.id = "back-button";
    backButton.classList.add("col-3", "regular-button");
    backButton.innerText = "Back";
    backButton.addEventListener("click", renderLoginScreen);
    buttonsRowDiv.appendChild(backButton);

    const secondSignupButton = document.createElement("button");
    secondSignupButton.id = "second-signup-button";
    secondSignupButton.classList.add("col-3", "regular-button");
    secondSignupButton.innerText = "Sign up";
    secondSignupButton.addEventListener("click", secondSignupButtonClicked);
    buttonsRowDiv.appendChild(secondSignupButton);



    signupContainer.appendChild(newUsernameRowDiv);
    signupContainer.appendChild(newPasswordRowDiv);
    signupContainer.appendChild(confirmPasswordRowDiv);
    signupContainer.appendChild(buttonsRowDiv);



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
    renderMainScreen(activities);
}

function renderLoginScreen() {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";

    const appNameH = document.createElement("h1");
    appNameH.innerHTML = "<em>GroupFinder</em>";
    appNameH.id = "app-name-login";
    mainContainer.appendChild(appNameH);



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
    signupButtonLabel.classList.add("col-7", "align-self-center");
    signupButtonLabel.innerHTML = "<small>Don't have an account yet?</small>";

    signupRowDiv.appendChild(signupButtonLabel);
    signupRowDiv.appendChild(signupButton);



    loginContainer.appendChild(usernameRowDiv);
    loginContainer.appendChild(passwordRowDiv);
    loginContainer.appendChild(loginButton);
    loginContainer.appendChild(signupRowDiv);


    
    mainContainer.appendChild(loginContainer);
}


generateUsers();
generateActivities();

renderLoginScreen();