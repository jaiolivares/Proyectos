import { Router } from 'express';
import HealthController from '../controllers/health.controller';
import userRoutes from './user.routes';

const router = Router();
const healthController = new HealthController();

export const setRoutes = (app: any) => {
    app.use('/health', healthController.getHealth());
    app.use('/users', userRoutes);
};

export default router;