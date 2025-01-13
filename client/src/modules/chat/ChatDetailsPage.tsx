import React from 'react';
import {useMutation, useQuery} from 'react-query';
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
	const {
		data: messages,
		isLoading: isLoadingMessages,
		refetch,
	} = useQuery<Message[]>(
		['messages', chatId],
		() =>
			axios
				.get(`chats/${chatId}/messages`, {
					params: {offset: OFFSET, limit: LIMIT},
				})
				.then((r) => r.data),
		{
			keepPreviousData: true,
		}
	);
	const {mutate: sendMessage} = useMutation<unknown,unknown,string>({
		mutationFn: (content) => axios.post(`chats/${chatId}/messages`, {content}),
		onSuccess: () => refetch(),
	});

	return (
		<Card className='h-full w-full ml-5'>
			<LoadingContainer isLoading={isLoadingMessages} className='min-h-20'>
				<ChatMessages messages={messages} />
			</LoadingContainer>
			<ChatInput onSend={sendMessage} />
		</Card>
	);
};

export default ChatPage;
