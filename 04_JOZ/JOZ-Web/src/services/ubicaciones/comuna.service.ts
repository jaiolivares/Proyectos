import http from "../../api/httpClient";
import { ApiResponse } from "../../models/api";
import { Comuna } from "../../models/ubicaciones/comuna";

export interface IComunaService {
  fetchAll(): Promise<Comuna[]>;
}

export class ComunaService implements IComunaService {
  constructor(private readonly httpClient = http) {}

  async fetchAll(): Promise<Comuna[]> {
    try {
      const response = await this.httpClient.get<ApiResponse<Comuna[]>>("/comuna/obtenerTodos");
      return response.data.Dato ?? [];
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return [];
      }

      throw new Error(error?.response?.data?.Mensaje || error?.message || "No fue posible cargar las comunas");
    }
  }
}
