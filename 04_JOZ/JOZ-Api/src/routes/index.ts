import { Express } from 'express';
import { HealthController } from '../controllers/healths/health.controller';
import usuarioRoutes from './usuarios/usuario.routes';
import vehiculoRoutes from './vehiculos/vehiculo.routes';
import marcaModeloVehiculoRoutes from './vehiculos/marcaModeloVehiculo.routes';
import marcaRoutes from './vehiculos/marca.routes';
import modeloRoutes from './vehiculos/modelo.routes';

import {ItemController} from '../controllers/item.controller';

const healthController = new HealthController();

const itemController = new ItemController();

export const setRoutes = (app: Express) => {
    app.get('/api/health', healthController.getHealth.bind(healthController));
    app.use('/api/auth', usuarioRoutes);
    app.use('/api/usuario', usuarioRoutes);
    app.use('/api/vehiculo', vehiculoRoutes);
    app.use('/api/marcaModeloVehiculo', marcaModeloVehiculoRoutes);
    app.use('/api/marca', marcaRoutes);
    app.use('/api/modelo', modeloRoutes);
    app.use('/api/item', itemController.all.bind(itemController));
};