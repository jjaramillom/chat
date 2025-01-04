import {ReactElement} from 'react';
import {SignIn, useAuth} from '@clerk/clerk-react';
import {Route, Routes} from 'react-router';

import {Toaster} from '@/components/ui/sonner';
import Layout from '@/layout/Layout';
import ChatPage from '@/modules/chat/ChatPage';

function constructAuthView(content: ReactElement) {
	return <Layout>{content}</Layout>;
}

function App() {
	const auth = useAuth();
	return (
		<>
			<Toaster position='bottom-center' expand closeButton />
			<div className='w-full h-full'>
				<Routes>
					<Route
						path='/'
						element={
							auth.isSignedIn ? (
								constructAuthView(<ChatPage />)
							) : (
								<div className='w-full h-full flex justify-center'>
									<div className='mt-8'>
										<SignIn forceRedirectUrl='/' />
									</div>
								</div>
							)
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
