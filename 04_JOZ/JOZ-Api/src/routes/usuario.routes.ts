import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import { UsuarioCommandService } from "../services/commands/usuario/usuario.command.service";
import { UsuarioQueryService } from "../services/queries/usuario/usuario.query.service";

const router = Router();
const usuarioCommandService = new UsuarioCommandService();
const usuarioQueryService = new UsuarioQueryService();
const usuarioController = new UsuariosController(usuarioCommandService, usuarioQueryService);

router.get("/obtenerTodos", usuarioController.obtenerTodos.bind(usuarioController));
router.get("/obtenerPorId/:id", usuarioController.obtenerPorId.bind(usuarioController));
router.post("/crear", usuarioController.crear.bind(usuarioController));
router.put("/actualizarPassword/:id", usuarioController.actualizarPassword.bind(usuarioController));
//router.post("/login", usuarioController.login.bind(usuarioController));
// router.put("/actualizar/:id", usuarioController.actualizar.bind(usuarioController));
// router.delete("/eliminar/:id", usuarioController.eliminar.bind(usuarioController));

export default router;
