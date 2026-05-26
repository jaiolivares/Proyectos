import { Router } from "express";
import { ComunaController } from "../../controllers/ubicaciones/comuna.controller";
import { ComunaQueryService } from "../../services/queries/ubicaciones/comuna/comuna.query.service";

const router = Router();
const comunaQueryService = new ComunaQueryService();
const comunaController = new ComunaController(comunaQueryService);

router.get("/obtenerTodos", comunaController.obtenerTodos.bind(comunaController));
router.get("/obtenerPorId/:id", comunaController.obtenerPorId.bind(comunaController));

export default router;