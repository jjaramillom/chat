import React from 'react';

import App from './App';
import AuthProvider from './state/AuthProvider';
import combineProviders from './state/combineProviders';

const CombinedProviders = combineProviders(AuthProvider);

const index = () => {
  return (
    <CombinedProviders>
      <App />
    </CombinedProviders>
  );
};

export default index;
