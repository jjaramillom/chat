import React from 'react';

import NotificationBanner from './components/NotificationBanner/NotificationBanner';
import LoginPage from './modules/auth/pages/LoginPage';
import AuthProvider from './state/AuthProvider';
import combineProviders from './state/combineProviders';
import NotificationBannerProvider from './state/NotificationBannerProvider';
import QueryClientProvider from './utils/queries/QueryClientProvider';

const CombinedProviders = combineProviders(AuthProvider, QueryClientProvider, NotificationBannerProvider);

function App() {
	return (
		<CombinedProviders>
			<NotificationBanner />
			<div className="w-full h-full">
				<LoginPage />
			</div>
		</CombinedProviders>
	);
}

export default App;
