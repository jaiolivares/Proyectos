import { Usuario } from "../../models/usuario.model";
import prisma from "../../prisma";
import { CreateUsuarioDto, UpdateUsuarioDto } from "../../dtos/usuario/usuario.dto";

export class UsuarioCommandRepository {
  public async crearUsuario(user: CreateUsuarioDto): Promise<Usuario> {
    const baseNombre = user.email ? user.email.split("@")[0] : `user`;
    const nombreUsuario = `${baseNombre}_${Date.now()}`;
    const created = await prisma.usuarios.create({
      data: {
        NombreUsuario: nombreUsuario,
        Nombre: user.name,
        Email: user.email,
        FechaCreacion: new Date(),
      },
    });
    return created as unknown as Usuario;
  }

  public async actualizarUsuario(id: number, userData: UpdateUsuarioDto): Promise<Usuario | null> {
    const data: any = {};
    if (userData.name !== undefined) data.Nombre = userData.name;
    if (userData.email !== undefined) data.Email = userData.email;
    const updated = await prisma.usuarios.update({
      where: { Id: id },
      data,
    });
    return updated as unknown as Usuario;
  }

  public async eliminarUsuario(id: number): Promise<void> {
    await prisma.usuarios.delete({ where: { Id: id } });
  }
}
