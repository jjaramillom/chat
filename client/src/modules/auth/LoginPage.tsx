import React from 'react';
import {SignIn} from '@clerk/clerk-react';

const LoginPage: React.FC = () => {
	return (
		<div className='w-full flex justify-center mt-48'>
			<SignIn />
		</div>
	);
};

export default LoginPage;
