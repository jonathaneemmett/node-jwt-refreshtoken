import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_SERVER;
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
