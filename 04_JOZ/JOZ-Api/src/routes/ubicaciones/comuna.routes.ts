import { Router } from "express";
import { ComunaController } from "../../controllers/ubicaciones/comuna.controller";
import { ComunaQueryService } from "../../services/queries/ubicaciones/comuna/comuna.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const comunaQueryService = new ComunaQueryService();
const comunaController = new ComunaController(comunaQueryService);

const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, comunaController.obtenerTodos.bind(comunaController));
router.get("/obtenerPorId/:id", rateLimiter, comunaController.obtenerPorId.bind(comunaController));

export default router;
