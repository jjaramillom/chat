import {SendOutlined} from '@ant-design/icons';
import React, {useState} from 'react';

import {Button, TextArea} from '../../../components';

interface Props {
	onSend: (text: string) => void;
	className?: string;
	text?: string;
	disabled?: boolean;
}

const ChatInput: React.FC<Props> = ({onSend, text: initialText = '', className, disabled, ...props}) => {
	const [text, setText] = useState(initialText);
	const handleSend = () => {
		if (text) {
			onSend(text);
		}
	};
	return (
		<div className="flex flex-row items-center">
			<TextArea className="resize-none" rows={3} onChange={setText} value={text} />
			<Button onClick={handleSend} icon={<SendOutlined />} shape="circle" className="ml-3" />
		</div>
	);
};

export default ChatInput;
