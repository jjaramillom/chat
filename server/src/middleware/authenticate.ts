import createError from 'http-errors';
import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {BasicStrategy} from 'passport-http';

import {UsersDataSource} from '../dataSources';
import {env} from '../utils';

const usersDataSource = new UsersDataSource();

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
	new BasicStrategy(async (username, password, cb) => {
		try {
			const user = await usersDataSource.getByUsername(username);
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
	})
);

export default passport;
