import { Router } from "express";
import { TallerController } from "../../controllers/vehiculos/taller.controller";
import { TallerCommandService } from "../../services/commands/vehiculos/taller/taller.command.service";
import { TallerQueryService } from "../../services/queries/vehiculos/taller/taller.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const tallerCommandService = new TallerCommandService();
const tallerQueryService = new TallerQueryService();
const tallerController = new TallerController(tallerCommandService, tallerQueryService);
const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, tallerController.obtenerTodos.bind(tallerController));
router.get("/obtenerPorId/:id", rateLimiter, tallerController.obtenerPorId.bind(tallerController));
router.post("/crear", rateLimiter, tallerController.crear.bind(tallerController));
router.patch("/actualizar/:id", rateLimiter, tallerController.actualizar.bind(tallerController));
router.delete("/eliminar/:id", rateLimiter, tallerController.eliminar.bind(tallerController));

export default router;
