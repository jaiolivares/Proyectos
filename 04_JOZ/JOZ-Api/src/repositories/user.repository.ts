import prisma from '../prisma';

export class UserRepository {
    public async createUser(user: { name: string; email: string }): Promise<any> {
        const created = await prisma.usuarios.create({
            data: {
                name: user.name,
                email: user.email,
            },
        });
        return created;
    }

    public async getUser(id: number): Promise<any | null> {
        const found = await prisma.usuarios.findUnique({
            where: { id },
        });
        return found;
    }

    public async updateUser(id: number, userData: Partial<{ name: string; email: string }>): Promise<any | null> {
        const updated = await prisma.usuarios.update({
            where: { id },
            data: userData as any,
        });
        return updated;
    }

    public async deleteUser(id: number): Promise<boolean> {
        await prisma.usuarios.delete({ where: { id } });
        return true;
    }

    public async getAllUsers(): Promise<any[]> {
        return await prisma.usuarios.findMany();
    }
}