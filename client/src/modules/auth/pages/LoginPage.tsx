import React, {useState} from 'react';

import {Button, Card, Input} from '../../../components';
import {useAuthContext} from '../../../state/AuthProvider';
import {useNotificationBannerContext} from '../../../state/NotificationBannerProvider';
import axios from '../../../utils/queries/axios';
import classes from './LoginPage.module.scss';

export async function login(username: string, password: string): Promise<{jwt: string}> {
	return axios.post('/auth/login', {username, password});
}

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const {setJwt} = useAuthContext();
	const {showErrorBanner} = useNotificationBannerContext();

	async function handleLogin() {
		try {
			const {data} = await axios.post('/auth/login', {username, password});
			setJwt(data.token);
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			showErrorBanner('Could not log in', (error as any).toString());
			console.error(error);
		}
	}

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
					<Button className="w-32" onClick={handleLogin} text="Login" />
				</div>
			</Card>
		</div>
	);
};

export default LoginPage;
