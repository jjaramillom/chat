// import {RadiusUpleftOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import {ResizableBox, ResizeCallbackData} from 'react-resizable';

import {Card} from '../../../components';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const MIN_HEIGHT = 500;
const MIN_WIDTH = 500;

const ChatMessages: React.FC = () => {
	const {height: maxHeight, width: maxWidth} = useWindowDimensions();
	const [width, setWidth] = useState(MIN_WIDTH);
	const [height, setHeight] = useState(MIN_HEIGHT);

	const handleResize = ({size}: ResizeCallbackData) => {
		if (size.width >= MIN_WIDTH) {
			setWidth(size.width);
		}
		if (size.height >= MIN_HEIGHT) {
			setHeight(size.height);
		}
	};

	return (
		<ResizableBox
			height={height}
			className="relative"
			width={width}
			maxConstraints={[maxWidth, maxHeight]}
			onResize={(_, data) => handleResize(data)}
			handle={<span className="resize-handle" />}
			// handle={<RadiusUpleftOutlined className="absolute right-0 bottom-0 cursor-nwse-resize" />}
			>
			<Card className="w-full h-full">test</Card>
		</ResizableBox>
	);
};

export default ChatMessages;
