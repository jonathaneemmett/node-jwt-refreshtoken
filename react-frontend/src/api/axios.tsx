import axios from 'axios';

const BASE_URL = 'http://localhost:5100';

const headers = {
	'Content-Type': 'application/json',
	// 'Access-Control-Allow-Origin': '*',
};

export default axios.create({
	baseURL: BASE_URL,
	headers: headers,
});

// Private: will retry on 403 error
export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: headers,
	withCredentials: true,
});
