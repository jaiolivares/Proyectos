import { UsuarioDto } from "../../usuarios/usuario/usuario.dto";

export interface LoginResponseDto {
  token: string;
  accestoken?: string;
  usuario: UsuarioDto;
}

export default LoginResponseDto;
