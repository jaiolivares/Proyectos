import prisma from '../prisma';

export class UserRepository {
    public async createUser(user: { name: string; email: string }): Promise<any> {
        const baseNombre = user.email ? user.email.split('@')[0] : `user`;
        const nombreUsuario = `${baseNombre}_${Date.now()}`;
        const created = await prisma.usuarios.create({
            data: {
                NombreUsuario: nombreUsuario,
                Nombre: user.name,
                Email: user.email,
                FechaCreacion: new Date(),
            },
        });
        return created;
    }

    public async getUser(id: number): Promise<any | null> {
        const found = await prisma.usuarios.findUnique({
            where: { Id: id },
        });
        return found;
    }

    public async updateUser(id: number, userData: Partial<{ name: string; email: string }>): Promise<any | null> {
        const data: any = {};
        if (userData.name !== undefined) data.Nombre = userData.name;
        if (userData.email !== undefined) data.Email = userData.email;
        const updated = await prisma.usuarios.update({
            where: { Id: id },
            data,
        });
        return updated;
    }

    public async deleteUser(id: number): Promise<boolean> {
        await prisma.usuarios.delete({ where: { Id: id } });
        return true;
    }

    public async getAllUsers(): Promise<any[]> {
        return await prisma.usuarios.findMany();
    }
}