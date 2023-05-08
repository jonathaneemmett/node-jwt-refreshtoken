import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { generatePassword } from './passwordGenerator.js';

export async function generateToken(user) {
	const id = user._id;
	const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '15d',
	});

	return token;
}

export async function generateRefreshToken(user) {
	const { _id, email } = user;
	const refreshToken = await jwt.sign(
		{ _id, email },
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		},
	);

	return refreshToken;
}

export async function generateContext() {
	const context = generatePassword();
	const contextToken = await argon2.hash(context);

	return { context, contextToken };
}

export async function verifyContext(context, contextToken) {
	console.log(context, contextToken);
	const isMatch = await argon2.verify(context, contextToken);

	return isMatch;
}

export async function verifyToken(token) {
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);

	return decoded;
}

export async function verifyRefreshToken(refreshToken) {
	const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);

	return decoded;
}

export async function getTokens(user) {
	const token = await generateToken(user);
	const refreshToken = await generateRefreshToken(user);
	const context = await generateContext();

	return { token, refreshToken, context };
}
