import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		context: {
			type: String,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model('User', userSchema);

export default User;
