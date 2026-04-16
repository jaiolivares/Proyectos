import prisma from "../../../prisma";
import { Usuario } from "../../../models/usuario.model";

export class UsuarioQueryRepository {
  public async obtenerUsuario(id: number): Promise<Usuario | null> {
    if (id == null || Number.isNaN(Number(id))) {
      throw new Error("El id es obligatorio y debe ser un número");
    }

    const found = await prisma.usuario.findFirst({
      where: { Id: Number(id) },
    });

    return found ? this.mapPrismaUsuario(found) : null;
  }

  public async obtenerUsuarios(): Promise<Usuario[]> {
    const results = await prisma.usuario.findMany();
    return results.map((r) => this.mapPrismaUsuario(r));
  }

  public async obtenerPorNombreUsuario(nombreUsuario: string): Promise<Usuario | null> {
    if (!nombreUsuario) {
      throw new Error('El nombre de usuario es obligatorio');
    }

    const found = await prisma.usuario.findFirst({
      where: { NombreUsuario: nombreUsuario },
    });

    return found ? this.mapPrismaUsuario(found) : null;
  }

  private mapPrismaUsuario(record: any): Usuario {
    return {
      Id: record.Id,
      NombreUsuario: record.NombreUsuario,
      Password: record.Password,
      Nombre: record.Nombre,
      SegundoNombre: record.SegundoNombre ?? '',
      ApellidoPaterno: record.ApellidoPaterno,
      ApellidoMaterno: record.ApellidoMaterno ?? '',
      Email: record.Email,
      FechaCreacion: record.FechaCreacion,
      FechaUltimoLogin: record.FechaUltimoLogin ?? null,
      EstaBloqueado: Boolean(record.EstaBloqueado),
      EstaActivo: Boolean(record.EstaActivo),
    };
  }
}
