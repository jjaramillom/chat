import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import NotificationBanner from './components/NotificationBanner/NotificationBanner';
import LoginPage from './modules/auth/pages/LoginPage';
import ChatPage from './modules/chat/ChatPage';
import {useAuthContext} from './state/AuthProvider';

function App() {
	const {jwt, tryAutoLogin} = useAuthContext();

	useEffect(() => {
		tryAutoLogin()
	}, []);

	return (
		<div>
			<NotificationBanner />
			<div className="w-full h-full">
				<Routes>
					<Route path="/" element={jwt ? <ChatPage /> : <LoginPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
