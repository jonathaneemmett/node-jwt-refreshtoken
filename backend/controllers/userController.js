import argon2 from 'argon2';
import User from '../models/User.js';
import { getTokens } from '../utils/tokenGenerators.js';

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