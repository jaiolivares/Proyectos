import { User } from '../types';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository ?? new UserRepository();
    }

    public async createUser(name: string, email: string): Promise<User> {
        const created = await this.userRepository.createUser({ name, email });
        return { id: created.id, name: created.name, email: created.email } as User;
    }

    public async getUser(id: number): Promise<User | null> {
        const found = await this.userRepository.getUser(id);
        if (!found) return null;
        return { id: found.id, name: found.name, email: found.email } as User;
    }

    public async updateUser(id: number, name: string, email: string): Promise<User | null> {
        try {
            const updated = await this.userRepository.updateUser(id, { name, email });
            return { id: updated.id, name: updated.name, email: updated.email } as User;
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
        return list.map(u => ({ id: u.id, name: u.name, email: u.email } as User));
    }

}