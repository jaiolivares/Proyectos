import { Router } from "express";
import { MarcaModeloVehiculoController } from "../../controllers/vehiculos/marcaModeloVehiculo.controller";
import { MarcaModeloVehiculoCommandService } from "../../services/commands/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.command.service";
import { MarcaModeloVehiculoQueryService } from "../../services/queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const marcaModeloVehiculoCommandService = new MarcaModeloVehiculoCommandService();
const marcaModeloVehiculoQueryService = new MarcaModeloVehiculoQueryService();
const marcaModeloVehiculoController = new MarcaModeloVehiculoController(marcaModeloVehiculoCommandService, marcaModeloVehiculoQueryService);
const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, marcaModeloVehiculoController.obtenerTodos.bind(marcaModeloVehiculoController));
router.get("/obtenerPorId/:id", rateLimiter, marcaModeloVehiculoController.obtenerPorId.bind(marcaModeloVehiculoController));
router.post("/crear", rateLimiter, marcaModeloVehiculoController.crear.bind(marcaModeloVehiculoController));
router.patch("/actualizar/:id", rateLimiter, marcaModeloVehiculoController.actualizar.bind(marcaModeloVehiculoController));
router.delete("/eliminar/:id", rateLimiter, marcaModeloVehiculoController.eliminar.bind(marcaModeloVehiculoController));

export default router;
