export class Renderer {
    constructor(maxRenderActivitiesNum) {
        this.openedActivity = null;
        this.numCommentsLoaded = 0;
        this.lastActivityId = "";
        this.maxRenderActivitiesNum = maxRenderActivitiesNum;
    }

    /**
     * This function loads one comment box (username + comment).
     * 
     * @param {HTMLElement} element - HTML element, where comment will be rendered.
     * @param {comment} comment - {userID: number, text: string} object.
     */
    loadNewComment(element, comment) {
        const commentRowDiv = document.createElement("div");
        commentRowDiv.classList.add("row", "comment");

        const activityUsernameP = document.createElement("p");
        activityUsernameP.innerHTML = `<u>${comment.username}</u>`;
        commentRowDiv.appendChild(activityUsernameP);

        const commentP = document.createElement("p");
        commentP.innerText = comment.text;
        commentRowDiv.appendChild(commentP);

        element.appendChild(commentRowDiv);
    }

    /**
     * This function loads at most 5 comments using function loadNewComment(). 
     * Mostly used after click of button "Load more comments". If there are less then 5 comments left, displays all comments.
     * 
     * @param {HTMLElement} element - HTML element, where comments will be rendered.
     */
    loadMoreComments(element) {
        
        let i = this.numCommentsLoaded;

        while (i < this.numCommentsLoaded + 5 && i < this.openedActivity.comments.length) {
            this.loadNewComment(element, this.openedActivity.comments[i]);
            ++i;
        }
        
        this.numCommentsLoaded = i;

        const loadCommentsButton = document.getElementById("load-comments-button");
        if ( i === this.openedActivity.comments.length && loadCommentsButton) {
            loadCommentsButton.remove();
        }
    }

