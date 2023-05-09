import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5100;

const app = express();

// Connect Database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Routes
app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
	res.send('Welcome to the api...');
});

app.listen(PORT, () =>
	console.log(`Server running on port: http://localhost:${PORT}`),
);
