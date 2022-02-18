import {Input as AntInput, InputProps} from 'antd';
import React from 'react';

interface Props {
	onChange: (value: string) => void;
	className?: string;
	value: string | number;
	placeHolder?: string;
	type?: InputProps['type'];
}

const Input: React.FC<Props> = ({onChange, value, placeHolder = '', className, type}) => (
	<AntInput
		className={className}
		onChange={(ev) => onChange(ev.target.value)}
		placeholder={placeHolder}
		value={value}
		type={type}
	/>
);

export default Input;
