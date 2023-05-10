import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestInterceptor = axiosPrivate.interceptors.request.use(
			(config) => {
				// check if there is an authorization header
				if (!config.headers['Authorization']) {
					// if not, add the authorization header
					config.headers['Authorization'] = `Bearer ${auth?.token}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		const responseInterceptor = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				// if the error is 403 and had not been retried yet
				if (error?.response?.status === 403 && !prevRequest.sent) {
					// SO it doesn't loop infinitely
					prevRequest.sent = true;

					const token = await refresh();

					prevRequest.headers['Authorization'] = `Bearer ${token}`;

					// retry the request
					return axiosPrivate(prevRequest);
				}

				return Promise.reject(error);
			},
		);

		return () => {
			// Cleanup
			axiosPrivate.interceptors.request.eject(requestInterceptor);
			axiosPrivate.interceptors.response.eject(responseInterceptor);
		};
	}, [auth, refresh]);

	return axiosPrivate;
};

export default useAxiosPrivate;
