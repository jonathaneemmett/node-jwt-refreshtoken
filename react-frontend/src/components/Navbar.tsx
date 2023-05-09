import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	const [user, setUser] = useState({} as any);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setUser(auth?.user);
		setIsLoggedIn(!!auth?.user);
	}, [auth]);

	async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		try {
			await axios.post('/users/logout', {
				withCredentials: true,
			});

			setAuth({} as any);
			setUser({} as any);
			setIsLoggedIn(false);
			navigate('/');
		} catch (err: any) {
			console.error(err.message);
		}
	}
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{isLoggedIn ? (
					<>
						<li>
							<Link to='/profile'>Profile</Link>
						</li>

						{user?.role === 'admin' && (
							<li>
								<Link to='/admin'>Admin</Link>
							</li>
						)}

						<li>
							<button
								className='logoutBtn'
								onClick={handleLogout}>
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
