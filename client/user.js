/**
 * This class stores all the information about the user. Id, username, and password
 * are private.
 *
 */
export class User {
    constructor(){
        let password = null;
        let username = null;
        let userId = null;

        /**
         * This function checks whether the username matches the username of a given user.
         * 
         * @param {string} usernameInput representing username.
         *
         * @returns {boolean} describing whether the username matches.
         */
        this.checkUsername = function(usernameInput) {
            return ( usernameInput === username );
        }

        /**
         * This function checks whether the username and password match the username and password of a given user.
         * This function is very helpful during login verification.
         * 
         * @param {string} usernameInput representing username.
         * @param {string} passwordInput representing password.
         *
         * @returns {boolean} describing whether username and password match.
         */
        this.checkInfo = function (usernameInput, passwordInput) {
            return ( usernameInput === username && passwordInput === password );
        }

        /**
         * This function returns ID of a given user.
         *
         * @returns {number} representing ID of a given user.
         */
        this.getID = function () {
            return userId;
        }

        /**
         * This function changes password after verifying current username and old password.
         * 
         * @param {string} usernameInput representing current username.
         * @param {string} oldPassword representing old password of a given user.
         * @param {string} newPassword representing the new password of a given user.
         *
         * @returns {boolean} describing whether the password has been changed.
         */
        this.setPassword = function (usernameInput, oldPassword, newPassword) {
            if ( this.checkInfo(usernameInput, oldPassword) ) {
                password = newPassword;
                return true;
            }
            else {
                return false;
            }
        }

        /**
         * This function changes username after verifying current password and old username.
         * 
         * @param {string} passwordInput representing current password.
         * @param {string} oldUsername representing old udername of a given user.
         * @param {string} newUsername representing the new username of a given user.
         *
         * @returns {boolean} describing whether the username has been changed.
         */
        this.setUsername = function(passwordInput, oldUsername, newUsername) {
            if ( this.checkInfo(oldUsername, passwordInput) ) {
                username = newUsername;
                return true;
            }
            else {
                return false;
            }
        }

        /**
         * This function returns username of a given user.
         *
         * @returns {string} representing username of a given user.
         */
        this.getUsername = function() {
            return username;
        }

        /**
         * This function sets user ID but only if it has not been assigned yet to the user.
         * 
         * @param {number} newUserId representing a new ID of the given user.
         *
         * @returns {boolean} describing whether a new ID has been set.
         */
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