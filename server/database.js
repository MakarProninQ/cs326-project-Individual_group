import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class Database {
    constructor() {
        this.dburl = process.env.DATABASE_URL;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        this.db = this.client.db('database');

        await this.init();
    }

    async init() {
        this.usersColl = this.db.collection('users');
        this.activitiesColl = this.db.collection('activities');
    }

    async close() {
        this.client.close();
    }

    async addActivity(activityObj) {
        activityObj._id = await this.activitiesColl.countDocuments( {} ) + 1;
        const res = await this.activitiesColl.insertOne( activityObj );
        return res;
    }
    
    async deleteActivity(activityID) {
        const res = await this.activitiesColl.deleteOne({ _id: activityID});
        return res;
    }

    async readNext10ActivitiesWithFieldValue(activityID, field, value) {
        const queryCriteriaObj  = { _id: { $gt: activityID }};

        if (field !== null && value !== null) {
            queryCriteriaObj[field] = value;
        }

        const activities = await this.activitiesColl.find( queryCriteriaObj ).limit(10).toArray();
        return activities;
    }
}