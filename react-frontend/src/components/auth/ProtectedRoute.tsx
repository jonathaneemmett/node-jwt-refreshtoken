import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Roles } from '../../types/types';

const ProtectedRoute = ({ roles }: Roles) => {
	const { auth } = useAuth();
	const location = useLocation();
	const userRole = auth?.user?.role as string;
	const user = auth?.user;

	return roles.includes(userRole) ? (
		<Outlet />
	) : user ? (
		<Navigate to='/unauthorized' state={{ from: location }} replace />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
