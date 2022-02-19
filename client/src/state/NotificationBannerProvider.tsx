import React, {createContext, useState, useContext} from 'react';

interface State {
	visible: boolean;
	type: 'success' | 'error';
	message: string;
	errorDetails?: string;
}

export interface NotificationBannerContext {
	state: State;
	showSuccessBanner: (message: string) => void;
	showErrorBanner: (message: string, details?: string) => void;
	clearBanner: () => void;
}

const notificationBannerContext = createContext<NotificationBannerContext>({
	state: {visible: false, type: 'success', message: ''},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	showSuccessBanner(message: string) {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	showErrorBanner(message: string, details?: string) {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	clearBanner() {}
});

const NotificationBannerProvider: React.FC = ({children}) => {
	const [state, setState] = useState<State>({visible: false, type: 'success', message: ''});

	function showSuccessBanner(message: string) {
		setState({visible: true, type: 'success', message});
	}

	function showErrorBanner(message: string, errorDetails?: string) {
		setState({visible: true, type: 'error', message, errorDetails});
	}

	function clearBanner() {
		setState({visible: false, type: 'success', message: ''});
	}

	return (
		<notificationBannerContext.Provider value={{state, showSuccessBanner, showErrorBanner, clearBanner}}>
			{children}
		</notificationBannerContext.Provider>
	);
};

const useNotificationBannerContext = (): NotificationBannerContext => useContext(notificationBannerContext);

export {notificationBannerContext, useNotificationBannerContext};
export default NotificationBannerProvider;
