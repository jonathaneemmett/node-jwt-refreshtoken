import argon2 from 'argon2';
import User from '../models/User.js';
import { getTokens } from '../utils/tokenGenerators.js';
import { verifyRefreshToken, verifyContext } from '../utils/tokenGenerators.js';

export async function register(req, res, next) {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password)
		return res
			.status(400)
			.json({ success: false, message: 'All fields are required.' });

	// Check if user exists
	const existingUser = await User.findOne({ email });
	if (existingUser)
		return res
			.status(400)
			.json({ success: false, message: 'User already exists.' });

	// Hash password
	const hashedPassword = await argon2.hash(password);

	// Create new user
	const user = await User.create({ email, password: hashedPassword });
	if (!user)
		return res
			.status(400)
			.json({ success: false, message: 'Error creating user.' });

	// Get tokens
	const { token, refreshToken, context } = await getTokens(user);

	// Save context
	user.context = context.context;

	// Save user
	await user.save();

	// Put refresh token and context in a httpOnly cookie
	res.cookie('refreshToken', refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1, // 1 day
	});

	res.cookie('context', context.contextToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1, // 1 day
	});

	// Send response
	res.status(201).json({
		success: true,
		message: 'User created.',
		token,
		user: {
			id: user._id,
			email: user.email,
			role: user.role,
		},
	});
}

export async function login(req, res, next) {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password)
		return res
			.status(400)
			.json({ success: false, message: 'All fields are required.' });

	// Check if user exists
	let user = await User.findOne({ email });
	if (!user)
		return res
			.status(400)
			.json({ success: false, message: 'Invalid Credentials' });

	// Check if password matches
	const isMatch = await argon2.verify(user.password, password);
	if (!isMatch)
		return res
			.status(400)
			.json({ success: false, message: 'Invalid Credentials' });

	// Get tokens
	const { token, refreshToken, context } = await getTokens(user);

	// Save context
	user.context = context.context;

	// Save user
	await user.save();

	// Put refresh token and context in a httpOnly cookie
	res.cookie('refreshToken', refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1, // 1 day
	});

	res.cookie('context', context.contextToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1, // 1 day
	});

	// Send response
	res.status(201).json({
		success: true,
		message: 'User logged in.',
		token,
		user: {
			id: user._id,
			email: user.email,
			role: user.role,
		},
	});
}

export async function logout(req, res, next) {
	// Clear refresh token and context
	res.cookie('refreshToken', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0,
	});

	res.cookie('context', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0,
	});

	// Send response
	res.status(200).json({
		success: true,
		message: 'User logged out.',
	});
}

// Admin routes
export async function getUsers(req, res, next) {
	const users = await User.find({}).select('-password');

	res.status(200).json(users);
}

// Token Routes
export async function refreshToken(req, res, next) {
	const { context, refreshToken } = req.cookies;

	if (!context || !refreshToken)
		return res
			.status(401)
			.json({ success: false, message: 'Unauthorized.' });

	// Get the user
	const decodedRefreshToken = await verifyRefreshToken(refreshToken);
	if (!decodedRefreshToken)
		return res
			.status(401)
			.json({ success: false, message: 'Unauthorized.' });

	const user = await User.findById(decodedRefreshToken._id);
	if (!user)
		return res
			.status(401)
			.json({ success: false, message: 'Unauthorized.' });

	// Verify the context
	const isMatch = await verifyContext(context, user.context);
	if (!isMatch)
		return res
			.status(401)
			.json({ success: false, message: 'Unauthorized.' });

	// Get tokens
	const {
		token,
		refreshToken: newRefreshToken,
		context: newContext,
	} = await getTokens(user);

	// Save context
	user.context = newContext.context;

	// Save user
	await user.save();

	// Put refresh token and context in a httpOnly cookie
	res.cookie('refreshToken', newRefreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1, // 1 day
	});

	res.cookie('context', newContext.contextToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 1, // 1 day
	});

	// Send response
	res.status(201).json({
		success: true,
		message: 'User logged in.',
		token,
		user: {
			id: user._id,
			email: user.email,
			role: user.role,
		},
	});
}
