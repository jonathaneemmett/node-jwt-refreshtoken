import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

interface AuthContextInterface {
	auth: {
		user: {
			_id: string;
			email: string;
			role: string;
		};
	};
	setAuth: Function;
}

const useAuth = () => {
	return useContext(AuthContext) as AuthContextInterface;
};

export default useAuth;
