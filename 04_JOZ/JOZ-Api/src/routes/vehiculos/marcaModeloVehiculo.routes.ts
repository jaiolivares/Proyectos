import { Router } from "express";
import { MarcaModeloVehiculoController } from "../../controllers/vehiculos/marcaModeloVehiculo.controller";
import { MarcaModeloVehiculoCommandService } from "../../services/commands/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.command.service";
import { MarcaModeloVehiculoQueryService } from "../../services/queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service";

const router = Router();
const marcaModeloVehiculoCommandService = new MarcaModeloVehiculoCommandService();
const marcaModeloVehiculoQueryService = new MarcaModeloVehiculoQueryService();
const marcaModeloVehiculoController = new MarcaModeloVehiculoController(marcaModeloVehiculoCommandService, marcaModeloVehiculoQueryService);

router.get("/obtenerTodos", marcaModeloVehiculoController.obtenerTodos.bind(marcaModeloVehiculoController));
router.get("/obtenerPorId/:id", marcaModeloVehiculoController.obtenerPorId.bind(marcaModeloVehiculoController));
router.post("/crear", marcaModeloVehiculoController.crear.bind(marcaModeloVehiculoController));
router.put("/actualizar/:id", marcaModeloVehiculoController.actualizar.bind(marcaModeloVehiculoController));
router.delete("/eliminar/:id", marcaModeloVehiculoController.eliminar.bind(marcaModeloVehiculoController));

export default router;
