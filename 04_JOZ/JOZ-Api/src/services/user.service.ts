export class UserService {
    private users: { id: number; name: string; email: string }[] = [];
    private currentId: number = 1;

    public createUser(name: string, email: string) {
        const newUser = { id: this.currentId++, name, email };
        this.users.push(newUser);
        return newUser;
    }

    public getUser(id: number) {
        return this.users.find(user => user.id === id);
    }

    public updateUser(id: number, name: string, email: string) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { id, name, email };
            return this.users[userIndex];
        }
        return null;
    }

    public getAllUsers() {
        return this.users;
    }
}