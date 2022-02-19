import React from 'react';

import LoginPage from './modules/auth/pages/LoginPage';
import AuthProvider from './state/AuthProvider';
import combineProviders from './state/combineProviders';
import QueryClientProvider from './utils/queries/QueryClientProvider';

const CombinedProviders = combineProviders(AuthProvider, QueryClientProvider);

function App() {
	return (
		<CombinedProviders>
			<div className="w-full h-full">
				<LoginPage />
			</div>
		</CombinedProviders>
	);
}

export default App;
