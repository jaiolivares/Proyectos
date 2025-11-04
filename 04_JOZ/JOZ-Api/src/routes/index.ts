import { Express } from 'express';
import { HealthController } from '../controllers/health.controller';
import userRoutes from './user.routes';

const healthController = new HealthController();

export const setRoutes = (app: Express) => {
    app.get('/api/health', healthController.getHealth.bind(healthController));
    app.use('/api/users', userRoutes);
};