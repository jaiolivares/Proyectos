import prisma from "../../prisma";
import { UsuarioModelo } from "../../models/usuario.model";

export class UsuarioQueryRepository {
  public async obtenerUsuario(id: number): Promise<UsuarioModelo | null> {
    const found = await prisma.usuarios.findUnique({
      where: { Id: id },
    });
    return found as UsuarioModelo | null;
  }

  public async obtenerUsuarios(): Promise<UsuarioModelo[]> {
    return (await prisma.usuarios.findMany()) as UsuarioModelo[];
  }
}
