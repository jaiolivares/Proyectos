import { Express } from 'express';
import { HealthController } from '../controllers/health.controller';
import userRoutes from './usuario.routes';

const healthController = new HealthController();

export const setRoutes = (app: Express) => {
    app.get('/api/health', healthController.getHealth.bind(healthController));
    app.use('/api/usuarios', userRoutes);
};