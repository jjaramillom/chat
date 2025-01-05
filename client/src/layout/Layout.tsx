import React from 'react';
import {useAuth} from '@clerk/clerk-react';

import {LoadingIndicator} from '@/components';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
	const {isSignedIn, isLoaded} = useAuth();

	return (
		<div className='flex flex-col h-screen w-screen'>
			{isSignedIn && <Navbar />}
			{isLoaded ? (
				<div className='relative p-5 flex-1 w-full'>{children}</div>
			) : (
				<div className='w-full h-full flex justify-center items-center'>
					<div className='h-16 w-32 my-[156px]'> 
						<LoadingIndicator />
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
};

export default Layout;
