export class UserRepository {
    private users: Map<number, any> = new Map();
    private currentId: number = 1;

    public async createUser(user: any): Promise<any> {
        const newUser = { id: this.currentId++, ...user };
        this.users.set(newUser.id, newUser);
        return newUser;
    }

    public async getUser(id: number): Promise<any | null> {
        return this.users.get(id) || null;
    }

    public async updateUser(id: number, userData: any): Promise<any | null> {
        if (!this.users.has(id)) {
            return null;
        }
        const updatedUser = { ...this.users.get(id), ...userData };
        this.users.set(id, updatedUser);
        return updatedUser;
    }

    public async deleteUser(id: number): Promise<boolean> {
        return this.users.delete(id);
    }

    public async getAllUsers(): Promise<any[]> {
        return Array.from(this.users.values());
    }
}