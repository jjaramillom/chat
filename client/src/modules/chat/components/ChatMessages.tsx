import React, {useState} from 'react';
import {ResizableBox, ResizeCallbackData} from 'react-resizable';

import {Card} from '../../../components';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import ChatInput from './ChatInput';

const MIN_HEIGHT = 500;
const MIN_WIDTH = 500;
const MAIN_PADDING = 40;
const FOOTER_HEIGHT = 38;
const NAVBAR_HEIGHT = 46;

const ChatMessages: React.FC = () => {
	const {height: containerHeight, width: containerWidth} = useWindowDimensions();
	const [width, setWidth] = useState(MIN_WIDTH);
	const [height, setHeight] = useState(MIN_HEIGHT);

	const handleResize = ({size}: ResizeCallbackData) => {
		setWidth(size.width);
		setHeight(size.height);
	};

	return (
		<ResizableBox
			height={height}
			className="relative"
			width={width}
			maxConstraints={[containerWidth - MAIN_PADDING, containerHeight - MAIN_PADDING - FOOTER_HEIGHT - NAVBAR_HEIGHT]}
			minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
			onResize={(_, data) => handleResize(data)}
			handle={<span className="resize-handle" />}>
			<Card className="w-full h-full">
				<ChatInput
					onSend={() => {
						/*  */
					}}
				/>
			</Card>
		</ResizableBox>
	);
};

export default ChatMessages;
