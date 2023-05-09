export const generatePassword = (length = 10) => {
	const charlen = length;
	const charset =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$';
	let value = '';
	for (let i = 0, n = charset.length; i < charlen; ++i) {
		value += charset.charAt(Math.floor(Math.random() * n));
	}

	return value;
};
