import {Card as AntCard, CardProps} from 'antd';
import React from 'react';

interface Props {
	title?: string;
	className?: string;
	size?: CardProps['size'];
	children: React.ReactNode;
}

const Card: React.FC<Props> = ({children, title, className, size}) => {
	return (
		<AntCard
			className={`${className ?? ''} shadow-[rgba(59, 57, 57, 0.486)]`}
			title={title}
			size={size}
		>
			{children}
		</AntCard>
	);
};

export default Card;
