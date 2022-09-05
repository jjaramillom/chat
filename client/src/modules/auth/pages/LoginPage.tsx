import React, {useState} from 'react';

import {Button, Card, Input} from '../../../components';
import {useAuthContext} from '../../../state/AuthProvider';
import {useNotificationBannerContext} from '../../../state/NotificationBannerProvider';
import axios from '../../../utils/queries/axios';
import classes from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const {login} = useAuthContext();
	const {showErrorBanner, clearBanner} = useNotificationBannerContext();

	async function handleLogin() {
		if (!username || !password) {
			return;
		}
		try {
			const {data} = await axios.post('/auth/login', {}, {auth: {username, password}});
			login(data.token);
			clearBanner();
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
					<Input
						className={classes.input}
						value={username}
						placeHolder="Username"
						onChange={setUsername}
						data-testid="username-input"
					/>
					<Input
						className={classes.input}
						value={password}
						placeHolder="Password"
						onChange={setPassword}
						type="password"
						data-testid="password-input"
					/>
					<Button
						className="w-32"
						onClick={handleLogin}
						text="Login"
						disabled={!username || !password}
						data-testid="login-button"
					/>
				</div>
			</Card>
		</div>
	);
};

export default LoginPage;
