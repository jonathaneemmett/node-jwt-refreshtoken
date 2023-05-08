import axios from 'axios';

const BASE_URL = 'http://localhost:5100';

export default axios.create({
	baseURL: BASE_URL,
});

// Private: will retry on 403 error
export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});
