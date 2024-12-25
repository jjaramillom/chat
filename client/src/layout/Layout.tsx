import React, {PropsWithChildren} from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<div className='flex flex-col min-h-screen w-full	'>
			<Navbar />
			<div className='relative p-5 flex grow w-full'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
