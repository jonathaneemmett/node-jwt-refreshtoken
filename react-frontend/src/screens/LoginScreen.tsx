import { useState, useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
const LOGIN_URL = '/users/login';

const LoginScreen = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const errorRef = useRef<HTMLParagraphElement>(null);

	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const url = location.state?.from ? location.state.from : '/';

	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	useEffect(() => {
		setError('');
	}, [email, password]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			console.log('Login Url is: ' + LOGIN_URL);
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ email, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				},
			);

			const { user, role, token } = response.data;
			setAuth({ user, role, token });
			setEmail('');
			setPassword('');
			navigate(url);
		} catch (err: any) {
			console.error(err);
			if (!err?.response) {
				setError('Network Error, please try again later.');
			} else if (err.response.status === 400) {
				setError('Invalid Credentials');
			} else if (err.response.status === 401) {
				setError('Unauthorized');
			} else {
				setError('Unknown Error, please try again later.');
			}
			errorRef.current?.focus();
		}
	}

	return (
		<section>
			<div className='loginContainer'>
				<h3>Sign In</h3>
				<form
					className='form-horizontal'
					autoComplete='off'
					onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='email' className='visually-hidden'>
							Email address
						</label>
						<input
							ref={emailRef}
							type='email'
							className='form-control'
							id='email'
							placeholder='Email address'
							autoComplete='off'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Login
					</button>
				</form>
				<p
					ref={errorRef}
					className={error ? 'error' : 'visually-hidden'}>
					{error}
				</p>
				<p>For a demo, use the following credentials:</p>
				<div className='userDemo'>
					<div className='credentials'>
						<p>Demo User</p>
						<p>Email: user@demo.com</p>
						<p>Password: user</p>
					</div>
					<div className='credentials'>
						<p>Admin User</p>
						<p>Email: admin@demo.com</p>
						<p>Password: admin</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginScreen;
