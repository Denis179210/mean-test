import passport from 'passport';
import * as JWT from 'passport-jwt';
import { config } from '../../config';
import { User } from '../../models';

const opts = {
  jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey
};

class AuthStrategy {

  async apply() {

    passport.use(new JWT.Strategy(opts, async function(jwt_payload, done) {

      try {
        const user = await User.findById(jwt_payload.sub).select('-password').exec();
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        if (err) {
          return done(err);
        }
      }

    }));

  }

}

export const JwtStrategy = new AuthStrategy();

