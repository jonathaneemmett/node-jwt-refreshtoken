import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	async function refresh() {
		const response = await axios.get('/users/refresh', {
			withCredentials: true,
		});

		setAuth((prev: any) => {
			return {
				...prev,
				token: response.data.token,
			};
		});
	}

	return refresh;
};

export default useRefreshToken;
