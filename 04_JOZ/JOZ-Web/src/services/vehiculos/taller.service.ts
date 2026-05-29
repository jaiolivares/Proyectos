import http from "../../api/httpClient";
import { ApiResponse } from "../../models/api";
import { Taller, TallerPayload } from "../../models/vehiculos/taller";

export interface ITallerService {
  fetchAll(): Promise<Taller[]>;
  create(payload: TallerPayload): Promise<Taller>;
  update(id: number, payload: TallerPayload): Promise<Taller>;
  remove(id: number): Promise<string>;
}

export class TallerService implements ITallerService {
  constructor(private readonly httpClient = http) {}

  async fetchAll(): Promise<Taller[]> {
    try {
      const response = await this.httpClient.get<ApiResponse<Taller[]>>("/taller/obtenerTodos");
      return response.data.Dato ?? [];
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return [];
      }

      throw new Error(error?.response?.data?.Mensaje || error?.message || "No fue posible cargar los talleres");
    }
  }

  async create(payload: TallerPayload): Promise<Taller> {
    try {
      const response = await this.httpClient.post<ApiResponse<Taller>>("/taller/crear", payload);
      if (!response.data.Dato) {
        throw new Error(response.data.Mensaje || "La API no retornó el taller creado");
      }

      return response.data.Dato;
    } catch (error: any) {
      throw new Error(error?.response?.data?.Mensaje || error?.message || "No fue posible crear el taller");
    }
  }

  async update(id: number, payload: TallerPayload): Promise<Taller> {
    try {
      const response = await this.httpClient.patch<ApiResponse<Taller>>(`/taller/actualizar/${id}`, payload);
      if (!response.data.Dato) {
        throw new Error(response.data.Mensaje || "La API no retornó el taller actualizado");
      }

      return response.data.Dato;
    } catch (error: any) {
      throw new Error(error?.response?.data?.Mensaje || error?.message || "No fue posible actualizar el taller");
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const response = await this.httpClient.delete<ApiResponse<string>>(`/taller/eliminar/${id}`);
      return response.data.Mensaje || response.data.Dato || "Taller eliminado";
    } catch (error: any) {
      throw new Error(error?.response?.data?.Mensaje || error?.message || "No fue posible eliminar el taller");
    }
  }
}
