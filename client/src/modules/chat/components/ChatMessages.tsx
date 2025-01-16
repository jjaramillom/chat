import React, {useEffect, useRef} from 'react';
import {useAuth} from '@clerk/clerk-react';
import {format} from 'date-fns';

import {generateRandomHexColor} from '@/utils/generateRandomColor';
import {colorByUsername} from '../consts';
import {Message} from '../types';

export const ChatMessages: React.FC<{
	messages?: Message[];
}> = ({messages}) => {
	const listRef = useRef<HTMLUListElement>(null);
	const isInitialRender = useRef(true);

	useEffect(() => {
		if (!listRef.current) return;
		const scrollToBottom =
			listRef.current.scrollHeight -
			listRef.current.clientHeight -
			listRef.current.scrollTop;

		// Scroll to bottom if we are less than 200px from the bottom
		if (scrollToBottom < 200 || isInitialRender.current) {
			isInitialRender.current = false;
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [messages]);

	if (messages && messages.length === 0) return <div>no messages yet</div>;

	messages?.forEach(({senderUsername}) => {
		if (!colorByUsername.has(senderUsername)) {
			colorByUsername.set(senderUsername, generateRandomHexColor());
		}
	});

	return (
		<div className='h-full'>
			{!messages && <>loading messages...</>}
			{messages && messages.length === 0 && <>no messages yet</>}
			{messages && messages.length > 0 && (
				<ul
					className='flex flex-col gap-2 mb-3 overflow-auto h-full'
					ref={listRef}
				>
					{messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
				</ul>
			)}
		</div>
	);
};

const ChatMessage: React.FC<{
	message: Message;
}> = ({message}) => {
	const {userId} = useAuth();
	return (
		<li className='leading-tight bg-gray-200 w-fit rounded-md pb-2 px-3 pt-1'>
			<div
				style={{color: colorByUsername.get(message.senderUsername)}}
				className='text-sm'
			>
				{message.senderUsername} {userId === message.senderId && '(you)'}
			</div>
			<div>{message.content}</div>
			<div className='text-xs ml-auto text-end text-gray-500'>
				{format(new Date(message.timestamp), 'd/MM/y 	p')}
			</div>
		</li>
	);
};
