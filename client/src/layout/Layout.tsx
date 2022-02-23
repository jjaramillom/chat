import React from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FC = ({children}) => {
	return (
		// className={`px-0 ${classes.container}`}
		<div className="flex flex-col min-h-screen w-full	">
			<Navbar />
			<div className="relative p-2 flex grow w-full">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
