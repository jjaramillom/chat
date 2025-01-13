import React from 'react';

import {generateRandomHexColor} from '@/utils/generateRandomColor';
import {colorByUsername} from '../consts';
import {Message} from '../types';

export const ChatMessages: React.FC<{
	messages?: Message[];
}> = ({messages}) => {
	if (messages && messages.length === 0) return <div>no messages yet</div>;

	messages?.forEach(({senderUsername}) => {
		if(!colorByUsername.has(senderUsername)) {
			colorByUsername.set(senderUsername, generateRandomHexColor());
		}
	});

	return (
		<>
			{!messages && <div>loading messages...</div>}
			{messages && messages.length === 0 && <div>no messages yet</div>}
			{messages && messages.length > 0 && (
				<ul>
					{messages.map(({id, senderUsername, content}) => (
						<li key={id}>
							<div style={{color: colorByUsername.get(senderUsername)}}>
								{senderUsername}
							</div>
							{content}
						</li>
					))}
				</ul>
			)}
		</>
	);
};
