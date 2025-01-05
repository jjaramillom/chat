import React, {useState} from 'react';
import {PaperPlaneIcon} from '@radix-ui/react-icons';
import {twMerge} from 'tailwind-merge';

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
	className,
}) => {
	const [text, setText] = useState(initialText);
	const handleSend = () => {
		if (text) {
			onSend(text);
		}
	};
	return (
		<div className={twMerge('flex flex-row items-center gap-2', className)}>
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
				className='rounded-full w-11'
			>
				<PaperPlaneIcon className='h-4 w-4' />
			</Button>
		</div>
	);
};

export default ChatInput;
