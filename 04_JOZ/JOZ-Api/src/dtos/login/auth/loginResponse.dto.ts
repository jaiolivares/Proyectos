import { UsuarioDto } from "../../usuarios/usuario/usuario.dto";

export interface LoginResponseDto {
  token: string;
  usuario: UsuarioDto;
}

export default LoginResponseDto;
