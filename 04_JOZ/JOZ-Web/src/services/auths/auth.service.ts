import http from "../../api/httpClient";
import { ApiResponse } from "../../models/api";
import { LoginRequest, User } from "../../models/auths/user";

type LoginApiPayload = {
  token: string;
  usuario: Omit<User, "token">;
};

export interface IAuthService {
  login(payload: LoginRequest): Promise<User>;
}

export class AuthService implements IAuthService {
  constructor(private readonly httpClient = http) {}

  async login(payload: LoginRequest): Promise<User> {
    const resp = await this.httpClient.post<ApiResponse<LoginApiPayload>>("/auth/login", payload);
    const authData = resp.data.Dato;

    if (!authData?.usuario || !authData.token) {
      throw new Error(resp.data.Mensaje || "Respuesta de autenticación inválida");
    }

    return {
      ...authData.usuario,
      token: authData.token,
    };
  }
}
