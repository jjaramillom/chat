import {Alert} from 'antd';
import React from 'react';

import {useNotificationBannerContext} from '../state/NotificationBannerProvider';

const WIDTH = 700;

const NotificationBanner: React.FC = () => {
	const {state, clearBanner} = useNotificationBannerContext();
	if (!state.visible) {
		return null;
	}

	return (
		<Alert
			message={state.message}
			type={state.type}
			description={state.errorDetails}
			closable={state.type === 'error'}
			onClose={clearBanner}
			className='w-[700px] fixed top-3 left-1/2 transform -translate-x-1/2 z-50'
		/>
	);
};

export default NotificationBanner;
