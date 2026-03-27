import { Express } from 'express';
import { HealthController } from '../controllers/health.controller';
import usuarioRoutes from './usuario.routes';

import {ItemController} from '../controllers/item.controller';

const healthController = new HealthController();

const itemController = new ItemController();

export const setRoutes = (app: Express) => {
    app.get('/api/health', healthController.getHealth.bind(healthController));
    app.use('/api/auth', usuarioRoutes);
    app.use('/api/usuario', usuarioRoutes);
    app.use('/api/item', itemController.all.bind(itemController));
};