import { User } from '../types';

export class UserService {
    private users: User[] = [];
    private currentId: number = 1;

    public createUser(name: string, email: string): User {
        const newUser: User = { id: this.currentId++, name, email };
        this.users.push(newUser);
        return newUser;
    }

    public getUser(id: number): User | null {
        return this.users.find(user => user.id === id) || null;
    }

    public updateUser(id: number, name: string, email: string): User | null {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { id, name, email };
            return this.users[userIndex];
        }
        return null;
    }

    public deleteUser(id: number): boolean {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx === -1) return false;
        this.users.splice(idx, 1);
        return true;
    }

    public getAllUsers(): User[] {
        return this.users;
    }
}