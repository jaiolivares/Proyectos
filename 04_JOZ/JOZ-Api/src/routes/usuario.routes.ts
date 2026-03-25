import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthCommandService } from "../services/commands/auth/auth.command.service";
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioCommandService } from "../services/commands/usuario/usuario.command.service";
import { UsuarioQueryService } from "../services/queries/usuario/usuario.query.service";

const router = Router();
const usuarioCommandService = new UsuarioCommandService();
const usuarioQueryService = new UsuarioQueryService();
const authCommandService = new AuthCommandService(usuarioQueryService);

const authController = new AuthController(authCommandService);
const usuarioController = new UsuarioController(usuarioCommandService, usuarioQueryService);

router.post("/login", authController.login.bind(authController));
router.get("/obtenerTodos", usuarioController.obtenerTodos.bind(usuarioController));
router.get("/obtenerPorId/:id", usuarioController.obtenerPorId.bind(usuarioController));
router.post("/crear", usuarioController.crear.bind(usuarioController));
router.put("/actualizarPassword/:id", usuarioController.actualizarPassword.bind(usuarioController));
// router.put("/actualizar/:id", usuarioController.actualizar.bind(usuarioController));
// router.delete("/eliminar/:id", usuarioController.eliminar.bind(usuarioController));

export default router;
