import { User } from '../types';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository ?? new UserRepository();
    }

    public async createUser(name: string, email: string): Promise<User> {
        const created = await this.userRepository.createUser({ name, email });
        return { id: created.Id, name: created.Nombre, email: created.Email } as User;
    }

    public async getUser(id: number): Promise<User | null> {
        const found = await this.userRepository.getUser(id);
        if (!found) return null;
        return { id: found.Id, name: found.Nombre, email: found.Email } as User;
    }

    public async updateUser(id: number, name: string, email: string): Promise<User | null> {
        try {
            const updated = await this.userRepository.updateUser(id, { name, email });
            return { id: updated.Id, name: updated.Nombre, email: updated.Email } as User;
        } catch (err) {
            // If update fails (e.g., not found), return null
            return null;
        }
    }

    public async deleteUser(id: number): Promise<boolean> {
        try {
            await this.userRepository.deleteUser(id);
            return true;
        } catch (err) {
            return false;
        }
    }

    public async getAllUsers(): Promise<User[]> {
        const list = await this.userRepository.getAllUsers();
        console.log("services users:", list);
        return list.map(u => ({ id: u.Id, name: u.Nombre, email: u.Email } as User));
    }

}