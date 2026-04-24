import { Router } from "express";
import { ModeloController } from "../../controllers/vehiculos/modelo.controller";
import { ModeloCommandService } from "../../services/commands/vehiculos/modelo/modelo.command.service";
import { ModeloQueryService } from "../../services/queries/vehiculos/modelo/modelo.query.service";

const router = Router();
const modeloCommandService = new ModeloCommandService();
const modeloQueryService = new ModeloQueryService();
const modeloController = new ModeloController(modeloCommandService, modeloQueryService);

router.get("/obtenerTodos", modeloController.obtenerTodos.bind(modeloController));
router.get("/obtenerPorId/:id", modeloController.obtenerPorId.bind(modeloController));
router.post("/crear", modeloController.crear.bind(modeloController));
router.put("/actualizar/:id", modeloController.actualizar.bind(modeloController));
router.delete("/eliminar/:id", modeloController.eliminar.bind(modeloController));

export default router;
