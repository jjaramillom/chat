import React, {createContext, useState, useContext} from 'react';

export interface AuthContext {
	jwt: string;
	setJwt: (value: string) => void;
}

const authContext = createContext<AuthContext>({
	jwt: '',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setJwt() {}
});

const AuthProvider: React.FC = ({children}) => {
	const [jwt, setJwt] = useState<string>('');

	return (
		<authContext.Provider
			value={{
				jwt,
				setJwt
			}}>
			{children}
		</authContext.Provider>
	);
};

const useAuthContext = (): AuthContext => useContext(authContext);

export {authContext, useAuthContext};
export default AuthProvider;
