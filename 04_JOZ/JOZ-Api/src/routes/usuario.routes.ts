import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';
import { UsuarioCommandRepository } from "../repositories/commands/usuario.command.repository";
import { UsuarioQueryRepository } from "../repositories/queries/usuario.query.repository";

const router = Router();
const usuarioCommandRepository = new UsuarioCommandRepository();
const usuarioQueryRepository = new UsuarioQueryRepository();
const usuarioController = new UsuarioController(usuarioCommandRepository as any, usuarioQueryRepository as any);

router.get('/', usuarioController.obtenerUsuarios.bind(usuarioController));
router.get('/:id', usuarioController.obtenerUsuario.bind(usuarioController));
router.post('/', usuarioController.crearUsuario.bind(usuarioController));
router.put('/:id', usuarioController.actualizarUsuario.bind(usuarioController));
router.delete('/:id', usuarioController.eliminarUsuario.bind(usuarioController));

export default router;
