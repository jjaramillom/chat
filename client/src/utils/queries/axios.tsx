import {useEffect} from 'react';
import {useAuth} from '@clerk/clerk-react';
import axiosLibrary, {InternalAxiosRequestConfig} from 'axios';

const axios = axiosLibrary.create({
	baseURL: '/api',
});

export default axios;

// this component is used to intercept all axios requests and add the authorization header
export const AxiosInterceptor = ({children}: {children: React.ReactNode}) => {
	const {getToken, sessionId} = useAuth();

	useEffect(() => {
		const interceptor = async (req: InternalAxiosRequestConfig) => {
			const token = await getToken();
			if (!token) return req;
			req.headers.Authorization = `Bearer ${token}`;
			return req;
		};

		axios.interceptors.request.use(interceptor);
		return () => {
			// @ts-ignore types are correct
			axios.interceptors.request.eject(interceptor);
		};
	}, [sessionId]);

	return <>{children}</>;
};
