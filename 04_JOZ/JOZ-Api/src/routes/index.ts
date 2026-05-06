import { Express } from 'express';
import healtRoutes from './healths/health.routes';
import authRoutes from './auths/auth.routes';
import usuarioRoutes from './usuarios/usuario.routes';
import vehiculoRoutes from './vehiculos/vehiculo.routes';
import marcaModeloVehiculoRoutes from './vehiculos/marcaModeloVehiculo.routes';
import marcaRoutes from './vehiculos/marca.routes';
import modeloRoutes from './vehiculos/modelo.routes';
import tallerRoutes from './vehiculos/taller.routes';

//TODO: BorraritemController que era solo de prueas para el Front
import {ItemController} from '../controllers/item.controller';
const itemController = new ItemController();

export const setRoutes = (app: Express) => {
    app.use('/api/health', healtRoutes);
    app.use('/api/auth', authRoutes );
    app.use('/api/usuario', usuarioRoutes);
    app.use('/api/vehiculo', vehiculoRoutes);
    app.use('/api/marcaModeloVehiculo', marcaModeloVehiculoRoutes);
    app.use('/api/marca', marcaRoutes);
    app.use('/api/modelo', modeloRoutes);
    app.use('/api/taller', tallerRoutes);
    app.use('/api/item', itemController.all.bind(itemController));
};