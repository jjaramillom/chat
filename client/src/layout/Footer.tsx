import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer className="w-full text-center	p-2">
			<span className="m-auto">
				<b>Jacobo Jaramillo</b> &copy; {new Date().getFullYear()}. Made with
				<span>&nbsp;❤&nbsp;</span>
			</span>
		</footer>
	);
};

export default Footer;
