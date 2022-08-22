import passport from 'passport';
import passportLocal from 'passport-local';
import users from './users.js';

const { Strategy } = passportLocal;

const strategy = new Strategy(async (username, password, done) => {

    const user = await users.readUserByUsername(username);

    if (user && user.attemptsNum && user.attemptsNum > 10) {
      return done(null, false, { message: 'Number of attempts exceeded' });
    }

    
    if ( !user ) {
        return done(null, false, { message: 'Wrong username' });
    }

    if ( user.password !== password ) {
        await users.updateAttemptsNum(user._id.valueOf(), ++user.attemptsNum);
        return done(null, false, { message: 'Wrong password' });
    }

    user.attemptsNum = 0;
    await users.updateAttemptsNum(user._id.valueOf(), user.attemptsNum);
    return done(null, user);
});

passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user._id.valueOf());
});

// Convert a unique identifier to a user object.
passport.deserializeUser( async (uid, done) => {
  const userObj = await users.readUserById(uid);
  done(null, userObj);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};
