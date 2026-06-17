import { Router } from "express";
import { MantencionController } from "../../controllers/vehiculos/mantencion.controller";
import { MantencionCommandService } from "../../services/commands/vehiculos/mantencion/mantencion.command.service";
import { MantencionQueryService } from "../../services/queries/vehiculos/mantencion/mantencion.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const mantencionCommandService = new MantencionCommandService();
const mantencionQueryService = new MantencionQueryService();
const mantencionController = new MantencionController(mantencionCommandService, mantencionQueryService);
const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, mantencionController.obtenerTodos.bind(mantencionController));
router.get("/obtenerPorId/:id", rateLimiter, mantencionController.obtenerPorId.bind(mantencionController));
router.post("/crear", rateLimiter, mantencionController.crear.bind(mantencionController));
router.patch("/actualizar/:id", rateLimiter, mantencionController.actualizar.bind(mantencionController));
router.delete("/eliminar/:id", rateLimiter, mantencionController.eliminar.bind(mantencionController));

export default router;
