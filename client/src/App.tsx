import {ReactElement} from 'react';
import {SignIn, useAuth} from '@clerk/clerk-react';
import {Route, Routes} from 'react-router';

import {NotificationBanner} from './components';
import Layout from './layout/Layout';
import ChatPage from './modules/chat/ChatPage';

function constructAuthView(content: ReactElement) {
	return <Layout>{content}</Layout>;
}

function App() {
	const auth = useAuth();
	return (
		<div>
			<NotificationBanner />
			<div className='w-full h-full'>
				<Routes>
					<Route
						path='/'
						element={
							auth.isSignedIn ? (
								constructAuthView(<ChatPage />)
							) : (
								<SignIn forceRedirectUrl='/' />
							)
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
