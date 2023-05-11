import axios from 'axios';
import { PUBLIC_API_SERVER } from '$env/static/public';

const HEADERS = {
	'Content-Type': 'application/json'
};

export default axios.create({
	baseURL: PUBLIC_API_SERVER,
	headers: HEADERS
});

export const axiosPrivate = axios.create({
	baseURL: PUBLIC_API_SERVER,
	headers: HEADERS,
	withCredentials: true
});
