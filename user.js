export class User {
    constructor(){
        let password = null;
        let username = null;
        let userId = null;

        this.checkInfo = function (usernameInput, passwordInput) {
            return (usernameInput === username, passwordInput === password);
        }

        this.setPassword = function (usernameInput, oldPassword, newPassword) {
            if ( this.checkInfo(usernameInput, oldPassword) ) {
                password = newPassword;
                return true;
            }
            else {
                return false;
            }
        }

        this.setUsername = function(passwordInput, oldUsername, newUsername) {
            if ( this.checkInfo(oldUsername, passwordInput) ) {
                username = newUsername;
                return true;
            }
            else {
                return false;
            }
        }

        this.getUsername = function() {
            return this.username;
        }

        this.setUserId = function(newUserId) {
            if ( userId === null ) {
                userId = newUserId;
                return true;
            }
            else {
                return false;
            }
        }
    }
}