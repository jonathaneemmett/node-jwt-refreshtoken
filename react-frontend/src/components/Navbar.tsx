import { MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const [user, setUser] = useState({} as any);
	const [role, setRole] = useState('');

	useEffect(() => {
		setUser(auth.user);
		setRole(auth.user?.role);

		return () => {
			setUser({} as any);
			setRole('');
		};
	}, [auth]);

	async function logout(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		try {
			await axios.post('/users/logout');
			setAuth({ user: {}, role: '', token: '' });

			navigate('/login', { replace: true });
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<nav className='navbar'>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{user?.email ? (
					<>
						<li>
							<Link to='/profile'>Profile</Link>
						</li>
						{role === 'admin' && (
							<li>
								<Link to='/admin'>Admin</Link>
							</li>
						)}
						<li>
							<button className='logoutButton' onClick={logout}>
								Logout
							</button>
						</li>
					</>
				) : (
					<li>
						<Link to='/login'>Login</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
