import React from 'react';
import {useQuery} from 'react-query';

import {Card} from '@/components';
import ChatInput from './components/ChatInput';

const ChatPage: React.FC = () => {
	return (
		<Card className='h-full w-full ml-5'>
			<ChatInput
				onSend={() => {
					/*  */
				}}
			/>
		</Card>
	);
};

export default ChatPage;