    /**
     * This function builds a container for comment section. It adds one button (and text input box) to write new comment, and one to 
     * load more comments. It also displays initial comments (<=5) using loadMoreComments().
     * 
     * @param {HTMLElement} element - HTML element, where comment section (container) will be rendered.
     */
    renderComments(element) {
        const commentsContainer = document.createElement("div");
        commentsContainer.classList.add("container");
        commentsContainer.id = "comments-container";

        this.loadMoreComments(commentsContainer);
        element.appendChild(commentsContainer);

        if ( this.openedActivity.comments.length > 5 ) {
            const loadCommentsButton = document.createElement("button");
            loadCommentsButton.classList.add("regular-button");
            loadCommentsButton.id = "load-comments-button";
            loadCommentsButton.innerText = "Load more comments";
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
        element.appendChild(addCommentButton);
    }

    /**
     * This function generates activity list item, so that it can be later rendered. Activity list item only includes image, activity name,
     * tags, number of participants.
     * 
     * @param {Activity} activity - list item for this activity will be rendered.
     * 
     * @returns {HTMLElement} - activity list item that can be later rendered.
     */
    generateActivityListItem(activity) {
        const activityRowButton = document.createElement("button");
        activityRowButton.classList.add("row", "activities-list-item");
        activityRowButton.id = activity._id;


        const activityImg = document.createElement("img");
        activityImg.classList.add("col-3", "activity-list-img");
        activityImg.src = activity.imgUrl;

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

        this.lastActivityId = activity._id;


        return activityRowButton;
    }

    /**
     * This function replaces small activity list item with much bigger opened list item. 
     * New item displays all the information about the activity. This function also calls renderComments() for comment section.
     * 
     * @param {Activity} activity - this activity is displayed.
     */
    renderOpenedActivity(activity, curUsername) {
        this.openedActivity = activity;
        this.numCommentsLoaded = 0;
        
        const newElementRowDiv = document.createElement("div");
        newElementRowDiv.classList.add("row", "container");
        newElementRowDiv.id = "opened-activity-item";


        const activityImg = document.createElement("img");
        activityImg.classList.add("opened-activity-img");
        activityImg.src = activity.imgUrl;
        newElementRowDiv.appendChild(activityImg);


        const activityNameH = document.createElement("h1");
        activityNameH.innerText = activity.name;
        newElementRowDiv.appendChild(activityNameH);

        const activityUsernameP = document.createElement("p");
        activityUsernameP.innerHTML = `<strong>By: </strong><u>${activity.by}</u>`;
        newElementRowDiv.appendChild(activityUsernameP);


        const participantsNumP = document.createElement("p");
        participantsNumP.innerHTML = `<strong>Participants: ${activity.patricipatingUsers.length}/${activity.numParticipantsNeeded}</strong>`;

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
        activityTimeP.innerHTML = `<strong>When? </strong>${activity.when}`;
        newElementRowDiv.appendChild(activityTimeP);


        const activityCreatedTimeP = document.createElement("p");
        activityCreatedTimeP.classList.add("not-important");
        activityCreatedTimeP.innerHTML = `<small>Created: ${activity.created}</small>`;
        newElementRowDiv.appendChild(activityCreatedTimeP);


        const activityUpdatedTimeP = document.createElement("p");
        activityUpdatedTimeP.classList.add("not-important");
        activityUpdatedTimeP.innerHTML = `<small>Updated: ${activity.updated}</small>`;
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
        dueDateP.innerHTML = `<strong>You can join until: </strong>${activity.dueDate}`;
        newElementRowDiv.appendChild(dueDateP);


        const buttonsRowDiv = document.createElement("div");
        buttonsRowDiv.classList.add("blue-buttons-row")
        
        const joinButton = document.createElement("button");
        joinButton.id = "join-button";
        joinButton.innerText = "Will Join!";
        if ( activity.patricipatingUsers.includes(curUsername) ) {
            joinButton.classList.add("disabled-button");
            joinButton.disabled = "disabled";
        }
        else {
            joinButton.classList.add("green-button");
        }
        buttonsRowDiv.appendChild(joinButton);

        const closeButton = document.createElement("button");
        closeButton.classList.add("green-button");
        closeButton.id = "close-button";
        closeButton.innerHTML = "Close";

        buttonsRowDiv.appendChild(closeButton);

        newElementRowDiv.appendChild(buttonsRowDiv);

        const commentSectionContainer = document.createElement("div");
        commentSectionContainer.classList.add("container");
        commentSectionContainer.id = "comment-section-container";

        this.renderComments(commentSectionContainer, activity);
        
        newElementRowDiv.appendChild(commentSectionContainer);
        
        const oldElement = document.getElementById(activity._id);

        if ( oldElement ) {
            oldElement.replaceWith(newElementRowDiv);
        }
        else {
            if (!document.getElementById("new-activity-h")) {
                const newActivityH = document.createElement("h1");
                newActivityH.id = "new-activity-h";
                newActivityH.innerText = "New Activity:";
                document.getElementById("create-page-container").appendChild(newActivityH);
            }

            document.getElementById("create-page-container").appendChild(newElementRowDiv);
        }
    }

    /**
     * This function makes it easier to create identical input fields.
     * 
     * @param {string} label - text before the input field. (id for input is also based on that label);
     * @param {string} inputType - input type (Ex: data or text).
     * @param {HTMLElement} element - where fields will be rendered.
     * 
     * @returns {HTMLElement} - object that can return a value of the input.
     */
    generateInputField(label, inputType, element) {
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

    /**
     * This function displays a new page that allows to post a new activity. It uses genereateInputField() to get big amount of data from 
     * the user. User who created the activity automatically joins it.
     * 
     */
    renderCreateActivityPage(curUsername) {
        this.renderMainPageHeader(curUsername);

        const mainPageButton = document.createElement("button");
        mainPageButton.id = "main-page-button";
        mainPageButton.classList.add("col-3", "regular-button");
        mainPageButton.innerText = "Main page";

        document.getElementById("create-activity-button").replaceWith(mainPageButton);
        

        const createPageContainer = document.createElement("div");
        createPageContainer.classList.add("row", "container");
        createPageContainer.id = "create-page-container";

        const createButton = document.createElement("button");
        createButton.classList.add("green-button", "col-4");
        createButton.innerText = "Create";
        createButton.id = "create-button";

        document.getElementById("main-container").appendChild(createPageContainer);

        return () => createPageContainer.appendChild(createButton);
    }

    /**
     * This function displays a new page with all the activities where the user is going to participate. 
     * It uses renderMainScreen(activitiesArr), but activitiesArr is filtered (to get only the activities the user has decided to join).
     * 
     */
    renderMyActivitiesPage(activitiesArr, curUsername) {
        const mainPageButton = document.createElement("button");
        mainPageButton.id = "main-page-button";
        mainPageButton.classList.add("col-3", "regular-button");
        mainPageButton.innerText = "Main page";

        this.renderMainPage(activitiesArr, curUsername);

        document.getElementById("my-activities-button").replaceWith(mainPageButton);
    }

    /**
     * This function that updates the user's password, if user entered correct information.
     * 
     */
    savePasswordButtonClicked() {
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

        renderMainScreen(activities);
    }

    /**
     * This function displays a screen for changing password as a result of a click on username in the header.
     * 
     */
    renderChangePasswordPage() {
        const mainContainer = document.getElementById("main-container");
        mainContainer.innerHTML = "";


        const appNameH = document.createElement("h1");
        appNameH.innerHTML = "<em>GroupFinder</em>";
        appNameH.id = "app-name-login";
        mainContainer.appendChild(appNameH);


        const newPasswordContainer = document.createElement("div");
        newPasswordContainer.id = "change-password-container";
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
        buttonsRowDiv.appendChild(backButton);

        const saveButton = document.createElement("button");
        saveButton.id = "save-password-button";
        saveButton.classList.add("col-3", "regular-button");
        saveButton.innerText = "Save";
        buttonsRowDiv.appendChild(saveButton);


        newPasswordContainer.appendChild(oldPasswordRowDiv);
        newPasswordContainer.appendChild(newPasswordRowDiv);
        newPasswordContainer.appendChild(confirmPasswordRowDiv);
        newPasswordContainer.appendChild(buttonsRowDiv);


        mainContainer.appendChild(newPasswordContainer);
    }

    /**
     * This function displays a header on top of the main screen. Buttons include "username", "Create activity", "My activities", "Log out".
     * 
     */
    renderMainPageHeader(curUsername) {
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
        usernameButton.innerHTML = `<u>${curUsername}</u>`;
        headerMenuContainer.appendChild(usernameButton);


        const logoutButton = document.createElement("button");
        logoutButton.id = "logout-button";
        logoutButton.classList.add("col-2", "regular-button");
        logoutButton.innerText = "Log out";
        headerMenuContainer.appendChild(logoutButton);


        const myActivitiesButton = document.createElement("button");
        myActivitiesButton.id = "my-activities-button";
        myActivitiesButton.classList.add("col-3", "regular-button");
        myActivitiesButton.innerText = "My activities";
        headerMenuContainer.appendChild(myActivitiesButton);


        const createActivityButton = document.createElement("button");
        createActivityButton.id = "create-activity-button";
        createActivityButton.classList.add("col-3", "regular-button");
        createActivityButton.innerText = "Create activity";
        headerMenuContainer.appendChild(createActivityButton);
        
        
        mainContainer.appendChild(headerMenuContainer);
    }

    /**
     * This function renders main screen with the header and activities from activitiesArr. It uses renderMainPageHeader(), 
     * generateActivityListItem().
     * 
     * @param {Activity[]} - activities that should be displayed.
     */
    renderMainPage(activitiesArr, curUsername) {
        this.renderMainPageHeader(curUsername);

        const activitiesContainer = document.createElement("div");
        activitiesContainer.id = "activities-container";
        activitiesContainer.classList.add("container");

        let i = 0;

        while (i < this.maxRenderActivitiesNum && i < activitiesArr.length) {
            activitiesContainer.appendChild(this.generateActivityListItem(activitiesArr[i]));
            ++i;
        }

        this.renderLoadMoreButton(activitiesArr.length, activitiesContainer);

        document.getElementById("main-container").appendChild(activitiesContainer);
    }

    renderLoadMoreButton(activitiesArrLength, activitiesContainer) {
        if (activitiesArrLength > this.maxRenderActivitiesNum) {
            const loadMoreButton = document.createElement("button");
            loadMoreButton.classList.add("green-button");
            loadMoreButton.id = ("load-more-button");
            loadMoreButton.innerText = "Load More";
            activitiesContainer.appendChild(loadMoreButton);
        }
    }

    /**
     * This function renders sign up page after the sign up button on the login screen is clicked.
     * 
     */
    renderSignupPage() {
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
        buttonsRowDiv.appendChild(backButton);

        const secondSignupButton = document.createElement("button");
        secondSignupButton.id = "second-signup-button";
        secondSignupButton.classList.add("col-3", "regular-button");
        secondSignupButton.innerText = "Sign up";
        buttonsRowDiv.appendChild(secondSignupButton);


        signupContainer.appendChild(newUsernameRowDiv);
        signupContainer.appendChild(newPasswordRowDiv);
        signupContainer.appendChild(confirmPasswordRowDiv);
        signupContainer.appendChild(buttonsRowDiv);

        mainContainer.appendChild(signupContainer);
    }

    removeAlertText() {
        const invalidEntryAlert =  document.getElementById("invalid-entry-alert");
        if ( invalidEntryAlert ) {
            invalidEntryAlert.remove();
        }
    }

    renderAlertText(text, element) {
        this.removeAlertText();
        
        const alertTextP = document.createElement("p");
        alertTextP.id = "invalid-entry-alert";
        alertTextP.classList.add("alert-text", "align-self-center");

        alertTextP.innerText = text;
        element.appendChild(alertTextP);
    }

    /**
     * This function renders the log in page.
     * 
     */
    renderLoginPage() {
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


        const signupRowDiv = document.createElement("div");
        signupRowDiv.classList.add("row");

        const signupButton = document.createElement("button");
        signupButton.id = "signup-button";
        signupButton.classList.add("col-3", "regular-button");
        signupButton.innerText = "Sign up";

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

}