import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import database from './database.js';
import logger from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const app = express();
const port = process.env.PORT || 3000;

const sessionConfig = {
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
};

app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client'));
app.use(logger('dev'));
auth.configure(app);

function checkLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/login', (req, res) => {
    res.sendFile('client', { root: __dirname })
});

app.post('/login', auth.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/login',
    })
);

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err); 
        }
        res.redirect('/login');
    });
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const dbRes = await users.addUser(username, password);
    res.status(200).json(dbRes);
});

app.get('/private', checkLoggedIn, (req, res) => {
        res.redirect('/private/' + req.user._id.valueOf());
    }
);

app.get('/private/:userID/', checkLoggedIn, (req, res) => {
    res.status(200).json( {userId: req.params.userID} );
});

app.get('/private/:userID/user/get20MyActivities', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const q = req.query;
            const activities = await users.get20MyActivities( q.lastActivityId, req.params.userID);
            res.status(200).json( activities );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.get('/private/:userID/activities/getNext20', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const q = req.query;
            const activities = await database.getNext20ActivitiesByFieldValue( q.lastActivityId, q.field, q.value );
            res.status(200).json( activities );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.post('/private/:userID/user/changePassword', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const user = req.user;
            if (user.password !== req.body.oldPassword){
                res.status(200).json( {err: "incorrect password"} );
            }
            else {
                user.password =  req.body.newPassword;
                await users.changePassword(user._id, user.password);
                res.status(200).json( {status: "success"} );     
            }
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.post('/private/:userID/user/updateMyActivities', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const user = req.user;
            user.myActivities.push( req.body.activityId );
            await users.addMyActivity(user._id, user.myActivities);
            res.status(200).json( {status: "success"} );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.post('/private/:userID/activities/addComment', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            await database.addComment(  req.body.activityId, req.body.comment );
            res.status(200).json( {status: "success"} );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.post('/private/:userID/activities/addOne', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const activityId = await database.addActivity( req.body );
            const activityObj = await database.getActivityById( activityId.valueOf() );
            res.status(200).json( activityObj );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.delete('/private/:userID/activities/deleteOne', async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            await database.deleteActivity( req.body.activityId );
            res.status(200).json( { status: "success" } );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.get('*', (req, res) => {
    res.send('Error');
});
      
app.listen(port, () => {
    console.log(`App now listening at http://localhost:${port}`);
});

