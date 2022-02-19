import React from 'react';
import {QueryClientProvider as QueryProvider} from 'react-query';

import queryClient from './queryClient';

const QueryClientProvider: React.FC = ({children}) => <QueryProvider client={queryClient}>{children}</QueryProvider>;

export default QueryClientProvider;
