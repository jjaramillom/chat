import React, {useState} from 'react';
import {PaperPlaneIcon} from '@radix-ui/react-icons';

import {Button, Textarea} from '@/components';

interface Props {
	onSend: (text: string) => void;
	className?: string;
	text?: string;
	disabled?: boolean;
}

const ChatInput: React.FC<Props> = ({
	onSend,
	text: initialText = '',
	disabled,
}) => {
	const [text, setText] = useState(initialText);
	const handleSend = () => {
		if (text) {
			onSend(text);
		}
	};
	return (
		<div className='flex flex-row items-center'>
			<Textarea
				className='resize-none'
				rows={3}
				onInput={(ev) => setText((ev.target as any).value)}
				value={text}
			/>
			<Button
				size='icon'
				disabled={disabled}
				onClick={handleSend}
				className='rounded-full'
			>
				<PaperPlaneIcon className='h-4 w-4' />
			</Button>
		</div>
	);
};

export default ChatInput;
