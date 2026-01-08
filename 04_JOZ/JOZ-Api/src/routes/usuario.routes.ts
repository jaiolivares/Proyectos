import { Router } from 'express';
import { UserController } from '../controllers/usuario.controller';
import { UserService } from '../services/usuario.service';
import { UserRepository } from '../repositories/usuario.repository';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.obtenerUsuarios.bind(userController));
router.get('/:id', userController.obtenerUsuario.bind(userController));
router.post('/', userController.crearUsuario.bind(userController));
router.put('/:id', userController.actualizarUsuario.bind(userController));
router.delete('/:id', userController.eliminarUsuario.bind(userController));

export default router;
