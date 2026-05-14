import { Express } from 'express';
import healtRoutes from './healths/health.routes';
import authRoutes from './auths/auth.routes';
import usuarioRoutes from './usuarios/usuario.routes';
import vehiculoRoutes from './vehiculos/vehiculo.routes';
import marcaModeloVehiculoRoutes from './vehiculos/marcaModeloVehiculo.routes';
import marcaRoutes from './vehiculos/marca.routes';
import modeloRoutes from './vehiculos/modelo.routes';
import tallerRoutes from './vehiculos/taller.routes';
import mantencionRoutes from './vehiculos/mantencion.routes';
import mantencionDetalleRoutes from './vehiculos/mantencionDetalle.routes';
import { authMiddleware } from '../middleware/auth.middleware';

//TODO: BorraritemController que era solo de prueas para el Front
import {ItemController} from '../controllers/item.controller';
const itemController = new ItemController();

export const setRoutes = (app: Express) => {
    app.use('/api/health', healtRoutes);
    app.use('/api/auth', authRoutes );
    app.use('/api/usuario', authMiddleware, usuarioRoutes);
    app.use('/api/vehiculo', authMiddleware, vehiculoRoutes);
    app.use('/api/marcaModeloVehiculo', authMiddleware, marcaModeloVehiculoRoutes);
    app.use('/api/marca', authMiddleware, marcaRoutes);
    app.use('/api/modelo', authMiddleware, modeloRoutes);
    app.use('/api/taller', authMiddleware, tallerRoutes);
    app.use('/api/mantencion', authMiddleware, mantencionRoutes);
    app.use('/api/mantencionDetalle', authMiddleware, mantencionDetalleRoutes);
    app.use('/api/item', authMiddleware, itemController.all.bind(itemController));
};