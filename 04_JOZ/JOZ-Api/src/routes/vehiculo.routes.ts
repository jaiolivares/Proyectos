import { Router } from "express";
import { VehiculoController } from "../controllers/vehiculo.controller";
import { VehiculoCommandService } from "../services/commands/vehiculo/vehiculo.command.service";
import { VehiculoQueryService } from "../services/queries/vehiculo/vehiculo.query.service";

const router = Router();
const vehiculoCommandService = new VehiculoCommandService();
const vehiculoQueryService = new VehiculoQueryService();
const vehiculoController = new VehiculoController(vehiculoCommandService, vehiculoQueryService);

router.get("/obtenerTodos", vehiculoController.obtenerTodos.bind(vehiculoController));
router.get("/obtenerPorId/:id", vehiculoController.obtenerPorId.bind(vehiculoController));
router.post("/crear", vehiculoController.crear.bind(vehiculoController));
router.put("/actualizar/:id", vehiculoController.actualizar.bind(vehiculoController));
router.delete("/eliminar/:id", vehiculoController.eliminar.bind(vehiculoController));

export default router;
