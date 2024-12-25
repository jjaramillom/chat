import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	PropsWithChildren,
} from 'react';

const LOCAL_STORAGE_JWT_KEY = 'token';

export interface AuthContext {
	jwt: string;
	login: (jwt: string) => void;
	tryAutoLogin: () => void;
	logout: () => void;
}

const authContext = createContext<AuthContext>({
	jwt: '',
	login() {
		/*  */
	},
	tryAutoLogin() {
		/*  */
	},
	logout() {
		/*  */
	},
});

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
	const [jwt, setJwt] = useState<string>('');

	useEffect(() => {
		if (jwt) {
			axios.defaults.headers.common = {Authorization: `Bearer ${jwt}`};
		} else {
			axios.defaults.headers.common = {Authorization: ''};
		}
	}, [jwt]);

	function tryAutoLogin() {
		const token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
		if (!token) {
			return;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const decodedToken: any = jwtDecode(token);
		if (Date.now() < new Date(decodedToken.expiresIn).getTime()) {
			setJwt(token);
		}
	}

	function logout() {
		setJwt('');
		localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
	}

	function login(jwt: string) {
		setJwt(jwt);
		localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
	}

	return (
		<authContext.Provider
			value={{
				jwt,
				login,
				tryAutoLogin,
				logout,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

const useAuthContext = (): AuthContext => useContext(authContext);

export {authContext, useAuthContext};
export default AuthProvider;
