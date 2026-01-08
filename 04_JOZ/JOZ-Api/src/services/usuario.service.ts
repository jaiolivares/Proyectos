import { User } from '../types';
import { UserRepository } from '../repositories/usuario.repository';

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository ?? new UserRepository();
    }

    public async crearUsuario(name: string, email: string): Promise<User> {
        const created = await this.userRepository.crearUsuario({ name, email });
        return { id: created.Id, name: created.Nombre, email: created.Email } as User;
    }

    public async obtenerUsuario(id: number): Promise<User | null> {
        const found = await this.userRepository.obtenerUsuario(id);
        if (!found) return null;
        return { id: found.Id, name: found.Nombre, email: found.Email } as User;
    }

    public async actualizarUsuario(id: number, name: string, email: string): Promise<User | null> {
        try {
            const updated = await this.userRepository.actualizarUsuario(id, { name, email });
            return { id: updated.Id, name: updated.Nombre, email: updated.Email } as User;
        } catch (err) {
            return null;
        }
    }

    public async eliminarUsuario(id: number): Promise<boolean> {
        try {
            await this.userRepository.eliminarUsuario(id);
            return true;
        } catch (err) {
            return false;
        }
    }

    public async obtenerUsuarios(): Promise<User[]> {
        const list = await this.userRepository.obtenerUsuarios();
        return list.map(u => ({ id: u.Id, name: u.Nombre, email: u.Email } as User));
    }

}
