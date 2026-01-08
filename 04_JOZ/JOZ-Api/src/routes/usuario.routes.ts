import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioCommandService } from "../services/commands/usuario/usuario.command.service";
import { UsuarioQueryService } from "../services/queries/usuario/usuario.query.service";

const router = Router();
const usuarioCommandService = new UsuarioCommandService();
const usuarioQueryService = new UsuarioQueryService();
const usuarioController = new UsuarioController(usuarioCommandService, usuarioQueryService);

router.get("/", usuarioController.obtenerUsuarios.bind(usuarioController));
router.get("/:id", usuarioController.obtenerUsuario.bind(usuarioController));
router.post("/", usuarioController.crearUsuario.bind(usuarioController));
router.put("/:id", usuarioController.actualizarUsuario.bind(usuarioController));
router.delete("/:id", usuarioController.eliminarUsuario.bind(usuarioController));

export default router;
