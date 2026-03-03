import prisma from "../../prisma";
import { Usuario } from "../../models/usuario.model";

export class UsuarioQueryRepository {
  public async obtenerUsuario(id: number): Promise<Usuario | null> {
    const found = await prisma.usuarios.findUnique({
      where: { Id: id },
    });
    return found as Usuario | null;
  }

  public async obtenerUsuarios(): Promise<Usuario[]> {
    return (await prisma.usuarios.findMany()) as Usuario[];
  }
}
