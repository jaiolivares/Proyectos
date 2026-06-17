import { Router } from "express";
import { MantencionDetalleController } from "../../controllers/vehiculos/mantencionDetalle.controller";
import { MantencionDetalleCommandService } from "../../services/commands/vehiculos/mantencionDetalle/mantencionDetalle.command.service";
import { MantencionDetalleQueryService } from "../../services/queries/vehiculos/mantencionDetalle/mantencionDetalle.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const mantencionDetalleCommandService = new MantencionDetalleCommandService();
const mantencionDetalleQueryService = new MantencionDetalleQueryService();
const mantencionDetalleController = new MantencionDetalleController(mantencionDetalleCommandService, mantencionDetalleQueryService);
const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, mantencionDetalleController.obtenerTodos.bind(mantencionDetalleController));
router.get("/obtenerPorId/:id", rateLimiter, mantencionDetalleController.obtenerPorId.bind(mantencionDetalleController));
router.post("/crear", rateLimiter, mantencionDetalleController.crear.bind(mantencionDetalleController));
router.patch("/actualizar/:id", rateLimiter, mantencionDetalleController.actualizar.bind(mantencionDetalleController));
router.delete("/eliminar/:id", rateLimiter, mantencionDetalleController.eliminar.bind(mantencionDetalleController));

export default router;
