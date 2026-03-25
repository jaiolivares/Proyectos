import bcrypt from "bcryptjs";
import config from '../../../config';
import { UsuarioQueryService } from "../../../services/queries/usuario/usuario.query.service";
import { UsuarioDto } from "../../../dtos/usuario/usuario.dto";

export class AuthCommandService {
  private usuarioQueryService: UsuarioQueryService;

  constructor(usuarioQueryService: UsuarioQueryService) {
    this.usuarioQueryService = usuarioQueryService;
  }

  public async encriptarPassword(password: string): Promise<string> {
    const saltRounds = config.saltRounds;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  public async login(NombreUsuario: string, Password: string): Promise<UsuarioDto | null> {
    
    //TODO: Validar que el usuario este Activo
    //TODO: Validar que el usuario no este Bloqueado
    //TODO: Implementar JWT para generar un token de autenticación

    const user = await this.usuarioQueryService.obtenerPorNombreUsuario(NombreUsuario);
    if (!user)
      return null;
    
    const match = await bcrypt.compare(Password, user.Password);
    if (!match)
      return null;
    
    return user;
  }
}
