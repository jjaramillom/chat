import {Button as AntButton, ButtonProps} from 'antd';
import React from 'react';

interface Props {
	onClick: () => void;
	className?: string;
	text?: string;
	type?: ButtonProps['type'];
}

const Button: React.FC<Props> = ({onClick, text = 'default text', className, type = 'default'}) => (
	<AntButton className={className} onClick={onClick} type={type}>
		{text}
	</AntButton>
);

export default Button;
