import {Button as AntButton, ButtonProps} from 'antd';
import React from 'react';

interface Props {
	onClick: () => void;
	className?: string;
	text?: string;
	type?: ButtonProps['type'];
	disabled?: boolean;
}

const Button: React.FC<Props> = ({onClick, text = 'default text', className, type = 'default', disabled, ...props}) => (
	<AntButton className={className} onClick={onClick} type={type} disabled={disabled} {...props}>
		{text}
	</AntButton>
);

export default Button;
