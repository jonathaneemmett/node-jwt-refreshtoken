import { createContext, useState } from 'react';
import { Props } from '../types/types';

interface Auth {
	user: {
		_id: string;
		email: string;
		role: string;
	};
	token: string;
}
const AuthContext = createContext({
	auth: {} as Auth,
	setAuth: (auth: any) => {},
});

export const AuthProvider = ({ children }: Props) => {
	const [auth, setAuth] = useState({
		user: {
			_id: '',
			email: '',
			role: '',
		},
		token: '',
	});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
