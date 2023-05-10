import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5100;

const server = process.env.SERVER;

const app = express();

// Connect Database
connectDB();

app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/users', userRouter);

app.get('/', (req, res) => {
	res.send('Welcome to the api...');
});

app.listen(PORT, () =>
	console.log(`Server running on port: ${server}:${PORT}`),
);
