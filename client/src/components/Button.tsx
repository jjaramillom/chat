import {Button as AntButton, ButtonProps} from 'antd';
import React from 'react';

interface Props {
	onClick: () => void;
	className?: string;
	text?: string;
	type?: ButtonProps['type'];
	disabled?: boolean;
	icon?: ButtonProps['icon'];
	shape?: ButtonProps['shape'];
}

const Button: React.FC<Props> = ({text, type = 'default', ...props}) => (
	<AntButton type={type} {...props}>
		{text}
	</AntButton>
);

export default Button;
