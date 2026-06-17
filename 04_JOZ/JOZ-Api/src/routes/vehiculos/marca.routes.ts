import { Router } from "express";
import { MarcaController } from "../../controllers/vehiculos/marca.controller";
import { MarcaCommandService } from "../../services/commands/vehiculos/marca/marca.command.service";
import { MarcaQueryService } from "../../services/queries/vehiculos/marca/marca.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const marcaCommandService = new MarcaCommandService();
const marcaQueryService = new MarcaQueryService();
const marcaController = new MarcaController(marcaCommandService, marcaQueryService);
const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, marcaController.obtenerTodos.bind(marcaController));
router.get("/obtenerPorId/:id", rateLimiter, marcaController.obtenerPorId.bind(marcaController));
router.post("/crear", rateLimiter, marcaController.crear.bind(marcaController));
router.patch("/actualizar/:id", rateLimiter, marcaController.actualizar.bind(marcaController));
router.delete("/eliminar/:id", rateLimiter, marcaController.eliminar.bind(marcaController));

export default router;
