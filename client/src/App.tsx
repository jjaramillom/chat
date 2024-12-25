import {ReactElement, useEffect} from 'react';
import {Routes, Route} from 'react-router';

import {NotificationBanner} from './components';
import Layout from './layout/Layout';
import LoginPage from './modules/auth/pages/LoginPage';
import ChatPage from './modules/chat/ChatPage';
import {useAuthContext} from './state/AuthProvider';

function constructAuthView(content: ReactElement) {
	return <Layout>{content}</Layout>;
}

function App() {
	const {jwt, tryAutoLogin} = useAuthContext();

	useEffect(() => {
		tryAutoLogin();
	}, []);

	return (
		<div>
			<NotificationBanner />
			<div className='w-full h-full'>
				<Routes>
					<Route
						path='/'
						element={jwt ? constructAuthView(<ChatPage />) : <LoginPage />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
