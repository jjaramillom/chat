import React from 'react';
import {SignIn} from '@clerk/clerk-react';

import {Card} from '../../components';
import classes from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
	return (
		<div className='w-full flex justify-center mt-48'>
			<Card className={classes.card}>
				<SignIn />
			</Card>
		</div>
	);
};

export default LoginPage;
