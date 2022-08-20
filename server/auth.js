import passport from 'passport';
import passportLocal from 'passport-local';
import users from './users.js';

const { Strategy } = passportLocal;

const strategy = new Strategy(async (username, password, done) => {

    const user = await users.findUser(username);

    if (user.attemptsNum && user.attemptsNum > 10) {
      return done(null, false, { message: 'Number of attempts exceeded' });
    }

    
    if ( !user ) {
        return done(null, false, { message: 'Wrong username' });
    }

    const correctPassword = await users.validatePassword(username, password);

    if ( !correctPassword ) {
        ++user.attemptsNum;
        await new Promise((r) => setTimeout(r, 2000));
        return done(null, false, { message: 'Wrong password' });
    }

    user.attemptsNum = 0;
    return done(null, user);
});

passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user._id.valueOf());
});

// Convert a unique identifier to a user object.
passport.deserializeUser( async (uid, done) => {
  const userObj = await users.getUserById(uid);
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