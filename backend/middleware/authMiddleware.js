import {
	verifyContext,
	verifyRefreshToken,
	verifyToken,
} from '../utils/tokenGenerators.js';
import User from '../models/User.js';

export async function tokenHandler(req, res, next) {
	return res.status(200).json({ success: true, message: req.cookies });
	const { context, refreshToken } = req.cookies;

	if (!context || !refreshToken)
		return res.status(401).json({
			success: false,
			message: 'No Context or RefreshToken, Unauthorized.',
		});

	// Get the auth token
	const token = req.headers.authorization?.split(' ')[1];
	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'No Token, Unauthorized.' });

	try {
		// Verify the token
		const decoded = await verifyToken(token);
		if (!decoded)
			return res.status(403).json({
				success: false,
				message: 'Token not verified, Unauthorized.',
			});

		// Get the user
		const user = await User.findById(decoded.id);
		if (!user)
			return res.status(401).json({
				success: false,
				message: 'User not found, Unauthorized.',
			});

		// Verify the refresh token
		const decodedRefreshToken = await verifyRefreshToken(refreshToken);
		if (!decodedRefreshToken)
			return res.status(401).json({
				success: false,
				message: 'Refresh Token not verified,Unauthorized.',
			});

		// Verify the context
		const isMatch = await verifyContext(context, user.context);
		if (!isMatch)
			return res.status(401).json({
				success: false,
				message: 'Context not verified, Unauthorized.',
			});

		// Set the user
		req.user = user;

		// Call the next middleware
		next();
	} catch (err) {
		console.error(err);
		return res.status(401).json({
			success: false,
			message: 'Shit hit the fan, Unauthorized.',
		});
	}
}

export async function adminHandler(req, res, next) {
	const { user } = req;
	if (!user)
		return res.status(401).json({
			success: false,
			message: 'Not even logged in, unauthorized.',
		});

	if (user.role !== 'admin')
		return res
			.status(401)
			.json({ success: false, message: 'Not an admin, unauthorized.' });

	next();
}
