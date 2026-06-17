import { Router } from "express";
import { UsuarioController } from "../../controllers/usuarios/usuario.controller";
import { UsuarioCommandService } from "../../services/commands/usuarios/usuario/usuario.command.service";
import { UsuarioQueryService } from "../../services/queries/usuarios/usuario/usuario.query.service";
import { createRateLimiter } from "../../utils/rateLimiter";

const router = Router();
const usuarioCommandService = new UsuarioCommandService();
const usuarioQueryService = new UsuarioQueryService();

const usuarioController = new UsuarioController(usuarioCommandService, usuarioQueryService);

const rateLimiter = createRateLimiter();

router.get("/obtenerTodos", rateLimiter, usuarioController.obtenerTodos.bind(usuarioController));
router.get("/obtenerPorId/:id", rateLimiter, usuarioController.obtenerPorId.bind(usuarioController));
router.post("/crear", rateLimiter, usuarioController.crear.bind(usuarioController));
router.put("/actualizarPassword/:id", rateLimiter, usuarioController.actualizarPassword.bind(usuarioController));
// router.put("/actualizar/:id", usuarioController.actualizar.bind(usuarioController));
// router.delete("/eliminar/:id", usuarioController.eliminar.bind(usuarioController));

export default router;
