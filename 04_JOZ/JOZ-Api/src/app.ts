import express from 'express';
import cors from 'cors';
import { setRoutes } from './routes/index';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS for the frontend dev origin
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		credentials: true,
	})
);

// Set routes
setRoutes(app);

// Error handling middleware
app.use(errorMiddleware);

export default app;