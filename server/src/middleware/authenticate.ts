import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';

import {UsersDataSource} from '../dataSources';
import {env} from '../utils';

passport.use(
	new JwtStrategy(
		{jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: env('JWT_SECRET')},
		(jwtPayload, cb) => {
			cb(null, jwtPayload);
		}
	)
);

passport.use(
	new LocalStrategy(
		{usernameField: 'username', passwordField: 'password', session: false},
		async (username, password, cb) => {
			try {
				const user = await UsersDataSource.getUserByUsername(username);
				if (!user) {
					throw new Error('could not find user');
				}
				if (await user.isPasswordValid(password)) {
					return cb(null, user);
				}
				return cb('password is invalid');
			} catch (error) {
				cb(error);
			}
		}
	)
);

export default passport;
