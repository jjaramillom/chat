import createError from 'http-errors';
import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';

import {UsersDataSource} from '../dataSources';
import {env} from '../utils';

passport.use(
	new JwtStrategy(
		{jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: env('JWT_SECRET')},
		(jwtPayload, cb) => {
			if (Date.now() < new Date(jwtPayload.expiresIn).getTime()) {
				cb(null, jwtPayload);
			} else {
				cb(createError(401, 'token is expired'));
			}
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
					// throw new Error('could not find user');
					return cb(createError(401, 'could not find user'));
				}
				if (await user.isPasswordValid(password)) {
					return cb(null, user);
				}
				return cb(createError(401, 'password is invalid'));
			} catch (error) {
				cb(error);
			}
		}
	)
);

export default passport;
