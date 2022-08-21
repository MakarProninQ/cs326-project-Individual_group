import e from 'express';
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
        const userObj = {username: username, password: password, attemptsNum: 0, myActivities: []};

        const retObj = {};
        const exists = await this.findUser(username);
        if (exists) {
            retObj.err = "username exists";
        }
        else {
            await this.db.addUser(userObj);
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

    async addMyActivity(userIdObj, activityIdsArr) {
        await this.db.usersColl.updateOne({_id: userIdObj}, {$set: {myActivities: activityIdsArr}});
    }

    async changePassword(userIdObj, newPassword) {
        await this.db.usersColl.updateOne({_id: userIdObj}, {$set: {password: newPassword}});
    }

    async get20MyActivities(activityId, userId) {
        const user = await this.getUserById(userId);
        let retArr = [];
        let activitiesArr = [];
        if ( user.myActivities ) {
            activitiesArr = user.myActivities;
        }

        let startIndex = 0;
        if ( activityId ) {
            startIndex = activitiesArr.indexOf(activityId) + 1; 
        } 

        for (let i = startIndex; i < startIndex + 20 && i < activitiesArr.length; ++i){
            const newActivity = await this.db.getActivityById(activitiesArr[i])
            retArr.push(newActivity);
        }
        return retArr;
    }
}
  
export default new Users();