import {useParams} from 'react-router';

import {Card} from '@/components';
import {cn} from '@/lib/utils';
import {Chat} from '../types';

export const ChatsList: React.FC<{
	chats: Chat[] | undefined;
	onClick: (chat: Chat) => void;
}> = ({chats, onClick}) => {
	const {chatId} = useParams();
	return (
		<Card className='w-[20vw]' noPadding>
			<ul>
				{!chats && (
					<li className='h-[90px] flex flex-col justify-center items-center p-3'>
						loading ...
					</li>
				)}
				{chats &&
					chats.length > 0 &&
					chats.map((chat) => (
						<li
							onClick={() => (chat.id == chatId ? null : onClick(chat))}
							role='button'
							tabIndex={0}
							key={chat.id}
							className={cn(
								'truncate p-3 border-b cursor-pointer text-sm hover:bg-gray-200 last:border-b-0',
								{
									'text-orange-500 font-bold hover:bg-inherit cursor-default':
										chat.id == chatId,
								}
							)}
						>
							{chat.name}
						</li>
					))}
				{chats && chats.length === 0 && <li className='p-3 '>No chats</li>}
			</ul>
		</Card>
	);
};
