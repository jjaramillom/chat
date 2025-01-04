import React from 'react';
import {SignedIn, UserButton} from '@clerk/clerk-react';
import {NavLink as NavLinkBase} from 'react-router';

import {
	NavigationMenu,
	NavigationMenuItem as NavigationMenuItemBase,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
	return (
		<NavigationMenu className='bg-gray-200'>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavLink to='/chats'>Chat</NavLink>
				</NavigationMenuItem>
			</NavigationMenuList>
			<div className='ml-auto'>
				{/* @ts-ignore */}
				<SignedIn>
					<div className='ml-auto mr-8 flex items-center'>
						<UserButton />
					</div>
				</SignedIn>
			</div>
		</NavigationMenu>
	);
};

const NavigationMenuItem = ({children}: {children: React.ReactNode}) => {
	return (
		<NavigationMenuItemBase className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'>
			{children}
		</NavigationMenuItemBase>
	);
};

const NavLink = ({children, to}: {children: string; to: string}) => {
	return (
		<NavLinkBase
			to={to}
			className={({isActive}) =>
				`px-4 h-full flex items-center ${isActive ? 'text-orange-500' : ''}`
			}
		>
			{children}
		</NavLinkBase>
	);
};

export default Navbar;
