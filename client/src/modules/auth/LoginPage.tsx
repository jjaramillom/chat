import React from 'react';
import {SignIn} from '@clerk/clerk-react';

const LoginPage: React.FC = () => {
	return (
		<div className='w-full h-full flex justify-center'>
			<div className='mt-8'>
				<SignIn forceRedirectUrl='/' />
			</div>
		</div>
	);
};

export default LoginPage;
