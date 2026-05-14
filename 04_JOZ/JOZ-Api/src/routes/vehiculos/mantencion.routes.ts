import { Router } from "express";
import { MantencionController } from "../../controllers/vehiculos/mantencion.controller";
import { MantencionCommandService } from "../../services/commands/vehiculos/mantencion/mantencion.command.service";
import { MantencionQueryService } from "../../services/queries/vehiculos/mantencion/mantencion.query.service";

const router = Router();
const mantencionCommandService = new MantencionCommandService();
const mantencionQueryService = new MantencionQueryService();
const mantencionController = new MantencionController(mantencionCommandService, mantencionQueryService);

router.get("/obtenerTodos", mantencionController.obtenerTodos.bind(mantencionController));
router.get("/obtenerPorId/:id", mantencionController.obtenerPorId.bind(mantencionController));
router.post("/crear", mantencionController.crear.bind(mantencionController));
router.patch("/actualizar/:id", mantencionController.actualizar.bind(mantencionController));
router.delete("/eliminar/:id", mantencionController.eliminar.bind(mantencionController));

export default router;
