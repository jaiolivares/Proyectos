import prisma from "../../prisma";
import { Usuario } from "../../models/usuario.model";

export class UsuarioQueryRepository {
  public async obtenerUsuario(id: number): Promise<Usuario | null> {
    if (id == null || Number.isNaN(Number(id))) {
      throw new Error("El id es obligatorio y debe ser un número");
    }

    const found = await prisma.usuarios.findFirst({
      where: { Id: Number(id) },
    });

    return found as Usuario | null;
  }

  public async obtenerUsuarios(): Promise<Usuario[]> {
    return (await prisma.usuarios.findMany()) as Usuario[];
  }

  public async obtenerPorNombreUsuario(nombreUsuario: string): Promise<Usuario | null> {
    if (!nombreUsuario) {
      throw new Error('El nombre de usuario es obligatorio');
    }

    const found = await prisma.usuarios.findFirst({
      where: { NombreUsuario: nombreUsuario },
    });

    return found as Usuario | null;
  }
}
