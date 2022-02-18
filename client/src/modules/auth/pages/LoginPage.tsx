import React, {useState} from 'react';

import {Button, Card, Input} from '../../../components';
import classes from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	return (
		<div className="w-full flex justify-center mt-48">
			<Card className={classes.card}>
				<div className="flex flex-col items-center gap-y-2">
					<Input className={classes.input} value={username} placeHolder="Username" onChange={setUsername} />
					<Input
						className={classes.input}
						value={password}
						placeHolder="Password"
						onChange={setPassword}
						type="password"
					/>

					<Button
						className="w-32"
						onClick={() => {
							console.warn;
						}}
						text="Login"
					/>
				</div>
			</Card>
		</div>
	);
};

export default LoginPage;
