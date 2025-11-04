export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;
        const user = await this.userService.getUserById(userId);
        return res.status(200).json(user);
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        const userData = req.body;
        const newUser = await this.userService.createUser(userData);
        return res.status(201).json(newUser);
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await this.userService.updateUser(userId, userData);
        return res.status(200).json(updatedUser);
    }
}