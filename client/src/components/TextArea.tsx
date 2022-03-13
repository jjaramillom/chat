import AntTextArea from 'antd/lib/input/TextArea';
import React from 'react';


interface Props {
	onChange: (value: string) => void;
	className?: string;
	value: string;
	placeHolder?: string;
	rows?: number;
	maxLength?: number;
}

const TextArea: React.FC<Props> = ({onChange, placeHolder = '', ...props}) => (
	<AntTextArea onChange={(ev) => onChange(ev.target.value)} placeholder={placeHolder} {...props} />
);

export default TextArea;
