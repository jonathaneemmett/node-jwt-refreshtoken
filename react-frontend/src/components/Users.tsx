import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
	const [users, setUsers] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;

		// https://developer.mozilla.org/en-US/docs/Web/API/AbortController
		const controller = new AbortController();

		async function getUsers() {
			try {
				const response = await axiosPrivate.get('/users', {
					signal: controller.signal,
				});

				console.log(response.data);

				isMounted && setUsers(response.data);
			} catch (err: any) {
				console.error(err);
				navigate('/login', {
					state: { from: location },
					replace: true,
				});
			}
		}

		getUsers();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<section>
			<h2>Users</h2>
			{users.length ? (
				<ul>
					{users.map((user: any, index: number) => (
						<li key={index}>
							<p>{user.email}</p>
						</li>
					))}
				</ul>
			) : (
				<p>No users found</p>
			)}
		</section>
	);
};

export default Users;
