import { Router } from "express";
import { VehiculoController } from "../../controllers/vehiculos/vehiculo.controller";
import { VehiculoCommandService } from "../../services/commands/vehiculos/vehiculo/vehiculo.command.service";
import { VehiculoQueryService } from "../../services/queries/vehiculos/vehiculo/vehiculo.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const vehiculoCommandService = new VehiculoCommandService();
const vehiculoQueryService = new VehiculoQueryService();
const vehiculoController = new VehiculoController(vehiculoCommandService, vehiculoQueryService);
const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, vehiculoController.obtenerTodos.bind(vehiculoController));
router.get("/obtenerPorId/:id", rateLimiter, vehiculoController.obtenerPorId.bind(vehiculoController));
router.post("/crear", rateLimiter, vehiculoController.crear.bind(vehiculoController));
router.patch("/actualizar/:id", rateLimiter, vehiculoController.actualizar.bind(vehiculoController));
router.delete("/eliminar/:id", rateLimiter, vehiculoController.eliminar.bind(vehiculoController));

export default router;
