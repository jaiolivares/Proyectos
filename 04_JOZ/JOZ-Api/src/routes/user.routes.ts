import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get('/:id', userController.getUser.bind(userController));
router.post('/', userController.createUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;