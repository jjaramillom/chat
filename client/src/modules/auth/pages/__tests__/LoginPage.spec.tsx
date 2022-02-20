import {render, fireEvent, screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import React from 'react';
import '@testing-library/jest-dom';

import LoginPage from '../LoginPage';

const server = setupServer(
	rest.post('/api/auth/login', (req, res, ctx) => {
		return res(ctx.json({token: 'this is a JWT token'}));
	})
);

describe('LoginPage', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('renders an input for username, password and a submit button', () => {
		render(<LoginPage />);

		expect(screen.getByTestId('username-input')).toBeTruthy();
		expect(screen.getByTestId('password-input')).toBeTruthy();
		expect(screen.getByTestId('login-button')).toBeTruthy();
	});

	test('submit button should be disabled if username or password is empty', async () => {
		render(<LoginPage />);

		expect(screen.getByTestId('login-button')).toHaveAttribute('disabled');

		const usernameInput = screen.getByTestId('username-input');
		const passwordInput = screen.getByTestId('password-input');

		fireEvent.change(usernameInput, {target: {value: 'myUsername'}});
		expect(screen.getByTestId('login-button')).toHaveAttribute('disabled');

		fireEvent.change(passwordInput, {target: {value: 'myPassword'}});

		expect(screen.getByTestId('login-button')).not.toHaveAttribute('disabled');
	});
});
