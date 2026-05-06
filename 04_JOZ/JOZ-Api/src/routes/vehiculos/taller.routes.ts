import { Router } from "express";
import { TallerController } from "../../controllers/vehiculos/taller.controller";
import { TallerCommandService } from "../../services/commands/vehiculos/taller/taller.command.service";
import { TallerQueryService } from "../../services/queries/vehiculos/taller/taller.query.service";

const router = Router();
const tallerCommandService = new TallerCommandService();
const tallerQueryService = new TallerQueryService();
const tallerController = new TallerController(tallerCommandService, tallerQueryService);

router.get("/obtenerTodos", tallerController.obtenerTodos.bind(tallerController));
router.get("/obtenerPorId/:id", tallerController.obtenerPorId.bind(tallerController));
router.post("/crear", tallerController.crear.bind(tallerController));
router.put("/actualizar/:id", tallerController.actualizar.bind(tallerController));
router.delete("/eliminar/:id", tallerController.eliminar.bind(tallerController));

export default router;
