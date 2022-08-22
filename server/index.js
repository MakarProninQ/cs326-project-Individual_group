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
    res.sendFile('client', { root: __dirname });
});

app.get('/loginFail', (req, res) => {
    const messages = req.session.messages;
    res.status(200).json({failureMessage: messages[messages.length - 1]});
});

app.post('/login', auth.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/loginFail',
        failureMessage: true,
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
    const dbRes = await users.createUser(username, password);
    res.status(200).json(dbRes);
});

app.get('/private', checkLoggedIn, (req, res) => {
        res.redirect('/private/' + req.user._id.valueOf());
    }
);

app.get('/private/:userID/', checkLoggedIn, (req, res) => {
    res.status(200).json( {userId: req.params.userID} );
});


app.get('/private/:userID/user/readMyActivities', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const q = req.query;
            const activities = await users.readMyActivities( q.lastActivityId, req.params.userID);
            res.status(200).json( activities );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.put('/private/:userID/user/updateMyActivities', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const user = req.user;
            const actId = req.body.activityId;
            user.myActivities.push( actId );
            await users.updateMyActivities(user._id.toString(), user.myActivities);
            const activity = await database.readActivityByFieldValue("_id", actId);
            activity.participatingUsers.push(user.username);
            await database.updateActivity(actId, "participatingUsers", activity.participatingUsers);
            res.status(200).json( {status: "success"} );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.put('/private/:userID/user/updatePassword', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const user = req.user;
            if (user.password !== req.body.oldPassword){
                res.status(200).json( {err: "incorrect password"} );
            }
            else {
                user.password =  req.body.newPassword;
                await users.updatePassword(user._id.toString(), user.password);
                res.status(200).json( {status: "success"} );     
            }
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.delete('/private/:userID/user/delete', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            for (let activityId of req.user.myActivities) {
                const activity = await database.readActivityByFieldValue("_id", activityId);
                if (activity.by === req.user.username) {
                    database.deleteActivity(activityId);
                }
                else {
                    activity.participatingUsers.splice(activity.participatingUsers.indexOf(req.user.username));
                    await database.updateActivity(activityId, "participatingUsers", activity.participatingUsers);
                }
            }
            await users.deleteUser(req.user._id.toString())
            res.status(200).json( {status: "success"} );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/login/');
    }
});


app.post('/private/:userID/activities/create', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const activityId = await database.createActivity( req.body );
            const activityObj = await database.readActivityByFieldValue( "_id", activityId.toString() );
            req.user.myActivities.push(activityId.toString());
            await users.updateMyActivities(req.params.userID, req.user.myActivities);
            res.status(200).json( activityObj );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.get('/private/:userID/activities/readMany', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            const q = req.query;
            const activities = await database.readActivitiesByFieldValue( q.lastActivityId, q.field, q.value );
            res.status(200).json( activities );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.put('/private/:userID/activities/updateComments', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            await database.updateActivity(  req.body.activityId, "comments", req.body.comments );
            res.status(200).json( {status: "success"} );     
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.redirect('/private/');
    }
});

app.delete('/private/:userID/activities/delete', checkLoggedIn, async (req, res) => {
    if ( req.params.userID === req.user._id.toString() ) {
        try {
            await database.deleteActivity(req.body.activityId);
            res.status(200).json( {status: "success"} );     
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

