import React from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<div className='flex flex-col h-screen w-screen'>
			<Navbar />
			<div className='relative p-5 flex-1 w-full'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
