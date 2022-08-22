import 'dotenv/config';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

class Database {
    constructor() {
        this.dburl = process.env.DATABASE_URL;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        this.db = this.client.db( 'database' );

        await this.init();
    }

    async init() {
        this.usersColl = this.db.collection( 'users' );
        this.activitiesColl = this.db.collection( 'activities' );
    }

    async close() {
        this.client.close();
    }

    async createActivity(activityObj) {
        const res = await this.activitiesColl.insertOne( activityObj );
        return res.insertedId;
    }

    async readActivitiesByFieldValue(activityId, field, value) {
        
        const queryCriteriaObj = {};
        
        if ( activityId ) {
            queryCriteriaObj._id = { $gt: new ObjectId( activityId ) } ;
        }

        if ( field && value ) {
            queryCriteriaObj[field] = value;
        }

        const activities = await this.activitiesColl.find( queryCriteriaObj ).limit(20).toArray();
        return activities;
    }

    async readActivityByFieldValue(field, value) {
        const queryCriteriaObj = {};
        if (field === "_id"){
            queryCriteriaObj._id = new ObjectId( value );
        }
        else {
            queryCriteriaObj[field] = value
        }
        
        const activity = await this.activitiesColl.findOne( queryCriteriaObj );
        return activity;
    }

    async updateActivity(activityId, field, value) {
        const setObj = {};
        setObj[field] = value;
        await this.activitiesColl.updateOne({_id: new ObjectId( activityId )}, {$set: setObj});
    }

    async deleteActivity(activityId) {
        await this.activitiesColl.deleteOne({_id: new ObjectId( activityId )});
    }

    async createUser(userObj) {
        const res = await this.usersColl.insertOne( userObj );
        return res.insertedId;
    }

    async readUserByFieldValue(field, value) {        
        const queryCriteriaObj = {};
        if (field === "_id"){
            queryCriteriaObj._id = new ObjectId( value );
        }
        else {
            queryCriteriaObj[field] = value
        }

        const user = await this.usersColl.findOne( queryCriteriaObj );
        return user;
    }

    async updateUser(userId, field, value) {
        const setObj = {};
        setObj[field] = value;
        await this.usersColl.updateOne({_id: new ObjectId( userId )}, {$set: setObj});
    }

    async deleteUser(userId) {
        await this.usersColl.deleteOne({_id: new ObjectId( userId )});
    }

}

const database = new Database();
database.connect();
export default database;