# *Individual group* - GroupFinder
## Team Overview
* Makar Pronin
    * GitHub username: [`MakarProninQ`](https://github.com/MakarProninQ)
## Application Idea
People who want to make friends or form a group for some activity such as computer game, hiking, playing chess, reading, or some project often use social networks such as Reddit, Discord, or Facebook that are not very suitable for this. On these websites, such requests often go unnoticed. So, I decided to make an application that serves that purpose.

My application will allow users to form groups for activities and hobbies. One user will create a group and description for it, and then others can join it. Users will also be able to comment and ask questions about the activity.

This application will help people to make friends and facilitate cooperation.

I got inspiration from Xbox live, where people can post a request to form a group to play. I thought it could apply to other activities too.

## Functionality
First, the application will ask for a username and password. Then, the user will see the header with "username", "log out", "my activities", "create activity" buttons and a list of posted activities. Each activity will have a name (Ex: Hiking), tags, progress bar for a number of participants, and one small related image. Once the user clicks on one of the activities, a longer description, tags, dates (created, updated, last day to join, date for activity), and comment section will appear. User can load more comments or write his own comment by clicking on special buttons at the bottom. Users will be able to see the number of people that are going to join and the number of participants needed. There is a aslo a button to join the activity.

Csername button (header) allows to change the password.

Log out button (header) clears local storage and logs the user out.

My activities  button (header) shows the activities the user is planning to join.

Create activity button (header) allows to create a new activity.

# Link to the video: https://www.loom.com/share/cb486ff5290c4ca1a0347a45fd677c06



### Login Screen Buttons:
    sign up -> sign up screen 
    log in (username, password) -> main screen

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img1.jpg" width="550" height="350" />


### Sign Up Screen Buttons:
    sign up (newUsername, newPassword, confirmPassword) -> main screen (new account created)
    back -> login screen

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img2.jpg" width="550" height="350" />

### Main Screen Header Buttons:
    username -> change password screen
    log out -> log in screen (local storage cleared);
    my activities -> my activities screen (screen with activities that the user is going to join)
    create activity -> create activity screen (where activities can be created and posted)

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img3.jpg" width="550" height="350" />

### Change Password Screen Buttons:
    main page -> main screen
    save (old password, newPassword, confirmPassword) -> main screen

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img6.jpg" width="550" height="350" />


### My Activities Screen Buttons:
    activity -> opened activity
    main page -> main screen

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img7.jpg" width="550" height="350" />

### Create Activity Screen Buttons:
    create (dates, img, tags, description...) -> create activity screen (new activity appears on the screen)
    main page -> main screen

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img8.jpg" width="550" height="350" />

### Main Screen Buttons:
    activity -> opened activity.

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img3.jpg" width="550" height="350" />

### Opened Activity Buttons:
    join - > main screen   (updates activity)
    close -> main screen
    load more comments -> opened activity
    write a comment (text) -> opened activity

<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img4.jpg" width="550" height="350" />
<img src="https://github.com/MakarProninQ/cs326-project-Individual_group/blob/4a4ff50b8473143603773ec129ee01c4be0b6794/docs/Screenshots/img5.jpg" width="550" height="350" />

Almost every button corresponds to some other type of input (like username and password, or dates).


**Data:**
### Activity data:
* id           : number                                 -activity id
* name         : string                                 -activity name
* createdBy    : number (userID)                        -user who posted this activity
* dateCreated  : date                                   -date of creation of this activity
* dateUpdated  : date                                   -last time when this activity was updated
* activityTime          : date                          -date when activity scheduled
* numParticipantsNeeded : number                        -number of participants needed for this activity
* patricipatingUsers    : numer[] (userID's)            -ID's of users who are planning to join
* canJoinUntil : date                                   -users can join until this time (activity will be deleted after)
* location     : string                                 -location for this activity
* image        : string (src)                           -image for this activity
* tags         : string[]                               -tags (single words) for this activity
* description  : String                                 -long description for this activity
* comments     : object {userID: number, text: string}  -comments left by users under this activity
### User data:
* userID       : number                                 -ID of sthe given user
* username     : string                                 -username of the given user
* password     : string (private)                       -password of the given user