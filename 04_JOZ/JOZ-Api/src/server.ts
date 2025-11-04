import express from 'express';
import { setRoutes } from './routes/index';
import { errorMiddleware } from './middleware/error.middleware';
import { config } from './config';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set routes
setRoutes(app);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});