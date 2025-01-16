import React from 'react';
import {useQuery} from 'react-query';
import {Outlet, useNavigate} from 'react-router';

import {LoadingContainer} from '@/components';
import axios from '@/utils/queries/axios';
import {ChatsList} from './components/ChatsList';
import {Chat} from './types';

export const ChatsOverviewPage: React.FC = () => {
	const navigate = useNavigate();
	const {data, isLoading} = useQuery<Chat[]>('chats', () =>
		axios.get('/chats').then((r) => r.data)
	);

	const handleClick = (chat: Chat) => {
		navigate(`/chats/${chat.id}`);
	};
	return (
		<div className='flex flex-row'>
			<LoadingContainer isLoading={isLoading} className='w-fit'>
				<ChatsList chats={data} onClick={handleClick} />
			</LoadingContainer>
			<Outlet />
		</div>
	);
};
