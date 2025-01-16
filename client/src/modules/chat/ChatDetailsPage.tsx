import React, {useEffect, useRef} from 'react';
import {InfiniteData, useInfiniteQuery, useMutation} from 'react-query';
import {useParams} from 'react-router';
import {Socket} from 'socket.io-client';

import {Card, LoadingContainer} from '@/components';
import useToast from '@/hooks/useToast';
import {useSocketContext} from '@/state/SocketProvider';
import axios from '@/utils/queries/axios';
import queryClient from '@/utils/queries/queryClient';
import ChatInput from './components/ChatInput';
import {ChatMessages} from './components/ChatMessages';
import {Chat, Message, Paginated} from './types';

const LIMIT = 20;

export const ChatDetailsPage: React.FC = () => {
	const offset = useRef(0);
	const {chatId} = useParams();
	const {
		data: messages,
		isLoading: isLoadingMessages,
		error,
	} = useInfiniteQuery<Paginated<Message>>(
		['messages', chatId],
		() =>
			axios
				.get(`chats/${chatId}/messages`, {
					params: {offset: offset.current, limit: LIMIT},
				})
				.then((r) => r.data),
		{
			getNextPageParam: (lastPage) => {
				const newOffset = offset.current + LIMIT;
				if (newOffset > lastPage.total) return undefined;
				offset.current = newOffset;
				return newOffset;
			},
		}
	);

	const {showError} = useToast();
	if (error) {
		showError((error as any).message);
	}

	const {mutate: sendMessage} = useMutation<unknown, unknown, string>({
		mutationFn: (content) => axios.post(`chats/${chatId}/messages`, {content}),
	});

	const {socket} = useSocketContext();
	useEffect(() => {
		if (!socket) return;

		socket.on(`chat_${chatId}`, (newMessage: Message) => {
			queryClient.setQueryData(
				['messages', chatId],
				// @ts-ignore
				(oldData: InfiniteData<Paginated<Message>> | undefined) => {
					if (!oldData) return oldData;

					const [firstPage, ...restOfPages] = oldData.pages;
					const newFirstPage = {
						...firstPage,
						data: [newMessage, ...firstPage.data],
					};
					const newData: InfiniteData<Paginated<Message>> = {
						pages: [newFirstPage, ...restOfPages],
						pageParams: oldData.pageParams,
					};
					return newData;
				}
			);
		});
	}, [socket]);

	return (
		<Card className='w-full ml-5 h-[calc(100vh-150px)] flex flex-col gap-1'>
			<LoadingContainer isLoading={isLoadingMessages} className='min-h-20'>
				<ChatMessages
					messages={[
						...(messages?.pages.map((page) => page.data).flat() ?? []),
					].reverse()}
				/>
			</LoadingContainer>
			<ChatInput onSend={sendMessage} />
		</Card>
	);
};
