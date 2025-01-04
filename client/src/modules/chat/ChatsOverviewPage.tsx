import React from 'react';
import {Outlet} from 'react-router';

import ChatMessages from './components/ChatMessages';

const ChatsOverviewPage: React.FC = () => {
	return (
		<div className='flex flex-row'>
			<div>chats list</div>
			<Outlet />
		</div>
	);
};

export default ChatsOverviewPage;
