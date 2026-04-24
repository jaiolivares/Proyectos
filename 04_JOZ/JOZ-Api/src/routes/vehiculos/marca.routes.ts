import { Router } from "express";
import { MarcaController } from "../../controllers/vehiculos/marca.controller";
import { MarcaCommandService } from "../../services/commands/vehiculos/marca/marca.command.service";
import { MarcaQueryService } from "../../services/queries/vehiculos/marca/marca.query.service";

const router = Router();
const marcaCommandService = new MarcaCommandService();
const marcaQueryService = new MarcaQueryService();
const marcaController = new MarcaController(marcaCommandService, marcaQueryService);

router.get("/obtenerTodos", marcaController.obtenerTodos.bind(marcaController));
router.get("/obtenerPorId/:id", marcaController.obtenerPorId.bind(marcaController));
router.post("/crear", marcaController.crear.bind(marcaController));
router.put("/actualizar/:id", marcaController.actualizar.bind(marcaController));
router.delete("/eliminar/:id", marcaController.eliminar.bind(marcaController));

export default router;
