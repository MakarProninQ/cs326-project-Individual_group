import database from './database.js';

class Users {
    constructor() {
      this.db = database;
    }
  
    async findUser(username) {
        const usersArr = await this.db.getUsersByFieldValue("username", username);
        return usersArr[0];
    }
  
    async validatePassword(username, password) {
        const user = await this.findUser(username);
        if ( !user ) {
            return false;
        }
        if ( user.password !== password ) {
            return false;
        }
        return true;
    }
  
    async addUser(username, password) {
        const userObj = {username: username, password: password, attemptsNum: 0};
        await this.db.addUser(userObj);

        const retObj = {};
        const exists = await this.findUser(username);
        if (exists) {
            retObj.err = "usernameExists";
        }
        else {
            retObj.success = "success";
        }
        
        return retObj;
    }

    async deleteUser(userId) {
        const res = await this.db.deleteUser(userId);
        return res;
    }

    async getUserById(userId) {
        const usersArr = await this.db.getUsersByFieldValue("_id", userId);
        return usersArr[0];
    }
}
  
export default new Users();