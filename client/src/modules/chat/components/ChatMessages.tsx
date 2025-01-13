import React from 'react';
import {useAuth} from '@clerk/clerk-react';
import {format} from 'date-fns';

import {generateRandomHexColor} from '@/utils/generateRandomColor';
import {colorByUsername} from '../consts';
import {Message} from '../types';

export const ChatMessages: React.FC<{
	messages?: Message[];
}> = ({messages}) => {
	if (messages && messages.length === 0) return <div>no messages yet</div>;

	messages?.forEach(({senderUsername}) => {
		if (!colorByUsername.has(senderUsername)) {
			colorByUsername.set(senderUsername, generateRandomHexColor());
		}
	});

	return (
		<>
			{!messages && <div>loading messages...</div>}
			{messages && messages.length === 0 && <div>no messages yet</div>}
			{messages && messages.length > 0 && (
				<ul className='flex flex-col gap-2 mb-3'>
					{messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}
				</ul>
			)}
		</>
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
				{format(new Date(message.timestamp), 'HH:mm')}
			</div>
		</li>
	);
};
