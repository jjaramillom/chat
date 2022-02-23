/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import AuthProvider from './state/AuthProvider';
import combineProviders from './state/combineProviders';
import NotificationBannerProvider from './state/NotificationBannerProvider';
import QueryClientProvider from './utils/queries/QueryClientProvider';
import './styles/global.scss';

const CombinedProviders = combineProviders(AuthProvider, QueryClientProvider, NotificationBannerProvider);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<CombinedProviders>
				<App />
			</CombinedProviders>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
