import { UsuarioDto } from "../usuario/usuario.dto";

export interface LoginResponseDto {
  token: string;
  usuario: UsuarioDto;
}

export default LoginResponseDto;
