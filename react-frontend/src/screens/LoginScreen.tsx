import { useState, useEffect } from 'react';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		setError('');
	}, [email, password]);
	return (
		<section>
			<div className='loginContainer'>
				<h3>Sign In</h3>
				<form className='form-horizontal' autoComplete='off'>
					<div className='form-group'>
						<label htmlFor='email' className='visually-hidden'>
							Email address
						</label>
						<input
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
				<p className={error ? 'error' : 'visually-hidden'}>{error}</p>
			</div>
		</section>
	);
};

export default LoginScreen;
