import 'dotenv/config';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

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
        return res;
    }
    
    async deleteActivity(activityId) {
        const res = await this.activitiesColl.deleteOne( { _id: new ObjectId( activityId ) } );
        return res;
    }

    async readNext10ActivitiesWithFieldValue(activityId, field, value) {
        
        const queryCriteriaObj = {};
        
        if ( activityId ) {
            queryCriteriaObj._id = { $gt: new ObjectId( activityId ) } ;
        }

        if ( field && value ) {
            queryCriteriaObj[field] = value;
        }

        const activities = await this.activitiesColl.find( queryCriteriaObj ).limit(10).toArray();
        return activities;
    }
}