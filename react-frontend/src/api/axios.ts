import axios from 'axios';

const BASE_URL = 'http://localhost:5100';
const HEADERS = {
	'Content-Type': 'application/json',
};

export default axios.create({
	baseURL: BASE_URL,
});

/*
 * @desc  This axios instance will retry on 403 errors
 */
export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: HEADERS,
	withCredentials: true,
});
