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

    async addActivity(activityObj) {
        const res = await this.activitiesColl.insertOne( activityObj );
        return res.insertedId;
    }
    
    async deleteActivity(activityId) {
        const res = await this.activitiesColl.deleteOne( { _id: new ObjectId( activityId ) } );
        return res.deleteCount > 0;
    }

    async getNext20ActivitiesByFieldValue(activityId, field, value) {
        
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

    async getActivityById(activityId) {
        const res = await this.activitiesColl.findOne( { _id: new ObjectId( activityId ) } );
        return res;
    }

    async addComment(activityId, comment) {
        const activity = await this.getActivityById(activityId);
        activity.comments.push(comment);
        await this.activitiesColl.updateOne({_id: new ObjectId( activityId )}, {$set: {comments: activity.comments}});
    }

    async addUser(userObj) {
        const res = await this.usersColl.insertOne( userObj );
        return res.insertedId;
    }

    async getUsersByFieldValue(field, value) {        
        let realValue = value;

        if (field === "_id") {
            realValue = new ObjectId( value );
        }
        
        const queryCriteriaObj = {};

        if ( field && value ) {
            queryCriteriaObj[field] = realValue;
        }

        const users = await this.usersColl.find( queryCriteriaObj ).toArray();
        return users;
    }
}

const database = new Database();
database.connect();
export default database;