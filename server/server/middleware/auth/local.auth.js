import passport from 'passport';
import * as Local from 'passport-local';
import { User } from '../../models';

class AuthStrategy {

  async apply() {

    passport.use(new Local.Strategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async function(username, password, done) {

      try {
        const user = await User.findOne({ email: username }).exec();
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);

      } catch (err) {
        if (err) {
          return done(err);
        }
      }

    }));
  }

}


export const LocalStrategy = new AuthStrategy();
