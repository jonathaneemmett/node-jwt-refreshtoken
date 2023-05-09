import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Context
import { AuthProvider } from './context/AuthContext';

// Routing
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';
import ProfileScreen from './screens/ProfileScreen';
import RequireAuth from './components/auth/RequireAuth';
import Unauthorized from './components/auth/Unauthorized';
import Missing from './components/Missing';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/login' element={<LoginScreen />} />
			<Route path='unauthorized' element={<Unauthorized />} />

			{/* Secured Profile Routes */}
			<Route element={<RequireAuth roles={['user', 'admin']} />}>
				<Route path='/profile' element={<ProfileScreen />} />
			</Route>
			{/* Secured Admin Routes */}
			<Route element={<RequireAuth roles={['admin']} />}>
				<Route path='/admin' element={<AdminScreen />} />
			</Route>

			{/* Catch all route */}
			<Route path='*' element={<Missing />} />
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