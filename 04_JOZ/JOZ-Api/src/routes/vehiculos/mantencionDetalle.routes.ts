import { Router } from 'express';
import { MantencionDetalleController } from '../../controllers/vehiculos/mantencionDetalle.controller';
import { MantencionDetalleCommandService } from '../../services/commands/vehiculos/mantencionDetalle/mantencionDetalle.command.service';
import { MantencionDetalleQueryService } from '../../services/queries/vehiculos/mantencionDetalle/mantencionDetalle.query.service';

const router = Router();
const mantencionDetalleCommandService = new MantencionDetalleCommandService();
const mantencionDetalleQueryService = new MantencionDetalleQueryService();
const mantencionDetalleController = new MantencionDetalleController(mantencionDetalleCommandService, mantencionDetalleQueryService);

router.get('/obtenerTodos', mantencionDetalleController.obtenerTodos.bind(mantencionDetalleController));
router.get('/obtenerPorId/:id', mantencionDetalleController.obtenerPorId.bind(mantencionDetalleController));
router.post('/crear', mantencionDetalleController.crear.bind(mantencionDetalleController));
router.patch('/actualizar/:id', mantencionDetalleController.actualizar.bind(mantencionDetalleController));
router.delete('/eliminar/:id', mantencionDetalleController.eliminar.bind(mantencionDetalleController));

export default router;
