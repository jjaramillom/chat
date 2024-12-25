import React, {PropsWithChildren} from 'react';
import {QueryClientProvider as QueryProvider} from 'react-query';

import queryClient from './queryClient';

const QueryClientProvider: React.FC<PropsWithChildren> = ({children}) => (
	<QueryProvider client={queryClient}>{children}</QueryProvider>
);

export default QueryClientProvider;
