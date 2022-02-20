import {Alert} from 'antd';
import React from 'react';

import {useNotificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './NotificationBanner.module.scss';

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
			className={classes.banner}
		/>
	);
};

export default NotificationBanner;
