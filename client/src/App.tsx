import {useAuth} from '@clerk/clerk-react';
import {Navigate, Route, Routes} from 'react-router';

import {Toaster} from '@/components/ui/sonner';
import Layout from '@/layout/Layout';
import {ChatDetailsPage} from '@/modules/chat/ChatDetailsPage';
import {ChatsOverviewPage} from '@/modules/chat/ChatsOverviewPage';
import LoginPage from './modules/auth/LoginPage';

function App() {
	return (
		<>
			<Toaster position='bottom-center' expand closeButton />
			<div className='w-full h-full'>
				<Routes>
					<Route path='/' element={<Navigate to='/chats' />} />
					<Route
						path='/chats'
						element={
							<ProtectedLayout>
								<ChatsOverviewPage />
							</ProtectedLayout>
						}
					>
						<Route path=':chatId' element={<ChatDetailsPage />} />
					</Route>
					<Route
						path='/login'
						element={
							<Layout>
								<LoginPage />
							</Layout>
						}
					/>
					<Route
						path='*'
						element={
							<Layout>
								<NotFoundPage />
							</Layout>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;

function NotFoundPage() {
	return (
		<div className='w-full h-full flex justify-center'>
			<span className='py-4 px-10 h-fit mt-20 bg-gray-200 rounded-sm'>
				This page does not exist
			</span>
		</div>
	);
}

function ProtectedLayout({children}: {children: React.ReactNode}) {
	const auth = useAuth();

	if (!auth.isSignedIn && auth.isLoaded) return <Navigate to='/login' />;
	return <Layout>{children}</Layout>;
}
