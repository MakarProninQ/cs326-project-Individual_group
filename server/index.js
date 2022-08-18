import express from 'express';
import logger from 'morgan';
import { Database } from './database.js';

class GroupFinderServer {
    constructor() {
        this.app = express();
    }

    async initRoutes() {
        const self = this;
    
        this.app.post('/Activity/add', async (req, res) => {
            try {
                await self.db.addActivity( req.body );
                res.status(200).json( { status: "success" } );     
            } catch (err) {
                res.status(500).send(err);
            }
        });

        this.app.delete('/Activity/delete', async (req, res) => {
            try {
                await self.db.deleteActivity( req.body.activityId );
                res.status(200).json( { status: "success" } );     
            } catch (err) {
                res.status(500).send(err);
            }
        });

        this.app.get('/Activity/readNext10', async (req, res) => {
            try {
                const q = req.query;
                const activities = await self.db.readNext10ActivitiesWithFieldValue( q.activityId, q.field, q.value );
                res.status(200).json( activities );     
            } catch (err) {
                res.status(500).send(err);
            }
        });
    }

    async initDb() {
        this.db = new Database();
        await this.db.connect();
    }

    async start() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(logger('dev'));
        this.app.use('/', express.static('client'));   
        await this.initRoutes();
        await this.initDb();
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
          console.log(`Server listening on port ${port}!`);
        });
    }
}

const server = new GroupFinderServer();
server.start();