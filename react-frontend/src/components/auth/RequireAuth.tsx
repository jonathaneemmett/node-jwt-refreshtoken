import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type Props = {
	roles: Array<string>;
};

const RequireAuth = ({ roles }: Props) => {
	const { auth } = useAuth();
	const location = useLocation();
	const user = auth?.user;
	const userRole = auth?.user?.role;

	return roles.includes(userRole) ? (
		<Outlet />
	) : user ? (
		<Navigate to='/unauthorized' state={{ from: location }} />
	) : (
		<Navigate to='/login' state={{ from: location }} />
	);
};

export default RequireAuth;
