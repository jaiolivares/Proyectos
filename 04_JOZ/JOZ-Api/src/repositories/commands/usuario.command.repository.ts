import { Usuario } from "../../models/usuario.model";
import prisma from "../../prisma";
import { UsuarioCreateRequestDto } from "../../dtos/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../../dtos/usuario/usuarioCreateResponse.dto";
import { UsuarioUpdateRequestDto } from "../../dtos/usuario/usuarioUpdateRequest.dto";
import { UsuarioUpdateResponseDto } from "../../dtos/usuario/usuarioUpdateResponse.dto";

export class UsuarioCommandRepository {
  
  public async crearUsuario(req: UsuarioCreateRequestDto): Promise<UsuarioCreateResponseDto> {
    try {
      const created = await prisma.usuarios.create({
        data: {
          NombreUsuario: req.NombreUsuario,
          Password: req.Password,
          Nombre: req.Nombre,
          SegundoNombre: req.SegundoNombre,
          ApellidoPaterno: req.ApellidoPaterno,
          ApellidoMaterno: req.ApellidoMaterno,
          Email: req.Email,
          FechaCreacion: new Date(),
          EstaBloqueado: 0,
          EstaActivo: 1,
        },
        select: {
          Id: true,
          NombreUsuario: true,
          Nombre: true,
          SegundoNombre: true,
          ApellidoPaterno: true,
          ApellidoMaterno: true,
          Email: true,
          FechaCreacion: true,
        },
      });
      return created;
    }
    catch (error) {
      throw error;
    }
  }

  public async actualizarPassword(id: number, newPassword: string): Promise<UsuarioUpdateResponseDto> {
    try {
      const updated = await prisma.usuarios.update({
        where: { Id: id },
        data: { Password: newPassword },
        select: {
          Id: true,
          NombreUsuario: true,
          Nombre: true,
          SegundoNombre: true,
          ApellidoPaterno: true,
          ApellidoMaterno: true,
          Email: true,
          FechaCreacion: true,
        },
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }


  // public async actualizarUsuario(id: number, userData: UpdateUsuarioDto): Promise<Usuario | null> {
  //   const data: any = {};
  //   if (userData.name !== undefined) data.Nombre = userData.name;
  //   if (userData.email !== undefined) data.Email = userData.email;
  //   const updated = await prisma.usuarios.update({
  //     where: { Id: id },
  //     data,
  //   });
  //   return updated as unknown as Usuario;
  // }

  // public async eliminarUsuario(id: number): Promise<void> {
  //   await prisma.usuarios.delete({ where: { Id: id } });
  // }
}
