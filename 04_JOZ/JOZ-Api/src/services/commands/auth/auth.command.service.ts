import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from '../../../config';
import { UsuarioQueryService } from "../../../services/queries/usuario/usuario.query.service";
import { UsuarioDto } from "../../../dtos/usuario/usuario.dto";
import { LoginResponseDto } from "../../../dtos/auth/loginResponse.dto";

export class AuthCommandService {
  private usuarioQueryService: UsuarioQueryService;

  constructor(usuarioQueryService?: UsuarioQueryService) {
    this.usuarioQueryService = usuarioQueryService ?? new UsuarioQueryService();
  }

  public async encriptarPassword(password: string): Promise<string> {
    const saltRounds = config.saltRounds;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  public async login(NombreUsuario: string, Password: string): Promise<LoginResponseDto | null> {
    
    //TODO: Validar que el usuario este Activo
    //TODO: Validar que el usuario no este Bloqueado
    //TODO: Implementar JWT para generar un token de autenticación

    const user = await this.usuarioQueryService.obtenerPorNombreUsuario(NombreUsuario);
    if (!user)
      return null;
    
    const match = await bcrypt.compare(Password, user.Password);
    if (!match)
      return null;

    const payload = { Id: user.Id, NombreUsuario: user.NombreUsuario };
    const token = jwt.sign(payload as any, config.jwt.secret as any, { expiresIn: config.jwt.expiresIn } as any);

    return { token, usuario: user } as LoginResponseDto;
  }
}
