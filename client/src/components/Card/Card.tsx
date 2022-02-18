import {Card as AntCard, CardProps} from 'antd';
import React from 'react';

import classes from './Card.module.scss';

interface Props {
	title?: string;
	className?: string;
	size?: CardProps['size'];
}

const Card: React.FC<Props> = ({children, title, className, size}) => {
	return (
		<AntCard className={`${className ?? ''} ${classes.card}`} title={title} size={size}>
			{children}
		</AntCard>
	);
};

export default Card;
