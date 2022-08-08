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
    const newActivity1 = new Activity(activities.length, "Chess", 0, new Date('December 17, 2021 03:24:00'), 
    new Date('August 1, 2022 15:24:54'), new Date('August 10, 2022 03:24:00'), 10, 3, new Date('August 9, 2022 03:24:00'), "Amherst",
    "https://media.wired.com/photos/624603c1a288ab4bb7de366a/16:9/w_2155,h_1212,c_limit/Learn-Chess-Online-Gear-1053741472.jpg", ["chess", "#smart", "board games"],
    "I don't like writing descriptions", [{"0": "I wrote this comment"}, {"1": "chess is boring"}]);

    const newActivity2 = new Activity(activities.length, "Hiking", 1, new Date('December 18, 2021 03:24:00'), 
    new Date('August 2, 2022 03:24:00'), new Date('August 11, 2022 03:24:00'), 10, 0, new Date('August 9, 2022 13:45:00'), "Amherst",
    "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325466_1100-800x825.jpg", ["hiking", "health"],
    "I don't like writing descriptions", [{"2": "Health is important"}, {"3": "Hiking is great!"}]);
    
    const newActivity3 = new Activity(activities.length, "Sea of Thieves", 2, new Date('December 19, 2021 07:24:00'), 
    new Date('August 3, 2022 03:24:00'), new Date('August 12, 2022 04:31:00'), 4, 3, new Date('August 9, 2022 03:24:37'), "Springfield",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/ss_db93a181951437ffb3f7c2a45d0cb8351e1d8fc1.1920x1080.jpg?t=1659649089", ["computer games", "pirates"],
    "I don't like writing descriptions", [{"3": "Love Sea of Thieves"}, {"0": "BEST GAME!!!"}]);

    const newActivity4 = new Activity(activities.length, "App Development", 3, new Date('December 20, 2021 11:24:00'), 
    new Date('August 4, 2022 05:26:00'), new Date('August 13, 2022 03:24:00'), 5, 2, new Date('August 9, 2022 03:24:00'), "New York",
    "https://www.vaival.com/wp-content/uploads/2021/01/vaival-application.png", ["CS", "job"],
    "I don't like writing descriptions", [{"4": "Post this here?"}, {"1": "Why not?"}]);

    const newActivity5 = new Activity(activities.length, "GTA V", 4, new Date('December 21, 2021 03:15:00'), 
    new Date('August 5, 2022 03:24:00'), new Date('August 14, 2022 04:24:00'), 32, 28, new Date('August 9, 2022 21:32:00'), "Boston",
    "https://media-rockstargames-com.akamaized.net/tina-uploads/posts/172872k8a375k8/c1964d6dfe37619793cf9eb073deff3d0719fe00.jpg", ["computer games", "fun"],
    "I don't like writing descriptions", [{"1": "I wrote this comment"}, {"4": "chess is boring"}]);

    const newActivity6 = new Activity(activities.length, "Battlefield2042", 4, new Date('December 21, 2021 03:15:00'), 
    new Date('August 5, 2022 03:24:00'), new Date('August 14, 2022 04:24:00'), 32, 28, new Date('August 9, 2022 21:32:00'), "Boston",
    "https://sportshub.cbsistatic.com/i/2021/12/05/82745ad0-0f76-46a8-9a4d-29657b5efe3a/battlefield-2042.png", ["computer games", "fun",
     "shooter", "battle"], "I don't like writing descriptions", [{"1": "I wrote this comment"}, {"4": "chess is boring"}]);

    const newActivity7 = new Activity(activities.length, "Survey", 3, new Date('December 21, 2021 03:15:00'), 
    new Date('August 5, 2022 03:24:00'), new Date('August 14, 2022 04:24:00'), 100, 15, new Date('August 9, 2022 21:32:00'), "Springfield",
    "https://getthematic.com/insights/content/images/wordpress/2018/04/shutterstock_730381336.jpg", ["science"],
    "I don't like writing descriptions", [{"1": "I wrote this comment"}, {"4": "chess is boring"}]);
    
    const newActivity8 = new Activity(activities.length, "GTA 4", 4, new Date('December 21, 2021 03:15:00'), 
    new Date('August 5, 2022 03:24:00'), new Date('August 14, 2022 04:24:00'), 32, 28, new Date('August 9, 2022 21:32:00'), "Boston",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8I6dtGm6rp47afFCwocJn1csy8NxTZShhog&usqp=CAU", ["computer games", "fun", "old games"],
    "I don't like writing descriptions", [{"1": "I wrote this comment"}, {"4": "chess is boring"}]);

    activities.push(newActivity1);
    activities.push(newActivity2);
    activities.push(newActivity3);
    activities.push(newActivity4);
    activities.push(newActivity5);
    activities.push(newActivity6);
    activities.push(newActivity7);
    activities.push(newActivity8);
}




















function renderActivityListItem(element, activity) {
    const activityRowButton = document.createElement("button");
    activityRowButton.classList.add("row", "activities-list-item");
    activityRowButton.id = activity.id;



    const activityImg = document.createElement("img");
    activityImg.classList.add("col-2");
    activityImg.src = activity.image;

    activityRowButton.appendChild(activityImg);



    const activityNameP = document.createElement("p");
    activityNameP.classList.add("col-4");
    activityNameP.innerHTML = `<strong>${activity.name}</strong>`;

    activityRowButton.appendChild(activityNameP);



    const activityTagsDiv = document.createElement("div");
    activityTagsDiv.classList.add("col-6", "container");
    for (let tag of activity.tags) {
        const tagButton = document.createElement("button");
        tagButton.classList.add("tag-button");
        tagButton.innerText = tag;
        tagButton.disabled = "disabled";
        activityTagsDiv.appendChild(tagButton);
    }

    activityRowButton.appendChild(activityTagsDiv);



    element.appendChild(activityRowButton);
}

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


    const appNameH = document.createElement("h1");
    appNameH.innerHTML = "<em>GroupFinder</em>";
    activities.id = "app-name";
    appNameH.classList.add("col-2");

    headerMenuContainer.appendChild(appNameH);


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

    const activitiesContainer = document.createElement("div");
    activitiesContainer.id = "activities-container";
    activitiesContainer.classList.add("container");

    for (let activity of activities) {
        renderActivityListItem(activitiesContainer, activity);
    }

    document.getElementById("main-container").appendChild(activitiesContainer);
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


generateUsers();
generateActivities();



//const img = document.createElement("img");
//img.src = "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325466_1100-800x825.jpg";

//document.getElementById("main-container").appendChild(img);
renderLoginScreen();
