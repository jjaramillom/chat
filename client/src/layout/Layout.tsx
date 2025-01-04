import React from 'react';
import {useAuth} from '@clerk/clerk-react';

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
				<div className='w-full h-full flex justify-center '>
					<span className='py-4 px-10 h-fit bg-gray-200 rounded-sm my-[156px]'>loading...</span>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Layout;
