import { Request, Response } from 'express';
import { UserService } from '../services/usuario.service';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async obtenerUsuario(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id);
        const user = await this.userService.obtenerUsuario(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    }

    public async crearUsuario(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;
        const newUser = await this.userService.crearUsuario(name, email);
        return res.status(201).json(newUser);
    }

    public async obtenerUsuarios(req: Request, res: Response): Promise<Response> {
        const users = await this.userService.obtenerUsuarios();
        return res.status(200).json(users);
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id);
        const { name, email } = req.body;
        const updatedUser = await this.userService.actualizarUsuario(userId, name, email);
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(updatedUser);
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id);
        const deleted = await this.userService.eliminarUsuario(userId);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        return res.status(204).send();
    }
}
