import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Context
import { AuthProvider } from './context/AuthProvider';

// Routes
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MissingScreen from './screens/MissingScreen';
import AdminScreen from './screens/AdminScreen';
import ProfileScreen from './screens/ProfileScreen';
import UnauthorizedScreen from './screens/UnauthorizedScreen';

import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			{/* Public Routes */}
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/login' element={<LoginScreen />} />
			<Route path='/unauthorized' element={<UnauthorizedScreen />} />

			{/* Protected Routes */}
			<Route element={<ProtectedRoute roles={['user', 'admin']} />}>
				<Route
					index={true}
					path='/profile'
					element={<ProfileScreen />}
				/>
			</Route>
			<Route element={<ProtectedRoute roles={['admin']} />}>
				<Route index={true} path='/admin' element={<AdminScreen />} />
			</Route>
			{/* Missing */}
			<Route path='*' element={<MissingScreen />} />
		</Route>,
	),
);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
