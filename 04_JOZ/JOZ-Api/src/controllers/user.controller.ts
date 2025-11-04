import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id);
        const user = this.userService.getUser(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;
        const newUser = this.userService.createUser(name, email);
        return res.status(201).json(newUser);
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id);
        const { name, email } = req.body;
        const updatedUser = this.userService.updateUser(userId, name, email);
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const userId = Number(req.params.id);
        const deleted = this.userService.deleteUser(userId);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        return res.status(204).send();
    }
}