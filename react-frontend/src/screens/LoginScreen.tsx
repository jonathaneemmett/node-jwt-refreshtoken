import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const LoginScreen = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const errRef = useRef<HTMLInputElement>(null);

	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// get the from location state
	const from = (location.state as any)?.from || { pathname: '/' };

	// local state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		userRef.current?.focus();
	}, []);

	useEffect(() => {
		setErrorMsg('');
	}, [email, password]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			const res = await axios.post(
				'/users/login',
				JSON.stringify({ email, password }),
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						withCredentials: true,
					},
				},
			);

			// get the token
			const token = res.data?.token;
			const user = res.data?.user;

			// Set the auth
			setAuth({ user, token });
			setEmail('');
			setPassword('');
			navigate(from, { replace: true });
		} catch (err: any) {
			if (!err?.response) {
				console.log(err.message);
				setErrorMsg('No server response. Please try again later.');
			} else {
				setErrorMsg(err.response.data.message);
			}

			errRef.current?.focus();
		}
	}

	return (
		<section className='loginSection'>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='username' className='visually-hidden'>
						User
					</label>
					<input
						type='email'
						ref={userRef}
						id='username'
						name='username'
						placeholder='Email'
						autoComplete='off'
						className='form-control'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password' className='visually-hidden'>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						autoComplete='off'
						className='form-control'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Login
				</button>
			</form>
			<p
				ref={errRef}
				className={errorMsg ? 'errorMsg' : 'visually-hidden'}>
				{errorMsg}
			</p>
			<div className='demoCredentials'>
				<div className='credentials'>
					<h3>Demo User</h3>
					<p>Email: user@demo.com</p>
					<p>Password: user</p>
				</div>
				<div className='credentials'>
					<h3>Demo Admin</h3>
					<p>Email: admin@demo.com</p>
					<p>Password: admin</p>
				</div>
			</div>
		</section>
	);
};

export default LoginScreen;