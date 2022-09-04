import React, {useEffect} from 'react';

import LoginScreen from './modules/login/LoginScreen';
import MainScreen from './modules/main/MainScreen';
import {useAuthContext} from './state/AuthProvider';

const App = () => {
  const {jwt, tryAutoLogin} = useAuthContext();

  useEffect(() => {
    tryAutoLogin();
  }, []);

  if (jwt) {
    return <MainScreen />;
  } else {
    return <LoginScreen />;
  }
};

export default App;
