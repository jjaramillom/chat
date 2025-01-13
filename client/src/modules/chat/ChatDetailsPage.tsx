import React from 'react';
import qs from 'qs';
import {useQuery} from 'react-query';
import {useParams} from 'react-router';

import {Card, LoadingContainer} from '@/components';
import axios from '@/utils/queries/axios';
import ChatInput from './components/ChatInput';
import {ChatMessages} from './components/ChatMessages';
import {Chat, Message} from './types';

const OFFSET = 0;
const LIMIT = 10;

const ChatPage: React.FC = () => {
	const {chatId} = useParams();
	const {data: messages, isLoading: isLoadingMessages} = useQuery<Message[]>(
		['messages', chatId],
		() =>
			axios
				.get(`/messages/${chatId}`, {params: {offset: OFFSET, limit: LIMIT}})
				.then((r) => r.data),
		{
			keepPreviousData: true,
		}
	);

	return (
		<Card className='h-full w-full ml-5'>
			<LoadingContainer isLoading={isLoadingMessages} className='min-h-20'>
				<ChatMessages messages={messages} />
			</LoadingContainer>
			<ChatInput
				onSend={() => {
					/*  */
				}}
			/>
		</Card>
	);
};

export default ChatPage;
