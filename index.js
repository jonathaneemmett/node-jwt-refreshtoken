import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 5100;

const app = express();

// Connect Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
	res.send('Welcome to the api...');
});

app.listen(PORT, () =>
	console.log(`Server running on port: http://localhost:${PORT}`),
);
