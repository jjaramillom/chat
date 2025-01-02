import {useEffect} from 'react';
import {useAuth} from '@clerk/clerk-react';
import axiosLibrary, {InternalAxiosRequestConfig} from 'axios';

const axios = axiosLibrary.create({
	baseURL: '/api',
});

export default axios;

export const AxiosInterceptor = ({children}: {children: React.ReactNode}) => {
	const {getToken, sessionId} = useAuth();

	useEffect(() => {
		console.log(sessionId);
		const interceptor = async (req: InternalAxiosRequestConfig) => {
			const token = await getToken();
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
