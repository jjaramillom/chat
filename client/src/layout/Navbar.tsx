import React from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/clerk-react';
import {Menu} from 'antd';

const Navbar: React.FC = () => {
	return (
		<Menu mode='horizontal' selectedKeys={['chat']}>
			<Menu.Item key='chat'>Chat</Menu.Item>
			{/* <Menu.Item key="config">Config</Menu.Item> */}
			{/* @ts-ignore */}
			<SignedOut>
				<SignInButton />
			</SignedOut>
			{/* @ts-ignore */}
			<SignedIn>
				<Menu.Item
					key='logout'
					className='ml-auto mr-8'
					icon={<LogoutOutlined />}
				>
					<UserButton />
				</Menu.Item>
			</SignedIn>
		</Menu>
	);
};

export default Navbar;
