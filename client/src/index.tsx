/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {ClerkProvider} from '@clerk/clerk-react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';

import App from './App';
import combineProviders from './state/combineProviders';
import QueryClientProvider from './utils/queries/QueryClientProvider';

import './styles/global.scss';

import SocketProvider from './state/SocketProvider';
import {AxiosInterceptor} from './utils/queries/axios';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const container = document.getElementById('root');
const root = createRoot(container!);

const CombinedProviders = combineProviders(QueryClientProvider, SocketProvider);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
				<CombinedProviders>
					<AxiosInterceptor>
						<App />
					</AxiosInterceptor>
				</CombinedProviders>
			</ClerkProvider>
		</BrowserRouter>
	</React.StrictMode>
);
