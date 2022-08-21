import e from 'express';
import database from './database.js';

class Users {
    constructor() {
      this.db = database;
    }

    async createUser(username, password) {
        const userObj = {username: username, password: password, attemptsNum: 0, myActivities: []};

        const retObj = {};
        const user = await this.readUserByUsername(username);
        if (user) {
            retObj.err = "username exists";
        }
        else {
            await this.db.createUser(userObj);
            retObj.success = "success";
        }

        return retObj;
    }
  
    async readUserById(userId) {
        const user = await this.db.readUserByFieldValue("_id", userId);
        return user;
    }

    async readUserByUsername(username) {
        const user = await this.db.readUserByFieldValue("username", username);
        return user;
    }

    async readMyActivities(activityId, userId) {
        const user = await this.readUserById(userId);
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
            const newActivity = await this.db.readActivityByFieldValue("_id", activitiesArr[i]);
            retArr.push(newActivity);
        }
        return retArr;
    }

    async updateMyActivities(userId, activityIdsArr) {
        await this.db.updateUser(userId, "myActivities", activityIdsArr);
    }

    async updatePassword(userId, newPassword) {
        await this.db.updateUser(userId, "password", newPassword);
    }

    async updateAttemptsNum(userId, attemptsNum) {
        await this.db.updateUser(userId, "attemptsNum", attemptsNum);
    }
}
  
export default new Users();