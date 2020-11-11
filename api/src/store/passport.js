import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './config';
import User from '../models/User';

export default (passport) => {
  const opts = {};
  opts.secretOrKey = config.passport.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findOne({ email: payload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {
            email: user.email,
            // eslint-disable-next-line no-underscore-dangle
            _id: user._id,
          });
        }
        return done(null, false);
      });
    }),
  );
};
