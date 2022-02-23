import {LogoutOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import React from 'react';

import {useAuthContext} from '../state/AuthProvider';

const Navbar: React.FC = () => {
	const {logout} = useAuthContext();

	function handleClick(itemKey: string) {
		if (itemKey === 'logout') {
			logout();
		}
	}

	return (
		<Menu mode="horizontal" selectedKeys={['chat']} onClick={({key}) => handleClick(key)}>
			<Menu.Item key="chat">Chat</Menu.Item>
			{/* <Menu.Item key="config">Config</Menu.Item> */}
			<Menu.Item key="logout" className="ml-auto mr-8" icon={<LogoutOutlined />}>
				Logout
			</Menu.Item>
		</Menu>
	);
};

export default Navbar;
