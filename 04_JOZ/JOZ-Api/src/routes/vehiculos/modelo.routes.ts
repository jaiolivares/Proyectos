import { Router } from "express";
import { ModeloController } from "../../controllers/vehiculos/modelo.controller";
import { ModeloCommandService } from "../../services/commands/vehiculos/modelo/modelo.command.service";
import { ModeloQueryService } from "../../services/queries/vehiculos/modelo/modelo.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const modeloCommandService = new ModeloCommandService();
const modeloQueryService = new ModeloQueryService();
const modeloController = new ModeloController(modeloCommandService, modeloQueryService);
const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, modeloController.obtenerTodos.bind(modeloController));
router.get("/obtenerPorId/:id", rateLimiter, modeloController.obtenerPorId.bind(modeloController));
router.post("/crear", rateLimiter, modeloController.crear.bind(modeloController));
router.patch("/actualizar/:id", rateLimiter, modeloController.actualizar.bind(modeloController));
router.delete("/eliminar/:id", rateLimiter, modeloController.eliminar.bind(modeloController));

export default router;
