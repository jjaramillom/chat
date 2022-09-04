import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_STORAGE_JWT_KEY = 'token';

type FCWithChildren = React.FC<{
  children?: React.ReactNode;
}>;

interface TokenPayload {
  username: string;
  name: string;
  id: string;
  isAdmin: boolean;
  expiresIn: number;
}

export interface AuthContext {
  jwt: string;
  login: (jwt: string) => Promise<void>;
  tryAutoLogin: () => Promise<void>;
  logout: () => void;
}

const authContext = createContext<AuthContext>({
  jwt: '',
  async login() {
    /*  */
  },
  async tryAutoLogin() {
    /*  */
  },
  logout() {
    /*  */
  },
});

const AuthProvider: FCWithChildren = ({children}) => {
  const [jwt, setJwt] = useState<string>('');

  useEffect(() => {
    if (jwt) {
      axios.defaults.headers.common = {Authorization: `Bearer ${jwt}`};
    } else {
      axios.defaults.headers.common = {Authorization: ''};
    }
  }, [jwt]);

  async function tryAutoLogin() {
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_JWT_KEY);
    if (!token) {
      return;
    }
    const decodedToken = jwtDecode<TokenPayload>(token);
    if (Date.now() < new Date(decodedToken.expiresIn).getTime()) {
      setJwt(token);
    }
  }

  async function logout() {
    setJwt('');
    await AsyncStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
  }

  async function login(newJwt: string) {
    setJwt(newJwt);
    await AsyncStorage.setItem(LOCAL_STORAGE_JWT_KEY, newJwt);
  }

  return (
    <authContext.Provider
      value={{
        jwt,
        login,
        tryAutoLogin,
        logout,
      }}>
      {children}
    </authContext.Provider>
  );
};

const useAuthContext = (): AuthContext => useContext(authContext);

export {authContext, useAuthContext};
export default AuthProvider;
